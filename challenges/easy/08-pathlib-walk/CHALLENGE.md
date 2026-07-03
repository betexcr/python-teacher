# Find Python Files

**Difficulty:** easy  
**Topics:** pathlib, filesystem

## Learning goals

- Walk directories with pathlib
- Filter by extension

## Challenge

Return sorted paths of all `.py` files under a root directory (recursive), skipping `__pycache__` folders.

## Requirements

1. Paths relative to root or absolute ok
2. Sorted ascending
3. Skip __pycache__ directories

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/easy/08-pathlib-walk/`. Reference write-ups in this repo live under `challenges/easy/08-pathlib-walk/` (not loaded by the app).

```python
from pathlib import Path

def find_python_files(root: Path) -> list[Path]:
    # TODO
    raise NotImplementedError
```

## Hints

1. root.rglob("*.py")
2. if "__pycache__" in p.parts: continue
3. sorted(...)

## Acceptance criteria

- [ ] **Finds nested .py files**
  Finds nested .py files. Write a small script or pytest test that demonstrates this behavior matches Find Python Files.

- [ ] **Skips __pycache__**
  Skips __pycache__. Write a small script or pytest test that demonstrates this behavior matches Find Python Files.

- [ ] **Sorted output**
  Sorted output: Sorted ascending. Write a small script or pytest test that demonstrates this behavior matches Find Python Files.

## Resources

- [pathlib – Python docs](https://docs.python.org/3/library/pathlib.html)
- [Python Tutorial](https://docs.python.org/3/tutorial/)
