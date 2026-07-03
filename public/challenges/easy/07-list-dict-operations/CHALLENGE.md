# Inventory Totals

**Difficulty:** easy  
**Topics:** lists, dicts, comprehensions

## Learning goals

- Aggregate records with dicts
- Use comprehensions cleanly

## Challenge

Given `list[dict]` items with `sku`, `qty`, and `price`, return total quantity and total value. Merge duplicate SKUs by summing quantity.

## Requirements

1. Return {"total_qty": int, "total_value": float}
2. Duplicate SKUs combine quantities
3. Empty input returns zeros

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/easy/07-list-dict-operations/`. Reference write-ups in this repo live under `challenges/easy/07-list-dict-operations/` (not loaded by the app).

```python
from typing import Any

def summarize_inventory(items: list[dict[str, Any]]) -> dict[str, float | int]:
    # TODO
    raise NotImplementedError
```

## Hints

1. defaultdict or plain dict merge
2. total_value = sum(qty * price)
3. round if needed

## Acceptance criteria

- [ ] **Merges duplicate SKUs**
  Merges duplicate SKUs. Write a small script or pytest test that demonstrates this behavior matches Inventory Totals.

- [ ] **Totals correct**
  Totals correct. Write a small script or pytest test that demonstrates this behavior matches Inventory Totals.

- [ ] **Empty list ok**
  Empty list ok: Empty input returns zeros. Write a small script or pytest test that demonstrates this behavior matches Inventory Totals.

## Resources

- [lists – reference](https://docs.python.org/3/tutorial/datastructures.html)
- [dicts – reference](https://docs.python.org/3/tutorial/datastructures.html#dictionaries)
- [comprehensions – reference](https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions)
