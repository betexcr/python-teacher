# Strategy Pattern

## What they are

The strategy pattern encapsulates interchangeable algorithms behind a common interface. The context delegates work to a strategy object. Swap strategies at runtime without changing the context's code — useful for pricing rules, compression formats, sorting policies, or payment processors.

## When to use

- Multiple algorithms for the same task (tax calculation by region)
- Avoiding large `if/elif` or `match` blocks in business logic
- Testing each strategy in isolation
- Open-closed principle: add new strategies without editing existing classes

## Protocol-based strategies

```python
from typing import Protocol

class DiscountStrategy(Protocol):
    def apply(self, subtotal: float) -> float: ...

class NoDiscount:
    def apply(self, subtotal: float) -> float:
        return subtotal

class PercentOff:
    def __init__(self, percent: float):
        self.percent = percent

    def apply(self, subtotal: float) -> float:
        return subtotal * (1 - self.percent / 100)

class FixedAmount:
    def __init__(self, amount: float):
        self.amount = amount

    def apply(self, subtotal: float) -> float:
        return max(0, subtotal - self.amount)
```

Each strategy is a small class with one responsibility.

## Context using a strategy

```python
class Checkout:
    def __init__(self, discount: DiscountStrategy):
        self._discount = discount

    def total(self, items: list[float]) -> float:
        subtotal = sum(items)
        return round(self._discount.apply(subtotal), 2)

checkout = Checkout(PercentOff(15))
assert checkout.total([100.0, 50.0]) == 127.50
```

Inject the strategy via constructor (DI). Change behavior by passing a different strategy — no subclassing `Checkout`.

## Functions as strategies

In Python, plain functions work too when they match the call signature:

```python
def loyalty_discount(subtotal: float) -> float:
    return subtotal * 0.9 if subtotal > 100 else subtotal

checkout = Checkout(loyalty_discount)
```

Use classes when strategies hold state; use functions for stateless one-liners.

## Tradeoffs

| Aspect | Details |
|--------|---------|
| Pros | Clean separation, easy to test, extensible without modifying context |
| Cons | More types/files for simple cases; overkill for a single branch |
| Interview angle | Contrast strategy with template method; show runtime strategy swapping |
