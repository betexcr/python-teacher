# Solution: REST API Client

## Approach

Session per client; compose URLs; parse JSON responses.

## Key concepts

- **Session**: Reuses TCP connections and default headers.
- **thin client**: One method per resource keeps API obvious.

## Code highlights

- `def __init__(self, base_url: str) -> None:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `def get_user(self, user_id: int) -> dict:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `return response.json()` — **return** — Returns the computed result to the caller. get_user builds path, GETs with timeout, checks status, returns JSON dict.
- `requests.Session()` — **requests** — HTTP client call. get_user builds path, GETs with timeout, checks status, returns JSON dict.
- `raise_for_status()` — **raise_for_status** — Turns 4xx/5xx HTTP responses into exceptions instead of silent failures.

## Solution code

```python
import requests

class ApiClient:
    def __init__(self, base_url: str) -> None:
        self._base_url = base_url.rstrip("/")
        self._session = requests.Session()

    def get_user(self, user_id: int) -> dict:
        url = f"{self._base_url}/users/{user_id}"
        response = self._session.get(url, timeout=10.0)
        response.raise_for_status()
        return response.json()
```

## Walkthrough

Store base URL and Session. get_user builds path, GETs with timeout, checks status, returns JSON dict.

## Common mistakes

- New Session per request
- No timeout

## Stretch goals

- Add POST create_user
- Attach auth header
