# Search Autocomplete

## Requirements

Typeahead search over products, users, or documents with low latency:

- **Suggest API:** Return top 10 matches for partial query in < 50ms p99
- **Ranking:** Prefix match > fuzzy match; boost popularity/recency
- **Debouncing:** Client waits ~200ms; server handles concurrent requests safely
- **Caching:** Hot queries cached; invalidate on index updates
- **Scale:** Millions of documents; reads dominate writes

## API Design

| Endpoint | Method | Params | Response |
|----------|--------|--------|----------|
| `/search/suggest` | GET | `q`, `limit=10`, `type` | `{ "results": [{ "id", "label", "score" }] }` |
| `/search` | GET | `q`, `page` | Full search with highlights (separate from suggest) |

Headers: support `Cache-Control` on CDN for anonymous suggest; `Vary: Authorization` for scoped results.

Reject queries shorter than 2 characters (400 or empty array).

## Data Model

**Option A — Postgres + trigram:**

```sql
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE TABLE documents (
  id    UUID PRIMARY KEY,
  title TEXT NOT NULL,
  slug  TEXT NOT NULL
);

CREATE INDEX idx_documents_title_trgm ON documents USING gin (title gin_trgm_ops);
```

**Option B — Elasticsearch/OpenSearch:**

```json
{
  "title": { "type": "search_as_you_type" },
  "popularity": { "type": "integer" }
}
```

**Redis cache:** `suggest:{normalized_q}` → JSON results, TTL 60s.

## Scaling

- **Dedicated search index** (OpenSearch) when Postgres trigram slows at 10M+ rows
- **Edge cache** for top 1000 queries (CDN or Redis)
- **Read replicas** for Postgres suggest path
- **Async indexing:** CDC or outbox pattern updates search index on write
- **Sharding** search index by tenant or category

## Python Stack

| Layer | Choice |
|-------|--------|
| API | FastAPI |
| Search | OpenSearch (`opensearch-py`) or Postgres `pg_trgm` |
| Cache | Redis |
| Normalization | lowercase, strip accents (`unidecode`) |

```python
from fastapi import FastAPI, Query
from redis.asyncio import Redis
import json

app = FastAPI()
redis = Redis.from_url("redis://localhost:6379/0")

def normalize(q: str) -> str:
    return q.strip().lower()[:100]

@app.get("/search/suggest")
async def suggest(q: str = Query(min_length=2), limit: int = 10):
    key = f"suggest:{normalize(q)}"
    cached = await redis.get(key)
    if cached:
        return json.loads(cached)

    # OpenSearch example
    body = {
        "size": limit,
        "query": {
            "multi_match": {
                "query": q,
                "type": "bool_prefix",
                "fields": ["title", "title._2gram", "title._3gram"],
            }
        },
    }
    resp = opensearch.search(index="documents", body=body)
    results = [
        {"id": hit["_id"], "label": hit["_source"]["title"], "score": hit["_score"]}
        for hit in resp["hits"]["hits"]
    ]
    payload = {"results": results}
    await redis.setex(key, 60, json.dumps(payload))
    return payload
```

**Interview tip:** Discuss prefix trie vs inverted index. Mention aborting stale requests client-side; server-side, use query timeouts. For multi-tenant SaaS, always filter by `tenant_id` in the search query.
