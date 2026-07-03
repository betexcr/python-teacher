# Payment Webhooks

## Requirements

Integrate Stripe (or similar) for subscriptions and one-time payments:

- **Checkout:** Create session server-side; never trust client amounts
- **Webhooks:** Process `checkout.session.completed`, `invoice.paid`, `customer.subscription.deleted`
- **Idempotency:** Same event ID processed exactly once
- **State sync:** Local `subscriptions` table mirrors provider state
- **Security:** Verify webhook signatures; reject replayed payloads

## API Design

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/billing/checkout` | POST | Create Stripe Checkout session → `{ "url" }` |
| `/billing/portal` | POST | Customer portal link for self-serve cancel |
| `/billing/webhooks/stripe` | POST | Raw body + `Stripe-Signature` header |
| `/billing/subscription` | GET | Current plan for authenticated user |

Webhook handler returns `200` quickly—heavy work goes to queue.

```text
Stripe ──► POST /webhooks/stripe ──► verify signature ──► idempotency check ──► enqueue
Worker ──► update subscription row ──► send confirmation email
```

## Data Model

```sql
CREATE TABLE customers (
  user_id           UUID PRIMARY KEY,
  stripe_customer_id TEXT UNIQUE NOT NULL
);

CREATE TABLE subscriptions (
  id                     UUID PRIMARY KEY,
  user_id                UUID NOT NULL,
  stripe_subscription_id TEXT UNIQUE,
  plan                   TEXT NOT NULL,
  status                 TEXT NOT NULL,
  current_period_end     TIMESTAMPTZ,
  updated_at             TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE processed_webhook_events (
  event_id    TEXT PRIMARY KEY,
  event_type  TEXT NOT NULL,
  processed_at TIMESTAMPTZ DEFAULT now()
);
```

Store `price_id → plan` mapping in config, not client input.

## Scaling

- **Webhook endpoint** must respond < 5s—Stripe retries on timeout
- **Idempotency table** or Redis `SET NX event_id` before processing
- **Outbox + worker** for provisioning (create tenant, send email)
- **Reconciliation job** nightly: compare Stripe API vs local DB
- **Rate limit** webhook endpoint by IP (Stripe publishes IP ranges)

## Python Stack

| Layer | Choice |
|-------|--------|
| SDK | `stripe` Python library |
| API | FastAPI (raw body for signature) |
| Workers | Celery for post-payment side effects |
| ORM | SQLAlchemy |

```python
import stripe
from fastapi import FastAPI, Request, HTTPException, Header

stripe.api_key = settings.STRIPE_SECRET_KEY
WEBHOOK_SECRET = settings.STRIPE_WEBHOOK_SECRET

app = FastAPI()

@app.post("/billing/checkout")
async def create_checkout(user=Depends(current_user)):
    customer_id = await get_or_create_stripe_customer(user)
    session = stripe.checkout.Session.create(
        customer=customer_id,
        mode="subscription",
        line_items=[{"price": settings.STRIPE_PRICE_PRO, "quantity": 1}],
        success_url=f"{settings.APP_URL}/billing/success",
        cancel_url=f"{settings.APP_URL}/billing/cancel",
        metadata={"user_id": str(user.id)},
    )
    return {"url": session.url}

@app.post("/billing/webhooks/stripe")
async def stripe_webhook(request: Request, stripe_signature: str = Header(None)):
    payload = await request.body()
    try:
        event = stripe.Webhook.construct_event(payload, stripe_signature, WEBHOOK_SECRET)
    except stripe.error.SignatureVerificationError:
        raise HTTPException(400, "Invalid signature")

    if await is_event_processed(event["id"]):
        return {"status": "duplicate"}

    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        process_checkout_completed.delay(session)

    await mark_event_processed(event["id"], event["type"])
    return {"status": "ok"}
```

**Interview tip:** Always use webhooks as source of truth, not redirect URL alone—user can close tab before returning. Handle out-of-order events (`subscription.updated` before `created`) with upsert logic.
