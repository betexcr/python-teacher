# ETL Pipeline

## Requirements

Move and transform data from operational DBs to analytics warehouse on schedule:

- **Extract:** Incremental pulls by `updated_at` watermark from Postgres replicas
- **Transform:** Clean, dedupe, join, aggregate—business rules in Python
- **Load:** Upsert into warehouse (Snowflake, BigQuery, Redshift)
- **Reliability:** Checkpoint watermarks; idempotent loads; alert on SLA miss
- **Scale:** 100M rows/day; backfill without blocking incremental runs

## API Design

ETL is mostly internal—ops-facing endpoints:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/admin/etl/jobs` | GET | Job status, last watermark |
| `/admin/etl/jobs/{name}/run` | POST | Trigger backfill or incremental |
| `/admin/etl/jobs/{name}/watermark` | GET | Current high-water mark |

Orchestration via Airflow DAG, Dagster, or Prefect—not synchronous HTTP.

```text
Postgres (replica) ──► Extract (batched) ──► Transform (Polars/pandas) ──► Load (COPY/INSERT)
Airflow schedules daily/hourly ──► watermark table tracks progress
```

## Data Model

**Watermark tracking:**

```sql
CREATE TABLE etl_watermarks (
  job_name       TEXT PRIMARY KEY,
  watermark_ts   TIMESTAMPTZ NOT NULL,
  watermark_id   BIGINT,
  updated_at     TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE etl_runs (
  id           UUID PRIMARY KEY,
  job_name     TEXT NOT NULL,
  rows_loaded  BIGINT,
  status       TEXT,
  started_at   TIMESTAMPTZ,
  finished_at  TIMESTAMPTZ,
  error        TEXT
);
```

**Warehouse (example star schema):**

```sql
CREATE TABLE fact_orders (
  order_id     BIGINT PRIMARY KEY,
  user_id      BIGINT,
  amount_cents INT,
  created_at   TIMESTAMPTZ
);
```

## Scaling

- **Read from replica**—never load primary OLTP DB
- **Keyset pagination** (`WHERE id > :cursor ORDER BY id LIMIT 10000`) not OFFSET
- **Parallel extract** by date partition or id range shards
- **Bulk load** warehouse native format (Parquet → COPY, BigQuery load job)
- **Incremental only** in steady state; full backfill as separate DAG with throttling

## Python Stack

| Layer | Choice |
|-------|--------|
| Orchestration | Airflow / Prefect / Dagster |
| Transform | Polars (fast) or pandas |
| Extract | SQLAlchemy + asyncpg |
| Load | `snowflake-connector-python`, `google-cloud-bigquery` |
| Storage | S3 staging for Parquet files |

```python
from datetime import datetime, timezone
import polars as pl
from sqlalchemy import create_engine, text

BATCH_SIZE = 10_000

def extract_orders(watermark: datetime, limit: int = BATCH_SIZE) -> pl.DataFrame:
    engine = create_engine(settings.REPLICA_URL)
    query = text("""
        SELECT id, user_id, amount_cents, updated_at
        FROM orders
        WHERE updated_at > :watermark
        ORDER BY updated_at, id
        LIMIT :limit
    """)
    with engine.connect() as conn:
        rows = conn.execute(query, {"watermark": watermark, "limit": limit}).mappings().all()
    return pl.DataFrame(rows)

def transform_orders(df: pl.DataFrame) -> pl.DataFrame:
    return (
        df.with_columns(pl.col("amount_cents").cast(pl.Int64))
        .filter(pl.col("amount_cents") > 0)
        .unique(subset=["id"], keep="last")
    )

def load_to_warehouse(df: pl.DataFrame):
    path = "/tmp/staging/orders.parquet"
    df.write_parquet(path)
    snowflake_copy_from_parquet("fact_orders", path)

def run_incremental(job_name: str = "orders"):
    wm = get_watermark(job_name)
    run_id = start_etl_run(job_name)
    total = 0
    try:
        while True:
            batch = extract_orders(wm)
            if batch.is_empty():
                break
            clean = transform_orders(batch)
            load_to_warehouse(clean)
            total += len(clean)
            wm = batch["updated_at"].max()
            save_watermark(job_name, wm)
            if len(batch) < BATCH_SIZE:
                break
        finish_etl_run(run_id, "success", total)
    except Exception as exc:
        finish_etl_run(run_id, "failed", total, str(exc))
        raise
```

**Interview tip:** Batch vs streaming ETL—batch simpler for daily reports; streaming (Debezium CDC) for near-real-time dashboards. Always idempotent loads (MERGE/upsert on primary key).
