# Pytest Temperature

**Difficulty:** easy  
**Topics:** pytest, testing

## Learning goals

- Write parametric tests
- Cover edge cases

## Challenge

Implement `celsius_to_fahrenheit(c: float) -> float` and accompanying tests in `test_temperature.py` using `@pytest.mark.parametrize`.

## Requirements

1. Formula: F = C * 9/5 + 32
2. At least 3 parametrize cases including 0 and 100
3. Tests live in test_temperature.py

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/easy/10-pytest-basics/`. Reference write-ups in this repo live under `challenges/easy/10-pytest-basics/` (not loaded by the app).

```python
# temperature.py
def celsius_to_fahrenheit(c: float) -> float:
    # TODO
    raise NotImplementedError

# test_temperature.py
import pytest
# TODO: import and parametrize
```

## Hints

1. pytest.approx for floats
2. @pytest.mark.parametrize("c,f", [(0,32), ...])
3. keep tests beside module

## Acceptance criteria

- [ ] **Conversion correct**
  Conversion correct. Run pytest in the project folder and confirm all parametrized cases pass.

- [ ] **Parametrize used**
  Parametrize used: At least 3 parametrize cases including 0 and 100. Run pytest in the project folder and confirm all parametrized cases pass.

- [ ] **Edge cases covered**
  Edge cases covered. Run pytest in the project folder and confirm all parametrized cases pass.

## Resources

- [pytest documentation](https://docs.pytest.org/en/stable/)
- [testing – reference](https://docs.python.org/3/library/unittest.html)
