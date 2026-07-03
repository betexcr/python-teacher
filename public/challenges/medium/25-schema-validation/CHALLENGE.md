# JSON Schema Validation

**Difficulty:** medium  
**Topics:** jsonschema, validation

## Learning goals

- Validate payloads against schema
- Return readable errors

## Challenge

Implement `validate_payload(data: dict, schema: dict) -> None` using `jsonschema` raising `ValueError` with first error message.

## Requirements

1. Use jsonschema.validate
2. Map ValidationError to ValueError
3. No silent failures

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/medium/25-schema-validation/`. Reference write-ups in this repo live under `challenges/medium/25-schema-validation/` (not loaded by the app).

```python
from jsonschema import ValidationError, validate

def validate_payload(data: dict, schema: dict) -> None:
    # TODO
    raise NotImplementedError
```

## Hints

1. try: validate(data, schema)
2. except ValidationError as exc
3. raise ValueError(str(exc.message))

## Acceptance criteria

- [ ] **Valid data passes**
  Valid data passes: Use jsonschema.validate. Write a small script or pytest test that demonstrates this behavior matches JSON Schema Validation.

- [ ] **Invalid type fails**
  Invalid type fails. Write a small script or pytest test that demonstrates this behavior matches JSON Schema Validation.

- [ ] **Missing required fails**
  Missing required fails. Write a small script or pytest test that demonstrates this behavior matches JSON Schema Validation.

## Resources

- [validation – reference](https://docs.python.org/3/library/exceptions.html)
- [Python Tutorial](https://docs.python.org/3/tutorial/)
