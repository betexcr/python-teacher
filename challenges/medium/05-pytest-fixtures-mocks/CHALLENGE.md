# Pytest Fixtures and Mocks

**Difficulty:** medium  
**Topics:** pytest, unittest.mock

## Learning goals

- Share setup via fixtures
- Mock external HTTP calls

## Challenge

Implement `fetch_status(url) -> int` using `requests.get`. Write tests with `@pytest.fixture` client and `unittest.mock.patch` so no real HTTP occurs.

## Requirements

1. Fixture provides base URL
2. Mock returns 200
3. Assert called with expected URL

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/medium/05-pytest-fixtures-mocks/`. Reference write-ups in this repo live under `challenges/medium/05-pytest-fixtures-mocks/` (not loaded by the app).

```python
import requests

def fetch_status(url: str) -> int:
    response = requests.get(url, timeout=5.0)
    return response.status_code

# test_fetch.py — add fixture and patch
```

## Hints

1. @pytest.fixture def api_url()
2. @patch("module.requests.get")
3. mock_get.return_value.status_code = 200

## Acceptance criteria

- [ ] **Test passes offline**
  Test passes offline. Run pytest in the project folder and confirm all parametrized cases pass.

- [ ] **Mock called once**
  Mock called once: Mock returns 200. Run pytest in the project folder and confirm all parametrized cases pass.

- [ ] **Fixture reused**
  Fixture reused: Fixture provides base URL. Run pytest in the project folder and confirm all parametrized cases pass.

## Resources

- [pytest documentation](https://docs.pytest.org/en/stable/)
- [Python Tutorial](https://docs.python.org/3/tutorial/)
