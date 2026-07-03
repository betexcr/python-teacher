# Solution: Password Validator

## Approach

Append rule messages; ok when errors empty.

## Key concepts

- **validation result**: Return errors list instead of raising for UX forms.
- **character classes**: isupper/islower/isdigit are clearer than regex alone.

## Code highlights

- `def validate_password(password: str) -> tuple[bool, list[str]]:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `return (len(errors) == 0, errors)` — **return** — Returns the computed result to the caller. Check each rule independently, collect messages, return tuple of pass flag and errors.

## Solution code

```python
def validate_password(password: str) -> tuple[bool, list[str]]:
    errors: list[str] = []
    if len(password) < 8:
        errors.append("must be at least 8 characters")
    if not any(c.islower() for c in password):
        errors.append("needs a lowercase letter")
    if not any(c.isupper() for c in password):
        errors.append("needs an uppercase letter")
    if not any(c.isdigit() for c in password):
        errors.append("needs a digit")
    return (len(errors) == 0, errors)
```

## Walkthrough

Check each rule independently, collect messages, return tuple of pass flag and errors.

## Common mistakes

- Return on first error only
- Regex-only without readability

## Stretch goals

- Check breached passwords via k-anonymity API
- zxcvbn scoring
