# Rate Limiter

**Difficulty:** medium  
**Topics:** rate-limiting, decorators

## Learning goals

- Limit calls per window
- Raise when exceeded

## Challenge

Implement `@rate_limit(max_calls: int, period: float)` allowing only `max_calls` within rolling `period` seconds per function.

## Requirements

1. Track call timestamps
2. Raise RuntimeError when exceeded
3. Prune old timestamps

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/medium/24-rate-limiter/`. Reference write-ups in this repo live under `challenges/medium/24-rate-limiter/` (not loaded by the app).

```python
import functools
import time
from collections import deque
from collections.abc import Callable
from typing import TypeVar

F = TypeVar("F", bound=Callable[..., object])

def rate_limit(max_calls: int, period: float):
    # TODO
    raise NotImplementedError
```

## Hints

1. calls: deque[float] = deque()
2. while calls and calls[0] <= now - period: pop
3. if len(calls) >= max_calls: raise

## Acceptance criteria

- [ ] **Allows burst under limit**
  Allows burst under limit. Write a small script or pytest test that demonstrates this behavior matches Rate Limiter.

- [ ] **Blocks excess calls**
  Blocks excess calls. Write a small script or pytest test that demonstrates this behavior matches Rate Limiter.

- [ ] **Window rolls forward**
  Window rolls forward. Write a small script or pytest test that demonstrates this behavior matches Rate Limiter.

## Resources

- [rate-limiting – reference](https://slowapi.readthedocs.io/en/latest/)
- [decorators – reference](https://docs.python.org/3/glossary.html#term-decorator)
