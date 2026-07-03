# Solution: Docker Compose Stack

## Approach

Compose services with env linking web to db hostname `db` on internal network.

## Key concepts

- **depends_on**: Startup ordering hint between services.
- **named volume**: Persists database data across restarts.


## Solution code

```python
# docker-compose.yml
services:
  web:
    build: .
    ports:
      - "8000:8000"
    environment:
      DATABASE_URL: postgresql://app:app@db:5432/app
    depends_on:
      - db
  db:
    image: postgres:16
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: app
      POSTGRES_DB: app
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app"]
      interval: 5s
      retries: 5

volumes:
  pgdata:
```

## Walkthrough

Web service gets DATABASE_URL pointing at db host; postgres persists volume; healthcheck waits for readiness.

## Common mistakes

- Using localhost for db from web container
- No volume so data lost on restart

## Stretch goals

- Add redis cache service
- Use compose profiles
