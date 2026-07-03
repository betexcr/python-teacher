# Solution: File Line Counter

## Approach

Read the file as UTF-8 text and count lines with content after strip.

## Key concepts

- **pathlib**: Object-oriented paths replace manual string joins.
- **Context-free read**: read_text is fine for small files in exercises.

## Code highlights

- `return sum(1 for line in text.splitlines() if line.strip())` — **return** — Returns the computed result to the caller. Verify the path is a file, read UTF-8 text, split lines, and count those with stripped content.
- `def count_lines(path: Path) -> int:` — **type hints** — Return and parameter types document the contract and enable static checking.

## Solution code

```python
from pathlib import Path

def count_lines(path: Path) -> int:
    if not path.is_file():
        raise FileNotFoundError(path)
    text = path.read_text(encoding="utf-8")
    return sum(1 for line in text.splitlines() if line.strip())
```

## Walkthrough

Verify the path is a file, read UTF-8 text, split lines, and count those with stripped content.

## Common mistakes

- Counting newline characters manually
- Opening without encoding on Windows

## Stretch goals

- Stream large files line by line
- Add optional comment prefix skip
