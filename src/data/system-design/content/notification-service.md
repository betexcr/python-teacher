# Notification Service

## Requirements

Deliver email, push, SMS, and in-app notifications reliably:

- **Channels:** Email (SendGrid/SES), push (FCM/APNs), SMS (Twilio), in-app inbox
- **Templates:** Per-locale rendered templates with variables
- **Preferences:** User opt-out per channel and category (marketing vs transactional)
- **Delivery:** At-least-once with idempotency; retry transient failures
- **Real-time:** WebSocket or SSE for in-app badge updates when user is online

## API Design

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/notifications/send` | POST | Internal/admin enqueue `{ "user_id", "template", "data", "channels" }` |
| `/notifications` | GET | User inbox, paginated, unread filter |
| `/notifications/{id}/read` | PATCH | Mark read |
| `/notifications/preferences` | GET/PATCH | Channel toggles |

Internal send API is service-to-service (mTLS or API key)—not public.

```text
Service ──► POST /notifications/send ──► Postgres outbox ──► Celery workers
Workers ──► SendGrid / FCM / Twilio
Success ──► update delivery status ──► WS push to online clients
```

## Data Model

```sql
CREATE TABLE notifications (
  id          UUID PRIMARY KEY,
  user_id     UUID NOT NULL,
  category    TEXT NOT NULL,
  title       TEXT NOT NULL,
  body        TEXT NOT NULL,
  read_at     TIMESTAMPTZ,
  created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE notification_deliveries (
  id              UUID PRIMARY KEY,
  notification_id UUID REFERENCES notifications(id),
  channel         TEXT NOT NULL,
  status          TEXT DEFAULT 'pending',
  provider_id     TEXT,
  error           TEXT,
  attempted_at    TIMESTAMPTZ
);

CREATE TABLE notification_preferences (
  user_id   UUID,
  category  TEXT,
  channel   TEXT,
  enabled   BOOLEAN DEFAULT true,
  PRIMARY KEY (user_id, category, channel)
);
```

Outbox pattern: insert notification + delivery rows in same transaction; worker polls `status = pending`.

## Scaling

- **Queue per channel**—email backlog doesn't block push
- **Batch email** provider APIs where supported
- **Idempotency key** `user_id + template + dedupe_window` prevents duplicate password resets
- **Fan-out:** One event → N users via map-reduce jobs (don't loop send in API)
- **Unread counts** cached in Redis `unread:{user_id}` incremented on send, decremented on read

## Python Stack

| Layer | Choice |
|-------|--------|
| API | FastAPI |
| Workers | Celery |
| Email | `sendgrid` or ` boto3` SES |
| Push | `firebase-admin` |
| Templates | Jinja2 |

```python
from celery import Celery
from jinja2 import Environment, BaseLoader

celery_app = Celery("notifications", broker="redis://localhost:6379/0")

@celery_app.task(bind=True, max_retries=5)
def deliver_email(self, delivery_id: str):
    delivery = get_delivery(delivery_id)
    if not is_channel_enabled(delivery.user_id, delivery.category, "email"):
        mark_skipped(delivery_id)
        return
    html = render_template(delivery.template, delivery.data)
    try:
        message_id = sendgrid_send(delivery.to_email, delivery.subject, html)
        mark_sent(delivery_id, message_id)
    except TransientError as exc:
        raise self.retry(exc=exc, countdown=2 ** self.request.retries)

@app.post("/notifications/send")
async def send_notification(body: SendRequest, session: AsyncSession = Depends(get_session)):
    async with session.begin():
        notif = Notification(user_id=body.user_id, title=body.title, body=body.body, category=body.category)
        session.add(notif)
        for channel in body.channels:
            session.add(NotificationDelivery(notification_id=notif.id, channel=channel))
    for channel in body.channels:
        deliver_email.delay(str(notif.id)) if channel == "email" else deliver_push.delay(str(notif.id))
    await redis.incr(f"unread:{body.user_id}")
    await publish_ws(body.user_id, {"type": "notification", "id": str(notif.id)})
    return {"id": str(notif.id)}
```

**Interview tip:** Transactional vs marketing—transactional (password reset) must bypass marketing opt-out. Separate IP/domain reputation for marketing email.
