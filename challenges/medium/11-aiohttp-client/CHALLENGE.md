# Aiohttp Client Wrapper

**Difficulty:** medium  
**Topics:** aiohttp, async

## Learning goals

- Wrap aiohttp session
- Parse JSON responses safely

## Challenge

Build `AsyncApiClient` with `get_json(path: str) -> dict` using shared `ClientSession` and base URL.

## Requirements

1. Session in __init__ or context
2. raise on status >= 400
3. Timeout 10s

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/medium/11-aiohttp-client/`. Reference write-ups in this repo live under `challenges/medium/11-aiohttp-client/` (not loaded by the app).

```python
import aiohttp

class AsyncApiClient:
    def __init__(self, base_url: str, session: aiohttp.ClientSession) -> None:
        self._base_url = base_url.rstrip("/")
        self._session = session

    async def get_json(self, path: str) -> dict:
        # TODO
        raise NotImplementedError
```

## Hints

1. url = f"{self._base_url}{path}"
2. response.raise_for_status()
3. await response.json()

## Acceptance criteria

- [ ] **JSON dict returned**
  JSON dict returned. Use pytest-aiohttp or asyncio.run with a mock server to avoid flaky network calls.

- [ ] **HTTP errors raise**
  HTTP errors raise. Use pytest-aiohttp or asyncio.run with a mock server to avoid flaky network calls.

- [ ] **Base URL joined correctly**
  Base URL joined correctly. Use pytest-aiohttp or asyncio.run with a mock server to avoid flaky network calls.

## Resources

- [aiohttp – reference](https://docs.aiohttp.org/en/stable/)
- [Python Tutorial](https://docs.python.org/3/tutorial/)
