# FastAPI CRUD

**Difficulty:** medium  
**Topics:** fastapi, crud

## Learning goals

- Build REST endpoints
- Use in-memory store

## Challenge

Implement FastAPI app with in-memory `items: dict[int, dict]` and GET/POST/DELETE for `/items` and `/items/{item_id}`.

## Requirements

1. POST creates with auto id
2. GET 404 when missing
3. DELETE removes item

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/medium/07-fastapi-crud/`. Reference write-ups in this repo live under `challenges/medium/07-fastapi-crud/` (not loaded by the app).

```python
from fastapi import FastAPI, HTTPException

app = FastAPI()
items: dict[int, dict[str, str]] = {}
_next_id = 1

# TODO: routes
```

## Hints

1. global _next_id increment
2. raise HTTPException(404)
3. return item on POST

## Acceptance criteria

- [ ] **POST returns id**
  POST returns id: POST creates with auto id. Start uvicorn, open /docs or curl the endpoint, and verify status code plus JSON shape.

- [ ] **GET by id works**
  GET by id works: GET 404 when missing. Start uvicorn, open /docs or curl the endpoint, and verify status code plus JSON shape.

- [ ] **DELETE 404 when gone**
  DELETE 404 when gone: DELETE removes item. Start uvicorn, open /docs or curl the endpoint, and verify status code plus JSON shape.

## Resources

- [FastAPI documentation](https://fastapi.tiangolo.com/)
- [Python Tutorial](https://docs.python.org/3/tutorial/)
