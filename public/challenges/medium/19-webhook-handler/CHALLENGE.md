# Webhook Handler

**Difficulty:** medium  
**Topics:** fastapi, webhooks

## Learning goals

- Verify HMAC signatures
- Parse event payloads

## Challenge

Implement `verify_signature(body: bytes, signature: str, secret: str) -> bool` using HMAC-SHA256 hex compare and FastAPI route accepting webhooks.

## Requirements

1. Timing-safe compare
2. Reject bad signature with 401
3. Parse JSON event type

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/medium/19-webhook-handler/`. Reference write-ups in this repo live under `challenges/medium/19-webhook-handler/` (not loaded by the app).

```python
import hashlib
import hmac
from fastapi import FastAPI, Header, HTTPException, Request

app = FastAPI()

def verify_signature(body: bytes, signature: str, secret: str) -> bool:
    # TODO
    raise NotImplementedError

@app.post("/webhooks/github")
async def github_webhook(request: Request, x_hub_signature_256: str = Header(...)):
    ...
```

## Hints

1. hmac.new(secret.encode(), body, hashlib.sha256).hexdigest()
2. hmac.compare_digest
3. expected = "sha256=" + digest

## Acceptance criteria

- [ ] **Valid signature accepted**
  Valid signature accepted. Start uvicorn, open /docs or curl the endpoint, and verify status code plus JSON shape.

- [ ] **Tampered body rejected**
  Tampered body rejected. Start uvicorn, open /docs or curl the endpoint, and verify status code plus JSON shape.

- [ ] **Returns 200 on success**
  Returns 200 on success. Start uvicorn, open /docs or curl the endpoint, and verify status code plus JSON shape.

## Resources

- [FastAPI documentation](https://fastapi.tiangolo.com/)
- [webhooks – reference](https://fastapi.tiangolo.com/advanced/events/)
