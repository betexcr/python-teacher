# FastAPI JWT Auth

**Difficulty:** hard  
**Topics:** fastapi, jwt, auth

## Learning goals

- Issue and verify JWTs
- Protect routes with dependencies

## Challenge

Implement login returning JWT and dependency `get_current_user` validating Bearer token with `python-jose`.

## Requirements

1. HS256 signed tokens
2. 401 on invalid token
3. Expiry exp claim enforced

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/hard/01-fastapi-auth/`. Reference write-ups in this repo live under `challenges/hard/01-fastapi-auth/` (not loaded by the app).

```python
from datetime import datetime, timedelta, timezone
from fastapi import Depends, FastAPI, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

app = FastAPI()
security = HTTPBearer()
SECRET = "dev-only-secret"

# TODO: create_token, get_current_user, /login
```

## Hints

1. jwt.encode({"sub": user, "exp": ...}, SECRET, algorithm="HS256")
2. HTTPBearer credentials
3. jwt.decode with algorithms=[HS256]

## Acceptance criteria

- [ ] **Login returns token**
  Login returns token. Start uvicorn, open /docs or curl the endpoint, and verify status code plus JSON shape.

- [ ] **Protected route needs token**
  Protected route needs token. Start uvicorn, open /docs or curl the endpoint, and verify status code plus JSON shape.

- [ ] **Expired token rejected**
  Expired token rejected. Start uvicorn, open /docs or curl the endpoint, and verify status code plus JSON shape.

## Resources

- [FastAPI documentation](https://fastapi.tiangolo.com/)
- [jwt – reference](https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/)
- [auth – reference](https://fastapi.tiangolo.com/tutorial/security/)
