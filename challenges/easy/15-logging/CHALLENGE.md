# Module Logger Setup

**Difficulty:** easy  
**Topics:** logging

## Learning goals

- Configure logging basicConfig
- Log at appropriate levels

## Challenge

Provide `configure_logging(level: str)` that sets up root logger with a standard format and returns a named logger `app`.

## Requirements

1. Format includes level and message
2. Level from string DEBUG/INFO/WARNING
3. Returns logging.getLogger("app")

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/easy/15-logging/`. Reference write-ups in this repo live under `challenges/easy/15-logging/` (not loaded by the app).

```python
import logging

def configure_logging(level: str = "INFO") -> logging.Logger:
    # TODO
    raise NotImplementedError
```

## Hints

1. logging.basicConfig
2. getattr(logging, level.upper())
3. force=True on 3.8+

## Acceptance criteria

- [ ] **Logger returned**
  Logger returned: Returns logging.getLogger("app"). Write a small script or pytest test that demonstrates this behavior matches Module Logger Setup.

- [ ] **Level respected**
  Level respected: Format includes level and message. Write a small script or pytest test that demonstrates this behavior matches Module Logger Setup.

- [ ] **Format readable**
  Format readable: Format includes level and message. Write a small script or pytest test that demonstrates this behavior matches Module Logger Setup.

## Resources

- [logging – reference](https://docs.python.org/3/library/logging.html)
- [Python Tutorial](https://docs.python.org/3/tutorial/)
