# Celery Tasks

**Difficulty:** hard  
**Topics:** celery, redis

## Learning goals

- Define shared tasks
- Configure broker and result backend

## Challenge

Create Celery app with `@shared_task` `add(x, y)` and `send_welcome_email(user_id)` retrying on failure max 3 times.

## Requirements

1. Redis broker URL from env
2. Task bind=True for retry
3. JSON serialization

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/hard/03-celery-tasks/`. Reference write-ups in this repo live under `challenges/hard/03-celery-tasks/` (not loaded by the app).

```python
import os
from celery import Celery

app = Celery("worker", broker=os.environ.get("CELERY_BROKER_URL", "redis://localhost:6379/0"))

@app.task
def add(x: int, y: int) -> int:
    # TODO
    raise NotImplementedError
```

## Hints

1. app.conf.task_serializer = "json"
2. @app.task(bind=True, max_retries=3)
3. self.retry(exc=exc, countdown=5)

## Acceptance criteria

- [ ] **add returns sum**
  add returns sum. Start a worker, enqueue a task, and confirm the result backend stores the outcome.

- [ ] **Email task retries**
  Email task retries. Start a worker, enqueue a task, and confirm the result backend stores the outcome.

- [ ] **Broker URL configurable**
  Broker URL configurable: Redis broker URL from env. Start a worker, enqueue a task, and confirm the result backend stores the outcome.

## Resources

- [Celery documentation](https://docs.celeryq.dev/en/stable/)
- [Python Tutorial](https://docs.python.org/3/tutorial/)
