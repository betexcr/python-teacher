# Solution: CLI Greeting

## Approach

Separate parser construction from main so tests can inject argv.

## Key concepts

- **argparse**: stdlib CLI parsing with help text and types.
- **Testable main**: Accept argv list instead of only sys.argv.

## Code highlights

- `return message.upper() if args.shout else message` — **return** — Returns the computed result to the caller. build_parser configures flags. main parses argv, formats Hello, name, and optionally uppercases.
- `def main(argv: list[str] | None = None) -> str:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `def build_parser() -> argparse.ArgumentParser:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `return parser` — **return** — Returns the computed result to the caller. build_parser configures flags. main parses argv, formats Hello, name, and optionally uppercases.

## Solution code

```python
import argparse

def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Greet someone")
    parser.add_argument("--name", default="world", help="Name to greet")
    parser.add_argument("--shout", action="store_true", help="Uppercase greeting")
    return parser

def main(argv: list[str] | None = None) -> str:
    args = build_parser().parse_args(argv)
    message = f"Hello, {args.name}!"
    return message.upper() if args.shout else message
```

## Walkthrough

build_parser configures flags. main parses argv, formats Hello, name, and optionally uppercases.

## Common mistakes

- Parsing sys.argv directly in tests
- Forgetting store_true for boolean flags

## Stretch goals

- Add --count to repeat greeting
- Switch to typer in medium track
