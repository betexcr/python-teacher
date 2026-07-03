# Solution: Inventory Totals

## Approach

Merge into sku -> qty map, then compute weighted value.

## Key concepts

- **Aggregation**: Combine repeated keys before computing totals.
- **Comprehension**: sum(...) over merged items stays readable.

## Code highlights

- `def summarize_inventory(items: list[dict[str, Any]]) -> dict[str, float | int]:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `return {"total_qty": total_qty, "total_value": total_value}` — **return** — Returns the computed result to the caller. Walk items, merge qty per sku, keep latest price per sku, then sum qty and extended price.

## Solution code

```python
from typing import Any

def summarize_inventory(items: list[dict[str, Any]]) -> dict[str, float | int]:
    merged: dict[str, dict[str, float | int]] = {}
    for item in items:
        sku = str(item["sku"])
        qty = int(item["qty"])
        price = float(item["price"])
        bucket = merged.setdefault(sku, {"qty": 0, "price": price})
        bucket["qty"] = int(bucket["qty"]) + qty
        bucket["price"] = price
    total_qty = sum(int(v["qty"]) for v in merged.values())
    total_value = sum(int(v["qty"]) * float(v["price"]) for v in merged.values())
    return {"total_qty": total_qty, "total_value": total_value}
```

## Walkthrough

Walk items, merge qty per sku, keep latest price per sku, then sum qty and extended price.

## Common mistakes

- Summing prices without qty
- Mutating input dicts in place

## Stretch goals

- Return per-sku breakdown
- Use Counter for qty only
