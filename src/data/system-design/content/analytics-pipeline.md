# Analytics Pipeline

## Requirements

Collect product events (page views, signups, purchases) and serve aggregated metrics:

- **Ingestion:** High-volume event POST from web/mobile/backend (fire-and-forget)
- **Durability:** No event loss on spike; buffer before warehouse write
- **Query:** Dashboards for DAU, funnel, revenue by day—sub-second for cached aggregates
- **Privacy:** PII hashing, GDPR delete propagation
- **Scale:** 50k events/sec peak; 90-day hot retention, years in cold storage

## API Design

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/events` | POST | Batch ingest `{ "events": [{ "name", "properties", "timestamp" }] }` |
| `/metrics/dau` | GET | `?from=&to=` → time series |
| `/metrics/funnel` | GET | Step conversion rates |

Ingest returns `202 Accepted` immediately—processing is async.

```text
Clients ──► API / ingest endpoint ──► Kafka
Kafka ──► Stream processor (Flink / Faust) ──► ClickHouse / BigQuery
ClickHouse ──► FastAPI metrics API ──► Dashboard
```

## Data Model

**Raw events (ClickHouse):**

```sql
CREATE TABLE events (
  event_id   UUID,
  user_id    UUID,
  name       LowCardinality(String),
  properties String,  -- JSON
  ts         DateTime64(3)
) ENGINE = MergeTree()
ORDER BY (name, ts);
```

**Daily rollups (materialized view):**

```sql
CREATE MATERIALIZED VIEW dau_daily
ENGINE = SummingMergeTree()
ORDER BY (day, name)
AS SELECT
  toDate(ts) AS day,
  name,
  uniqExact(user_id) AS unique_users
FROM events GROUP BY day, name;
```

Postgres for metadata only (dashboard configs, saved reports).

## Scaling

- **Kafka partitions** by `user_id` hash for ordered per-user processing
- **Batch inserts** to ClickHouse (10k rows or 1s flush)—never single-row inserts at scale
- **Pre-aggregate** common metrics; ad-hoc queries hit raw table with time bounds
- **Separate ingest tier** from query API—scale independently
- **Sampling** for high-cardinality debug events at 1%

## Python Stack

| Layer | Choice |
|-------|--------|
| Ingest API | FastAPI |
| Queue | Kafka (`aiokafka`) |
| Stream | Faust or consumer workers |
| Warehouse | ClickHouse |
| Validation | Pydantic event schemas |

```python
from fastapi import FastAPI, BackgroundTasks
from pydantic import BaseModel, Field
from datetime import datetime, timezone
from uuid import uuid4

app = FastAPI()

class AnalyticsEvent(BaseModel):
    name: str = Field(max_length=64)
    properties: dict = Field(default_factory=dict)
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class EventBatch(BaseModel):
    events: list[AnalyticsEvent] = Field(max_length=100)

async def publish_to_kafka(events: list[dict]):
    async for producer in get_kafka_producer():
        for event in events:
            await producer.send("analytics.events", value=event)

@app.post("/events", status_code=202)
async def ingest(batch: EventBatch, background_tasks: BackgroundTasks, user=Depends(optional_user)):
    enriched = [
        {
            "event_id": str(uuid4()),
            "user_id": str(user.id) if user else None,
            **e.model_dump(mode="json"),
        }
        for e in batch.events
    ]
    background_tasks.add_task(publish_to_kafka, enriched)
    return {"accepted": len(enriched)}

@app.get("/metrics/dau")
async def dau(from_date: date, to_date: date):
    rows = clickhouse.query(
        "SELECT day, unique_users FROM dau_daily WHERE day BETWEEN %(from)s AND %(to)s",
        {"from": from_date, "to": to_date},
    )
    return {"series": rows}
```

**Interview tip:** Lambda vs Kappa architecture—batch (daily ETL) vs stream (real-time). For interviews, stream + materialized views cover most follow-ups.
