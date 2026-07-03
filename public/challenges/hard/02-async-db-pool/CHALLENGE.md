# Async DB Pool

**Difficulty:** hard  
**Topics:** asyncpg, sqlalchemy

## Learning goals

- Create async engine pool
- Query with async session

## Challenge

Setup SQLAlchemy async engine and `async def get_user(session, user_id) -> dict | None` using `select` against User ORM model.

## Requirements

1. asyncpg driver URL
2. Context managed session
3. Proper await execute/scalar

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/hard/02-async-db-pool/`. Reference write-ups in this repo live under `challenges/hard/02-async-db-pool/` (not loaded by the app).

```python
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]

async def get_user(session: AsyncSession, user_id: int) -> dict | None:
    # TODO
    raise NotImplementedError
```

## Hints

1. engine = create_async_engine("postgresql+asyncpg://...")
2. result = await session.execute(select(User).where(...))
3. user = result.scalar_one_or_none()

## Acceptance criteria

- [ ] **Returns user dict**
  Returns user dict. Use an in-memory SQLite engine in tests to verify ORM queries without Postgres.

- [ ] **Missing id returns None**
  Missing id returns None. Use an in-memory SQLite engine in tests to verify ORM queries without Postgres.

- [ ] **Async session used**
  Async session used: asyncpg driver URL. Use an in-memory SQLite engine in tests to verify ORM queries without Postgres.

## Resources

- [asyncpg – reference](https://magicstack.github.io/asyncpg/current/)
- [SQLAlchemy 2.0 docs](https://docs.sqlalchemy.org/en/20/)
