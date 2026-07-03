# Timing Decorator

**Difficulty:** medium  
**Topics:** decorators, functools

## Learning goals

- Wrap functions with timing logic
- Preserve metadata with functools.wraps

## Challenge

Write `@timed` that prints elapsed seconds for sync callables. Use `time.perf_counter()` and `functools.wraps`.

## Requirements

1. Print format: "{name} took {seconds:.4f}s"
2. Return original result
3. Preserve __name__ and __doc__

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/medium/01-decorator-timing/`. Reference write-ups in this repo live under `challenges/medium/01-decorator-timing/` (not loaded by the app).

```python
import functools
import time
from collections.abc import Callable
from typing import TypeVar

F = TypeVar("F", bound=Callable[..., object])

def timed(func: F) -> F:
    # TODO
    raise NotImplementedError
```

## Hints

1. @functools.wraps(func)
2. start = time.perf_counter()
3. print after call in wrapper

## Acceptance criteria

- [ ] **Prints elapsed time**
  Prints elapsed time. Write a small script or pytest test that demonstrates this behavior matches Timing Decorator.

- [ ] **Returns func result**
  Returns func result. Write a small script or pytest test that demonstrates this behavior matches Timing Decorator.

- [ ] **Wrapped __name__ matches original**
  Wrapped __name__ matches original. Write a small script or pytest test that demonstrates this behavior matches Timing Decorator.

## Resources

- [decorators – reference](https://docs.python.org/3/glossary.html#term-decorator)
- [functools – reference](https://docs.python.org/3/library/functools.html)
