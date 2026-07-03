# Solution: Pydantic Models

## Approach

Pydantic validates on construction; use model_validate_json for input.

## Key concepts

- **BaseModel**: Declarative schema with validation and serialization.
- **Field constraints**: gt/ge/len embed rules beside types.

## Code highlights

- `return Product.model_validate_json(data)` — **return** — Returns the computed result to the caller. model_validate_json parses and validates; Field(gt=0) rejects non-positive prices; tags default to [].
- `def from_json(data: str) -> Product:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `class Product(BaseModel)` — **Pydantic Product** — Validates and parses incoming data into typed Python objects. model_validate_json parses and validates; Field(gt=0) rejects non-positive prices; tags default to [].

## Solution code

```python
from pydantic import BaseModel, Field

class Product(BaseModel):
    name: str
    price: float = Field(gt=0)
    tags: list[str] = []

def from_json(data: str) -> Product:
    return Product.model_validate_json(data)
```

## Walkthrough

model_validate_json parses and validates; Field(gt=0) rejects non-positive prices; tags default to [].

## Common mistakes

- Manual json.loads without validation
- Mutable default list without Field(default_factory) in older code

## Stretch goals

- model_validator for cross-field rules
- Add SKU pattern
