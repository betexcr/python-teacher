# Solution: Validated Dataclass

## Approach

Centralize rules in __post_init__ immediately after field assignment.

## Key concepts

- **__post_init__**: Runs after dataclass-generated __init__ for extra checks.
- **invariants**: Rules that must always hold for a valid instance.

## Code highlights

- `raise ValueError("age out of range")` — **raise** — Fail fast with a clear error when input or state is invalid. Dataclass creates init; __post_init__ validates email and age before object is used.
- `raise ValueError("invalid email")` — **raise** — Fail fast with a clear error when input or state is invalid. Dataclass creates init; __post_init__ validates email and age before object is used.
- `def __post_init__(self) -> None:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `@dataclass
class User` — **dataclass User** — `User` is a dataclass — boilerplate __init__, __repr__, and comparisons are generated. Dataclass creates init; __post_init__ validates email and age before object is used.

## Solution code

```python
from dataclasses import dataclass

@dataclass
class User:
    email: str
    age: int

    def __post_init__(self) -> None:
        if "@" not in self.email:
            raise ValueError("invalid email")
        if not 0 <= self.age <= 150:
            raise ValueError("age out of range")
```

## Walkthrough

Dataclass creates init; __post_init__ validates email and age before object is used.

## Common mistakes

- Validating in every method instead of init
- Silent coercion of bad data

## Stretch goals

- Use pydantic model instead
- Add email normalization
