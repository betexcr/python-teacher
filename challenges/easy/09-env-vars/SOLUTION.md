# Solution: Environment Config

## Approach

Read os.environ, apply defaults, fail fast on required vars.

## Key concepts

- **12-factor config**: Store config in the environment, not code.
- **Fail fast**: Raise at startup when required env is missing.

## Code highlights

- `return Settings(app_env=app_env, database_url=database_url)` — **return** — Returns the computed result to the caller. Pull APP_ENV with default dev, require DATABASE_URL, return immutable Settings dataclass.
- `raise RuntimeError("DATABASE_URL is required")` — **raise** — Fail fast with a clear error when input or state is invalid. Pull APP_ENV with default dev, require DATABASE_URL, return immutable Settings dataclass.
- `@dataclass(frozen=True)
class Settings` — **dataclass Settings** — `Settings` is a dataclass — boilerplate __init__, __repr__, and comparisons are generated. Pull APP_ENV with default dev, require DATABASE_URL, return immutable Settings dataclass.
- `def load_settings() -> Settings:` — **type hints** — Return and parameter types document the contract and enable static checking.

## Solution code

```python
import os
from dataclasses import dataclass

@dataclass(frozen=True)
class Settings:
    app_env: str
    database_url: str

def load_settings() -> Settings:
    app_env = os.environ.get("APP_ENV", "dev")
    database_url = os.environ.get("DATABASE_URL")
    if not database_url:
        raise RuntimeError("DATABASE_URL is required")
    return Settings(app_env=app_env, database_url=database_url)
```

## Walkthrough

Pull APP_ENV with default dev, require DATABASE_URL, return immutable Settings dataclass.

## Common mistakes

- Hard-coding secrets
- Silently using empty string for missing URL

## Stretch goals

- Coerce APP_ENV to Literal dev/staging/prod
- Use pydantic-settings later
