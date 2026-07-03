# Caching with Redis

## Requirements

Reduce database load and latency with a layered cache strategy:

- **Cache-aside:** App reads Redis first; on miss, load DB and populate cache
- **TTL policy:** Per entity type (user profile 5m, product catalog 1h)
- **Invalidation:** On write, delete or update cache keys—avoid stale reads
- **Stampede protection:** Single flight lock when hot key expires
- **Sessions & rate limits:** Redis also backs ephemeral state

## API Design

Caching is transparent to external API consumers—internal pattern:

```text
GET /products/{id}
  └── cache_get("product:{id}")
        hit  → return
        miss → SELECT from Postgres → cache_set(TTL) → return

PATCH /products/{id}
  └── UPDATE Postgres → cache_delete("product:{id}")
```

Optional admin endpoint:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/admin/cache/invalidate` | POST | `{ "pattern": "product:*" }` emergency purge |

## Data Model

Redis key conventions:

```text
product:{uuid}           → JSON blob
products:list:{page}     → paginated list JSON
user:{uuid}:profile      → hash fields
lock:product:{uuid}      → SET NX EX 10 (stampede lock)
```

Postgres remains source of truth. Never write-only to cache without DB persistence (except pure ephemeral data).

## Scaling

- **Redis Cluster** for memory > single node; use hash tags `{tenant}:product:{id}` for locality
- **Separate Redis instances** for cache vs sessions vs Celery broker
- **Local in-process cache** (LRU, 1s TTL) in front of Redis for hottest keys
- **Compression** for large JSON values (`zlib` or MessagePack)
- Monitor **hit ratio**—target > 90% for read-heavy endpoints

## Python Stack

| Layer | Choice |
|-------|--------|
| Client | `redis-py` async |
| Serialization | `orjson` |
| Decorator | Custom or `cashews` library |
| Framework | FastAPI |

```python
import orjson
from redis.asyncio import Redis
from contextlib import asynccontextmanager

redis = Redis.from_url("redis://localhost:6379/0")

def cache_key(prefix: str, id: str) -> str:
    return f"{prefix}:{id}"

async def get_cached_product(product_id: str) -> dict | None:
    raw = await redis.get(cache_key("product", product_id))
    return orjson.loads(raw) if raw else None

async def set_cached_product(product_id: str, data: dict, ttl: int = 300):
    await redis.setex(cache_key("product", product_id), ttl, orjson.dumps(data))

async def get_product_with_cache(product_id: str) -> dict:
    cached = await get_cached_product(product_id)
    if cached:
        return cached

    lock_key = f"lock:product:{product_id}"
    acquired = await redis.set(lock_key, "1", nx=True, ex=10)
    if not acquired:
        await asyncio.sleep(0.05)
        return await get_product_with_cache(product_id)

    try:
        product = await db_get_product(product_id)
        if product:
            await set_cached_product(product_id, product)
        return product
    finally:
        await redis.delete(lock_key)

@app.get("/products/{product_id}")
async def get_product(product_id: str):
    product = await get_product_with_cache(product_id)
    if not product:
        raise HTTPException(404)
    return product
```

**Interview tip:** Cache-aside vs read-through vs write-through. Mention thundering herd (many requests on expiry)—mutex/singleflight solves it. For inventory, prefer short TTL + DB constraint over long cache.
