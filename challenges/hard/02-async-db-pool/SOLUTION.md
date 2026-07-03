# Solution: Async DB Pool

## Approach

Async session executes select; map ORM row to dict for API layer.

## Key concepts

- **async engine**: Non-blocking database IO under asyncio.
- **scalar_one_or_none**: Fetch single row or None cleanly.

## Code highlights

- `return async_sessionmaker(engine, expire_on_commit=False)` — **return** — Returns the computed result to the caller. Async session runs select filter by id; scalar_one_or_none; convert ORM to plain dict.
- `async def get_user(session: AsyncSession, user_id: int)` — **async get_user** — `get_user` is a coroutine — call it with await or asyncio.run. Async session runs select filter by id; scalar_one_or_none; convert ORM to plain dict.
- `return {"id": user.id, "name": user.name}` — **return** — Returns the computed result to the caller. Async session runs select filter by id; scalar_one_or_none; convert ORM to plain dict.
- `DeclarativeBase` — **ORM base** — Base class for SQLAlchemy mapped models. Async session runs select filter by id; scalar_one_or_none; convert ORM to plain dict.
- `return None` — **return** — Returns the computed result to the caller. Async session runs select filter by id; scalar_one_or_none; convert ORM to plain dict.

## Solution code

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

def make_session_factory(url: str):
    engine = create_async_engine(url)
    return async_sessionmaker(engine, expire_on_commit=False)

async def get_user(session: AsyncSession, user_id: int) -> dict | None:
    result = await session.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if user is None:
        return None
    return {"id": user.id, "name": user.name}
```

## Walkthrough

Async session runs select filter by id; scalar_one_or_none; convert ORM to plain dict.

## Common mistakes

- Using sync session in async route
- Forgetting expire_on_commit settings

## Stretch goals

- Connection pool tuning
- Unit tests with sqlite+aiosqlite
