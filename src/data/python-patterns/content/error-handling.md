# Error Handling Patterns

## What they are

Python uses exceptions for error flow. Good error handling means raising the right exception type, preserving context with chaining, defining domain-specific errors, and failing fast at boundaries while keeping business logic readable.

## When to use

- Validate inputs at system boundaries (API, CLI, file parse)
- Distinguish recoverable errors (retry) from fatal ones (abort)
- Wrap low-level exceptions with domain meaning
- Return structured error responses in web apps without bare `except:`

## Custom exception hierarchy

```python
class AppError(Exception):
    """Base for all application errors."""

class NotFoundError(AppError):
    def __init__(self, resource: str, id: str):
        super().__init__(f"{resource} {id!r} not found")
        self.resource = resource
        self.id = id

class ValidationError(AppError):
    def __init__(self, field: str, message: str):
        super().__init__(f"{field}: {message}")
        self.field = field
```

Catch `AppError` at the HTTP layer to map all domain failures to consistent responses.

## Exception chaining

```python
def load_config(path: str) -> dict:
    try:
        with open(path) as f:
            return json.load(f)
    except OSError as exc:
        raise AppError(f"Cannot read config {path!r}") from exc
    except json.JSONDecodeError as exc:
        raise ValidationError("config", f"Invalid JSON at line {exc.lineno}") from exc
```

`raise ... from exc` sets `__cause__` — tracebacks show both the wrapper and the original error.

## EAFP vs LBYL

- **EAFP** (Easier to Ask Forgiveness than Permission): `try`/`except` — idiomatic in Python
- **LBYL** (Look Before You Leap): check conditions first — use when exceptions are expensive or unclear

```python
# EAFP — preferred for dict/key access
try:
    value = mapping[key]
except KeyError:
    value = default

# LBYL — fine for simple guards
if key in mapping:
    value = mapping[key]
```

## Tradeoffs

| Aspect | Details |
|--------|---------|
| Pros | Clear error types, rich tracebacks with chaining, no error-code plumbing |
| Cons | Bare `except:` hides bugs; over-catching swallows `KeyboardInterrupt` if careless |
| Interview angle | Never use bare `except:`; explain `raise from`; design exception hierarchies |
