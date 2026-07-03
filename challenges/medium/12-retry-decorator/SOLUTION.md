# Solution: Retry Decorator

## Approach

Loop attempts; sleep with exponential backoff; re-raise final error.

## Key concepts

- **exponential backoff**: Increasing wait reduces load on failing deps.
- **parametrized decorator**: Outer function returns decorator with config.

## Code highlights

- `def wrapper(*args: object, **kwargs: object) -> object:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `return wrapper  # type: ignore[return-value]` — **return** — Returns the computed result to the caller. Decorator factory sets attempts; wrapper loops, sleeps with doubling delay, raises last exception.
- `for _ in range(max_attempts):` — **for loop** — Iterates over a sequence. Decorator factory sets attempts; wrapper loops, sleeps with doubling delay, raises last exception.
- `def decorator(func: F) -> F:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `return func(*args, **kwargs)` — **return** — Returns the computed result to the caller. Decorator factory sets attempts; wrapper loops, sleeps with doubling delay, raises last exception.
- `@functools.wraps` — **functools.wraps** — Preserves the wrapped function's __name__ and __doc__ on the decorator wrapper. Decorator factory sets attempts; wrapper loops, sleeps with doubling delay, raises last exception.
- `return decorator` — **return** — Returns the computed result to the caller. Decorator factory sets attempts; wrapper loops, sleeps with doubling delay, raises last exception.
- `def retry(` — **decorator retry** — Decorator factory wrapping callables. Decorator factory sets attempts; wrapper loops, sleeps with doubling delay, raises last exception.

## Solution code

```python
import functools
import time
from collections.abc import Callable
from typing import TypeVar

F = TypeVar("F", bound=Callable[..., object])

def retry(max_attempts: int = 3, delay: float = 0.1):
    def decorator(func: F) -> F:
        @functools.wraps(func)
        def wrapper(*args: object, **kwargs: object) -> object:
            wait = delay
            last_exc: Exception | None = None
            for _ in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as exc:
                    last_exc = exc
                    time.sleep(wait)
                    wait *= 2
            assert last_exc is not None
            raise last_exc
        return wrapper  # type: ignore[return-value]
    return decorator
```

## Walkthrough

Decorator factory sets attempts; wrapper loops, sleeps with doubling delay, raises last exception.

## Common mistakes

- Catching BaseException
- Infinite retry without cap

## Stretch goals

- Retry only specific exceptions
- Async retry variant
