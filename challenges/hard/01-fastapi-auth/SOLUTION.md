# Solution: FastAPI JWT Auth

## Approach

Login encodes claims; dependency decodes Bearer token and maps to user.

## Key concepts

- **JWT**: Signed claims for stateless auth between services.
- **HTTPBearer**: FastAPI security scheme reading Authorization header.

## Code highlights

- `def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> str:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `return jwt.encode({"sub": subject, "exp": expire}, SECRET, algorithm=ALGORITHM)` — **return** — Returns the computed result to the caller. Login mints JWT with exp; get_current_user decodes Bearer token; /me requires valid subject.
- `return {"access_token": create_token(username), "token_type": "bearer"}` — **return** — Returns the computed result to the caller. Login mints JWT with exp; get_current_user decodes Bearer token; /me requires valid subject.
- `def me(user: str = Depends(get_current_user)) -> dict[str, str]:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `def login(username: str, password: str) -> dict[str, str]:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `def create_token(subject: str, minutes: int = 30) -> str:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `return {"user": user}` — **return** — Returns the computed result to the caller. Login mints JWT with exp; get_current_user decodes Bearer token; /me requires valid subject.
- `@app.post("/login")` — **POST route** — Registers an HTTP POST handler on the FastAPI app or blueprint router. Login mints JWT with exp; get_current_user decodes Bearer token; /me requires valid subject.
- `@app.get("/me")` — **GET route** — Registers an HTTP GET handler on the FastAPI app or blueprint router. Login mints JWT with exp; get_current_user decodes Bearer token; /me requires valid subject.
- `return str(sub)` — **return** — Returns the computed result to the caller. Login mints JWT with exp; get_current_user decodes Bearer token; /me requires valid subject.
- `Depends(` — **Depends** — FastAPI dependency injection — shared auth, DB sessions, and settings per request.

## Solution code

```python
from datetime import datetime, timedelta, timezone
from fastapi import Depends, FastAPI, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt

app = FastAPI()
security = HTTPBearer()
SECRET = "dev-only-secret"
ALGORITHM = "HS256"

def create_token(subject: str, minutes: int = 30) -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=minutes)
    return jwt.encode({"sub": subject, "exp": expire}, SECRET, algorithm=ALGORITHM)

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> str:
    try:
        payload = jwt.decode(credentials.credentials, SECRET, algorithms=[ALGORITHM])
        sub = payload.get("sub")
        if not sub:
            raise HTTPException(status_code=401, detail="invalid token")
        return str(sub)
    except JWTError as exc:
        raise HTTPException(status_code=401, detail="invalid token") from exc

@app.post("/login")
def login(username: str, password: str) -> dict[str, str]:
    if password != "secret":
        raise HTTPException(status_code=401, detail="bad credentials")
    return {"access_token": create_token(username), "token_type": "bearer"}

@app.get("/me")
def me(user: str = Depends(get_current_user)) -> dict[str, str]:
    return {"user": user}
```

## Walkthrough

Login mints JWT with exp; get_current_user decodes Bearer token; /me requires valid subject.

## Common mistakes

- Hardcoded secret in prod
- Skipping exp validation

## Stretch goals

- Refresh tokens
- OAuth2 password flow
