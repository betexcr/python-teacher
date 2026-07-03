# Solution: Structured Logging

## Approach

Custom formatter builds dict; log_event passes structured extra to logger.

## Key concepts

- **structured logging**: Machine-readable fields for search and dashboards.
- **LogRecord.extra**: Arbitrary key-values attached to a log entry.

## Code highlights

- `def log_event(logger: logging.Logger, message: str, **fields: object) -> None:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `def format(self, record: logging.LogRecord) -> str:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `return json.dumps(payload)` — **return** — Returns the computed result to the caller. Formatter serializes level, message, logger plus extra attributes; log_event forwards kwargs as extra.

## Solution code

```python
import json
import logging

class JsonFormatter(logging.Formatter):
    def format(self, record: logging.LogRecord) -> str:
        payload = {
            "level": record.levelname,
            "message": record.getMessage(),
            "logger": record.name,
        }
        for key, value in record.__dict__.items():
            if key not in logging.LogRecord.__dict__ and key not in payload:
                payload[key] = value
        return json.dumps(payload)

def log_event(logger: logging.Logger, message: str, **fields: object) -> None:
    logger.info(message, extra=fields)
```

## Walkthrough

Formatter serializes level, message, logger plus extra attributes; log_event forwards kwargs as extra.

## Common mistakes

- Logging raw dict without JSON
- Handlers duplicated on re-import

## Stretch goals

- structlog library
- Correlation id middleware
