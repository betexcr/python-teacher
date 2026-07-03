# Solution: Grep Lite

## Approach

Stream lines with enumerate; collect hits.

## Key concepts

- **enumerate start**: start=1 aligns with human line numbers.
- **substring search**: in operator is fine for grep-lite.

## Code highlights

- `def find_matches(path: Path, needle: str) -> list[tuple[int, str]]:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `for lineno, line in enumerate(text.splitlines(), start=1)` — **for loop** — Iterates over a sequence. Read file, enumerate from 1, keep lines where needle substring appears.
- `return [` — **return** — Returns the computed result to the caller. Read file, enumerate from 1, keep lines where needle substring appears.

## Solution code

```python
from pathlib import Path

def find_matches(path: Path, needle: str) -> list[tuple[int, str]]:
    text = path.read_text(encoding="utf-8")
    return [
        (lineno, line)
        for lineno, line in enumerate(text.splitlines(), start=1)
        if needle in line
    ]
```

## Walkthrough

Read file, enumerate from 1, keep lines where needle substring appears.

## Common mistakes

- 0-based line numbers
- Loading binary files as text blindly

## Stretch goals

- Regex mode
- Generator for huge files
