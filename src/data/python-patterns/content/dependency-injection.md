# Dependency Injection

## What they are

Dependency injection (DI) means passing collaborators — databases, HTTP clients, clocks — into a class or function instead of constructing them internally. The caller controls wiring; the consumer depends on abstractions. This improves testability and keeps business logic free of infrastructure details.

## When to use

- Service classes that need a database, cache, or message queue
- Functions that call external APIs (inject the client)
- Applications where you swap implementations per environment (prod vs test)
- Avoiding hidden global state and import-time side effects

## Constructor injection

```python
from typing import Protocol

class Notifier(Protocol):
    def send(self, user_id: str, message: str) -> None: ...

class EmailNotifier:
    def send(self, user_id: str, message: str) -> None:
        print(f"Email to {user_id}: {message}")

class WelcomeService:
    def __init__(self, notifier: Notifier):
        self._notifier = notifier

    def welcome(self, user_id: str) -> None:
        self._notifier.send(user_id, "Welcome aboard!")

service = WelcomeService(EmailNotifier())
service.welcome("user_42")
```

`WelcomeService` never imports SMTP or HTTP — it only knows the `Notifier` protocol.

## Testing with fakes

```python
class FakeNotifier:
    def __init__(self):
        self.sent: list[tuple[str, str]] = []

    def send(self, user_id: str, message: str) -> None:
        self.sent.append((user_id, message))

def test_welcome_sends_message():
    notifier = FakeNotifier()
    WelcomeService(notifier).welcome("u1")
    assert notifier.sent == [("u1", "Welcome aboard!")]
```

Inject a fake in tests — no mocking framework required for simple cases.

## Composition root

Wire dependencies in one place (often `main.py` or a factory module):

```python
def build_app() -> WelcomeService:
    notifier = EmailNotifier() if settings.production else FakeNotifier()
    return WelcomeService(notifier)
```

Application code constructs the graph; library code receives ready-made dependencies.

## Tradeoffs

| Aspect | Details |
|--------|---------|
| Pros | Testable, swappable implementations, explicit dependencies |
| Cons | More constructor parameters; large apps may need a DI container |
| Interview angle | Contrast DI with service locators and global singletons; show constructor injection |
