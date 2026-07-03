# HTTP GET JSON

**Difficulty:** easy  
**Topics:** requests, http

## Learning goals

- Perform GET requests
- Handle HTTP errors

## Challenge

Fetch JSON from a URL with `requests` and return the parsed object. Non-2xx responses should raise `requests.HTTPError`.

## Requirements

1. Use requests.get with timeout
2. Call raise_for_status
3. Return parsed JSON (dict or list)

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/easy/12-requests-get/`. Reference write-ups in this repo live under `challenges/easy/12-requests-get/` (not loaded by the app).

```python
import requests

def fetch_json(url: str, *, timeout: float = 10.0) -> dict | list:
    # TODO
    raise NotImplementedError
```

## Hints

1. response.raise_for_status()
2. response.json()
3. always set timeout

## Acceptance criteria

- [ ] **200 returns JSON**
  200 returns JSON. Write a small script or pytest test that demonstrates this behavior matches HTTP GET JSON.

- [ ] **404 raises**
  404 raises. Write a small script or pytest test that demonstrates this behavior matches HTTP GET JSON.

- [ ] **Timeout configured**
  Timeout configured: Use requests.get with timeout. Write a small script or pytest test that demonstrates this behavior matches HTTP GET JSON.

## Resources

- [Requests documentation](https://requests.readthedocs.io/en/latest/)
- [http – reference](https://docs.python.org/3/library/http.client.html)
