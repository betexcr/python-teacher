# Solution: Order Status Enum

## Approach

str Enum for JSON friendliness; parse via normalized name lookup.

## Key concepts

- **str Enum**: Compares like strings while staying typed.
- **Exhaustive handling**: Invalid states fail loudly at boundary.

## Code highlights

- `raise ValueError(f"unknown status: {value}") from exc` — **raise** — Fail fast with a clear error when input or state is invalid. parse_status uppercases input and uses Enum name lookup with clear errors.
- `def parse_status(value: str) -> OrderStatus:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `class OrderStatus(str, Enum)` — **Enum OrderStatus** — Named constants instead of magic strings. str Enum defines allowed values.
- `return OrderStatus[key]` — **return** — Returns the computed result to the caller. str Enum defines allowed values. parse_status uppercases input and uses Enum name lookup with clear errors.

## Solution code

```python
from enum import Enum

class OrderStatus(str, Enum):
    PENDING = "pending"
    SHIPPED = "shipped"
    DELIVERED = "delivered"
    CANCELLED = "cancelled"

def parse_status(value: str) -> OrderStatus:
    key = value.strip().upper()
    try:
        return OrderStatus[key]
    except KeyError as exc:
        raise ValueError(f"unknown status: {value}") from exc
```

## Walkthrough

str Enum defines allowed values. parse_status uppercases input and uses Enum name lookup with clear errors.

## Common mistakes

- Stringly-typed status everywhere
- Using if/elif chain instead of Enum

## Stretch goals

- Add transitions validator
- Serialize to OpenAPI schema
