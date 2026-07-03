# Repository Pattern

## What they are

The repository pattern hides data access behind a collection-like interface. Application code calls `get`, `add`, `list`, or `delete` on a repository — not raw SQL or ORM queries scattered through services. Swap SQLite for Postgres by changing the repository implementation, not every caller.

## When to use

- Domain services that should not know about SQLAlchemy, Django ORM, or MongoDB
- Unit tests that use an in-memory fake instead of a real database
- Consistent query patterns and pagination across the app
- Clear boundary between business logic and persistence

## Interface and implementation

```python
from dataclasses import dataclass
from typing import Protocol

@dataclass
class User:
    id: str
    email: str

class UserRepository(Protocol):
    def get(self, user_id: str) -> User | None: ...
    def save(self, user: User) -> None: ...
    def list_active(self) -> list[User]: ...

class SqlUserRepository:
    def __init__(self, session):
        self._session = session

    def get(self, user_id: str) -> User | None:
        row = self._session.execute(
            "SELECT id, email FROM users WHERE id = ?", (user_id,)
        ).fetchone()
        return User(*row) if row else None

    def save(self, user: User) -> None:
        self._session.execute(
            "INSERT OR REPLACE INTO users (id, email) VALUES (?, ?)",
            (user.id, user.email),
        )

    def list_active(self) -> list[User]:
        rows = self._session.execute(
            "SELECT id, email FROM users WHERE active = 1"
        ).fetchall()
        return [User(*r) for r in rows]
```

The protocol documents the contract; the SQL class is one adapter.

## In-memory fake for tests

```python
class InMemoryUserRepository:
    def __init__(self):
        self._store: dict[str, User] = {}

    def get(self, user_id: str) -> User | None:
        return self._store.get(user_id)

    def save(self, user: User) -> None:
        self._store[user.id] = user

    def list_active(self) -> list[User]:
        return list(self._store.values())
```

Tests run fast without database setup. The same service code works with either repository.

## Tradeoffs

| Aspect | Details |
|--------|---------|
| Pros | Decouples domain from storage, easy to mock, single place for queries |
| Cons | Extra abstraction layer; thin CRUD apps may not need it |
| Interview angle | Explain repository vs DAO vs active record; show Protocol-based interface |
