# Solution: JSON Config Reader

## Approach

Parse JSON, ensure dict root, then validate required string fields.

## Key concepts

- **json.load**: Reads and parses a file object or use read_text + loads.
- **Schema-lite validation**: Check types before trusting config values.

## Code highlights

- `def load_config(path: Path) -> dict[str, str]:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `raise ValueError(f"missing or invalid {key}")` — **raise** — Fail fast with a clear error when input or state is invalid. Parse JSON to a Python value, reject non-dicts, verify each required key is a non-empty string, return a slim dict.
- `return {k: data[k] for k in REQUIRED_KEYS}` — **return** — Returns the computed result to the caller. Parse JSON to a Python value, reject non-dicts, verify each required key is a non-empty string, return a slim dict.
- `raise ValueError("root must be object")` — **raise** — Fail fast with a clear error when input or state is invalid. Parse JSON to a Python value, reject non-dicts, verify each required key is a non-empty string, return a slim dict.

## Solution code

```python
import json
from pathlib import Path

REQUIRED_KEYS = ("name", "version")

def load_config(path: Path) -> dict[str, str]:
    data = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(data, dict):
        raise ValueError("root must be object")
    for key in REQUIRED_KEYS:
        value = data.get(key)
        if not isinstance(value, str) or not value:
            raise ValueError(f"missing or invalid {key}")
    return {k: data[k] for k in REQUIRED_KEYS}
```

## Walkthrough

Parse JSON to a Python value, reject non-dicts, verify each required key is a non-empty string, return a slim dict.

## Common mistakes

- Trusting any JSON shape
- Catching JSONDecodeError and returning {}

## Stretch goals

- Support nested settings with defaults
- Use pydantic later in medium track
