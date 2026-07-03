# Solution: Generator Pipeline

## Approach

Each stage yields from previous; pipeline stays lazy end-to-end.

## Key concepts

- **yield from**: Delegates iteration to a sub-iterator cleanly.
- **lazy pipeline**: Process one row at a time for memory efficiency.

## Code highlights

- `def parse_csv_rows(lines: Iterator[str]) -> Iterator[list[str]]:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `def skip_comments(lines: Iterator[str]) -> Iterator[str]:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `def read_lines(path: Path) -> Iterator[str]:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `with path.open(encoding="utf-8") as fh:` — **with** — Context manager — setup on enter, cleanup on exit even if an exception occurs. read_lines streams file; skip_comments filters; parse_csv_rows splits. Compose with nested calls.
- `yield from fh` — **yield** — Produces the next value lazily without building the whole sequence in memory. read_lines streams file; skip_comments filters; parse_csv_rows splits. Compose with nested calls.

## Solution code

```python
from collections.abc import Iterator
from pathlib import Path

def read_lines(path: Path) -> Iterator[str]:
    with path.open(encoding="utf-8") as fh:
        yield from fh

def skip_comments(lines: Iterator[str]) -> Iterator[str]:
    for line in lines:
        stripped = line.strip()
        if stripped and not stripped.startswith("#"):
            yield stripped

def parse_csv_rows(lines: Iterator[str]) -> Iterator[list[str]]:
    for line in lines:
        yield [part.strip() for part in line.split(",")]
```

## Walkthrough

read_lines streams file; skip_comments filters; parse_csv_rows splits. Compose with nested calls.

## Common mistakes

- Building full list upfront
- Not stripping parts

## Stretch goals

- TypedDict row parser
- Handle quoted CSV fields
