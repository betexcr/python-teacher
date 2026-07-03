# Solution: Timing Decorator

## Approach

Define wrapper with wraps, measure perf_counter around call, print, return.

## Key concepts

- **decorator**: A function that takes a callable and returns a wrapped callable.
- **wraps**: Copies metadata so debugging and introspection stay accurate.

## Code highlights

- `def wrapper(*args: object, **kwargs: object) -> object:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `return wrapper  # type: ignore[return-value]` — **return** — Returns the computed result to the caller. Wrapper records perf_counter before/after, prints formatted elapsed, returns result.
- `def timed(func: F) -> F:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `@functools.wraps` — **functools.wraps** — Preserves the wrapped function's __name__ and __doc__ on the decorator wrapper. Copies metadata so debugging and introspection stay accurate.
- `return result` — **return** — Returns the computed result to the caller. Wrapper records perf_counter before/after, prints formatted elapsed, returns result.
- `def timed(` — **decorator timed** — Decorator factory wrapping callables. Wrapper records perf_counter before/after, prints formatted elapsed, returns result.

## Solution code

```python
import functools
import time
from collections.abc import Callable
from typing import TypeVar

F = TypeVar("F", bound=Callable[..., object])

def timed(func: F) -> F:
    @functools.wraps(func)
    def wrapper(*args: object, **kwargs: object) -> object:
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"{func.__name__} took {elapsed:.4f}s")
        return result
    return wrapper  # type: ignore[return-value]
```

## Walkthrough

Wrapper records perf_counter before/after, prints formatted elapsed, returns result. wraps keeps metadata.

## Common mistakes

- Forgetting wraps
- Using time.time() for short benchmarks

## Stretch goals

- Optional logger instead of print
- Async variant with asyncio
