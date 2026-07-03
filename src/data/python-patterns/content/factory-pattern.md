# Factory Pattern

## What they are

A factory centralizes object creation. Instead of scattering `if/elif` chains or `import` logic across the codebase, a factory function or class decides which concrete type to instantiate based on configuration, input data, or environment.

## When to use

- Creating objects whose concrete class depends on runtime config (`storage=local` vs `storage=s3`)
- Parsing external input (file extension, content type) into the right handler
- Hiding complex construction (many constructor args, optional dependencies)
- Registering plugins or drivers by name

## Simple factory function

```python
from typing import Protocol

class Storage(Protocol):
    def save(self, key: str, data: bytes) -> None: ...

class LocalStorage:
    def __init__(self, base_path: str):
        self.base_path = base_path

    def save(self, key: str, data: bytes) -> None:
        path = f"{self.base_path}/{key}"
        with open(path, "wb") as f:
            f.write(data)

class S3Storage:
    def save(self, key: str, data: bytes) -> None:
        ...  # boto3 upload

def create_storage(backend: str, **kwargs) -> Storage:
    if backend == "local":
        return LocalStorage(kwargs["base_path"])
    if backend == "s3":
        return S3Storage()
    raise ValueError(f"Unknown backend: {backend}")

storage = create_storage("local", base_path="/tmp/data")
```

Callers depend on `Storage`, not on `LocalStorage` or `S3Storage` directly.

## Registry-based factory

```python
_HANDLERS: dict[str, type] = {}

def register(kind: str):
    def decorator(cls):
        _HANDLERS[kind] = cls
        return cls
    return decorator

@register("csv")
class CsvParser:
    def parse(self, text: str) -> list[dict]:
        ...

@register("json")
class JsonParser:
    def parse(self, text: str) -> list[dict]:
        ...

def get_parser(kind: str):
    try:
        return _HANDLERS[kind]()
    except KeyError:
        raise ValueError(f"No parser for {kind!r}")
```

Decorators register implementations at import time. New formats add a class plus `@register` — no growing `if/elif` chain.

## Tradeoffs

| Aspect | Details |
|--------|---------|
| Pros | Single creation point, open for extension, hides construction complexity |
| Cons | Indirection — jump to definition to see which class is built; registries can hide import side effects |
| Interview angle | Compare simple factory vs abstract factory; show registry pattern for plugins |
