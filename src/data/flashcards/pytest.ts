import type { FlashcardDeck } from './types';

export const pytestDeck: FlashcardDeck = {
  "id": "pytest",
  "slug": "pytest",
  "title": "pytest",
  "cards": [
    {
      "question": "Why pytest over unittest?",
      "explanation": "Less boilerplate, plain assert with introspection, powerful fixtures, plugins (cov, asyncio, xdist). Still runs unittest-style tests."
    },
    {
      "question": "Basic test discovery?",
      "explanation": "Files test_*.py or *_test.py; functions test_*; classes Test*. Run pytest or pytest path/to/test_module.py.\n\n```python\ndef test_addition():\n    assert 1 + 1 == 2\n```"
    },
    {
      "question": "What are fixtures?",
      "explanation": "Setup/teardown via dependency injection. Scope: function, class, module, package, session. yield fixtures run teardown after test.\n\n```python\n@pytest.fixture\ndef db():\n    conn = connect()\n    yield conn\n    conn.close()\n```"
    },
    {
      "question": "conftest.py role?",
      "explanation": "Shared fixtures and hooks for a directory tree—no import needed; pytest auto-discovers."
    },
    {
      "question": "parametrize?",
      "explanation": "Run same test with multiple inputs—table-driven tests without copy-paste.\n\n```python\n@pytest.mark.parametrize(\"n,expected\", [(1, 2), (2, 4)])\ndef test_double(n, expected):\n    assert double(n) == expected\n```"
    },
    {
      "question": "Mocking with pytest-mock?",
      "explanation": "mocker fixture wraps unittest.mock. patch object paths where used, not where defined.\n\n```python\ndef test_api(mocker):\n    mocker.patch(\"myapp.client.fetch\", return_value={\"ok\": True})\n```"
    },
    {
      "question": "pytest.raises?",
      "explanation": "Assert exception type and optionally match message regex.\n\n```python\nwith pytest.raises(ValueError, match=\"invalid\"):\n    parse(\"\")\n```"
    },
    {
      "question": "Markers?",
      "explanation": "@pytest.mark.slow, skip, xfail. Register custom markers in pytest.ini to avoid warnings. -m \"not slow\" to filter."
    },
    {
      "question": "tmp_path fixture?",
      "explanation": "Built-in pathlib temp directory per test—preferred over manual tempfile for filesystem tests.\n\n```python\ndef test_write(tmp_path):\n    p = tmp_path / \"out.txt\"\n    p.write_text(\"hi\")\n```"
    },
    {
      "question": "monkeypatch?",
      "explanation": "Safely set env vars, attributes, dict items for test isolation—auto-restored after test.\n\n```python\ndef test_env(monkeypatch):\n    monkeypatch.setenv(\"API_KEY\", \"test\")\n```"
    },
    {
      "question": "pytest-asyncio?",
      "explanation": "Mark async tests @pytest.mark.asyncio or configure asyncio_mode=auto. Use async fixtures for async DB/API setup.\n\n```python\n@pytest.mark.asyncio\nasync def test_fetch():\n    assert await fetch_status() == 200\n```"
    },
    {
      "question": "Coverage with pytest-cov?",
      "explanation": "pytest --cov=myapp --cov-report=term-missing. Fail under threshold: --cov-fail-under=90."
    },
    {
      "question": "Factory patterns in tests?",
      "explanation": "pytest-factoryboy or plain factory functions build model instances—keep tests readable and DRY."
    },
    {
      "question": "Snapshot / approval testing?",
      "explanation": "syrupy or inline golden files for complex outputs. Review diffs on intentional changes."
    },
    {
      "question": "CI pytest command?",
      "explanation": "pytest -q --tb=short --strict-markers -x for fail-fast PR checks. Parallel: pytest -n auto with xdist."
    }
  ]
};
