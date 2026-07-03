# API Pagination

**Difficulty:** medium  
**Topics:** pagination, fastapi

## Learning goals

- Paginate list endpoints
- Return metadata

## Challenge

Implement `paginate(items: list[T], page: int, page_size: int) -> dict` returning items slice plus total/pages/has_next.

## Requirements

1. page starts at 1
2. page_size max 100
3. Empty page valid when in range

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/medium/20-pagination/`. Reference write-ups in this repo live under `challenges/medium/20-pagination/` (not loaded by the app).

```python
from math import ceil
from typing import TypeVar

T = TypeVar("T")

def paginate(items: list[T], page: int, page_size: int) -> dict[str, object]:
    # TODO
    raise NotImplementedError
```

## Hints

1. if page < 1 or page_size < 1: raise ValueError
2. start = (page-1)*page_size
3. total_pages = ceil(total/page_size)

## Acceptance criteria

- [ ] **Correct slice returned**
  Correct slice returned. Start uvicorn, open /docs or curl the endpoint, and verify status code plus JSON shape.

- [ ] **Metadata accurate**
  Metadata accurate. Start uvicorn, open /docs or curl the endpoint, and verify status code plus JSON shape.

- [ ] **Invalid page_size rejected**
  Invalid page_size rejected. Start uvicorn, open /docs or curl the endpoint, and verify status code plus JSON shape.

## Resources

- [pagination – reference](https://fastapi.tiangolo.com/tutorial/query-params/)
- [FastAPI documentation](https://fastapi.tiangolo.com/)
