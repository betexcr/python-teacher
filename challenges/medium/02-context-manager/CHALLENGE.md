# Timer Context Manager

**Difficulty:** medium  
**Topics:** contextlib, context-managers

## Learning goals

- Implement __enter__/__exit__
- Use contextlib.contextmanager alternative

## Challenge

Build `Timer(label: str)` context manager printing `{label}: {seconds:.4f}s` on exit, even when exceptions occur.

## Requirements

1. Measure block duration
2. Print on exit
3. Do not swallow exceptions

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/medium/02-context-manager/`. Reference write-ups in this repo live under `challenges/medium/02-context-manager/` (not loaded by the app).

```python
import time

class Timer:
    def __init__(self, label: str) -> None:
        self.label = label

    def __enter__(self) -> "Timer":
        # TODO
        raise NotImplementedError

    def __exit__(self, exc_type, exc, tb) -> None:
        ...
```

## Hints

1. self._start in __enter__
2. elapsed in __exit__
3. return None to propagate errors

## Acceptance criteria

- [ ] **Prints label and duration**
  Prints label and duration. Write a small script or pytest test that demonstrates this behavior matches Timer Context Manager.

- [ ] **Works with with statement**
  Works with with statement. Write a small script or pytest test that demonstrates this behavior matches Timer Context Manager.

- [ ] **Exception still raises**
  Exception still raises: Do not swallow exceptions. Write a small script or pytest test that demonstrates this behavior matches Timer Context Manager.

## Resources

- [contextlib – reference](https://docs.python.org/3/library/contextlib.html)
- [context-managers – reference](https://docs.python.org/3/reference/datamodel.html#context-managers)
