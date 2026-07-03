# Solution: Webhook Handler

## Approach

Compute HMAC digest; compare safely; route reads raw body before JSON.

## Key concepts

- **HMAC**: Proves payload integrity with shared secret.
- **compare_digest**: Constant-time comparison prevents timing leaks.

## Code highlights

- `async def github_webhook(request: Request, x_hub_signature_256: str = Header(...)` — **async github_webhook** — `github_webhook` is a coroutine — call it with await or asyncio.run. verify_signature builds sha256 HMAC; route reads raw bytes; invalid sig returns 401.
- `def verify_signature(body: bytes, signature: str, secret: str) -> bool:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `return hmac.compare_digest(expected, signature)` — **return** — Returns the computed result to the caller. verify_signature builds sha256 HMAC; route reads raw bytes; invalid sig returns 401.
- `@app.post("/webhooks/github")` — **POST route** — Registers an HTTP POST handler on the FastAPI app or blueprint router. verify_signature builds sha256 HMAC; route reads raw bytes; invalid sig returns 401.
- `return {"ok": True}` — **return** — Returns the computed result to the caller. verify_signature builds sha256 HMAC; route reads raw bytes; invalid sig returns 401.

## Solution code

```python
import hashlib
import hmac
from fastapi import FastAPI, Header, HTTPException, Request

app = FastAPI()
WEBHOOK_SECRET = "dev-secret"

def verify_signature(body: bytes, signature: str, secret: str) -> bool:
    digest = hmac.new(secret.encode(), body, hashlib.sha256).hexdigest()
    expected = f"sha256={digest}"
    return hmac.compare_digest(expected, signature)

@app.post("/webhooks/github")
async def github_webhook(request: Request, x_hub_signature_256: str = Header(...)):
    body = await request.body()
    if not verify_signature(body, x_hub_signature_256, WEBHOOK_SECRET):
        raise HTTPException(status_code=401, detail="invalid signature")
    return {"ok": True}
```

## Walkthrough

verify_signature builds sha256 HMAC; route reads raw bytes; invalid sig returns 401.

## Common mistakes

- Using == for digest compare
- Parsing JSON before verify (body consumed wrong)

## Stretch goals

- Idempotency keys
- Queue event for async processing
