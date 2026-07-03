import type { FlashcardDeck } from './types';

export const fastapiDeck: FlashcardDeck = {
  "id": "fastapi",
  "slug": "fastapi",
  "title": "FastAPI",
  "cards": [
    {
      "question": "Why FastAPI is fast?",
      "explanation": "Starlette (async ASGI) + Pydantic validation (v2 uses Rust core). Not magic—efficient I/O and compiled validation help under load."
    },
    {
      "question": "Minimal FastAPI app?",
      "explanation": "App instance, path operation decorators, uvicorn to serve. Return dict for JSON; type hints drive OpenAPI schema.\n\n```python\nfrom fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get(\"/health\")\ndef health():\n    return {\"status\": \"ok\"}\n```"
    },
    {
      "question": "Path vs query parameters?",
      "explanation": "Path params in route signature without default. Query params have defaults or use Query(...) for validation.\n\n```python\n@app.get(\"/items/{item_id}\")\ndef read_item(item_id: int, q: str | None = None): ...\n```"
    },
    {
      "question": "Request body with Pydantic?",
      "explanation": "Single Pydantic model parameter becomes JSON body. Automatic 422 on validation errors with detail payload.\n\n```python\nclass ItemCreate(BaseModel):\n    name: str\n    price: float\n\n@app.post(\"/items\")\ndef create(item: ItemCreate): ...\n```"
    },
    {
      "question": "Dependency Injection?",
      "explanation": "Depends() resolves shared resources (DB session, auth user, settings) per request—testable and composable.\n\n```python\ndef get_db():\n    db = SessionLocal()\n    try:\n        yield db\n    finally:\n        db.close()\n```"
    },
    {
      "question": "APIRouter?",
      "explanation": "Modular routes: router = APIRouter(prefix=\"/users\", tags=[\"users\"]); app.include_router(router)."
    },
    {
      "question": "Background tasks?",
      "explanation": "BackgroundTasks for fire-and-forget work after response—email, logging. Not durable; use Celery/RQ for heavy jobs.\n\n```python\ndef send_email(): ...\n\n@app.post(\"/signup\")\ndef signup(bg: BackgroundTasks):\n    bg.add_task(send_email)\n```"
    },
    {
      "question": "Middleware?",
      "explanation": "ASGI middleware for cross-cutting concerns: CORS, timing, request IDs. app.add_middleware(CORSMiddleware, ...)."
    },
    {
      "question": "Exception handlers?",
      "explanation": "@app.exception_handler(CustomError) return JSONResponse—consistent error shape across app."
    },
    {
      "question": "Async path operations?",
      "explanation": "async def when using await (async DB/HTTP). def for CPU-light sync code—FastAPI runs sync in threadpool.\n\n```python\n@app.get(\"/data\")\nasync def data():\n    return await fetch_remote()\n```"
    },
    {
      "question": "OpenAPI and /docs?",
      "explanation": "Auto-generated Swagger UI at /docs, ReDoc at /redoc from type hints and Pydantic models."
    },
    {
      "question": "Security: OAuth2PasswordBearer?",
      "explanation": "Depends(get_current_user) pattern with JWT or opaque tokens. Use HTTPS; store secrets in env, not code."
    },
    {
      "question": "Testing FastAPI?",
      "explanation": "TestClient (Starlette) or httpx.AsyncClient with ASGITransport. Override dependencies for mocks.\n\n```python\nfrom fastapi.testclient import TestClient\n\nclient = TestClient(app)\nassert client.get(\"/health\").status_code == 200\n```"
    },
    {
      "question": "lifespan events?",
      "explanation": "@asynccontextmanager lifespan replaces startup/shutdown hooks—open/close pools, warm caches.\n\n```python\n@asynccontextmanager\nasync def lifespan(app: FastAPI):\n    await pool.connect()\n    yield\n    await pool.disconnect()\n```"
    },
    {
      "question": "Deployment stack?",
      "explanation": "uvicorn/gunicorn with uvicorn workers behind nginx. Docker + health endpoint. Consider Hypercorn for HTTP/2."
    }
  ]
};
