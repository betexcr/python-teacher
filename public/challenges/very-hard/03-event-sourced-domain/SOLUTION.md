# Solution: Event-Sourced Domain

## Approach

Commands append events; apply updates state; replay reproduces aggregate.

## Key concepts

- **event sourcing**: State is derived from immutable event history.
- **aggregate**: Consistency boundary enforcing business rules.

## Code highlights

- `def replay(cls, events: list[object]) -> "BankAccount":` — **type hints** — Return and parameter types document the contract and enable static checking.
- `raise ValueError("first event must be AccountOpened")` — **raise** — Fail fast with a clear error when input or state is invalid. Commands validate, append events, apply to balance; replay rebuilds from scratch from event list.
- `@dataclass(frozen=True)
class MoneyDeposited` — **dataclass MoneyDeposited** — `MoneyDeposited` is a dataclass — boilerplate __init__, __repr__, and comparisons are generated. Commands validate, append events, apply to balance; replay rebuilds from scratch from event list.
- `@dataclass(frozen=True)
class MoneyWithdrawn` — **dataclass MoneyWithdrawn** — `MoneyWithdrawn` is a dataclass — boilerplate __init__, __repr__, and comparisons are generated. Commands validate, append events, apply to balance; replay rebuilds from scratch from event list.
- `def __init__(self, account_id: str) -> None:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `@dataclass(frozen=True)
class AccountOpened` — **dataclass AccountOpened** — `AccountOpened` is a dataclass — boilerplate __init__, __repr__, and comparisons are generated. Commands validate, append events, apply to balance; replay rebuilds from scratch from event list.
- `raise ValueError("amount must be positive")` — **raise** — Fail fast with a clear error when input or state is invalid. Commands validate, append events, apply to balance; replay rebuilds from scratch from event list.
- `def withdraw(self, amount: int) -> None:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `def apply(self, event: object) -> None:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `def deposit(self, amount: int) -> None:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `raise ValueError("insufficient funds")` — **raise** — Fail fast with a clear error when input or state is invalid. Commands validate, append events, apply to balance; replay rebuilds from scratch from event list.
- `return acc` — **return** — Returns the computed result to the caller. Commands validate, append events, apply to balance; replay rebuilds from scratch from event list.

## Solution code

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
        self._events: list[object] = [AccountOpened(account_id)]

    def apply(self, event: object) -> None:
        if isinstance(event, MoneyDeposited):
            self.balance += event.amount
        elif isinstance(event, MoneyWithdrawn):
            self.balance -= event.amount

    def deposit(self, amount: int) -> None:
        if amount <= 0:
            raise ValueError("amount must be positive")
        event = MoneyDeposited(amount)
        self._events.append(event)
        self.apply(event)

    def withdraw(self, amount: int) -> None:
        if amount <= 0:
            raise ValueError("amount must be positive")
        if amount > self.balance:
            raise ValueError("insufficient funds")
        event = MoneyWithdrawn(amount)
        self._events.append(event)
        self.apply(event)

    @classmethod
    def replay(cls, events: list[object]) -> "BankAccount":
        opened = events[0]
        if not isinstance(opened, AccountOpened):
            raise ValueError("first event must be AccountOpened")
        acc = cls(opened.account_id)
        acc._events = []
        acc.balance = 0
        for event in events:
            acc._events.append(event)
            acc.apply(event)
        return acc
```

## Walkthrough

Commands validate, append events, apply to balance; replay rebuilds from scratch from event list.

## Common mistakes

- Mutating events after append
- Updating balance without event

## Stretch goals

- Event store persistence
- Snapshots for long streams
