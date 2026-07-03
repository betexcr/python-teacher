import type { FlashcardDeck } from './types';

export const databasesDeck: FlashcardDeck = {
  "id": "databases",
  "slug": "databases",
  "title": "Databases",
  "cards": [
    {
      "question": "SQLAlchemy Core vs ORM?",
      "explanation": "Core: table-centric SQL expression language. ORM: class-centric models mapped to tables. 2.0 style unified select()/session.execute.\n\n```python\nfrom sqlalchemy import select\n\nstmt = select(User).where(User.active.is_(True))\n```"
    },
    {
      "question": "Session lifecycle?",
      "explanation": "Open session per request/unit of work. commit on success, rollback on error, close always. Avoid long-lived sessions.\n\n```python\nwith Session(engine) as session:\n    session.add(user)\n    session.commit()\n```"
    },
    {
      "question": "N+1 query problem?",
      "explanation": "Loading related objects in a loop triggers extra queries. Fix with joinedload/selectinload eager loading or explicit joins.\n\n```python\nselect(User).options(selectinload(User.orders))\n```"
    },
    {
      "question": "Alembic migrations?",
      "explanation": "Version schema changes: alembic revision --autogenerate, upgrade head. Review autogen scripts— not always perfect."
    },
    {
      "question": "Connection pooling?",
      "explanation": "Reuse DB connections—SQLAlchemy QueuePool. Size pool for concurrency; pre_ping detects stale connections."
    },
    {
      "question": "Transactions and isolation?",
      "explanation": "ACID transactions group work atomically. Understand READ COMMITTED vs SERIALIZABLE for anomalies (dirty read, phantom)."
    },
    {
      "question": "Raw SQL when?",
      "explanation": "Complex reports, bulk ops, DB-specific features. sqlalchemy.text() with bound params—never f-string SQL (injection).\n\n```python\nsession.execute(text(\"SELECT * FROM users WHERE id = :id\"), {\"id\": user_id})\n```"
    },
    {
      "question": "asyncpg / async SQLAlchemy?",
      "explanation": "AsyncSession with async engine for FastAPI. await session.execute(stmt); avoid mixing sync ORM in async routes without to_thread."
    },
    {
      "question": "Redis use cases?",
      "explanation": "Cache, rate limiting, pub/sub, session store, Celery broker. Set TTL; define eviction policy for memory limits."
    },
    {
      "question": "MongoDB vs Postgres?",
      "explanation": "Postgres: relational integrity, joins, JSONB when needed. Mongo: flexible schema, document model—trade consistency and query patterns."
    },
    {
      "question": "Indexes?",
      "explanation": "Speed reads, slow writes. Index columns in WHERE/JOIN/ORDER BY. EXPLAIN ANALYZE validates plans. Avoid over-indexing."
    },
    {
      "question": "UUID primary keys?",
      "explanation": "Globally unique, opaque—good for distributed systems. Slightly larger indexes than bigint; consider uuid7 for time-ordering."
    },
    {
      "question": "Soft deletes?",
      "explanation": "deleted_at column instead of DELETE—preserve history. Filter active rows in queries or use SQLAlchemy session events."
    },
    {
      "question": "Database testing?",
      "explanation": "Separate test DB, transactions rolled back per test, or pytest-postgresql/docker fixtures. Never run tests against prod."
    },
    {
      "question": "ORM anti-patterns?",
      "explanation": "God models, implicit lazy loads in APIs, missing migrations, storing large blobs in rows without consideration."
    }
  ]
};
