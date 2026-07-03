# Structured Logging

**Difficulty:** medium  
**Topics:** logging, json

## Learning goals

- Emit JSON log lines
- Include request context

## Challenge

Configure logger with `JsonFormatter` outputting `{"level","message","logger","extra"}` and helper `log_event(logger, message, **fields)`.

## Requirements

1. JSON one line per record
2. extra fields merged
3. INFO default level

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/medium/15-structured-logging/`. Reference write-ups in this repo live under `challenges/medium/15-structured-logging/` (not loaded by the app).

```python
import json
import logging
from datetime import datetime, timezone

class JsonFormatter(logging.Formatter):
    def format(self, record: logging.LogRecord) -> str:
        # TODO
        raise NotImplementedError

def log_event(logger: logging.Logger, message: str, **fields: object) -> None:
    ...
```

## Hints

1. payload = {"level": record.levelname, ...}
2. json.dumps(payload)
3. logger.info(message, extra=fields)

## Acceptance criteria

- [ ] **Valid JSON output**
  Valid JSON output. Write a small script or pytest test that demonstrates this behavior matches Structured Logging.

- [ ] **Extra fields appear**
  Extra fields appear: extra fields merged. Write a small script or pytest test that demonstrates this behavior matches Structured Logging.

- [ ] **Timestamp optional in extra**
  Timestamp optional in extra. Write a small script or pytest test that demonstrates this behavior matches Structured Logging.

## Resources

- [logging – reference](https://docs.python.org/3/library/logging.html)
- [json – reference](https://docs.python.org/3/library/json.html)
