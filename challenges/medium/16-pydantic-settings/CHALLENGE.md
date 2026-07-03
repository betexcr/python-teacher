# Pydantic Settings

**Difficulty:** medium  
**Topics:** pydantic-settings, config

## Learning goals

- Load settings from env
- Validate types at startup

## Challenge

Define `Settings(BaseSettings)` with `database_url: str`, `debug: bool = False`, `port: int = 8000` loading from environment.

## Requirements

1. DATABASE_URL required
2. DEBUG parses bool
3. model_config env prefix APP_ optional

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/medium/16-pydantic-settings/`. Reference write-ups in this repo live under `challenges/medium/16-pydantic-settings/` (not loaded by the app).

```python
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")
    # TODO fields

def load_settings() -> Settings:
    ...
```

## Hints

1. database_url: str
2. debug: bool = False
3. return Settings()

## Acceptance criteria

- [ ] **Missing DB URL fails**
  Missing DB URL fails. Write a small script or pytest test that demonstrates this behavior matches Pydantic Settings.

- [ ] **Defaults apply**
  Defaults apply. Write a small script or pytest test that demonstrates this behavior matches Pydantic Settings.

- [ ] **Env overrides work**
  Env overrides work: model_config env prefix APP_ optional. Write a small script or pytest test that demonstrates this behavior matches Pydantic Settings.

## Resources

- [pydantic-settings – reference](https://docs.pydantic.dev/latest/concepts/pydantic_settings/)
- [config – reference](https://docs.python.org/3/library/configparser.html)
