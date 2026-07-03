# Background Tasks

**Difficulty:** medium  
**Topics:** fastapi, background-tasks

## Learning goals

- Defer work after response
- Log async side effects

## Challenge

Endpoint `POST /notify` accepts email and schedules `send_email` via FastAPI `BackgroundTasks`.

## Requirements

1. Return 202 immediately
2. Background task called
3. Task function pure/loggable

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/medium/22-background-task/`. Reference write-ups in this repo live under `challenges/medium/22-background-task/` (not loaded by the app).

```python
import logging
from fastapi import BackgroundTasks, FastAPI

logger = logging.getLogger(__name__)
app = FastAPI()

def send_email(to: str, subject: str) -> None:
    logger.info("Sending email to %s: %s", to, subject)

@app.post("/notify")
async def notify(email: str, background: BackgroundTasks):
    # TODO
    ...
```

## Hints

1. background.add_task(send_email, email, "Hello")
2. return {"status": "accepted"}
3. status code 202 optional

## Acceptance criteria

- [ ] **Response before task completes**
  Response before task completes. Start uvicorn, open /docs or curl the endpoint, and verify status code plus JSON shape.

- [ ] **Task receives email**
  Task receives email: Background task called. Start uvicorn, open /docs or curl the endpoint, and verify status code plus JSON shape.

- [ ] **No blocking sleep in route**
  No blocking sleep in route. Start uvicorn, open /docs or curl the endpoint, and verify status code plus JSON shape.

## Resources

- [FastAPI documentation](https://fastapi.tiangolo.com/)
- [background-tasks – reference](https://fastapi.tiangolo.com/tutorial/background-tasks/)
