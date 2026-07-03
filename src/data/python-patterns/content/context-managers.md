# Context Managers

## What they are

Context managers guarantee setup and teardown around a block of code. The `with` statement calls `__enter__` at the start and `__exit__` when the block finishes — even if an exception is raised. This pattern prevents resource leaks for files, locks, database connections, and temporary state changes.

## When to use

- Opening files, sockets, or database connections
- Acquiring and releasing locks
- Temporarily changing global settings (locale, working directory, logging level)
- Wrapping transactions that must commit or roll back

## Class-based context manager

```python
class Timer:
    def __enter__(self):
        import time
        self.start = time.perf_counter()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        elapsed = time.perf_counter() - self.start
        print(f"Elapsed: {elapsed:.3f}s")
        return False  # do not suppress exceptions

with Timer():
    total = sum(range(1_000_000))
```

Returning `False` from `__exit__` lets exceptions propagate. Return `True` only when you intentionally swallow them.

## @contextmanager decorator

```python
from contextlib import contextmanager

@contextmanager
def temporary_env(key: str, value: str):
    import os
    old = os.environ.get(key)
    os.environ[key] = value
    try:
        yield
    finally:
        if old is None:
            del os.environ[key]
        else:
            os.environ[key] = old

with temporary_env("APP_MODE", "test"):
    assert os.environ["APP_MODE"] == "test"
```

The code before `yield` is setup; the `finally` block after `yield` is teardown. Use `try/finally` inside the generator so cleanup always runs.

## Built-in and standard library managers

- `open()` — closes file handles automatically
- `contextlib.suppress(ValueError)` — ignore specific exceptions in a block
- `contextlib.ExitStack` — manage multiple dynamic context managers

## Tradeoffs

| Aspect | Details |
|--------|---------|
| Pros | Reliable cleanup, readable resource scope, composable with `with` |
| Cons | Class-based managers need two methods; generator managers require careful `try/finally` |
| Interview angle | Explain why `with open(...)` beats manual `close()`, and how `__exit__` receives exception info |
