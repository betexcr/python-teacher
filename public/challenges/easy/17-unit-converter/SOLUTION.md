# Solution: Unit Converter

## Approach

Convert to base meters, then divide into target unit.

## Key concepts

- **canonical unit**: Convert through a single base to support N units.
- **dispatch table**: Dict mapping replaces long if chains.

## Code highlights

- `def convert(value: float, from_unit: str, to_unit: str) -> float:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `raise ValueError("unknown unit") from exc` — **raise** — Fail fast with a clear error when input or state is invalid. Multiply into meters using from_unit factor, divide by to_unit factor, KeyError becomes ValueError.
- `return meters / TO_METERS[to_unit]` — **return** — Returns the computed result to the caller. Multiply into meters using from_unit factor, divide by to_unit factor, KeyError becomes ValueError.

## Solution code

```python
TO_METERS = {"m": 1.0, "cm": 0.01, "km": 1000.0}

def convert(value: float, from_unit: str, to_unit: str) -> float:
    try:
        meters = value * TO_METERS[from_unit]
        return meters / TO_METERS[to_unit]
    except KeyError as exc:
        raise ValueError("unknown unit") from exc
```

## Walkthrough

Multiply into meters using from_unit factor, divide by to_unit factor, KeyError becomes ValueError.

## Common mistakes

- Hard-coded formulas per pair
- Integer division

## Stretch goals

- Add temperature units
- Register units dynamically
