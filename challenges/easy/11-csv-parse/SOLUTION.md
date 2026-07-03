# Solution: CSV Sales Report

## Approach

Stream rows with DictReader and sum extended price.

## Key concepts

- **DictReader**: Rows as dicts keyed by header names.
- **newline=""**: Required on Windows for csv module.

## Code highlights

- `with path.open(newline="", encoding="utf-8") as fh:` — **with** — Context manager — setup on enter, cleanup on exit even if an exception occurs. Open with newline="", iterate DictReader rows, skip empty rows, sum qty*price.
- `def total_revenue(path: Path) -> float:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `return total` — **return** — Returns the computed result to the caller. Open with newline="", iterate DictReader rows, skip empty rows, sum qty*price.

## Solution code

```python
import csv
from pathlib import Path

def total_revenue(path: Path) -> float:
    total = 0.0
    with path.open(newline="", encoding="utf-8") as fh:
        for row in csv.DictReader(fh):
            if not any(row.values()):
                continue
            qty = int(row["quantity"])
            price = float(row["price"])
            total += qty * price
    return total
```

## Walkthrough

Open with newline="", iterate DictReader rows, skip empty rows, sum qty*price.

## Common mistakes

- Splitting lines manually
- Forgetting newline="" on Windows

## Stretch goals

- Group revenue by product
- Validate negative qty
