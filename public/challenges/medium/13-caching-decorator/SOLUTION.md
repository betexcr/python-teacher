# Solution: Caching Decorator

## Approach

Dict cache in closure; build hashable key from args/kwargs; wraps preserves metadata.

## Key concepts

- **memoization**: Trade memory for speed on repeated pure calls.
- **hashable key**: kwargs need frozenset of items for dict key.

## Code highlights

- `def wrapper(*args: object, **kwargs: object) -> object:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `return wrapper  # type: ignore[return-value]` — **return** — Returns the computed result to the caller. Closure holds cache dict; key combines args tuple and frozenset of kwargs; return cached or compute.
- `def memoize(func: F) -> F:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `return cache[key]` — **return** — Returns the computed result to the caller. Closure holds cache dict; key combines args tuple and frozenset of kwargs; return cached or compute.

## Solution code

```python
import functools
from collections.abc import Callable
from typing import TypeVar

F = TypeVar("F", bound=Callable[..., object])

def memoize(func: F) -> F:
    cache: dict[tuple[tuple[object, ...], frozenset[tuple[str, object]]], object] = {}

    @functools.wraps(func)
    def wrapper(*args: object, **kwargs: object) -> object:
        key = (args, frozenset(kwargs.items()))
        if key not in cache:
            cache[key] = func(*args, **kwargs)
        return cache[key]
    return wrapper  # type: ignore[return-value]
```

## Walkthrough

Closure holds cache dict; key combines args tuple and frozenset of kwargs; return cached or compute.

## Common mistakes

- Using lists as cache keys
- Caching mutable results that change

## Stretch goals

- Use functools.lru_cache(maxsize=128)
- Add cache_info stats
