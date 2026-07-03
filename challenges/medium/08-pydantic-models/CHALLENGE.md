# Pydantic Models

**Difficulty:** medium  
**Topics:** pydantic, validation

## Learning goals

- Define BaseModel schemas
- Parse and export JSON

## Challenge

Create `Product` model with `name: str`, `price: float > 0`, `tags: list[str] = []`. Implement `from_json(data: str) -> Product`.

## Requirements

1. Reject price <= 0
2. Default empty tags
3. model_dump_json round trip

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/medium/08-pydantic-models/`. Reference write-ups in this repo live under `challenges/medium/08-pydantic-models/` (not loaded by the app).

```python
from pydantic import BaseModel, Field

class Product(BaseModel):
    name: str
    price: float = Field(gt=0)
    tags: list[str] = []

def from_json(data: str) -> Product:
    # TODO
    raise NotImplementedError
```

## Hints

1. Product.model_validate_json(data)
2. Field(gt=0)
3. tags default factory not needed with = []

## Acceptance criteria

- [ ] **Valid JSON parses**
  Valid JSON parses. Write a small script or pytest test that demonstrates this behavior matches Pydantic Models.

- [ ] **Bad price fails**
  Bad price fails. Write a small script or pytest test that demonstrates this behavior matches Pydantic Models.

- [ ] **Defaults applied**
  Defaults applied. Write a small script or pytest test that demonstrates this behavior matches Pydantic Models.

## Resources

- [Pydantic documentation](https://docs.pydantic.dev/latest/)
- [validation – reference](https://docs.python.org/3/library/exceptions.html)
