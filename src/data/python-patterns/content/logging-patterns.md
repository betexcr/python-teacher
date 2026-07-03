# Logging Patterns

## What they are

The `logging` module provides leveled, configurable output without `print()` in production code. Good logging patterns use structured context, appropriate levels, module-level loggers, and centralized configuration so operators can diagnose issues without redeploying.

## When to use

- Recording errors with stack traces (`logger.exception`)
- Tracing request flow in services (request id, user id)
- Debugging in development at DEBUG level, INFO in production
- Auditing security-relevant events (login, permission denied)

## Module logger and levels

```python
import logging

logger = logging.getLogger(__name__)

def process_order(order_id: str) -> None:
    logger.info("Processing order", extra={"order_id": order_id})
    try:
        charge(order_id)
    except PaymentError:
        logger.exception("Payment failed for order %s", order_id)
        raise
    logger.info("Order complete", extra={"order_id": order_id})
```

Use `logging.getLogger(__name__)` so log records show the module path. `logger.exception` includes the traceback automatically inside an `except` block.

## Structured logging with context

```python
import logging
from contextvars import ContextVar

request_id_var: ContextVar[str] = ContextVar("request_id", default="-")

class RequestIdFilter(logging.Filter):
    def filter(self, record: logging.LogRecord) -> bool:
        record.request_id = request_id_var.get()
        return True

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(request_id)s] %(name)s %(levelname)s: %(message)s",
)
logging.getLogger().addFilter(RequestIdFilter())
```

`ContextVar` propagates request id through async and threaded code without passing it to every function.

## Configuration best practices

- Configure logging once at application startup (`dictConfig` or `fileConfig`)
- Libraries should not call `basicConfig` — let the app set handlers
- Use `logger.debug` for verbose detail; default production level is INFO or WARNING
- Rotate files with `RotatingFileHandler` or ship JSON logs to aggregators

## Tradeoffs

| Aspect | Details |
|--------|---------|
| Pros | Leveled output, lazy formatting (`%s` not f-strings), handler flexibility |
| Cons | Misconfigured root logger floods output; f-strings in log calls waste work even when filtered |
| Interview angle | Explain logger hierarchy, why `__name__`, and `logger.exception` vs `logger.error(..., exc_info=True)` |
