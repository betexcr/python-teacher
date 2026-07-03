# Rate-Limited API (FastAPI)

## Requirements

Design a public REST API that protects upstream services and enforces fair use:

- **Rate limits:** Per API key, IP, and endpoint tier (e.g. 100 req/min free, 10k req/min paid)
- **Burst handling:** Allow short bursts with token bucket; return `429` with `Retry-After`
- **Observability:** Expose remaining quota headers; log throttled requests
- **Multi-instance:** Limits must be consistent across horizontally scaled workers
- **Graceful degradation:** Fail open vs closed is a product decision—default fail closed for abuse-prone endpoints

## API Design

```text
GET /v1/users/{id}
Headers: X-API-Key: sk_live_...
Response headers:
  X-RateLimit-Limit: 1000
  X-RateLimit-Remaining: 847
  X-RateLimit-Reset: 1719907200
429: { "error": "RATE_LIMITED", "retry_after": 12 }
```

| Endpoint | Method | Notes |
|----------|--------|-------|
| `/v1/*` | * | Middleware applies limit before route handler |
| `/health` | GET | Exempt from rate limiting |
| `/internal/metrics` | GET | Admin-only; separate auth |

## Data Model

Redis keys (TTL = window size):

```text
rl:{scope}:{identifier}:{window}  →  integer counter
scope: api_key | ip | user_id
identifier: hashed key or IP
window: floor(unix_ts / window_seconds)
```

Postgres (optional audit):

```sql
CREATE TABLE rate_limit_events (
  id BIGSERIAL PRIMARY KEY,
  scope TEXT NOT NULL,
  identifier TEXT NOT NULL,
  endpoint TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

## Scaling

- **Redis Cluster** for counter storage—single source of truth across N Uvicorn/Gunicorn workers
- **Sliding window log** for accuracy at high tier; **fixed window** for simplicity at free tier
- **Edge rate limiting** (Cloudflare, API Gateway) for DDoS before traffic hits Python
- **Separate limit pools** per tenant tier; cache tier lookup in Redis with short TTL
- Shard Redis by `hash(identifier) % N` when single instance becomes hot

## Python Stack

| Layer | Choice |
|-------|--------|
| Framework | FastAPI + Uvicorn/Gunicorn |
| Limiter | `slowapi` or custom Redis middleware |
| Store | Redis (`redis-py` async) |
| Config | Pydantic settings per tier |

```python
from fastapi import FastAPI, Request, HTTPException
from redis.asyncio import Redis

redis = Redis.from_url("redis://localhost:6379/0")
WINDOW = 60
LIMIT = 100

app = FastAPI()

async def check_rate_limit(key: str) -> tuple[int, int]:
    pipe = redis.pipeline()
    pipe.incr(key)
    pipe.expire(key, WINDOW)
    count, _ = await pipe.execute()
    remaining = max(0, LIMIT - int(count))
    return int(count), remaining

@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next):
    if request.url.path == "/health":
        return await call_next(request)

    api_key = request.headers.get("X-API-Key", request.client.host)
    window = int(__import__("time").time()) // WINDOW
    key = f"rl:api_key:{api_key}:{window}"

    count, remaining = await check_rate_limit(key)
    if count > LIMIT:
        raise HTTPException(
            status_code=429,
            detail={"error": "RATE_LIMITED"},
            headers={"Retry-After": str(WINDOW - (int(__import__("time").time()) % WINDOW))},
        )

    response = await call_next(request)
    response.headers["X-RateLimit-Limit"] = str(LIMIT)
    response.headers["X-RateLimit-Remaining"] = str(remaining)
    return response
```

**Interview tip:** Mention token bucket vs leaky bucket; token bucket handles bursts naturally. For paid tiers, return limit headers even on success so clients can self-throttle.
