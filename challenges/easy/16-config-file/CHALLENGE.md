# TOML App Config

**Difficulty:** easy  
**Topics:** tomllib, config

## Learning goals

- Load TOML configuration
- Apply defaults

## Challenge

Load `pyproject`-style TOML config from bytes using `tomllib` (3.11+) and return `[tool.app]` section with defaults `host=127.0.0.1`, `port=8000`.

## Requirements

1. Use tomllib.loads
2. Missing tool.app uses defaults
3. port coerced to int

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/easy/16-config-file/`. Reference write-ups in this repo live under `challenges/easy/16-config-file/` (not loaded by the app).

```python
import tomllib

DEFAULTS = {"host": "127.0.0.1", "port": 8000}

def load_app_config(data: bytes) -> dict[str, object]:
    # TODO
    raise NotImplementedError
```

## Hints

1. tomllib.loads(data)
2. doc.get("tool", {}).get("app", {})
3. {**DEFAULTS, **section}

## Acceptance criteria

- [ ] **Defaults apply**
  Defaults apply: Missing tool.app uses defaults. Write a small script or pytest test that demonstrates this behavior matches TOML App Config.

- [ ] **Overrides merge**
  Overrides merge. Write a small script or pytest test that demonstrates this behavior matches TOML App Config.

- [ ] **port is int**
  port is int: port coerced to int. Write a small script or pytest test that demonstrates this behavior matches TOML App Config.

## Resources

- [tomllib – reference](https://docs.python.org/3/library/tomllib.html)
- [config – reference](https://docs.python.org/3/library/configparser.html)
