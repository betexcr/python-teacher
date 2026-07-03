# Solution: User Profile Dataclass

## Approach

Dataclass with post-init validation and asdict helper.

## Key concepts

- **frozen dataclass**: Instances are immutable after creation.
- **__post_init__**: Hook to validate fields after __init__.

## Code highlights

- `def to_dict(self) -> dict[str, object]:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `@dataclass(frozen=True)
class User` — **dataclass User** — `User` is a dataclass — boilerplate __init__, __repr__, and comparisons are generated. frozen dataclass stores fields; __post_init__ checks email; to_dict delegates to asdict.
- `raise ValueError("invalid email")` — **raise** — Fail fast with a clear error when input or state is invalid. frozen dataclass stores fields; __post_init__ checks email; to_dict delegates to asdict.
- `def __post_init__(self) -> None:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `return asdict(self)` — **return** — Returns the computed result to the caller. frozen dataclass stores fields; __post_init__ checks email; to_dict delegates to asdict.

## Solution code

```python
from dataclasses import asdict, dataclass

@dataclass(frozen=True)
class User:
    id: int
    email: str
    active: bool = True

    def __post_init__(self) -> None:
        if "@" not in self.email:
            raise ValueError("invalid email")

    def to_dict(self) -> dict[str, object]:
        return asdict(self)
```

## Walkthrough

frozen dataclass stores fields; __post_init__ checks email; to_dict delegates to asdict.

## Common mistakes

- Mutable default list on dataclass
- Skipping validation in post_init

## Stretch goals

- Add from_dict classmethod
- Use slots=True for memory
