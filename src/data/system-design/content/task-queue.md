# Task Queue (Celery / RQ)

## Requirements

Offload slow or unreliable work from the HTTP request path:

- **Jobs:** Send email, generate PDF, resize image, call third-party API with retries
- **Reliability:** At-least-once delivery, idempotent handlers, dead-letter queue (DLQ)
- **Priority:** High-priority billing jobs before bulk exports
- **Scheduling:** Delayed jobs (`countdown`) and cron-style periodic tasks
- **Visibility:** Job status API, failure alerts, worker health metrics

## API Design

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/jobs` | POST | Enqueue `{ "task": "send_email", "payload": {...} }` → `{ "job_id" }` |
| `/jobs/{id}` | GET | `{ "status": "pending|running|success|failed", "result" }` |
| `/jobs/{id}/retry` | POST | Re-queue failed job (admin) |

Workers never expose HTTP; they consume from Redis/RabbitMQ/SQS.

```text
API ──► Broker (Redis/RabbitMQ) ──► Worker pool ──► Postgres / S3 / SMTP
         └──► Result backend (Redis) for status
         └──► DLQ after max retries
```

## Data Model

```sql
CREATE TABLE jobs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_name   TEXT NOT NULL,
  payload     JSONB NOT NULL,
  status      TEXT DEFAULT 'pending',
  attempts    INT DEFAULT 0,
  last_error  TEXT,
  created_at  TIMESTAMPTZ DEFAULT now(),
  finished_at TIMESTAMPTZ
);
```

Broker message: `{ "job_id", "task", "payload", "idempotency_key" }`. Store idempotency key in Redis `SET NX` before processing.

## Scaling

- **Horizontal workers:** Add Celery/RQ workers independently of API replicas
- **Queue per priority:** `high`, `default`, `low`—dedicated worker pools
- **Autoscale:** Celery `--autoscale=10,2` based on queue depth
- **Backpressure:** Reject enqueue when queue depth exceeds threshold (503)
- **Long tasks:** Chunk work (process 1000 rows per sub-task) to avoid worker timeout

## Python Stack

| Layer | Choice |
|-------|--------|
| Broker | Redis (RQ, Celery) or RabbitMQ (Celery) |
| Workers | Celery (feature-rich) or RQ (simple) |
| API | FastAPI enqueues; returns job_id immediately |
| Monitoring | Flower (Celery), Prometheus exporter |

**Celery example:**

```python
from celery import Celery

celery_app = Celery("app", broker="redis://localhost:6379/0", backend="redis://localhost:6379/1")

@celery_app.task(bind=True, max_retries=3, autoretry_for=(ConnectionError,))
def send_email(self, to: str, subject: str, body: str):
    # idempotent: check if already sent for this job_id
    smtp_send(to, subject, body)

@celery_app.task
def process_export(export_id: str):
    rows = fetch_rows(export_id)
    write_csv_to_s3(export_id, rows)
```

**RQ example:**

```python
from redis import Redis
from rq import Queue

redis_conn = Redis.from_url("redis://localhost:6379/0")
queue = Queue("default", connection=redis_conn)

def enqueue_resize(image_id: str, sizes: list[int]) -> str:
    job = queue.enqueue("workers.images.resize", image_id, sizes, job_timeout=300)
    return job.id
```

**FastAPI enqueue:**

```python
@app.post("/jobs")
async def create_job(body: JobRequest):
    result = send_email.delay(body.to, body.subject, body.body)
    return {"job_id": result.id}
```

**Interview tip:** Compare Celery vs RQ—RQ is Redis-only and simpler; Celery supports routing, chords, and cron (`beat`). Always design tasks to be **idempotent** because at-least-once delivery will duplicate messages.
