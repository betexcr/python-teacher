# Solution: Pydantic Settings

## Approach

BaseSettings reads env; validation happens on Settings() instantiation.

## Key concepts

- **BaseSettings**: Pydantic model populated from environment variables.
- **fail fast**: Invalid config raises before app serves traffic.

## Code highlights

- `def load_settings() -> Settings:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `return Settings()` — **return** — Returns the computed result to the caller. Settings declares fields with types; instantiation reads env and .env; missing required fields error early.

## Solution code

```python
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")
    database_url: str
    debug: bool = False
    port: int = 8000

def load_settings() -> Settings:
    return Settings()
```

## Walkthrough

Settings declares fields with types; instantiation reads env and .env; missing required fields error early.

## Common mistakes

- Manual os.environ parsing
- Silently ignoring type errors

## Stretch goals

- Secrets from SecretStr
- Nested settings groups
