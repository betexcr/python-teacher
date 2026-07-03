# Dataclasses

## What they are

`@dataclass` generates boilerplate for data-holding classes: `__init__`, `__repr__`, `__eq__`, and optionally ordering methods. Fields are declared with type annotations. Dataclasses reduce ceremony compared to hand-written classes or untyped dicts.

## When to use

- DTOs, config records, API response shapes
- Immutable value objects (`frozen=True`)
- Nested structured data with clear field names
- When you need `__slots__` or custom `__post_init__` hooks

## Basic dataclass

```python
from dataclasses import dataclass, field
from datetime import datetime

@dataclass
class Order:
    id: str
    amount: float
    created_at: datetime = field(default_factory=datetime.utcnow)
    tags: list[str] = field(default_factory=list)

order = Order(id="ord_1", amount=29.99)
print(order)  # Order(id='ord_1', amount=29.99, ...)
```

Use `field(default_factory=list)` for mutable defaults — never `tags: list[str] = []`.

## Frozen and slots

```python
@dataclass(frozen=True, slots=True)
class Point:
    x: float
    y: float

    def distance_from_origin(self) -> float:
        return (self.x ** 2 + self.y ** 2) ** 0.5
```

`frozen=True` makes instances hashable and immutable. `slots=True` (Python 3.10+) reduces memory and prevents arbitrary attribute assignment.

## __post_init__ validation

```python
@dataclass
class Email:
    address: str

    def __post_init__(self):
        if "@" not in self.address:
            raise ValueError(f"Invalid email: {self.address}")
```

Run validation after auto-generated `__init__`. For complex validation, consider Pydantic models instead.

## Dataclass vs NamedTuple vs Pydantic

| Option | Best for |
|--------|----------|
| `@dataclass` | In-process records, stdlib only |
| `NamedTuple` | Immutable, tuple-like unpacking |
| Pydantic `BaseModel` | Parsing/validation from JSON, env vars |

## Tradeoffs

| Aspect | Details |
|--------|---------|
| Pros | Less boilerplate, readable fields, integrates with type checkers |
| Cons | Not a validation framework; mutable by default; inheritance can get tricky |
| Interview angle | Explain `default_factory`, `frozen`, and why mutable defaults need `field()` |
