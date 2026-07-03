# Solution: Production Dockerfile

## Approach

Builder stage installs deps; runtime copies artifacts only; drop privileges.

## Key concepts

- **multi-stage**: Keeps final image small without build tools.
- **non-root**: Reduces container escape blast radius.


## Solution code

```python
# Dockerfile
FROM python:3.12-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --prefix=/install -r requirements.txt

FROM python:3.12-slim
ENV PYTHONUNBUFFERED=1
WORKDIR /app
COPY --from=builder /install /usr/local
COPY app ./app
RUN useradd --create-home appuser
USER appuser
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## Walkthrough

Builder installs requirements to prefix; runtime slim copies deps and app; USER appuser before CMD.

## Common mistakes

- Single stage with gcc left in image
- Running as root in production

## Stretch goals

- Distroless final stage
- Healthcheck instruction
