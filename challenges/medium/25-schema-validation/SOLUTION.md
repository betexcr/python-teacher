# Solution: JSON Schema Validation

## Approach

Delegate to jsonschema; translate ValidationError to ValueError for app consistency.

## Key concepts

- **JSON Schema**: Declarative contract for JSON documents.
- **ValidationError**: Rich path info for failed schema checks.

## Code highlights

- `def validate_payload(data: dict, schema: dict) -> None:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `raise ValueError(exc.message) from exc` — **raise** — Fail fast with a clear error when input or state is invalid. jsonschema.validate raises on mismatch; catch and re-raise ValueError with schema message.

## Solution code

```python
from jsonschema import ValidationError, validate

def validate_payload(data: dict, schema: dict) -> None:
    try:
        validate(instance=data, schema=schema)
    except ValidationError as exc:
        raise ValueError(exc.message) from exc
```

## Walkthrough

jsonschema.validate raises on mismatch; catch and re-raise ValueError with schema message.

## Common mistakes

- Returning bool instead of raising
- Validating after persisting

## Stretch goals

- Collect all errors with iter_errors
- Generate schema from Pydantic
