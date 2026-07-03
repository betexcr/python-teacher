# Solution: Pytest Fixtures and Mocks

## Approach

Patch requests.get in test module path; fixture holds URL; assert status and call args.

## Key concepts

- **fixture**: Reusable setup injected into tests by name.
- **patch**: Replace object during test, restored after.

## Code highlights

- `def test_fetch_status(mock_get: MagicMock, api_url: str) -> None:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `return "https://api.example.com/health"` — **return** — Returns the computed result to the caller. Fixture supplies URL; patch replaces requests.get; mock configures response; assert behavior.
- `def fetch_status(url: str) -> int:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `requests.get(url, timeout=5.0)` — **requests** — HTTP client call. Fixture supplies URL; patch replaces requests.get; mock configures response; assert behavior.
- `return response.status_code` — **return** — Returns the computed result to the caller. Fixture supplies URL; patch replaces requests.get; mock configures response; assert behavior.
- `def api_url() -> str:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `@pytest.fixture` — **pytest.fixture** — Injects shared setup into tests — run once per test or session depending on scope. Fixture supplies URL; patch replaces requests.get; mock configures response; assert behavior.

## Solution code

```python
import requests

def fetch_status(url: str) -> int:
    response = requests.get(url, timeout=5.0)
    return response.status_code

# test_fetch.py
import pytest
from unittest.mock import MagicMock, patch
from fetch import fetch_status

@pytest.fixture
def api_url() -> str:
    return "https://api.example.com/health"

@patch("fetch.requests.get")
def test_fetch_status(mock_get: MagicMock, api_url: str) -> None:
    mock_get.return_value.status_code = 200
    assert fetch_status(api_url) == 200
    mock_get.assert_called_once_with(api_url, timeout=5.0)
```

## Walkthrough

Fixture supplies URL; patch replaces requests.get; mock configures response; assert behavior.

## Common mistakes

- Patching wrong import path
- Forgetting timeout in assert

## Stretch goals

- pytest-httpx for async
- Parametrize status codes
