# Solution: Background Tasks

## Approach

Register callable on BackgroundTasks; return acceptance payload immediately.

## Key concepts

- **BackgroundTasks**: Runs sync work after response sent— not for heavy jobs.
- **202 Accepted**: Signals processing continues asynchronously.

## Code highlights

- `async def notify(email: str, background: BackgroundTasks)` — **async notify** — `notify` is a coroutine — call it with await or asyncio.run. Route enqueues send_email on background tasks and returns 202 accepted immediately.
- `def send_email(to: str, subject: str) -> None:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `@app.post("/notify", status_code=202)` — **POST route** — Registers an HTTP POST handler on the FastAPI app or blueprint router. Route enqueues send_email on background tasks and returns 202 accepted immediately.
- `return {"status": "accepted"}` — **return** — Returns the computed result to the caller. Route enqueues send_email on background tasks and returns 202 accepted immediately.
- `logging.getLogger(__name__)` — **logging** — Structured application logging. Route enqueues send_email on background tasks and returns 202 accepted immediately.

## Solution code

```python
import logging
from fastapi import BackgroundTasks, FastAPI

logger = logging.getLogger(__name__)
app = FastAPI()

def send_email(to: str, subject: str) -> None:
    logger.info("Sending email to %s: %s", to, subject)

@app.post("/notify", status_code=202)
async def notify(email: str, background: BackgroundTasks):
    background.add_task(send_email, email, "Hello")
    return {"status": "accepted"}
```

## Walkthrough

Route enqueues send_email on background tasks and returns 202 accepted immediately.

## Common mistakes

- await long IO in route
- Using BackgroundTasks for CPU-heavy work

## Stretch goals

- Celery for real queues
- Retry failed sends
