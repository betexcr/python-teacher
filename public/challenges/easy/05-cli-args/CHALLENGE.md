# CLI Greeting

**Difficulty:** easy  
**Topics:** argparse, cli

## Learning goals

- Parse command-line flags
- Provide sensible defaults

## Challenge

Build a tiny CLI with `argparse`: `--name` (default `"world"`) and `--shout` to upper-case the greeting. `main(argv)` should return the greeting string (tests call it without subprocess).

## Requirements

1. Default name is world
2. --shout uppercases output
3. Return string like "Hello, Ada!"

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/easy/05-cli-args/`. Reference write-ups in this repo live under `challenges/easy/05-cli-args/` (not loaded by the app).

```python
import argparse

def build_parser() -> argparse.ArgumentParser:
    # TODO
    raise NotImplementedError

def main(argv: list[str] | None = None) -> str:
    # TODO
    raise NotImplementedError
```

## Hints

1. parser.add_argument("--name", default="world")
2. store_true for --shout
3. parse_args(argv)

## Acceptance criteria

- [ ] **Default greeting works**
  Default greeting works: Default name is world. Write a small script or pytest test that demonstrates this behavior matches CLI Greeting.

- [ ] **Name flag works**
  Name flag works: Default name is world. Write a small script or pytest test that demonstrates this behavior matches CLI Greeting.

- [ ] **Shout flag uppercases**
  Shout flag uppercases: --shout uppercases output. Write a small script or pytest test that demonstrates this behavior matches CLI Greeting.

## Resources

- [argparse – Python docs](https://docs.python.org/3/library/argparse.html)
- [Python Tutorial](https://docs.python.org/3/tutorial/)
