# Solution: Distributed Task Scheduler

## Approach

Sorted set scores are timestamps; poll range; track processed ids for idempotency.

## Key concepts

- **sorted set**: Redis ZSET orders tasks by run_at score.
- **idempotency**: Safe retries when workers duplicate delivery.

## Code highlights

- `def __init__(self, redis_client, queue_key: str = "sched:tasks") -> None:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `def poll_due(self, now: float | None = None) -> list[ScheduledTask]:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `def schedule(self, task: ScheduledTask) -> None:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `@dataclass
class ScheduledTask` — **dataclass ScheduledTask** — `ScheduledTask` is a dataclass — boilerplate __init__, __repr__, and comparisons are generated. schedule zadds JSON member with run_at score; poll_due reads range, dedupes task_id, removes processed entries.
- `return due` — **return** — Returns the computed result to the caller. schedule zadds JSON member with run_at score; poll_due reads range, dedupes task_id, removes processed entries.

## Solution code

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
        member = json.dumps({"task_id": task.task_id, "payload": task.payload})
        self._redis.zadd(self._key, {member: task.run_at})

    def poll_due(self, now: float | None = None) -> list[ScheduledTask]:
        now = now or time.time()
        raw = self._redis.zrangebyscore(self._key, 0, now)
        due: list[ScheduledTask] = []
        for item in raw:
            data = json.loads(item)
            task_id = data["task_id"]
            if task_id in self._seen:
                continue
            self._seen.add(task_id)
            due.append(ScheduledTask(task_id=task_id, run_at=now, payload=data["payload"]))
            self._redis.zrem(self._key, item)
        return due
```

## Walkthrough

schedule zadds JSON member with run_at score; poll_due reads range, dedupes task_id, removes processed entries.

## Common mistakes

- Polling without removing tasks
- No idempotency on retries

## Stretch goals

- Leader election for workers
- Dead letter queue
