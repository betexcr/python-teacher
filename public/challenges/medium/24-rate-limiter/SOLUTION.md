# Solution: Rate Limiter

## Approach

Deque stores call times; drop expired; enforce max length before call.

## Key concepts

- **sliding window**: Counts events in rolling time interval.
- **deque**: Efficient pops from left for timestamp pruning.

## Code highlights

- `def wrapper(*args: object, **kwargs: object) -> object:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `return wrapper  # type: ignore[return-value]` — **return** — Returns the computed result to the caller. Monotonic timestamps in deque; prune outside window; reject when at capacity; record call.
- `raise RuntimeError("rate limit exceeded")` — **raise** — Fail fast with a clear error when input or state is invalid. Monotonic timestamps in deque; prune outside window; reject when at capacity; record call.
- `def decorator(func: F) -> F:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `return func(*args, **kwargs)` — **return** — Returns the computed result to the caller. Monotonic timestamps in deque; prune outside window; reject when at capacity; record call.
- `return decorator` — **return** — Returns the computed result to the caller. Monotonic timestamps in deque; prune outside window; reject when at capacity; record call.
- `def rate_limit(` — **decorator rate_limit** — Decorator factory wrapping callables. Monotonic timestamps in deque; prune outside window; reject when at capacity; record call.

## Solution code

```python
import functools
import time
from collections import deque
from collections.abc import Callable
from typing import TypeVar

F = TypeVar("F", bound=Callable[..., object])

def rate_limit(max_calls: int, period: float):
    def decorator(func: F) -> F:
        calls: deque[float] = deque()

        @functools.wraps(func)
        def wrapper(*args: object, **kwargs: object) -> object:
            now = time.monotonic()
            while calls and calls[0] <= now - period:
                calls.popleft()
            if len(calls) >= max_calls:
                raise RuntimeError("rate limit exceeded")
            calls.append(now)
            return func(*args, **kwargs)
        return wrapper  # type: ignore[return-value]
    return decorator
```

## Walkthrough

Monotonic timestamps in deque; prune outside window; reject when at capacity; record call.

## Common mistakes

- Using wall clock time.time()
- Global limit shared across unrelated functions incorrectly

## Stretch goals

- Token bucket algorithm
- Redis-backed limiter
