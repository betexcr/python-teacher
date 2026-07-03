# Solution: API Pagination

## Approach

Validate params; compute offset; return window plus pagination metadata.

## Key concepts

- **offset pagination**: Simple page/page_size slicing for APIs.
- **metadata**: Clients need total count to render page controls.

## Code highlights

- `def paginate(items: list[T], page: int, page_size: int) -> dict[str, object]:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `raise ValueError("invalid pagination")` — **raise** — Fail fast with a clear error when input or state is invalid. Validate page and size caps; slice list; compute totals and has_next for clients.
- `return {` — **return** — Returns the computed result to the caller. Validate page and size caps; slice list; compute totals and has_next for clients.

## Solution code

```python
from math import ceil
from typing import TypeVar

T = TypeVar("T")

def paginate(items: list[T], page: int, page_size: int) -> dict[str, object]:
    if page < 1 or page_size < 1 or page_size > 100:
        raise ValueError("invalid pagination")
    total = len(items)
    total_pages = ceil(total / page_size) if total else 0
    start = (page - 1) * page_size
    end = start + page_size
    return {
        "items": items[start:end],
        "page": page,
        "page_size": page_size,
        "total": total,
        "total_pages": total_pages,
        "has_next": page < total_pages,
    }
```

## Walkthrough

Validate page and size caps; slice list; compute totals and has_next for clients.

## Common mistakes

- 0-based page without documenting
- No max page_size guard

## Stretch goals

- Cursor-based pagination
- FastAPI query params integration
