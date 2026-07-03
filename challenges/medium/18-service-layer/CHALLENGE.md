# Service Layer

**Difficulty:** medium  
**Topics:** service-layer, architecture

## Learning goals

- Orchestrate domain logic
- Keep routes thin

## Challenge

Implement `UserService` using `UserRepository` with `register(email: str) -> User` assigning next id and validating email.

## Requirements

1. Email must contain @
2. Duplicate email raises ValueError
3. Service uses repo only

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/medium/18-service-layer/`. Reference write-ups in this repo live under `challenges/medium/18-service-layer/` (not loaded by the app).

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
        # TODO
        raise NotImplementedError
```

## Hints

1. if "@" not in email
2. scan repo for duplicate
3. user = User(self._next_id, email); self._next_id += 1

## Acceptance criteria

- [ ] **Valid registration works**
  Valid registration works. Write a small script or pytest test that demonstrates this behavior matches Service Layer.

- [ ] **Bad email fails**
  Bad email fails. Write a small script or pytest test that demonstrates this behavior matches Service Layer.

- [ ] **Duplicate rejected**
  Duplicate rejected: Duplicate email raises ValueError. Write a small script or pytest test that demonstrates this behavior matches Service Layer.

## Resources

- [Python Tutorial](https://docs.python.org/3/tutorial/)
- [Python standard library](https://docs.python.org/3/library/)
