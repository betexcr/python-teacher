# Solution: TOML App Config

## Approach

Parse TOML, drill into tool.app, merge over DEFAULTS, coerce port.

## Key concepts

- **tomllib**: stdlib TOML parser in Python 3.11+.
- **shallow merge**: Defaults then user overrides for flat keys.

## Code highlights

- `def load_app_config(data: bytes) -> dict[str, object]:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `return merged` — **return** — Returns the computed result to the caller. Decode bytes, parse TOML, extract tool.app, merge defaults, int-cast port.

## Solution code

```python
import tomllib

DEFAULTS = {"host": "127.0.0.1", "port": 8000}

def load_app_config(data: bytes) -> dict[str, object]:
    doc = tomllib.loads(data.decode("utf-8"))
    section = doc.get("tool", {}).get("app", {})
    merged = {**DEFAULTS, **section}
    merged["port"] = int(merged["port"])
    return merged
```

## Walkthrough

Decode bytes, parse TOML, extract tool.app, merge defaults, int-cast port.

## Common mistakes

- Using yaml for simple config unintentionally
- Mutating DEFAULTS dict

## Stretch goals

- Validate with typed Settings
- Support env override layer
