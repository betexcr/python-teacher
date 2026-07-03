# Grep Lite

**Difficulty:** easy  
**Topics:** files, search

## Learning goals

- Search lines in a file
- Return line numbers

## Challenge

Implement `find_matches(path: Path, needle: str) -> list[tuple[int, str]]` returning (line_no, line_text) for case-sensitive substring matches.

## Requirements

1. Line numbers start at 1
2. Case sensitive
3. Empty needle matches every line

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/easy/19-text-search/`. Reference write-ups in this repo live under `challenges/easy/19-text-search/` (not loaded by the app).

```python
from pathlib import Path

def find_matches(path: Path, needle: str) -> list[tuple[int, str]]:
    # TODO
    raise NotImplementedError
```

## Hints

1. enumerate(path.read_text().splitlines(), start=1)
2. if needle in line
3. strip optional

## Acceptance criteria

- [ ] **Correct line numbers**
  Correct line numbers. Write a small script or pytest test that demonstrates this behavior matches Grep Lite.

- [ ] **Multiple matches returned**
  Multiple matches returned. Write a small script or pytest test that demonstrates this behavior matches Grep Lite.

- [ ] **Missing file raises**
  Missing file raises. Write a small script or pytest test that demonstrates this behavior matches Grep Lite.

## Resources

- [files – reference](https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files)
- [search – reference](https://docs.python.org/3/library/re.html)
