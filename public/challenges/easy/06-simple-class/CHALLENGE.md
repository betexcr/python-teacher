# Bank Account Class

**Difficulty:** easy  
**Topics:** classes, encapsulation

## Learning goals

- Model state with a class
- Guard invalid operations

## Challenge

Implement `BankAccount` with `deposit`, `withdraw`, and read-only `balance`. Withdrawals cannot exceed balance.

## Requirements

1. Balance starts at 0
2. deposit adds positive amounts only
3. withdraw raises ValueError if insufficient funds

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/easy/06-simple-class/`. Reference write-ups in this repo live under `challenges/easy/06-simple-class/` (not loaded by the app).

```python
class BankAccount:
    def __init__(self) -> None:
        # TODO
        raise NotImplementedError

    def deposit(self, amount: float) -> None:
        ...

    def withdraw(self, amount: float) -> None:
        ...

    @property
    def balance(self) -> float:
        ...
```

## Hints

1. Validate amount > 0
2. self._balance private field
3. raise ValueError on overdraft

## Acceptance criteria

- [ ] **Deposit increases balance**
  Deposit increases balance: deposit adds positive amounts only. Write a small script or pytest test that demonstrates this behavior matches Bank Account Class.

- [ ] **Withdraw decreases**
  Withdraw decreases: withdraw raises ValueError if insufficient funds. Write a small script or pytest test that demonstrates this behavior matches Bank Account Class.

- [ ] **Overdraft blocked**
  Overdraft blocked. Write a small script or pytest test that demonstrates this behavior matches Bank Account Class.

## Resources

- [classes – reference](https://docs.python.org/3/tutorial/classes.html)
- [encapsulation – reference](https://docs.python.org/3/tutorial/classes.html#private-variables)
