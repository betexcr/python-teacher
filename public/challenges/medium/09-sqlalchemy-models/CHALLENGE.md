# SQLAlchemy Models

**Difficulty:** medium  
**Topics:** sqlalchemy, orm

## Learning goals

- Define declarative models
- Create tables and query

## Challenge

Define `Book` model with `id`, `title`, `author`. Provide `init_db(engine)` and `add_book(session, title, author) -> Book`.

## Requirements

1. Integer primary key
2. String title and author
3. Use session.add/commit

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/medium/09-sqlalchemy-models/`. Reference write-ups in this repo live under `challenges/medium/09-sqlalchemy-models/` (not loaded by the app).

```python
from sqlalchemy import String, create_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, Session

class Base(DeclarativeBase):
    pass

class Book(Base):
    __tablename__ = "books"
    # TODO

def init_db(url: str) -> None:
    ...

def add_book(session: Session, title: str, author: str) -> Book:
    ...
```

## Hints

1. Mapped[int] mapped_column(primary_key=True)
2. Base.metadata.create_all
3. session.commit()

## Acceptance criteria

- [ ] **Table created**
  Table created. Use an in-memory SQLite engine in tests to verify ORM queries without Postgres.

- [ ] **Book persisted**
  Book persisted. Use an in-memory SQLite engine in tests to verify ORM queries without Postgres.

- [ ] **Fields stored correctly**
  Fields stored correctly. Use an in-memory SQLite engine in tests to verify ORM queries without Postgres.

## Resources

- [SQLAlchemy 2.0 docs](https://docs.sqlalchemy.org/en/20/)
- [Python Tutorial](https://docs.python.org/3/tutorial/)
