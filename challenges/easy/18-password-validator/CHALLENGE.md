# Password Validator

**Difficulty:** easy  
**Topics:** validation, strings

## Learning goals

- Encode password rules clearly
- Return structured errors

## Challenge

Validate passwords: min length 8, at least one digit, one uppercase, one lowercase. Return `(ok: bool, errors: list[str])`.

## Requirements

1. Return all failed rules
2. Empty password fails
3. Do not mutate input

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/easy/18-password-validator/`. Reference write-ups in this repo live under `challenges/easy/18-password-validator/` (not loaded by the app).

```python
import re

def validate_password(password: str) -> tuple[bool, list[str]]:
    # TODO
    raise NotImplementedError
```

## Hints

1. any(c.isdigit() for c in password)
2. collect messages in list
3. ok = not errors

## Acceptance criteria

- [ ] **Strong password passes**
  Strong password passes. Write a small script or pytest test that demonstrates this behavior matches Password Validator.

- [ ] **Weak lists errors**
  Weak lists errors. Write a small script or pytest test that demonstrates this behavior matches Password Validator.

- [ ] **Multiple errors at once**
  Multiple errors at once. Write a small script or pytest test that demonstrates this behavior matches Password Validator.

## Resources

- [validation – reference](https://docs.python.org/3/library/exceptions.html)
- [str – Python docs](https://docs.python.org/3/library/stdtypes.html#text-sequence-type-str)
