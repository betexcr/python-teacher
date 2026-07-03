# Solution: Find Python Files

## Approach

Use rglob and filter out cache segments before sorting.

## Key concepts

- **rglob**: Recursive glob from a Path anchor.
- **path.parts**: Tuple of path segments for cheap filtering.

## Code highlights

- `def find_python_files(root: Path) -> list[Path]:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `return sorted(files)` — **return** — Returns the computed result to the caller. rglob all Python files, skip any path containing __pycache__, return sorted list.

## Solution code

```python
from pathlib import Path

def find_python_files(root: Path) -> list[Path]:
    files: list[Path] = []
    for path in root.rglob("*.py"):
        if any(part == "__pycache__" for part in path.parts):
            continue
        files.append(path)
    return sorted(files)
```

## Walkthrough

rglob all Python files, skip any path containing __pycache__, return sorted list.

## Common mistakes

- Using os.walk when pathlib suffices
- Forgetting sorted output

## Stretch goals

- Add max depth limit
- Return file sizes too
