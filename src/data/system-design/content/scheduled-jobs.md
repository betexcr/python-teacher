# Scheduled Jobs

## Requirements

Run recurring and one-off background tasks on a schedule:

- **Cron jobs:** Daily reports, cleanup, subscription renewals, cache warming
- **Reliability:** Exactly-once semantics where money involved; at-least-once acceptable for idempotent cleanup
- **Visibility:** Job history, failure alerts, manual trigger for ops
- **Isolation:** Long jobs must not block API workers
- **Timezone aware:** Billing at tenant local midnight vs UTC

## API Design

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/admin/jobs` | GET | List scheduled jobs + last run status |
| `/admin/jobs/{name}/run` | POST | Trigger ad-hoc run |
| `/admin/jobs/{name}/history` | GET | Past executions |

Production schedules are defined in code or config—not user-editable cron without sandboxing.

```text
Celery Beat / APScheduler ──► Broker ──► Worker
                              └──► job_runs table (audit)
```

## Data Model

```sql
CREATE TABLE job_runs (
  id          UUID PRIMARY KEY,
  job_name    TEXT NOT NULL,
  started_at  TIMESTAMPTZ NOT NULL,
  finished_at TIMESTAMPTZ,
  status      TEXT DEFAULT 'running',
  error       TEXT,
  metadata    JSONB
);

CREATE INDEX idx_job_runs_name_started ON job_runs(job_name, started_at DESC);
```

Celery Beat stores schedule in `celerybeat-schedule` file or Redis; for dynamic schedules use `django-celery-beat` pattern in Postgres.

## Scaling

- **Single Beat scheduler** leader (Redis lock) to avoid duplicate cron fires
- **Dedicated worker queue** `cron` separate from interactive tasks
- **Chunk large jobs:** `cleanup_old_sessions` processes 10k rows per tick
- **Dead man's switch:** Alert if `daily_report` hasn't succeeded in 25h
- **Distributed lock** (`redis.lock`) inside job for cluster-wide exclusivity

## Python Stack

| Layer | Choice |
|-------|--------|
| Scheduler | Celery Beat or APScheduler |
| Workers | Celery / RQ |
| Locking | `redis-py` Lock |
| Monitoring | Sentry + Prometheus |

**Celery Beat:**

```python
from celery import Celery
from celery.schedules import crontab

celery_app = Celery("app", broker="redis://localhost:6379/0")

celery_app.conf.beat_schedule = {
    "daily-report": {
        "task": "jobs.generate_daily_report",
        "schedule": crontab(hour=6, minute=0),
    },
    "cleanup-sessions": {
        "task": "jobs.cleanup_expired_sessions",
        "schedule": crontab(minute="*/15"),
    },
}

@celery_app.task
def generate_daily_report():
    run_id = start_job_run("daily_report")
    try:
        data = aggregate_yesterday_metrics()
        send_report_email(data)
        finish_job_run(run_id, "success")
    except Exception as exc:
        finish_job_run(run_id, "failed", str(exc))
        raise
```

**APScheduler (embedded):**

```python
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger

scheduler = AsyncIOScheduler()

@scheduler.scheduled_job(CronTrigger(hour=2, minute=0))
async def vacuum_audit_logs():
    async with redis.lock("job:vacuum_audit", timeout=3600):
        deleted = await db.execute(delete(AuditLog).where(AuditLog.created_at < cutoff))
        logger.info("vacuumed %s rows", deleted.rowcount)

@app.on_event("startup")
async def start_scheduler():
    scheduler.start()
```

**Interview tip:** Celery Beat vs K8s CronJob vs cloud EventBridge—pick based on ops maturity. Always make scheduled tasks **idempotent** because clocks and retries cause duplicates.
