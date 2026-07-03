# Solution: Bank Account Class

## Approach

Keep private balance, validate amounts, expose property for reading.

## Key concepts

- **Encapsulation**: Hide _balance; callers use methods and properties.
- **Invariants**: Methods enforce rules so balance never goes negative.

## Code highlights

- `raise ValueError("withdraw must be positive")` — **raise** — Fail fast with a clear error when input or state is invalid. Store _balance privately. deposit and withdraw validate positivity; withdraw also checks funds. balance is read-only via property.
- `raise ValueError("deposit must be positive")` — **raise** — Fail fast with a clear error when input or state is invalid. Store _balance privately. deposit and withdraw validate positivity; withdraw also checks funds. balance is read-only via property.
- `def withdraw(self, amount: float) -> None:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `def deposit(self, amount: float) -> None:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `raise ValueError("insufficient funds")` — **raise** — Fail fast with a clear error when input or state is invalid. Store _balance privately. deposit and withdraw validate positivity; withdraw also checks funds. balance is read-only via property.
- `def __init__(self) -> None:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `def balance(self) -> float:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `return self._balance` — **return** — Returns the computed result to the caller. Store _balance privately. deposit and withdraw validate positivity; withdraw also checks funds. balance is read-only via property.
- `@property` — **property** — Computed attribute accessed like a field but backed by a method. Store _balance privately.

## Solution code

```python
class BankAccount:
    def __init__(self) -> None:
        self._balance: float = 0.0

    def deposit(self, amount: float) -> None:
        if amount <= 0:
            raise ValueError("deposit must be positive")
        self._balance += amount

    def withdraw(self, amount: float) -> None:
        if amount <= 0:
            raise ValueError("withdraw must be positive")
        if amount > self._balance:
            raise ValueError("insufficient funds")
        self._balance -= amount

    @property
    def balance(self) -> float:
        return self._balance
```

## Walkthrough

Store _balance privately. deposit and withdraw validate positivity; withdraw also checks funds. balance is read-only via property.

## Common mistakes

- Public mutable balance field
- Returning negative balance instead of raising

## Stretch goals

- Add transfer between accounts
- Track transaction history list
