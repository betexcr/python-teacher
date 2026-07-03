# Solution: Test Coverage Setup

## Approach

Parametrize edge cases; run pytest-cov; enforce fail_under in pyproject.

## Key concepts

- **coverage.py**: Measures which lines tests execute.
- **fail_under**: CI gate preventing untested code merges.

## Code highlights

- `def clamp(value: float, low: float, high: float) -> float:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `def test_clamp_invalid_range() -> None:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `return max(low, min(value, high))` — **return** — Returns the computed result to the caller. Tests hit middle, both clamps, and error branch; pytest-cov verifies full line coverage.
- `def test_clamp_middle() -> None:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `with pytest.raises(ValueError):` — **with** — Context manager — setup on enter, cleanup on exit even if an exception occurs. Tests hit middle, both clamps, and error branch; pytest-cov verifies full line coverage.
- `def test_clamp_edges() -> None:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `raise ValueError("low > high")` — **raise** — Fail fast with a clear error when input or state is invalid. Tests hit middle, both clamps, and error branch; pytest-cov verifies full line coverage.

## Solution code

```python
# math_utils.py
def clamp(value: float, low: float, high: float) -> float:
    if low > high:
        raise ValueError("low > high")
    return max(low, min(value, high))

# test_math_utils.py
import pytest
from math_utils import clamp

def test_clamp_middle() -> None:
    assert clamp(5, 0, 10) == 5

def test_clamp_edges() -> None:
    assert clamp(-1, 0, 10) == 0
    assert clamp(99, 0, 10) == 10

def test_clamp_invalid_range() -> None:
    with pytest.raises(ValueError):
        clamp(1, 10, 0)
```

## Walkthrough

Tests hit middle, both clamps, and error branch; pytest-cov verifies full line coverage.

## Common mistakes

- Testing only happy path
- Ignoring branch coverage

## Stretch goals

- Branch coverage threshold
- Coverage badge in CI
