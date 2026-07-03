# Solution: Async Gather

## Approach

Single session; list of coroutines; gather awaits all concurrently.

## Key concepts

- **asyncio.gather**: Schedule multiple awaitables and collect results in order.
- **ClientSession**: Reuses connections across async HTTP calls.

## Code highlights

- `async def fetch_status(session: aiohttp.ClientSession, url: str)` — **async fetch_status** — `fetch_status` is a coroutine — call it with await or asyncio.run. Open session once, build coroutine per URL, gather runs them concurrently preserving order.
- `return list(await asyncio.gather(*tasks))` — **return** — Returns the computed result to the caller. Open session once, build coroutine per URL, gather runs them concurrently preserving order.
- `async def fetch_all(urls: list[str])` — **async fetch_all** — `fetch_all` is a coroutine — call it with await or asyncio.run. Open session once, build coroutine per URL, gather runs them concurrently preserving order.
- `with session.get(url) as response:` — **with** — Context manager — setup on enter, cleanup on exit even if an exception occurs. Open session once, build coroutine per URL, gather runs them concurrently preserving order.
- `return response.status` — **return** — Returns the computed result to the caller. Open session once, build coroutine per URL, gather runs them concurrently preserving order.
- `asyncio.gather` — **asyncio.gather** — Runs multiple coroutines concurrently and collects results. Open session once, build coroutine per URL, gather runs them concurrently preserving order.
- `aiohttp` — **aiohttp** — Async HTTP client for non-blocking I/O. Open session once, build coroutine per URL, gather runs them concurrently preserving order.

## Solution code

```python
import asyncio
import aiohttp

async def fetch_status(session: aiohttp.ClientSession, url: str) -> int:
    async with session.get(url) as response:
        return response.status

async def fetch_all(urls: list[str]) -> list[int]:
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_status(session, url) for url in urls]
        return list(await asyncio.gather(*tasks))
```

## Walkthrough

Open session once, build coroutine per URL, gather runs them concurrently preserving order.

## Common mistakes

- Sequential await in loop
- Creating session per URL

## Stretch goals

- Semaphore to limit concurrency
- return_exceptions=True handling
