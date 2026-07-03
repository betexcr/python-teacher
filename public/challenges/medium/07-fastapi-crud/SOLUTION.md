# Solution: FastAPI CRUD

## Approach

Mutable module store; POST assigns id; GET/DELETE validate existence.

## Key concepts

- **HTTPException**: FastAPI converts to proper status codes.
- **in-memory store**: Fine for learning; swap for DB later.

## Code highlights

- `def create_item(body: dict[str, str]) -> dict[str, object]:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `def delete_item(item_id: int) -> dict[str, str]:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `def get_item(item_id: int) -> dict[str, str]:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `@app.delete("/items/{item_id}")` — **DELETE route** — Registers an HTTP DELETE handler on the FastAPI app or blueprint router. POST assigns incremental id; GET/DELETE check dict membership and raise 404 otherwise.
- `return {"id": item_id, **body}` — **return** — Returns the computed result to the caller. POST assigns incremental id; GET/DELETE check dict membership and raise 404 otherwise.
- `@app.get("/items/{item_id}")` — **GET route** — Registers an HTTP GET handler on the FastAPI app or blueprint router. POST assigns incremental id; GET/DELETE check dict membership and raise 404 otherwise.
- `return items.pop(item_id)` — **return** — Returns the computed result to the caller. POST assigns incremental id; GET/DELETE check dict membership and raise 404 otherwise.
- `return items[item_id]` — **return** — Returns the computed result to the caller. POST assigns incremental id; GET/DELETE check dict membership and raise 404 otherwise.
- `@app.post("/items")` — **POST route** — Registers an HTTP POST handler on the FastAPI app or blueprint router. POST assigns incremental id; GET/DELETE check dict membership and raise 404 otherwise.

## Solution code

```python
from fastapi import FastAPI, HTTPException

app = FastAPI()
items: dict[int, dict[str, str]] = {}
_next_id = 1

@app.post("/items")
def create_item(body: dict[str, str]) -> dict[str, object]:
    global _next_id
    item_id = _next_id
    _next_id += 1
    items[item_id] = body
    return {"id": item_id, **body}

@app.get("/items/{item_id}")
def get_item(item_id: int) -> dict[str, str]:
    if item_id not in items:
        raise HTTPException(status_code=404, detail="not found")
    return items[item_id]

@app.delete("/items/{item_id}")
def delete_item(item_id: int) -> dict[str, str]:
    if item_id not in items:
        raise HTTPException(status_code=404, detail="not found")
    return items.pop(item_id)
```

## Walkthrough

POST assigns incremental id; GET/DELETE check dict membership and raise 404 otherwise.

## Common mistakes

- Reusing ids after delete
- No 404 on missing keys

## Stretch goals

- Pydantic Item model
- Persist to SQLite
