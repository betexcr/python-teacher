# Async Gather

**Difficulty:** medium  
**Topics:** asyncio, concurrency

## Learning goals

- Run coroutines concurrently
- Handle exceptions with return_exceptions

## Challenge

Implement `fetch_all(urls: list[str]) -> list[int]` using `asyncio.gather` and `aiohttp` to GET each URL and collect status codes.

## Requirements

1. Concurrent requests
2. Preserve input order
3. Use ClientSession context manager

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/medium/10-async-gather/`. Reference write-ups in this repo live under `challenges/medium/10-async-gather/` (not loaded by the app).

```python
import asyncio
import aiohttp

async def fetch_status(session: aiohttp.ClientSession, url: str) -> int:
    # TODO
    raise NotImplementedError

async def fetch_all(urls: list[str]) -> list[int]:
    ...
```

## Hints

1. async with aiohttp.ClientSession()
2. tasks = [fetch_status(session, u) for u in urls]
3. await asyncio.gather(*tasks)

## Acceptance criteria

- [ ] **All URLs fetched**
  All URLs fetched. Run with asyncio.run() or pytest-asyncio and confirm concurrent tasks complete.

- [ ] **Order matches input**
  Order matches input: Preserve input order. Run with asyncio.run() or pytest-asyncio and confirm concurrent tasks complete.

- [ ] **Session closed properly**
  Session closed properly: Use ClientSession context manager. Run with asyncio.run() or pytest-asyncio and confirm concurrent tasks complete.

## Resources

- [asyncio – reference](https://docs.python.org/3/library/asyncio.html)
- [Python Tutorial](https://docs.python.org/3/tutorial/)
