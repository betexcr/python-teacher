# Caching Decorator

**Difficulty:** medium  
**Topics:** functools, lru-cache

## Learning goals

- Memoize pure functions
- Understand cache keys

## Challenge

Implement `memoize` decorator using a dict cache keyed by `(args, frozenset(kwargs.items()))`.

## Requirements

1. Return cached result on repeat
2. Separate calls for different args
3. Use functools.wraps

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/medium/13-caching-decorator/`. Reference write-ups in this repo live under `challenges/medium/13-caching-decorator/` (not loaded by the app).

```python
import functools
from collections.abc import Callable
from typing import TypeVar

F = TypeVar("F", bound=Callable[..., object])

def memoize(func: F) -> F:
    # TODO
    raise NotImplementedError
```

## Hints

1. cache: dict[tuple, object] = {}
2. key = (args, frozenset(kwargs.items()))
3. or use functools.lru_cache

## Acceptance criteria

- [ ] **Second call skips work**
  Second call skips work. Write a small script or pytest test that demonstrates this behavior matches Caching Decorator.

- [ ] **Different args recompute**
  Different args recompute: Separate calls for different args. Write a small script or pytest test that demonstrates this behavior matches Caching Decorator.

- [ ] **Metadata preserved**
  Metadata preserved. Write a small script or pytest test that demonstrates this behavior matches Caching Decorator.

## Resources

- [functools – reference](https://docs.python.org/3/library/functools.html)
- [Python Tutorial](https://docs.python.org/3/tutorial/)
