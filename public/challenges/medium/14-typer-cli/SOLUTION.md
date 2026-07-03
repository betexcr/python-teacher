# Solution: Typer CLI

## Approach

Typer infers CLI from type hints; bool flag becomes --loud/--no-loud.

## Key concepts

- **Typer**: CLI framework powered by Click and type hints.
- **command decorator**: Registers function as subcommand.

## Code highlights

- `def greet(name: str, loud: bool = False) -> None:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `if __name__ == "__main__":` — **__main__** — Entry point when the file is run directly — keeps import side effects out of library use.
- `typer.Typer()` — **Typer CLI** — CLI command definition with type hints. Typer command takes name and loud flag; echo message with optional uppercasing; app() runs CLI.

## Solution code

```python
import typer

app = typer.Typer()

@app.command()
def greet(name: str, loud: bool = False) -> None:
    message = f"Hello, {name}!"
    if loud:
        message = message.upper()
    typer.echo(message)

if __name__ == "__main__":
    app()
```

## Walkthrough

Typer command takes name and loud flag; echo message with optional uppercasing; app() runs CLI.

## Common mistakes

- Using print instead of typer.echo
- Forgetting app() guard

## Stretch goals

- Subcommands group
- Env var defaults with pydantic-settings
