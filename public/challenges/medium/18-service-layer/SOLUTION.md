# Solution: Service Layer

## Approach

Service validates, assigns id, persists via repository abstraction.

## Key concepts

- **service layer**: Application logic coordinating domain and persistence.
- **thin controller**: HTTP layer delegates to services.

## Code highlights

- `def register(self, email: str) -> User:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `for uid in range(1, self._next_id):` — **for loop** — Iterates over a sequence. Service validates email, checks duplicates via repo, increments id, saves and conservative in the user.
- `raise ValueError("duplicate email")` — **raise** — Fail fast with a clear error when input or state is invalid. Service validates email, checks duplicates via repo, increments id, saves and conservative in the user.
- `def __init__(self, repo) -> None:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `raise ValueError("invalid email")` — **raise** — Fail fast with a clear error when input or state is invalid. Service validates email, checks duplicates via repo, increments id, saves and conservative in the user.
- `@dataclass
class User` — **dataclass User** — `User` is a dataclass — boilerplate __init__, __repr__, and comparisons are generated. Service validates email, checks duplicates via repo, increments id, saves and conservative in the user.
- `return user` — **return** — Returns the computed result to the caller. Service validates email, checks duplicates via repo, increments id, saves and conservative in the user.

## Solution code

```python
from dataclasses import dataclass

@dataclass
class User:
    id: int
    email: str

class UserService:
    def __init__(self, repo) -> None:
        self._repo = repo
        self._next_id = 1

    def register(self, email: str) -> User:
        if "@" not in email:
            raise ValueError("invalid email")
        for uid in range(1, self._next_id):
            existing = self._repo.get(uid)
            if existing and existing.email == email:
                raise ValueError("duplicate email")
        user = User(id=self._next_id, email=email)
        self._next_id += 1
        self._repo.save(user)
        return user
```

## Walkthrough

Service validates email, checks duplicates via repo, increments id, saves and conservative in the user.

## Common mistakes

- SQL in service
- Skipping duplicate check

## Stretch goals

- Hash passwords in service
- Domain events on register
