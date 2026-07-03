# JSON Config Reader

**Difficulty:** easy  
**Topics:** json, files

## Learning goals

- Load JSON safely
- Validate required keys

## Challenge

Load a JSON object from disk and return it only if it contains required keys `name` and `version` (both strings). Otherwise raise `ValueError`.

## Requirements

1. Use json module
2. Root must be an object
3. Missing keys or wrong types raise ValueError

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/easy/04-json-reader/`. Reference write-ups in this repo live under `challenges/easy/04-json-reader/` (not loaded by the app).

```python
import json
from pathlib import Path

def load_config(path: Path) -> dict[str, str]:
    # TODO
    raise NotImplementedError
```

## Hints

1. json.loads or json.load
2. isinstance(x, str)
3. REQUIRED = ("name", "version")

## Acceptance criteria

- [ ] **Valid JSON loads**
  Valid JSON loads. Write a small script or pytest test that demonstrates this behavior matches JSON Config Reader.

- [ ] **Missing key fails**
  Missing key fails: Missing keys or wrong types raise ValueError. Write a small script or pytest test that demonstrates this behavior matches JSON Config Reader.

- [ ] **Non-object root fails**
  Non-object root fails. Write a small script or pytest test that demonstrates this behavior matches JSON Config Reader.

## Resources

- [json – reference](https://docs.python.org/3/library/json.html)
- [files – reference](https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files)
