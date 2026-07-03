# Solution: Module Logger Setup

## Approach

basicConfig once with force=True; fetch named logger.

## Key concepts

- **logging hierarchy**: Named loggers inherit root handlers.
- **levels**: DEBUG < INFO < WARNING < ERROR < CRITICAL.

## Code highlights

- `def configure_logging(level: str = "INFO") -> logging.Logger:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `return logging.getLogger("app")` — **return** — Returns the computed result to the caller. Map string level to logging constant, basicConfig with format, return app logger.
- `logging.basicConfig(` — **logging** — Structured application logging. Map string level to logging constant, basicConfig with format, return app logger.

## Solution code

```python
import logging

def configure_logging(level: str = "INFO") -> logging.Logger:
    numeric_level = getattr(logging, level.upper(), logging.INFO)
    logging.basicConfig(
        level=numeric_level,
        format="%(levelname)s | %(message)s",
        force=True,
    )
    return logging.getLogger("app")
```

## Walkthrough

Map string level to logging constant, basicConfig with format, return app logger.

## Common mistakes

- print debugging instead of logger
- Creating duplicate handlers without force

## Stretch goals

- Add JSON formatter
- Rotate log files with RotatingFileHandler
