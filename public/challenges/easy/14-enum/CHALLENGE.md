# Order Status Enum

**Difficulty:** easy  
**Topics:** enum

## Learning goals

- Model constants with Enum
- Convert safely from strings

## Challenge

Define `OrderStatus` enum and `parse_status(value: str) -> OrderStatus` that accepts case-insensitive names or raises ValueError.

## Requirements

1. Statuses: pending, shipped, delivered, cancelled
2. parse_status case-insensitive
3. Unknown values raise ValueError

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/easy/14-enum/`. Reference write-ups in this repo live under `challenges/easy/14-enum/` (not loaded by the app).

```python
from enum import Enum

class OrderStatus(Enum):
    # TODO
    ...

def parse_status(value: str) -> OrderStatus:
    ...
```

## Hints

1. class OrderStatus(str, Enum)
2. OrderStatus[value.upper()] with mapping
3. try/except KeyError

## Acceptance criteria

- [ ] **Enum members exist**
  Enum members exist. Write a small script or pytest test that demonstrates this behavior matches Order Status Enum.

- [ ] **Case insensitive parse**
  Case insensitive parse: parse_status case-insensitive. Write a small script or pytest test that demonstrates this behavior matches Order Status Enum.

- [ ] **Invalid raises**
  Invalid raises. Write a small script or pytest test that demonstrates this behavior matches Order Status Enum.

## Resources

- [enum – reference](https://docs.python.org/3/library/enum.html)
- [Python Tutorial](https://docs.python.org/3/tutorial/)
