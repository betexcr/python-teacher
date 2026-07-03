# Observability Stack

## Requirements

Full visibility into production Python services: metrics, logs, traces, and alerting:

- **Metrics:** Request rate, latency histograms, error ratio, queue depth, DB pool usage
- **Traces:** Distributed traces across FastAPI → Celery → Postgres/Redis
- **Logs:** Structured JSON correlated with trace_id (see log-aggregation guide)
- **Dashboards:** RED method (Rate, Errors, Duration) per service
- **Alerting:** SLO-based alerts—burn rate on error budget

## API Design

Observability is infrastructure-facing. App exposes:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/metrics` | GET | Prometheus scrape endpoint |
| `/health` | GET | Liveness—process up |
| `/ready` | GET | Readiness—DB + Redis reachable |

```text
App /metrics ──► Prometheus ──► Grafana dashboards
OTel SDK ──► OTLP collector ──► Tempo/Jaeger (traces)
structlog stdout ──► Loki/OpenSearch (logs)
Alertmanager ◄── Prometheus rules
```

## Data Model

**Prometheus metrics (in-memory, scraped):**

```text
http_requests_total{method, path, status}
http_request_duration_seconds_bucket{method, path, le}
celery_task_duration_seconds{task_name}
db_pool_connections{state="idle|used"}
```

**Trace span (OTel):**

```json
{
  "trace_id": "abc",
  "span_id": "def",
  "name": "GET /users/{id}",
  "duration_ms": 42,
  "attributes": { "http.status_code": 200 }
}
```

SLO example: 99.9% availability → error budget 43 minutes/month.

## Scaling

- **Low-cardinality labels** on metrics—never `user_id` as Prometheus label
- **Tail sampling** on traces—keep 100% errors, 1% success in high traffic
- **Remote write** Prometheus to Cortex/Mimir for long retention
- **OpenTelemetry Collector** as single egress—apps don't talk to 5 backends
- **Separate alerts** for symptom (5xx rate) vs cause (Redis down)

## Python Stack

| Layer | Choice |
|-------|--------|
| Metrics | `prometheus-fastapi-instrumentator` |
| Traces | OpenTelemetry SDK + `opentelemetry-instrumentation-fastapi` |
| Logs | `structlog` (trace_id in context) |
| Export | OTLP gRPC to collector |
| Dashboards | Grafana |

```python
from prometheus_fastapi_instrumentator import Instrumentator
from opentelemetry import trace
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter

def setup_observability(app: FastAPI):
    provider = TracerProvider()
    provider.add_span_processor(BatchSpanProcessor(OTLPSpanExporter(endpoint="http://otel-collector:4317")))
    trace.set_tracer_provider(provider)
    FastAPIInstrumentor.instrument_app(app)
    Instrumentator().instrument(app).expose(app, endpoint="/metrics")

tracer = trace.get_tracer(__name__)

@app.get("/ready")
async def ready():
    await check_postgres()
    await check_redis()
    return {"status": "ready"}

@app.get("/users/{user_id}")
async def get_user(user_id: str):
    with tracer.start_as_current_span("db.get_user") as span:
        span.set_attribute("user.id", user_id)
        user = await db_get_user(user_id)
    return user
```

**Celery OTel propagation:**

```python
@celery_app.task
def send_report(report_id: str, trace_context: dict):
    inject_trace_context(trace_context)
    with tracer.start_as_current_span("send_report"):
        generate_and_email(report_id)
```

**Interview tip:** Golden signals—latency, traffic, errors, saturation. SLI vs SLO vs SLA. Mention cardinality explosion as the #1 Prometheus footgun.
