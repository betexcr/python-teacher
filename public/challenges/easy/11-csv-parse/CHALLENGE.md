# CSV Sales Report

**Difficulty:** easy  
**Topics:** csv, data

## Learning goals

- Parse CSV with csv module
- Compute simple analytics

## Challenge

Read CSV with headers `product,quantity,price` and return total revenue as float.

## Requirements

1. Use csv.DictReader
2. Skip blank rows
3. Return sum of quantity * price

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/easy/11-csv-parse/`. Reference write-ups in this repo live under `challenges/easy/11-csv-parse/` (not loaded by the app).

```python
import csv
from pathlib import Path

def total_revenue(path: Path) -> float:
    # TODO
    raise NotImplementedError
```

## Hints

1. open(path, newline="")
2. int(row["quantity"])
3. accumulate float total

## Acceptance criteria

- [ ] **Revenue correct**
  Revenue correct. Write a small script or pytest test that demonstrates this behavior matches CSV Sales Report.

- [ ] **Blank rows ignored**
  Blank rows ignored: Skip blank rows. Write a small script or pytest test that demonstrates this behavior matches CSV Sales Report.

- [ ] **Headers required**
  Headers required. Write a small script or pytest test that demonstrates this behavior matches CSV Sales Report.

## Resources

- [csv – reference](https://docs.python.org/3/library/csv.html)
- [Python Tutorial](https://docs.python.org/3/tutorial/)
