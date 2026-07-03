# Production Dockerfile

**Difficulty:** hard  
**Topics:** docker, deployment

## Learning goals

- Multi-stage build
- Run as non-root

## Challenge

Write Dockerfile multi-stage: builder installs deps with uv/pip; runtime slim image copies venv, sets USER app, CMD uvicorn.

## Requirements

1. Multi-stage build
2. Non-root USER
3. PYTHONUNBUFFERED=1

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/hard/08-production-dockerfile/`. Reference write-ups in this repo live under `challenges/hard/08-production-dockerfile/` (not loaded by the app).

```python
# Dockerfile
# TODO builder and runtime stages
```

## Hints

1. FROM python:3.12-slim AS builder
2. RUN pip install --prefix=/install
3. COPY --from=builder /install /install

## Acceptance criteria

- [ ] **Image builds successfully**
  Image builds successfully. Run docker compose config or docker build to validate the file parses and builds.

- [ ] **Runs uvicorn on 8000**
  Runs uvicorn on 8000. Run docker compose config or docker build to validate the file parses and builds.

- [ ] **Non-root user configured**
  Non-root user configured: Non-root USER. Run docker compose config or docker build to validate the file parses and builds.

## Resources

- [Docker Get Started](https://docs.docker.com/get-started/)
- [Python Tutorial](https://docs.python.org/3/tutorial/)
