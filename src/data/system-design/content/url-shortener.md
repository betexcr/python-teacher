# URL Shortener

## Requirements

Build a service like `bit.ly` that maps short codes to long URLs:

- **Create:** `POST /links` → `{ "short_url": "https://go.example/a1b2c3" }`
- **Redirect:** `GET /{code}` → `302` to original URL; track click count
- **Custom aliases:** Optional vanity codes for paid users; reject collisions
- **Expiration:** TTL on links; soft-delete vs hard-delete policy
- **Scale:** 100M links, 10k redirects/sec read-heavy; codes must be unique and URL-safe

## API Design

| Endpoint | Method | Body / Response |
|----------|--------|-----------------|
| `/links` | POST | `{ "url": "https://...", "alias": "promo" }` → `{ "code", "short_url" }` |
| `/{code}` | GET | `302 Location` or `404` |
| `/links/{code}/stats` | GET | `{ "clicks", "created_at", "last_clicked_at" }` |
| `/links/{code}` | DELETE | `204` (owner only) |

Validation: reject non-http(s) URLs, block known malware domains, max URL length 2048.

## Data Model

```sql
CREATE TABLE links (
  id          BIGSERIAL PRIMARY KEY,
  code        VARCHAR(16) UNIQUE NOT NULL,
  long_url    TEXT NOT NULL,
  owner_id    UUID,
  expires_at  TIMESTAMPTZ,
  click_count BIGINT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_links_owner ON links(owner_id);
```

**Code generation:** Base62 encode of Snowflake ID, or hashids with salt. For vanity codes, unique constraint on `code` handles races—return `409` on conflict.

Redis cache: `link:{code}` → `{long_url, expires_at}` JSON, TTL aligned with link expiry.

## Scaling

- **Read path (99%):** Redis cache-aside; on miss, Postgres lookup then populate cache
- **Write path:** Insert Postgres, then cache; async worker increments click counts via Redis `HINCRBY` flushed to Postgres every N seconds
- **DB sharding:** Shard by `code` hash when single Postgres saturates
- **CDN/edge:** Some teams serve redirects at edge with KV store (Cloudflare Workers)
- **Analytics:** Stream click events to Kafka → ClickHouse for dashboards without slowing redirects

## Python Stack

| Layer | Choice |
|-------|--------|
| Framework | FastAPI |
| ORM | SQLAlchemy 2 + asyncpg |
| Cache | Redis |
| IDs | `sqids` or custom base62 |

```python
import secrets
from fastapi import FastAPI, HTTPException
from fastapi.responses import RedirectResponse
from pydantic import BaseModel, HttpUrl
from redis.asyncio import Redis

app = FastAPI()
redis = Redis.from_url("redis://localhost:6379/0")

ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

def generate_code(length: int = 7) -> str:
    return "".join(secrets.choice(ALPHABET) for _ in range(length))

class CreateLinkRequest(BaseModel):
    url: HttpUrl
    alias: str | None = None

@app.post("/links")
async def create_link(body: CreateLinkRequest):
    code = body.alias or generate_code()
    # persist to Postgres (omitted); then cache
    await redis.setex(f"link:{code}", 86400 * 30, str(body.url))
    return {"code": code, "short_url": f"https://go.example/{code}"}

@app.get("/{code}")
async def redirect(code: str):
    cached = await redis.get(f"link:{code}")
    if not cached:
        raise HTTPException(status_code=404, detail="Not found")
    await redis.incr(f"clicks:{code}")
    return RedirectResponse(url=cached.decode(), status_code=302)
```

**Interview tip:** Discuss collision handling (retry on unique violation), open redirect abuse (allowlist domains for free tier), and why `302` vs `301` (302 allows updating destination; 301 caches aggressively at browsers).
