# Docker Compose Stack

**Difficulty:** medium  
**Topics:** docker, docker-compose

## Learning goals

- Define multi-service compose
- Wire env and ports

## Challenge

Author `docker-compose.yml` for `web` (FastAPI on 8000) and `db` (postgres:16) with healthcheck and DATABASE_URL env for web.

## Requirements

1. Two services defined
2. db volume persisted
3. web depends_on db

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/medium/27-docker-compose/`. Reference write-ups in this repo live under `challenges/medium/27-docker-compose/` (not loaded by the app).

```python
# docker-compose.yml
services:
  web:
    build: .
    ports:
      - "8000:8000"
    # TODO env and depends_on
  db:
    image: postgres:16
    # TODO
```

## Hints

1. environment DATABASE_URL=postgresql://...
2. volumes: pgdata:/var/lib/postgresql/data
3. depends_on: [db]

## Acceptance criteria

- [ ] **Stack starts with compose up**
  Stack starts with compose up. Run docker compose config or docker build to validate the file parses and builds.

- [ ] **Web connects to db host**
  Web connects to db host: web depends_on db. Run docker compose config or docker build to validate the file parses and builds.

- [ ] **Port 8000 exposed**
  Port 8000 exposed. Run docker compose config or docker build to validate the file parses and builds.

## Resources

- [Docker Get Started](https://docs.docker.com/get-started/)
- [docker-compose – reference](https://docs.docker.com/compose/)
