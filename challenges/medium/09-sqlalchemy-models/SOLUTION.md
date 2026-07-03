# Solution: SQLAlchemy Models

## Approach

Declarative mapped columns; create_all on init; session add/commit pattern.

## Key concepts

- **DeclarativeBase**: Modern SQLAlchemy 2 style ORM base.
- **Session**: Unit of work tracking inserts and queries.

## Code highlights

- `def add_book(session: Session, title: str, author: str) -> Book:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `def init_db(url: str) -> None:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `DeclarativeBase` — **ORM base** — Base class for SQLAlchemy mapped models. Book maps columns; init_db create_all; add_book builds instance, commits, refreshes for id.
- `return book` — **return** — Returns the computed result to the caller. Book maps columns; init_db create_all; add_book builds instance, commits, refreshes for id.

## Solution code

```python
from sqlalchemy import String, create_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, Session

class Base(DeclarativeBase):
    pass

class Book(Base):
    __tablename__ = "books"
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(200))
    author: Mapped[str] = mapped_column(String(200))

def init_db(url: str) -> None:
    engine = create_engine(url)
    Base.metadata.create_all(engine)

def add_book(session: Session, title: str, author: str) -> Book:
    book = Book(title=title, author=author)
    session.add(book)
    session.commit()
    session.refresh(book)
    return book
```

## Walkthrough

Book maps columns; init_db create_all; add_book builds instance, commits, refreshes for id.

## Common mistakes

- Forgetting commit
- Using deprecated declarative_base import style inconsistently

## Stretch goals

- Alembic migration
- Relationship to Author table
