# Environment Config

**Difficulty:** easy  
**Topics:** os.environ, config

## Learning goals

- Read env vars with defaults
- Validate required settings

## Challenge

Implement `load_settings()` reading `APP_ENV` (default `dev`) and required `DATABASE_URL`. Missing DATABASE_URL raises `RuntimeError`.

## Requirements

1. APP_ENV defaults to dev
2. DATABASE_URL required
3. Return typed dict or dataclass

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/easy/09-env-vars/`. Reference write-ups in this repo live under `challenges/easy/09-env-vars/` (not loaded by the app).

```python
import os
from dataclasses import dataclass

@dataclass(frozen=True)
class Settings:
    app_env: str
    database_url: str

def load_settings() -> Settings:
    # TODO
    raise NotImplementedError
```

## Hints

1. os.environ.get("APP_ENV", "dev")
2. os.getenv("DATABASE_URL")
3. raise RuntimeError if missing

## Acceptance criteria

- [ ] **Default APP_ENV**
  Default APP_ENV: APP_ENV defaults to dev. Write a small script or pytest test that demonstrates this behavior matches Environment Config.

- [ ] **Missing DB URL fails**
  Missing DB URL fails. Write a small script or pytest test that demonstrates this behavior matches Environment Config.

- [ ] **Returns Settings**
  Returns Settings. Write a small script or pytest test that demonstrates this behavior matches Environment Config.

## Resources

- [os.environ – reference](https://docs.python.org/3/library/os.html#os.environ)
- [config – reference](https://docs.python.org/3/library/configparser.html)
