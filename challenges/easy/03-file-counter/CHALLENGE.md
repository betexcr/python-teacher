# File Line Counter

**Difficulty:** easy  
**Topics:** files, io

## Learning goals

- Read text files safely
- Count non-empty lines

## Challenge

Write `count_lines(path: Path) -> int` that returns how many non-empty lines a UTF-8 text file contains.

## Requirements

1. Use pathlib.Path
2. Ignore blank lines
3. Raise FileNotFoundError if missing

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/easy/03-file-counter/`. Reference write-ups in this repo live under `challenges/easy/03-file-counter/` (not loaded by the app).

```python
from pathlib import Path

def count_lines(path: Path) -> int:
  # TODO
  raise NotImplementedError
```

## Hints

1. path.read_text(encoding="utf-8")
2. splitlines() handles newlines
3. if line.strip()

## Acceptance criteria

- [ ] **Counts non-empty lines**
  Counts non-empty lines. Write a small script or pytest test that demonstrates this behavior matches File Line Counter.

- [ ] **Empty file returns 0**
  Empty file returns 0. Write a small script or pytest test that demonstrates this behavior matches File Line Counter.

- [ ] **Missing file raises**
  Missing file raises: Raise FileNotFoundError if missing. Write a small script or pytest test that demonstrates this behavior matches File Line Counter.

## Resources

- [files – reference](https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files)
- [io – reference](https://docs.python.org/3/library/io.html)
