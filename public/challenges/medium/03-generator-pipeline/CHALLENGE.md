# Generator Pipeline

**Difficulty:** medium  
**Topics:** generators, iterators

## Learning goals

- Chain lazy iterators
- Avoid materializing large lists

## Challenge

Implement `read_lines(path)`, `skip_comments(lines)`, and `parse_csv_rows(lines)` as generators yielding stripped non-comment CSV rows.

## Requirements

1. Lines starting with # skipped
2. Yield stripped strings
3. Compose without list()

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/medium/03-generator-pipeline/`. Reference write-ups in this repo live under `challenges/medium/03-generator-pipeline/` (not loaded by the app).

```python
from collections.abc import Iterator
from pathlib import Path

def read_lines(path: Path) -> Iterator[str]:
    # TODO
    raise NotImplementedError

def skip_comments(lines: Iterator[str]) -> Iterator[str]:
    ...

def parse_csv_rows(lines: Iterator[str]) -> Iterator[list[str]]:
    ...
```

## Hints

1. yield from path.open()
2. if not line.lstrip().startswith("#")
3. line.split(",")

## Acceptance criteria

- [ ] **Comments skipped**
  Comments skipped. Write a small script or pytest test that demonstrates this behavior matches Generator Pipeline.

- [ ] **Lazy iteration**
  Lazy iteration. Write a small script or pytest test that demonstrates this behavior matches Generator Pipeline.

- [ ] **CSV split correct**
  CSV split correct. Write a small script or pytest test that demonstrates this behavior matches Generator Pipeline.

## Resources

- [generators – reference](https://docs.python.org/3/howto/functional.html#generators)
- [Python Tutorial](https://docs.python.org/3/tutorial/)
