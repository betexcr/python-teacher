# Retry Decorator

**Difficulty:** medium  
**Topics:** decorators, retry

## Learning goals

- Retry flaky calls
- Exponential backoff

## Challenge

Implement `@retry(max_attempts=3, delay=0.1)` retrying on `Exception` with doubling delay between attempts.

## Requirements

1. Raise last exception after max
2. Reset delay each call
3. Use functools.wraps

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/medium/12-retry-decorator/`. Reference write-ups in this repo live under `challenges/medium/12-retry-decorator/` (not loaded by the app).

```python
import functools
import time
from collections.abc import Callable
from typing import TypeVar

F = TypeVar("F", bound=Callable[..., object])

def retry(max_attempts: int = 3, delay: float = 0.1):
    # TODO
    raise NotImplementedError
```

## Hints

1. for attempt in range(max_attempts)
2. time.sleep(wait); wait *= 2
3. except Exception as exc

## Acceptance criteria

- [ ] **Succeeds when later attempt works**
  Succeeds when later attempt works. Write a small script or pytest test that demonstrates this behavior matches Retry Decorator.

- [ ] **Raises after max failures**
  Raises after max failures. Write a small script or pytest test that demonstrates this behavior matches Retry Decorator.

- [ ] **Backoff increases**
  Backoff increases. Write a small script or pytest test that demonstrates this behavior matches Retry Decorator.

## Resources

- [decorators – reference](https://docs.python.org/3/glossary.html#term-decorator)
- [Python Tutorial](https://docs.python.org/3/tutorial/)
