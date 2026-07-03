# Distributed Task Scheduler

**Difficulty:** very-hard  
**Topics:** scheduling, redis

## Learning goals

- Schedule delayed jobs
- Ensure at-least-once execution

## Challenge

Implement Redis-backed scheduler storing `(run_at, task_id, payload)` sorted set; worker polls due tasks and executes handlers idempotently.

## Requirements

1. schedule(run_at, task_id, payload)
2. Worker fetches due items
3. Idempotent task_id handling

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/very-hard/04-distributed-task-scheduler/`. Reference write-ups in this repo live under `challenges/very-hard/04-distributed-task-scheduler/` (not loaded by the app).

```python
import json
import time
from dataclasses import dataclass

@dataclass
class ScheduledTask:
    task_id: str
    run_at: float
    payload: dict[str, object]

class RedisScheduler:
    def __init__(self, redis_client, queue_key: str = "sched:tasks") -> None:
        self._redis = redis_client
        self._key = queue_key
        self._seen: set[str] = set()

    def schedule(self, task: ScheduledTask) -> None:
        # TODO zadd with score run_at
        ...

    def poll_due(self, now: float | None = None) -> list[ScheduledTask]:
        ...
```

## Hints

1. self._redis.zrangebyscore(key, 0, now)
2. json.dumps payload as member
3. skip if task_id in self._seen

## Acceptance criteria

- [ ] **Future tasks not polled**
  Future tasks not polled. Write a small script or pytest test that demonstrates this behavior matches Distributed Task Scheduler.

- [ ] **Due tasks returned**
  Due tasks returned: Worker fetches due items. Write a small script or pytest test that demonstrates this behavior matches Distributed Task Scheduler.

- [ ] **Duplicate task_id skipped**
  Duplicate task_id skipped. Write a small script or pytest test that demonstrates this behavior matches Distributed Task Scheduler.

## Resources

- [Python Tutorial](https://docs.python.org/3/tutorial/)
- [Python standard library](https://docs.python.org/3/library/)
