# Event-Sourced Domain

**Difficulty:** very-hard  
**Topics:** event-sourcing, ddd

## Learning goals

- Append domain events
- Rebuild aggregate state

## Challenge

Model `BankAccount` aggregate with events `AccountOpened`, `MoneyDeposited`, `MoneyWithdrawn`; rebuild balance from event log.

## Requirements

1. Immutable event dataclasses
2. apply(event) mutates state
3. withdraw cannot overdraw

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/very-hard/03-event-sourced-domain/`. Reference write-ups in this repo live under `challenges/very-hard/03-event-sourced-domain/` (not loaded by the app).

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class AccountOpened:
    account_id: str

@dataclass(frozen=True)
class MoneyDeposited:
    amount: int

@dataclass(frozen=True)
class MoneyWithdrawn:
    amount: int

class BankAccount:
    def __init__(self, account_id: str) -> None:
        self.account_id = account_id
        self.balance = 0
        self._events: list[object] = []

    def deposit(self, amount: int) -> None:
        # TODO emit event
        ...

    def withdraw(self, amount: int) -> None:
        ...
```

## Hints

1. self._events.append(MoneyDeposited(amount))
2. self.apply(event) updates balance
3. if amount > self.balance: raise

## Acceptance criteria

- [ ] **Events recorded**
  Events recorded. Write a small script or pytest test that demonstrates this behavior matches Event-Sourced Domain.

- [ ] **Balance correct after replay**
  Balance correct after replay. Write a small script or pytest test that demonstrates this behavior matches Event-Sourced Domain.

- [ ] **Overdraft blocked**
  Overdraft blocked. Write a small script or pytest test that demonstrates this behavior matches Event-Sourced Domain.

## Resources

- [event-sourcing – reference](https://martinfowler.com/eaaDev/EventSourcing.html)
- [Python Tutorial](https://docs.python.org/3/tutorial/)
