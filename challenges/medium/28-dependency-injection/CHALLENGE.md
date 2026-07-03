# Dependency Injection

**Difficulty:** medium  
**Topics:** dependency-injection, fastapi

## Learning goals

- Wire dependencies with Depends
- Override in tests

## Challenge

FastAPI app with `get_db()` yielding connection dict and route `GET /health` using `Depends(get_db)` returning db status.

## Requirements

1. yield cleanup in get_db
2. Test override get_db
3. Type annotated Depends

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/medium/28-dependency-injection/`. Reference write-ups in this repo live under `challenges/medium/28-dependency-injection/` (not loaded by the app).

```python
from collections.abc import Generator
from fastapi import Depends, FastAPI

app = FastAPI()

def get_db() -> Generator[dict[str, str], None, None]:
    # TODO yield and cleanup
    ...

@app.get("/health")
def health(db: dict = Depends(get_db)):
    ...
```

## Hints

1. db = {"status": "connected"}; yield db
2. return {"database": db["status"]}
3. app.dependency_overrides[get_db] in tests

## Acceptance criteria

- [ ] **Health returns connected**
  Health returns connected. Start uvicorn, open /docs or curl the endpoint, and verify status code plus JSON shape.

- [ ] **Dependency injected**
  Dependency injected. Start uvicorn, open /docs or curl the endpoint, and verify status code plus JSON shape.

- [ ] **Override works in test**
  Override works in test: Test override get_db. Start uvicorn, open /docs or curl the endpoint, and verify status code plus JSON shape.

## Resources

- [dependency-injection – reference](https://fastapi.tiangolo.com/tutorial/dependencies/)
- [FastAPI documentation](https://fastapi.tiangolo.com/)
