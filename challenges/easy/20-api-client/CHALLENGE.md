# REST API Client

**Difficulty:** easy  
**Topics:** requests, api-design

## Learning goals

- Wrap HTTP in a small class
- Reuse session

## Challenge

Build `ApiClient` with base URL and `get_user(user_id: int) -> dict` using a persistent `requests.Session`.

## Requirements

1. Session created in __init__
2. GET /users/{id} relative to base
3. raise_for_status on errors

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/easy/20-api-client/`. Reference write-ups in this repo live under `challenges/easy/20-api-client/` (not loaded by the app).

```python
import requests

class ApiClient:
    def __init__(self, base_url: str) -> None:
        # TODO
        ...

    def get_user(self, user_id: int) -> dict:
        ...
```

## Hints

1. self._session = requests.Session()
2. url = f"{base}/users/{id}"
3. return response.json()

## Acceptance criteria

- [ ] **GET correct path**
  GET correct path: GET /users/{id} relative to base. Write a small script or pytest test that demonstrates this behavior matches REST API Client.

- [ ] **Session reused**
  Session reused: Session created in __init__. Write a small script or pytest test that demonstrates this behavior matches REST API Client.

- [ ] **HTTP errors propagate**
  HTTP errors propagate. Write a small script or pytest test that demonstrates this behavior matches REST API Client.

## Resources

- [Requests documentation](https://requests.readthedocs.io/en/latest/)
- [api-design – reference](https://requests.readthedocs.io/en/latest/user/advanced/)
