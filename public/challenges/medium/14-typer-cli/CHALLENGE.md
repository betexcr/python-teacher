# Typer CLI

**Difficulty:** medium  
**Topics:** typer, cli

## Learning goals

- Build typed CLI commands
- Validate options

## Challenge

Create Typer app with command `greet(name: str, loud: bool = False)` printing hello, uppercased when loud.

## Requirements

1. Typer app entrypoint
2. Boolean flag --loud
3. name positional argument

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/medium/14-typer-cli/`. Reference write-ups in this repo live under `challenges/medium/14-typer-cli/` (not loaded by the app).

```python
import typer

app = typer.Typer()

# TODO: greet command and main guard
```

## Hints

1. @app.command()
2. def greet(name: str, loud: bool = False)
3. if __name__ == "__main__": app()

## Acceptance criteria

- [ ] **Default greeting works**
  Default greeting works. Write a small script or pytest test that demonstrates this behavior matches Typer CLI.

- [ ] **--loud uppercases**
  --loud uppercases: Boolean flag --loud. Write a small script or pytest test that demonstrates this behavior matches Typer CLI.

- [ ] **Help text generated**
  Help text generated. Write a small script or pytest test that demonstrates this behavior matches Typer CLI.

## Resources

- [typer – reference](https://typer.tiangolo.com/)
- [cli – reference](https://docs.python.org/3/library/argparse.html)
