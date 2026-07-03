# Solution: Celery Tasks

## Approach

Celery app reads broker env; tasks registered; bind enables retry API.

## Key concepts

- **Celery**: Distributed task queue for background work.
- **bind=True**: Passes task instance as self for retry/countdown.

## Code highlights

- `def send_welcome_email(self, user_id: int) -> None:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `raise ValueError("invalid user")` — **raise** — Fail fast with a clear error when input or state is invalid. Celery configured with JSON serializers; add is pure; email task retries on errors via self.retry.
- `def add(x: int, y: int) -> int:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `return x + y` — **return** — Returns the computed result to the caller. Celery configured with JSON serializers; add is pure; email task retries on errors via self.retry.
- `@app.task` — **Celery task** — Background job executed by a worker process. Celery configured with JSON serializers; add is pure; email task retries on errors via self.retry.

## Solution code

```python
import os
from celery import Celery

app = Celery("worker", broker=os.environ.get("CELERY_BROKER_URL", "redis://localhost:6379/0"))
app.conf.task_serializer = "json"
app.conf.result_serializer = "json"

@app.task
def add(x: int, y: int) -> int:
    return x + y

@app.task(bind=True, max_retries=3)
def send_welcome_email(self, user_id: int) -> None:
    try:
        if user_id <= 0:
            raise ValueError("invalid user")
        # simulate send
    except Exception as exc:
        raise self.retry(exc=exc, countdown=5)
```

## Walkthrough

Celery configured with JSON serializers; add is pure; email task retries on errors via self.retry.

## Common mistakes

- Pickle serializer with untrusted broker
- No max_retries cap

## Stretch goals

- Canvas chords/chains
- Flower monitoring
