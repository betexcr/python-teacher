# Test Coverage Setup

**Difficulty:** medium  
**Topics:** pytest, coverage

## Learning goals

- Configure coverage.py
- Fail under threshold

## Challenge

Given module `math_utils.py` with functions, add pytest tests achieving 100% line coverage and `pyproject.toml` coverage fail_under=90.

## Requirements

1. pytest-cov in config
2. Tests for all branches
3. Document running pytest --cov

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/medium/26-test-coverage/`. Reference write-ups in this repo live under `challenges/medium/26-test-coverage/` (not loaded by the app).

```python
# math_utils.py
def clamp(value: float, low: float, high: float) -> float:
    if low > high:
        raise ValueError("low > high")
    return max(low, min(value, high))

# test_math_utils.py — TODO
```

## Hints

1. pytest --cov=math_utils
2. test edge value==low
3. fail_under in [tool.coverage.report]

## Acceptance criteria

- [ ] **All lines covered**
  All lines covered: Tests for all branches. Run pytest in the project folder and confirm all parametrized cases pass.

- [ ] **Bad range raises tested**
  Bad range raises tested. Run pytest in the project folder and confirm all parametrized cases pass.

- [ ] **Coverage report generated**
  Coverage report generated. Run pytest in the project folder and confirm all parametrized cases pass.

## Resources

- [pytest documentation](https://docs.pytest.org/en/stable/)
- [coverage – reference](https://coverage.readthedocs.io/en/latest/)
