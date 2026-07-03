# Solution: Pytest Temperature

## Approach

Pure function plus parametrized tests documenting examples.

## Key concepts

- **parametrize**: One test function, many input/output tuples.
- **pytest.approx**: Compare floats with tolerance.

## Code highlights

- `def test_celsius_to_fahrenheit(celsius: float, expected: float) -> None:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `def celsius_to_fahrenheit(c: float) -> float:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `@pytest.mark.parametrize` — **parametrize** — Runs the same test function with multiple input tuples. Tests use parametrize to lock common conversions including -40 crossover.
- `return c * 9 / 5 + 32` — **return** — Returns the computed result to the caller. Implement the formula once. Tests use parametrize to lock common conversions including -40 crossover.

## Solution code

```python
# temperature.py
def celsius_to_fahrenheit(c: float) -> float:
    return c * 9 / 5 + 32

# test_temperature.py
import pytest
from temperature import celsius_to_fahrenheit

@pytest.mark.parametrize(
    "celsius, expected",
    [(0, 32), (100, 212), (-40, -40)],
)
def test_celsius_to_fahrenheit(celsius: float, expected: float) -> None:
    assert celsius_to_fahrenheit(celsius) == pytest.approx(expected)
```

## Walkthrough

Implement the formula once. Tests use parametrize to lock common conversions including -40 crossover.

## Common mistakes

- Exact float equality without approx
- Only one assert case

## Stretch goals

- Add hypothesis property test
- Round trip f_to_c
