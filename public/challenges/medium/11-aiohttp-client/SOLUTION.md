# Solution: Aiohttp Client Wrapper

## Approach

Compose URL, GET with timeout, raise_for_status, return parsed JSON.

## Key concepts

- **raise_for_status**: Turns HTTP error codes into exceptions.
- **shared session**: One session per app lifecycle for connection pooling.

## Code highlights

- `def __init__(self, base_url: str, session: aiohttp.ClientSession) -> None:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `async def get_json(self, path: str)` — **async get_json** — `get_json` is a coroutine — call it with await or asyncio.run. Client stores base and session; get_json builds URL, GETs, checks status, parses JSON object.
- `raise_for_status()` — **raise_for_status** — Turns 4xx/5xx HTTP responses into exceptions instead of silent failures.
- `return data` — **return** — Returns the computed result to the caller. Client stores base and session; get_json builds URL, GETs, checks status, parses JSON object.
- `aiohttp` — **aiohttp** — Async HTTP client for non-blocking I/O. Client stores base and session; get_json builds URL, GETs, checks status, parses JSON object.

## Solution code

```python
import aiohttp

class AsyncApiClient:
    def __init__(self, base_url: str, session: aiohttp.ClientSession) -> None:
        self._base_url = base_url.rstrip("/")
        self._session = session

    async def get_json(self, path: str) -> dict:
        url = f"{self._base_url}{path}"
        async with self._session.get(url, timeout=aiohttp.ClientTimeout(total=10)) as response:
            response.raise_for_status()
            data = await response.json()
            if not isinstance(data, dict):
                raise TypeError("expected JSON object")
            return data
```

## Walkthrough

Client stores base and session; get_json builds URL, GETs, checks status, parses JSON object.

## Common mistakes

- No timeout
- Not validating JSON root type

## Stretch goals

- Retry on 503
- Generic get method with TypeVar
