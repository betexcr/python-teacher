# User Profile Dataclass

**Difficulty:** easy  
**Topics:** dataclasses

## Learning goals

- Define a dataclass with defaults
- Serialize to dict

## Challenge

Create frozen `User` dataclass (`id`, `email`, `active: bool = True`) plus `to_dict` using `dataclasses.asdict`.

## Requirements

1. frozen=True
2. email must contain @ (validate in __post_init__)
3. to_dict returns plain dict

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/easy/13-dataclass/`. Reference write-ups in this repo live under `challenges/easy/13-dataclass/` (not loaded by the app).

```python
from dataclasses import dataclass, asdict

@dataclass
class User:
    # TODO
    ...
```

## Hints

1. @dataclass(frozen=True)
2. __post_init__ validation
3. asdict(self)

## Acceptance criteria

- [ ] **Frozen instance**
  Frozen instance: frozen=True. Write a small script or pytest test that demonstrates this behavior matches User Profile Dataclass.

- [ ] **Invalid email fails**
  Invalid email fails. Write a small script or pytest test that demonstrates this behavior matches User Profile Dataclass.

- [ ] **to_dict works**
  to_dict works: to_dict returns plain dict. Write a small script or pytest test that demonstrates this behavior matches User Profile Dataclass.

## Resources

- [dataclasses – Python docs](https://docs.python.org/3/library/dataclasses.html)
- [Python Tutorial](https://docs.python.org/3/tutorial/)
