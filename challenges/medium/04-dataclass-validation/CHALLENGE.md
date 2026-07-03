# Validated Dataclass

**Difficulty:** medium  
**Topics:** dataclasses, validation

## Learning goals

- Use __post_init__ for validation
- Raise clear errors

## Challenge

Create `@dataclass User` with `email: str` and `age: int`. Validate email contains `@` and age is 0-150 in `__post_init__`.

## Requirements

1. Invalid email raises ValueError
2. Age out of range raises
3. Frozen optional

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/medium/04-dataclass-validation/`. Reference write-ups in this repo live under `challenges/medium/04-dataclass-validation/` (not loaded by the app).

```python
from dataclasses import dataclass

@dataclass
class User:
    email: str
    age: int

    def __post_init__(self) -> None:
        # TODO
        ...
```

## Hints

1. if "@" not in email
2. if not 0 <= age <= 150
3. raise ValueError with message

## Acceptance criteria

- [ ] **Valid user constructs**
  Valid user constructs: Invalid email raises ValueError. Write a small script or pytest test that demonstrates this behavior matches Validated Dataclass.

- [ ] **Bad email fails**
  Bad email fails. Write a small script or pytest test that demonstrates this behavior matches Validated Dataclass.

- [ ] **Bad age fails**
  Bad age fails. Write a small script or pytest test that demonstrates this behavior matches Validated Dataclass.

## Resources

- [dataclasses – Python docs](https://docs.python.org/3/library/dataclasses.html)
- [validation – reference](https://docs.python.org/3/library/exceptions.html)
