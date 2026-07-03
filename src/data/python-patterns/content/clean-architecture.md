# Clean Architecture in Python

## What they are

Clean architecture organizes code into layers with dependencies pointing inward. Domain entities and use cases know nothing about frameworks, databases, or HTTP. Outer layers (web, persistence) implement interfaces defined by inner layers. This keeps business rules testable and swappable.

## When to use

- Medium-to-large services with long maintenance horizons
- Teams that need clear boundaries between domain and infrastructure
- Projects where you may swap FastAPI for CLI or Postgres for another store
- Interview discussions about separation of concerns and testability

## Layer overview

| Layer | Responsibility | Depends on |
|-------|----------------|------------|
| Entities | Core types and rules | Nothing external |
| Use cases | Application workflows | Entities, ports (interfaces) |
| Adapters | HTTP, ORM, messaging | Use cases, frameworks |
| Frameworks | FastAPI, SQLAlchemy, boto3 | Adapters wire them in |

## Entities and use case

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class Account:
    id: str
    balance: float

class InsufficientFunds(Exception):
    pass

class TransferFunds:
    def __init__(self, accounts):
        self._accounts = accounts  # AccountRepository port

    def execute(self, from_id: str, to_id: str, amount: float) -> None:
        sender = self._accounts.get(from_id)
        receiver = self._accounts.get(to_id)
        if sender is None or receiver is None:
            raise NotFoundError("account", from_id)
        if sender.balance < amount:
            raise InsufficientFunds()
        self._accounts.save(
            Account(sender.id, sender.balance - amount)
        )
        self._accounts.save(
            Account(receiver.id, receiver.balance + amount)
        )
```

`TransferFunds` contains business rules. It depends on a repository abstraction, not SQL.

## Adapter (FastAPI route)

```python
from fastapi import APIRouter, Depends

router = APIRouter()

@router.post("/transfers")
def transfer(
    body: TransferRequest,
    use_case: TransferFunds = Depends(get_transfer_use_case),
):
    try:
        use_case.execute(body.from_id, body.to_id, body.amount)
    except InsufficientFunds:
        raise HTTPException(status_code=400, detail="Insufficient funds")
    return {"status": "ok"}
```

HTTP concerns live at the edge. Map domain exceptions to status codes here, not in use cases.

## Composition root

```python
def get_transfer_use_case() -> TransferFunds:
    repo = SqlAccountRepository(get_session())
    return TransferFunds(repo)
```

Wire concrete implementations in one module. Tests inject `InMemoryAccountRepository` instead.

## Tradeoffs

| Aspect | Details |
|--------|---------|
| Pros | Testable domain, framework independence, clear module boundaries |
| Cons | More files and indirection; small scripts do not need full layering |
| Interview angle | Explain dependency rule (inward only), ports and adapters, and where FastAPI belongs |
