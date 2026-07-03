# Protocols & Structural Typing

## What they are

`typing.Protocol` defines an interface by **structure**, not inheritance. If a class has the required methods and attributes, it satisfies the protocol — no explicit subclass needed. This is duck typing made explicit for static type checkers (mypy, pyright).

## When to use

- Accept any object that implements a behavior (`.read()`, `.write()`, `.close()`)
- Avoid tight coupling to concrete classes in libraries
- Test doubles that do not inherit from production types
- Gradual typing in codebases that cannot use ABCs everywhere

## Defining a Protocol

```python
from typing import Protocol, runtime_checkable

@runtime_checkable
class Readable(Protocol):
    def read(self, n: int = -1) -> bytes: ...

def load_data(source: Readable) -> bytes:
    return source.read()

class FileReader:
    def __init__(self, path: str):
        self._path = path

    def read(self, n: int = -1) -> bytes:
        with open(self._path, "rb") as f:
            return f.read(n)

load_data(FileReader("data.bin"))  # OK — structural match
```

`@runtime_checkable` enables `isinstance(obj, Readable)` at runtime for simple protocols.

## Generic Protocols

```python
from typing import Protocol, TypeVar

T = TypeVar("T")

class SupportsLessThan(Protocol):
    def __lt__(self, other: object) -> bool: ...

def minimum(items: list[SupportsLessThan]) -> SupportsLessThan:
    return min(items)
```

Protocols work with generics when you need to express relationships between types.

## Protocol vs ABC

| Approach | Coupling | Runtime enforcement |
|----------|----------|---------------------|
| `Protocol` | Structural — no base class required | Optional with `@runtime_checkable` |
| `abc.ABC` | Nominal — must subclass explicitly | `register()` or inheritance |

## Tradeoffs

| Aspect | Details |
|--------|---------|
| Pros | Flexible, great for third-party types, clear contracts for type checkers |
| Cons | Runtime `isinstance` checks are limited; complex protocols can be hard to document |
| Interview angle | Explain structural vs nominal typing and when Protocol beats ABC |
