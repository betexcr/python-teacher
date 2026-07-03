# Unit Converter

**Difficulty:** easy  
**Topics:** functions, mapping

## Learning goals

- Build a small conversion API
- Use dict dispatch

## Challenge

Implement `convert(value: float, from_unit: str, to_unit: str) -> float` for length units `m`, `cm`, `km` via meters as base.

## Requirements

1. Support m, cm, km
2. Unknown unit raises ValueError
3. Round not required; return float

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/easy/17-unit-converter/`. Reference write-ups in this repo live under `challenges/easy/17-unit-converter/` (not loaded by the app).

```python
TO_METERS = {"m": 1.0, "cm": 0.01, "km": 1000.0}

def convert(value: float, from_unit: str, to_unit: str) -> float:
    # TODO
    raise NotImplementedError
```

## Hints

1. meters = value * TO_METERS[from]
2. return meters / TO_METERS[to]
3. normalize keys

## Acceptance criteria

- [ ] **km to m works**
  km to m works: Support m, cm, km. Write a small script or pytest test that demonstrates this behavior matches Unit Converter.

- [ ] **cm to km works**
  cm to km works: Support m, cm, km. Write a small script or pytest test that demonstrates this behavior matches Unit Converter.

- [ ] **Bad unit raises**
  Bad unit raises. Write a small script or pytest test that demonstrates this behavior matches Unit Converter.

## Resources

- [functions – reference](https://docs.python.org/3/tutorial/controlflow.html#defining-functions)
- [mapping – reference](https://docs.python.org/3/library/stdtypes.html#mapping-types-dict)
