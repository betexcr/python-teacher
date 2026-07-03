# Repository Pattern

**Difficulty:** medium  
**Topics:** repository, architecture

## Learning goals

- Hide persistence behind interface
- Enable testing with fakes

## Challenge

Define `UserRepository` protocol with `get(user_id: int) -> User | None` and in-memory `InMemoryUserRepository`.

## Requirements

1. Protocol or ABC
2. CRUD get/save
3. No SQL in service layer

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/medium/17-repository-pattern/`. Reference write-ups in this repo live under `challenges/medium/17-repository-pattern/` (not loaded by the app).

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
    # TODO
    ...
```

## Hints

1. self._store: dict[int, User] = {}
2. def get return store.get
3. def save store[id]=user

## Acceptance criteria

- [ ] **Save then get works**
  Save then get works: CRUD get/save. Write a small script or pytest test that demonstrates this behavior matches Repository Pattern.

- [ ] **Missing id returns None**
  Missing id returns None. Write a small script or pytest test that demonstrates this behavior matches Repository Pattern.

- [ ] **Protocol typed**
  Protocol typed: Protocol or ABC. Write a small script or pytest test that demonstrates this behavior matches Repository Pattern.

## Resources

- [Python Tutorial](https://docs.python.org/3/tutorial/)
- [Python standard library](https://docs.python.org/3/library/)
