# CLI Design with Typer & Click

## What they are

Typer and Click build command-line interfaces from Python functions with decorators. They handle argument parsing, `--help` generation, type coercion, and subcommands. Typer sits on Click and uses type hints; Click is the lower-level, battle-tested foundation.

## When to use

- Developer tools, data pipelines, admin scripts
- Multi-command CLIs (`app users create`, `app db migrate`)
- Options with defaults, choices, and environment variable fallbacks
- Publishing installable console scripts via `pyproject.toml`

## Typer basics

```python
import typer
from typing import Optional

app = typer.Typer()

@app.command()
def greet(
    name: str,
    loud: bool = typer.Option(False, "--loud", "-l", help="Shout the greeting"),
    count: int = typer.Option(1, min=1, help="Repeat count"),
):
    message = f"Hello, {name}!"
    if loud:
        message = message.upper()
    for _ in range(count):
        typer.echo(message)

if __name__ == "__main__":
    app()
```

Type hints drive CLI types. `typer.Option` and `typer.Argument` add flags, help text, and validation.

## Click subcommands

```python
import click

@click.group()
def cli():
    """Data pipeline CLI."""

@cli.command()
@click.option("--path", type=click.Path(exists=True), required=True)
def ingest(path: str):
  click.echo(f"Ingesting {path}")

@cli.command()
@click.option("--table", default="events")
def export(table: str):
    click.echo(f"Exporting {table}")

if __name__ == "__main__":
    cli()
```

`@click.group()` nests commands. `click.Path(exists=True)` validates filesystem paths before your code runs.

## UX guidelines

- Provide `--help` on every command with clear descriptions
- Use exit codes: `raise typer.Exit(code=1)` on failure
- Support `--verbose` / `--quiet` for log level control
- Read sensitive values from env vars, not argv (visible in `ps`)

## Tradeoffs

| Aspect | Details |
|--------|---------|
| Pros | Auto-generated help, type-safe parsing, composable subcommands |
| Cons | Typer adds a layer over Click; complex CLIs need careful option design |
| Interview angle | Compare `argparse` vs Click/Typer; show subcommands and typed options |
