# Solution: Dependency Injection

## Approach

Generator dependency with teardown; route declares Depends; tests override provider.

## Key concepts

- **Depends**: FastAPI resolves and injects dependencies per request.
- **dependency_overrides**: Swap providers in tests without changing routes.

## Code highlights

- `def get_db() -> Generator[dict[str, str], None, None]:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `return {"database": db["status"]}` — **return** — Returns the computed result to the caller. get_db yields connection dict and closes in finally; health reads injected db; tests override get_db.
- `@app.get("/health")` — **GET route** — Registers an HTTP GET handler on the FastAPI app or blueprint router. get_db yields connection dict and closes in finally; health reads injected db; tests override get_db.
- `yield db` — **yield** — Produces the next value lazily without building the whole sequence in memory. get_db yields connection dict and closes in finally; health reads injected db; tests override get_db.
- `Depends(` — **Depends** — FastAPI dependency injection — shared auth, DB sessions, and settings per request.

## Solution code

```python
from collections.abc import Generator
from fastapi import Depends, FastAPI

app = FastAPI()

def get_db() -> Generator[dict[str, str], None, None]:
    db = {"status": "connected"}
    try:
        yield db
    finally:
        db["status"] = "closed"

@app.get("/health")
def health(db: dict[str, str] = Depends(get_db)):
    return {"database": db["status"]}
```

## Walkthrough

get_db yields connection dict and closes in finally; health reads injected db; tests override get_db.

## Common mistakes

- Not using yield for teardown
- Instantiating DB globally

## Stretch goals

- Inject service layer
- Use dependency-injector library
