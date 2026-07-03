# Solution: Timer Context Manager

## Approach

Store start in enter; compute and print in exit; return None.

## Key concepts

- **context manager**: Guarantees setup/teardown around a with block.
- **__exit__ return**: Return True only to suppress exceptions.

## Code highlights

- `def __exit__(self, exc_type, exc, tb) -> None:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `def __init__(self, label: str) -> None:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `def __enter__(self) -> "Timer":` — **type hints** — Return and parameter types document the contract and enable static checking.
- `return self` — **return** — Returns the computed result to the caller. Enter captures start time; exit always prints duration; exceptions propagate because __exit__ returns None.

## Solution code

```python
import time

class Timer:
    def __init__(self, label: str) -> None:
        self.label = label
        self._start = 0.0

    def __enter__(self) -> "Timer":
        self._start = time.perf_counter()
        return self

    def __exit__(self, exc_type, exc, tb) -> None:
        elapsed = time.perf_counter() - self._start
        print(f"{self.label}: {elapsed:.4f}s")
```

## Walkthrough

Enter captures start time; exit always prints duration; exceptions propagate because __exit__ returns None.

## Common mistakes

- Returning True from __exit__
- Starting timer in __init__ instead of enter

## Stretch goals

- contextlib.contextmanager version
- Accumulate stats across runs
