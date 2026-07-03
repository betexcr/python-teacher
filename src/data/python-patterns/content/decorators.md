# Decorators

## What they are

Decorators wrap a callable to add behavior — logging, timing, authentication, caching — without changing every call site. Syntax `@decorator` above a function is shorthand for `func = decorator(func)`. Decorators are themselves functions (or callables) that take a function and return a new function.

## When to use

- Cross-cutting concerns shared across many functions
- Enforcing policies (auth, rate limits, retries)
- Registering handlers (Flask routes, pytest fixtures)
- Preserving the original function's metadata with `functools.wraps`

## Basic decorator

```python
import functools
import time

def timed(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"{func.__name__} took {elapsed:.3f}s")
        return result
    return wrapper

@timed
def fetch_data(url: str) -> dict:
    return {"url": url, "status": "ok"}
```

`@functools.wraps(func)` copies `__name__`, `__doc__`, and annotations to `wrapper` so debugging and introspection still work.

## Decorators with arguments

```python
def retry(max_attempts: int = 3):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            last_error = None
            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except Exception as exc:
                    last_error = exc
            raise last_error
        return wrapper
    return decorator

@retry(max_attempts=3)
def call_api():
    ...
```

Parameterized decorators are factories: the outer function receives decorator arguments, the middle returns the actual decorator, the inner wraps the target function.

## Class and method decorators

- `@staticmethod` and `@classmethod` change how methods bind
- `@property` turns a method into a computed attribute
- `@dataclass` generates `__init__`, `__repr__`, and more (see the dataclasses guide)

## Tradeoffs

| Aspect | Details |
|--------|---------|
| Pros | DRY cross-cutting logic, clean call sites, composable stacking |
| Cons | Stack depth grows; overuse hides control flow; debugging can be harder |
| Interview angle | Describe decorator syntax, `wraps`, and parameterized decorator structure |
