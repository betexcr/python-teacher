import type { FlashcardDeck } from './types';

export const devopsDeck: FlashcardDeck = {
  "id": "devops",
  "slug": "devops",
  "title": "DevOps for Python",
  "cards": [
    {
      "question": "venv vs poetry vs uv?",
      "explanation": "venv+pip: stdlib baseline. Poetry: lockfile, packaging. uv: fast resolver/installer (Rust). All isolate dependencies per project.\n\n```python\npython -m venv .venv\nsource .venv/bin/activate  # or .venv\\Scripts\\activate on Windows\npip install -r requirements.txt\n```"
    },
    {
      "question": "requirements.txt vs pyproject.toml?",
      "explanation": "requirements.txt/pip-tools pin deps for apps. pyproject.toml (PEP 621) defines project metadata and tool config; poetry/uv/pdm manage locks."
    },
    {
      "question": "Dockerfile for Python app?",
      "explanation": "Multi-stage: builder installs deps, runtime slim image copies venv/app. Non-root user, .dockerignore, pin base image digest.\n\n```python\nFROM python:3.12-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY . .\nCMD [\"gunicorn\", \"app:app\"]\n```"
    },
    {
      "question": "12-factor app basics?",
      "explanation": "Config in env, stateless processes, logs as streams, disposability, dev/prod parity. PYTHONPATH and settings from environment."
    },
    {
      "question": "GitHub Actions CI for Python?",
      "explanation": "Matrix python-version, cache pip, run ruff/mypy/pytest, build Docker on main.\n\n```python\n- uses: actions/setup-python@v5\n  with:\n    python-version: \"3.12\"\n- run: pip install -e \".[test]\"\n- run: pytest\n```"
    },
    {
      "question": "Pre-commit hooks?",
      "explanation": "ruff format/check, mypy, trailing whitespace before commit. Same checks in CI."
    },
    {
      "question": "Environment variables with pydantic-settings?",
      "explanation": "BaseSettings loads from env/.env with validation—type-safe config for apps.\n\n```python\nclass Settings(BaseSettings):\n    database_url: str\n    debug: bool = False\n```"
    },
    {
      "question": "Health and readiness probes?",
      "explanation": "/health live (process up), /ready checks DB/redis—Kubernetes uses these for routing and restarts."
    },
    {
      "question": "Structured logging in prod?",
      "explanation": "JSON logs to stdout for aggregation (Datadog, CloudWatch). Include trace_id, request_id, level, timestamp."
    },
    {
      "question": "Secrets management?",
      "explanation": "Never in git. Use vault, SSM Parameter Store, K8s secrets. Inject at runtime; rotate regularly."
    },
    {
      "question": "Gunicorn + Uvicorn workers?",
      "explanation": "gunicorn -k uvicorn.workers.UvicornWorker for ASGI FastAPI. Worker count ~ 2*CPU+1 rule of thumb, tune under load."
    },
    {
      "question": "Makefile / task runner?",
      "explanation": "Standardize dev commands: make test, lint, run. invoke, just, or npm-style scripts in pyproject optional."
    },
    {
      "question": "Semantic versioning and releases?",
      "explanation": "Semver for libraries. Tag releases, publish to PyPI with trusted publishing/GitHub Actions OIDC."
    },
    {
      "question": "Monitoring Python services?",
      "explanation": "Prometheus metrics (prometheus_client), Sentry for errors, OpenTelemetry traces. Watch memory—C extensions can leak."
    },
    {
      "question": "Blue/green or rolling deploys?",
      "explanation": "Rolling: gradual pod replacement. Blue/green: switch traffic between two envs—faster rollback, more resources."
    }
  ]
};
