# Solution: Repository Pattern

## Approach

Protocol documents contract; in-memory dict implementation for tests.

## Key concepts

- **Repository**: Collection-like API abstracting storage technology.
- **Protocol**: Structural typing without inheritance.

## Code highlights

- `def get(self, user_id: int) -> User | None: ...` — **type hints** — Return and parameter types document the contract and enable static checking.
- `def get(self, user_id: int) -> User | None:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `def save(self, user: User) -> None: ...` — **type hints** — Return and parameter types document the contract and enable static checking.
- `def save(self, user: User) -> None:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `return self._store.get(user_id)` — **return** — Returns the computed result to the caller. User dataclass holds data; Protocol defines get/save; in-memory repo uses dict storage.
- `def __init__(self) -> None:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `@dataclass
class User` — **dataclass User** — `User` is a dataclass — boilerplate __init__, __repr__, and comparisons are generated. User dataclass holds data; Protocol defines get/save; in-memory repo uses dict storage.
- `Repository` — **repository** — Collection-like API abstracting storage technology.

## Solution code

```python
from dataclasses import dataclass
from typing import Protocol

@dataclass
class User:
    id: int
    email: str

class UserRepository(Protocol):
    def get(self, user_id: int) -> User | None: ...
    def save(self, user: User) -> None: ...

class InMemoryUserRepository:
    def __init__(self) -> None:
        self._store: dict[int, User] = {}

    def get(self, user_id: int) -> User | None:
        return self._store.get(user_id)

    def save(self, user: User) -> None:
        self._store[user.id] = user
```

## Walkthrough

User dataclass holds data; Protocol defines get/save; in-memory repo uses dict storage.

## Common mistakes

- Leaking dict into services
- Repository returning ORM models everywhere

## Stretch goals

- SQLAlchemy-backed repo
- Unit of work pattern
