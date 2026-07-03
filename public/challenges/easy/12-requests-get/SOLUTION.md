# Solution: HTTP GET JSON

## Approach

GET with timeout, check status, parse JSON body.

## Key concepts

- **raise_for_status**: Turn 4xx/5xx into exceptions.
- **timeout**: Prevents hanging forever on bad networks.

## Code highlights

- `def fetch_json(url: str, *, timeout: float = 10.0) -> dict | list:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `requests.get(url, timeout=timeout)` — **requests** — HTTP client call. Single GET with timeout, raise on bad status, return json() payload.
- `return response.json()` — **return** — Returns the computed result to the caller. Single GET with timeout, raise on bad status, return json() payload.
- `raise_for_status()` — **raise_for_status** — Turns 4xx/5xx HTTP responses into exceptions instead of silent failures.

## Solution code

```python
import requests

def fetch_json(url: str, *, timeout: float = 10.0) -> dict | list:
    response = requests.get(url, timeout=timeout)
    response.raise_for_status()
    return response.json()
```

## Walkthrough

Single GET with timeout, raise on bad status, return json() payload.

## Common mistakes

- No timeout
- Returning response.text without parsing

## Stretch goals

- Add retries for 503
- Return headers too
