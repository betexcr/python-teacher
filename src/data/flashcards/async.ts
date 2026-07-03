import type { FlashcardDeck } from './types';

export const asyncDeck: FlashcardDeck = {
  "id": "async",
  "slug": "async",
  "title": "Async Python",
  "cards": [
    {
      "question": "async def vs def?",
      "explanation": "async def returns a coroutine object—must be awaited or scheduled. Regular def blocks the thread; async enables cooperative concurrency on one thread.\n\n```python\nasync def fetch():\n    async with httpx.AsyncClient() as client:\n        return await client.get(url)\n```"
    },
    {
      "question": "await rules?",
      "explanation": "await only inside async def (except asyncio.run top level). Awaiting a coroutine suspends until complete, letting event loop run other tasks."
    },
    {
      "question": "asyncio.run purpose?",
      "explanation": "Python 3.7+ entry point: creates loop, runs main coroutine, closes loop. Use once at program entry—not inside already-async contexts.\n\n```python\nimport asyncio\n\nasyncio.run(main())\n```"
    },
    {
      "question": "asyncio.gather vs TaskGroup?",
      "explanation": "gather runs awaitables concurrently; return_exceptions controls error handling. TaskGroup (3.11+) structured concurrency—cancels siblings on failure.\n\n```python\nasync with asyncio.TaskGroup() as tg:\n    t1 = tg.create_task(fetch_a())\n    t2 = tg.create_task(fetch_b())\n```"
    },
    {
      "question": "When not to use async?",
      "explanation": "CPU-bound work blocks the event loop—use ProcessPoolExecutor or multiprocessing. Async shines for I/O-bound: HTTP, DB, files with async drivers."
    },
    {
      "question": "asyncio.create_task?",
      "explanation": "Schedules coroutine concurrently; returns Task. Remember to await or gather tasks before shutdown to avoid warnings.\n\n```python\ntask = asyncio.create_task(poll())\nresult = await task\n```"
    },
    {
      "question": "Async context managers?",
      "explanation": "async with for resources with async setup/teardown (HTTP clients, DB pools). Implement __aenter__/__aexit__.\n\n```python\nasync with session.begin():\n    await session.execute(stmt)\n```"
    },
    {
      "question": "asyncio.Queue?",
      "explanation": "Producer-consumer coordination between coroutines. await queue.put/get; join() waits for all tasks done."
    },
    {
      "question": "asyncio.to_thread?",
      "explanation": "Runs blocking callable in thread pool without blocking loop—bridge sync libraries in async apps.\n\n```python\nresult = await asyncio.to_thread(blocking_io, path)\n```"
    },
    {
      "question": "Timeouts in asyncio?",
      "explanation": "async with asyncio.timeout(5): (3.11+) or asyncio.wait_for(coro, timeout=5). Always handle TimeoutError.\n\n```python\nasync with asyncio.timeout(5):\n    await slow_operation()\n```"
    },
    {
      "question": "Event loop policy and uvloop?",
      "explanation": "Default loop on Linux/macOS is efficient; uvloop (third-party) can speed some workloads. Not available on Windows."
    },
    {
      "question": "Async generators?",
      "explanation": "async def with yield; async for to iterate. Useful for streaming paginated API results.\n\n```python\nasync def pages():\n    page = 1\n    while batch := await fetch_page(page):\n        yield batch\n        page += 1\n```"
    },
    {
      "question": "Cancellation semantics?",
      "explanation": "Task.cancel() raises CancelledError at await points. Handle cleanup in finally; shield() protects inner coroutines from cancellation."
    },
    {
      "question": "Async vs threading?",
      "explanation": "Threading: preemptive, GIL limits CPU parallelism for Python bytecode. Async: single-thread cooperative—lower overhead, no race on shared state if truly single-threaded."
    },
    {
      "question": "Common async libraries?",
      "explanation": "httpx/aiohttp (HTTP), asyncpg/aiomysql (DB), redis.asyncio, anyio/trio as alternatives. FastAPI builds on Starlette async stack."
    }
  ]
};
