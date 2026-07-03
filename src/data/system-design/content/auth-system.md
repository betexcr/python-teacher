# Auth System (JWT + Refresh)

## Requirements

Design authentication for a Python API serving web and mobile clients:

- **AuthN:** Email/password login, OAuth2 optional; issue short-lived access JWT + rotating refresh token
- **AuthZ:** RBAC with roles and permissions; scope checks on every protected route
- **Security:** HttpOnly refresh cookie, refresh token rotation, reuse detection, rate-limited login
- **Revocation:** Logout invalidates refresh family; optional access-token denylist for sensitive ops
- **Scale:** Stateless API workers; shared refresh store in Redis/Postgres

## API Design

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/auth/register` | POST | Create user; hash password with bcrypt/argon2 |
| `/auth/login` | POST | Returns access JWT + sets refresh HttpOnly cookie |
| `/auth/refresh` | POST | Rotate refresh; new access JWT |
| `/auth/logout` | POST | Revoke refresh token family |
| `/auth/me` | GET | Current user + permissions |

Access token: `Authorization: Bearer <jwt>` (15 min TTL). Refresh: HttpOnly, Secure, SameSite=Strict cookie (7 days).

```text
Login ──► access JWT (15m) + refresh cookie (7d)
Request ──► verify JWT ──► permission dependency ──► handler
401 ──► client calls /auth/refresh once ──► retry
```

## Data Model

```sql
CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE refresh_tokens (
  id          UUID PRIMARY KEY,
  user_id     UUID REFERENCES users(id),
  token_hash  TEXT NOT NULL,
  family_id   UUID NOT NULL,
  expires_at  TIMESTAMPTZ NOT NULL,
  revoked_at  TIMESTAMPTZ
);

CREATE TABLE roles (
  id   SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
);

CREATE TABLE user_roles (
  user_id UUID REFERENCES users(id),
  role_id INT REFERENCES roles(id),
  PRIMARY KEY (user_id, role_id)
);
```

Store only **hashed** refresh tokens (`SHA-256` of random bytes). On reuse of a revoked token, revoke entire `family_id`.

## Scaling

- Access JWT verification is local (no DB)—scales with worker count
- Refresh rotation hits DB/Redis—acceptable at login frequency, not per-request
- Permission cache in JWT claims (short TTL) or Redis `user:{id}:perms`
- Rate limit `/auth/login` by IP + email (see rate-limited-api guide)

## Python Stack

| Layer | Choice |
|-------|--------|
| Framework | FastAPI |
| JWT | `python-jose` or `PyJWT` |
| Passwords | `passlib[bcrypt]` or `argon2-cffi` |
| OAuth | `authlib` |

```python
from datetime import datetime, timedelta, timezone
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from passlib.context import CryptContext

SECRET = "change-me"
ALGORITHM = "HS256"
ACCESS_TTL = timedelta(minutes=15)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

def create_access_token(user_id: str, permissions: list[str]) -> str:
    payload = {
        "sub": user_id,
        "permissions": permissions,
        "exp": datetime.now(timezone.utc) + ACCESS_TTL,
    }
    return jwt.encode(payload, SECRET, algorithm=ALGORITHM)

def verify_access_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, SECRET, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

def require_permission(permission: str):
    def checker(payload=Depends(verify_access_token)):
        if permission not in payload.get("permissions", []):
            raise HTTPException(status_code=403, detail="Forbidden")
        return payload
    return checker

@app.post("/auth/login")
async def login(body: LoginRequest, response: Response):
    user = await authenticate(body.email, body.password)
    if not user or not pwd_context.verify(body.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    access = create_access_token(str(user.id), user.permissions)
    refresh = await issue_refresh_token(user.id, response)
    return {"access_token": access, "token_type": "bearer"}
```

**Interview tip:** Distinguish 401 (unauthenticated) vs 403 (authenticated but forbidden). Explain refresh rotation: each refresh invalidates the old token and mints a new one—detects theft if old token is reused.
