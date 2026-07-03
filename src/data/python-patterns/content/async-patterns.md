# Async Patterns

## What they are

`asyncio` runs concurrent I/O-bound work on a single thread via an event loop. `async def` functions are coroutines; `await` yields control while waiting on network, disk, or timers. Tasks, gather, and semaphores orchestrate many concurrent operations without thread overhead.

## When to use

- Many concurrent HTTP or database calls
- WebSocket servers and long-lived connections
- Streaming pipelines with backpressure
- Not for CPU-bound work — use `ProcessPoolExecutor` instead

## Basic coroutine and gather

```python
import asyncio
import httpx

async def fetch(client: httpx.AsyncClient, url: str) -> str:
    response = await client.get(url)
    response.raise_for_status()
    return response.text[:200]

async def main():
    urls = ["https://example.com", "https://httpbin.org/get"]
    async with httpx.AsyncClient(timeout=10) as client:
        results = await asyncio.gather(
            *[fetch(client, url) for url in urls],
            return_exceptions=True,
        )
    for url, result in zip(urls, results):
        if isinstance(result, Exception):
            print(f"{url} failed: {result}")
        else:
            print(f"{url}: {len(result)} chars")

asyncio.run(main())
```

`gather` runs coroutines concurrently. `return_exceptions=True` prevents one failure from cancelling siblings.

## Tasks and cancellation

```python
async def poll_status(job_id: str) -> dict:
    while True:
        status = await check_job(job_id)
        if status["done"]:
            return status
        await asyncio.sleep(1)

async def run_with_timeout(job_id: str, seconds: float):
    task = asyncio.create_task(poll_status(job_id))
    try:
        return await asyncio.wait_for(task, timeout=seconds)
    except asyncio.TimeoutError:
        task.cancel()
        raise
```

`create_task` schedules a coroutine. `wait_for` enforces deadlines; cancel tasks you no longer need.

## Limiting concurrency

```python
async def fetch_all(urls: list[str], limit: int = 10):
    sem = asyncio.Semaphore(limit)

    async def bounded(url: str):
        async with sem:
            return await fetch_one(url)

    return await asyncio.gather(*[bounded(u) for u in urls])
```

Semaphores cap parallel requests — essential when hitting rate-limited APIs.

## Tradeoffs

| Aspect | Details |
|--------|---------|
| Pros | Efficient I/O concurrency, explicit await points, stdlib since 3.4+ |
| Cons | Async contagion — async callers need async callees; debugging is harder |
| Interview angle | Explain event loop, `gather` vs `create_task`, and why not to block the loop |
