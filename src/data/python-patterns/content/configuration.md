# Configuration with pydantic-settings

## What they are

`pydantic-settings` loads and validates application configuration from environment variables, `.env` files, and secrets. Settings are typed Python objects — invalid values fail at startup with clear errors instead of crashing mid-request.

## When to use

- Twelve-factor apps that read config from the environment
- Typed settings with defaults and validation rules
- Separating dev/staging/prod via `.env` files
- Nested settings (database URL, feature flags, API keys)

## Basic Settings class

```python
from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )

    app_name: str = "my-service"
    debug: bool = False
    database_url: str = Field(..., description="PostgreSQL connection string")
    max_connections: int = Field(default=10, ge=1, le=100)

settings = Settings()
```

`Field(...)` marks required values. Pydantic coerces types (`"true"` → `True` for bool) and validates constraints.

## Environment variable aliases

```python
class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_prefix="APP_")

    redis_url: str = "redis://localhost:6379"
    # reads APP_REDIS_URL from environment
```

Prefix keeps env vars namespaced. Override field names with `Field(validation_alias="SECRET_KEY")`.

## Nested and computed settings

```python
from pydantic import computed_field

class DatabaseSettings(BaseSettings):
    host: str = "localhost"
    port: int = 5432
    name: str = "app"

    @computed_field
    @property
    def url(self) -> str:
        return f"postgresql://{self.host}:{self.port}/{self.name}"

class Settings(BaseSettings):
    db: DatabaseSettings = DatabaseSettings()
```

Compose settings from sub-models. Use `@computed_field` for derived values that should not be set directly.

## Tradeoffs

| Aspect | Details |
|--------|---------|
| Pros | Validation at import, great IDE support, `.env` support built in |
| Cons | Extra dependency; secrets still need secure storage (not committed `.env`) |
| Interview angle | Contrast with `os.environ.get`; explain fail-fast validation and `Field` constraints |
