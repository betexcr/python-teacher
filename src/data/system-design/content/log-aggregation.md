# Log Aggregation

## Requirements

Centralize logs from all API workers, Celery tasks, and infra for search and alerting:

- **Structured logs:** JSON with trace_id, user_id, level, message, duration_ms
- **Correlation:** Request ID propagated across services and async jobs
- **Retention:** 30 days hot (searchable), 1 year cold (S3/Glacier)
- **Query:** Full-text search and filters by service, level, error type
- **Alerts:** PagerDuty on error rate spike or specific patterns

## API Design

Apps don't expose log ingestion publicly—agents ship to collector:

```text
FastAPI ──► stdout JSON ──► Fluent Bit / Vector ──► OpenSearch / Loki
Celery  ──► same pipeline
Alertmanager ◄── rules on error rate
```

Optional internal query proxy:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/admin/logs/search` | GET | `?q=trace_id:abc&from=&to=` (OpenSearch proxy) |

## Data Model

**Log document (OpenSearch index):**

```json
{
  "@timestamp": "2025-07-02T12:00:00Z",
  "level": "ERROR",
  "service": "api",
  "trace_id": "abc123",
  "user_id": "uuid",
  "message": "Payment failed",
  "exception": "...",
  "http": { "method": "POST", "path": "/billing/checkout", "status": 500 }
}
```

Index pattern: `logs-{service}-YYYY.MM.DD` with ILM: hot → warm → delete.

## Scaling

- **Structured JSON to stdout**—container runtime collects; no file rotation in app
- **Sampling** debug logs in production (100% errors, 1% info)
- **Bulk ship** from Fluent Bit buffer—handles OpenSearch outages
- **Separate indices** per service to tune retention and shards
- **Cardinality control:** don't log unbounded IDs as high-cardinality fields in metrics

## Python Stack

| Layer | Choice |
|-------|--------|
| Logging | `structlog` + stdlib |
| Context | `contextvars` for trace_id |
| Shipping | Fluent Bit sidecar or DaemonSet |
| Store | OpenSearch or Grafana Loki |
| Tracing | OpenTelemetry (pairs with logs via trace_id) |

```python
import structlog
import logging
from contextvars import ContextVar
from uuid import uuid4

trace_id_var: ContextVar[str] = ContextVar("trace_id", default="")

structlog.configure(
    processors=[
        structlog.contextvars.merge_contextvars,
        structlog.processors.add_log_level,
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.JSONRenderer(),
    ],
    wrapper_class=structlog.make_filtering_bound_logger(logging.INFO),
)

logger = structlog.get_logger()

@app.middleware("http")
async def logging_middleware(request: Request, call_next):
    trace_id = request.headers.get("X-Trace-Id", str(uuid4()))
    trace_id_var.set(trace_id)
    structlog.contextvars.bind_contextvars(
        trace_id=trace_id,
        path=request.url.path,
        method=request.method,
    )
    start = time.perf_counter()
    try:
        response = await call_next(request)
        logger.info("request_completed", status=response.status_code, duration_ms=(time.perf_counter() - start) * 1000)
        response.headers["X-Trace-Id"] = trace_id
        return response
    except Exception:
        logger.exception("request_failed", duration_ms=(time.perf_counter() - start) * 1000)
        raise
```

**Celery task context:**

```python
@celery_app.task
def process_payment(payment_id: str, trace_id: str):
    structlog.contextvars.bind_contextvars(trace_id=trace_id, payment_id=payment_id)
    logger.info("processing_payment")
```

**Interview tip:** Logs vs metrics vs traces—three pillars. Logs answer "what happened for this request"; metrics answer "how often"; traces answer "where was latency". Unify with shared trace_id.
