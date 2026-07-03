import { challenge } from './helpers.mjs';

export const hardChallenges = [
  challenge({
    slug: '01-fastapi-auth',
    title: 'FastAPI JWT Auth',
    difficulty: 'hard',
    topics: ['fastapi', 'jwt', 'auth'],
    goals: ['Issue and verify JWTs', 'Protect routes with dependencies'],
    description:
      'Implement login returning JWT and dependency `get_current_user` validating Bearer token with `python-jose`.',
    requirements: ['HS256 signed tokens', '401 on invalid token', 'Expiry exp claim enforced'],
    starter: `from datetime import datetime, timedelta, timezone
from fastapi import Depends, FastAPI, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

app = FastAPI()
security = HTTPBearer()
SECRET = "dev-only-secret"

# TODO: create_token, get_current_user, /login`,
    hints: ['jwt.encode({"sub": user, "exp": ...}, SECRET, algorithm="HS256")', 'HTTPBearer credentials', 'jwt.decode with algorithms=[HS256]'],
    acceptance: ['Login returns token', 'Protected route needs token', 'Expired token rejected'],
    solutionApproach:
      'Login encodes claims; dependency decodes Bearer token and maps to user.',
    concepts: [{ term: 'JWT', detail: 'Signed claims for stateless auth between services.' }, { term: 'HTTPBearer', detail: 'FastAPI security scheme reading Authorization header.' }],
    solution: `from datetime import datetime, timedelta, timezone
from fastapi import Depends, FastAPI, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt

app = FastAPI()
security = HTTPBearer()
SECRET = "dev-only-secret"
ALGORITHM = "HS256"

def create_token(subject: str, minutes: int = 30) -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=minutes)
    return jwt.encode({"sub": subject, "exp": expire}, SECRET, algorithm=ALGORITHM)

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> str:
    try:
        payload = jwt.decode(credentials.credentials, SECRET, algorithms=[ALGORITHM])
        sub = payload.get("sub")
        if not sub:
            raise HTTPException(status_code=401, detail="invalid token")
        return str(sub)
    except JWTError as exc:
        raise HTTPException(status_code=401, detail="invalid token") from exc

@app.post("/login")
def login(username: str, password: str) -> dict[str, str]:
    if password != "secret":
        raise HTTPException(status_code=401, detail="bad credentials")
    return {"access_token": create_token(username), "token_type": "bearer"}

@app.get("/me")
def me(user: str = Depends(get_current_user)) -> dict[str, str]:
    return {"user": user}`,
    walkthrough:
      'Login mints JWT with exp; get_current_user decodes Bearer token; /me requires valid subject.',
    mistakes: ['Hardcoded secret in prod', 'Skipping exp validation'],
    stretch: ['Refresh tokens', 'OAuth2 password flow'],
  }),

  challenge({
    slug: '02-async-db-pool',
    title: 'Async DB Pool',
    difficulty: 'hard',
    topics: ['asyncpg', 'sqlalchemy'],
    goals: ['Create async engine pool', 'Query with async session'],
    description:
      'Setup SQLAlchemy async engine and `async def get_user(session, user_id) -> dict | None` using `select` against User ORM model.',
    requirements: ['asyncpg driver URL', 'Context managed session', 'Proper await execute/scalar'],
    starter: `from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]

async def get_user(session: AsyncSession, user_id: int) -> dict | None:
    # TODO
    raise NotImplementedError`,
    hints: ['engine = create_async_engine("postgresql+asyncpg://...")', 'result = await session.execute(select(User).where(...))', 'user = result.scalar_one_or_none()'],
    acceptance: ['Returns user dict', 'Missing id returns None', 'Async session used'],
    solutionApproach:
      'Async session executes select; map ORM row to dict for API layer.',
    concepts: [{ term: 'async engine', detail: 'Non-blocking database IO under asyncio.' }, { term: 'scalar_one_or_none', detail: 'Fetch single row or None cleanly.' }],
    solution: `from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]

def make_session_factory(url: str):
    engine = create_async_engine(url)
    return async_sessionmaker(engine, expire_on_commit=False)

async def get_user(session: AsyncSession, user_id: int) -> dict | None:
    result = await session.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if user is None:
        return None
    return {"id": user.id, "name": user.name}`,
    walkthrough:
      'Async session runs select filter by id; scalar_one_or_none; convert ORM to plain dict.',
    mistakes: ['Using sync session in async route', 'Forgetting expire_on_commit settings'],
    stretch: ['Connection pool tuning', 'Unit tests with sqlite+aiosqlite'],
  }),

  challenge({
    slug: '03-celery-tasks',
    title: 'Celery Tasks',
    difficulty: 'hard',
    topics: ['celery', 'redis'],
    goals: ['Define shared tasks', 'Configure broker and result backend'],
    description:
      'Create Celery app with `@shared_task` `add(x, y)` and `send_welcome_email(user_id)` retrying on failure max 3 times.',
    requirements: ['Redis broker URL from env', 'Task bind=True for retry', 'JSON serialization'],
    starter: `import os
from celery import Celery

app = Celery("worker", broker=os.environ.get("CELERY_BROKER_URL", "redis://localhost:6379/0"))

@app.task
def add(x: int, y: int) -> int:
    # TODO
    raise NotImplementedError`,
    hints: ['app.conf.task_serializer = "json"', '@app.task(bind=True, max_retries=3)', 'self.retry(exc=exc, countdown=5)'],
    acceptance: ['add returns sum', 'Email task retries', 'Broker URL configurable'],
    solutionApproach:
      'Celery app reads broker env; tasks registered; bind enables retry API.',
    concepts: [{ term: 'Celery', detail: 'Distributed task queue for background work.' }, { term: 'bind=True', detail: 'Passes task instance as self for retry/countdown.' }],
    solution: `import os
from celery import Celery

app = Celery("worker", broker=os.environ.get("CELERY_BROKER_URL", "redis://localhost:6379/0"))
app.conf.task_serializer = "json"
app.conf.result_serializer = "json"

@app.task
def add(x: int, y: int) -> int:
    return x + y

@app.task(bind=True, max_retries=3)
def send_welcome_email(self, user_id: int) -> None:
    try:
        if user_id <= 0:
            raise ValueError("invalid user")
        # simulate send
    except Exception as exc:
        raise self.retry(exc=exc, countdown=5)`,
    walkthrough:
      'Celery configured with JSON serializers; add is pure; email task retries on errors via self.retry.',
    mistakes: ['Pickle serializer with untrusted broker', 'No max_retries cap'],
    stretch: ['Canvas chords/chains', 'Flower monitoring'],
  }),

  challenge({
    slug: '04-rag-ingestion',
    title: 'RAG Document Ingestion',
    difficulty: 'hard',
    topics: ['rag', 'embeddings'],
    goals: ['Chunk documents', 'Store embeddings for search'],
    description:
      'Implement `chunk_text(text, size=500, overlap=50) -> list[str]` and `InMemoryVectorStore.add(doc_id, chunks, embeddings)` with cosine similarity search.',
    requirements: ['Overlapping chunks', 'Cosine similarity top-k', 'Embedding list same dim'],
    starter: `import math
from dataclasses import dataclass

def chunk_text(text: str, size: int = 500, overlap: int = 50) -> list[str]:
    # TODO
    raise NotImplementedError

@dataclass
class VectorRecord:
    doc_id: str
    chunk: str
    embedding: list[float]

class InMemoryVectorStore:
    def __init__(self) -> None:
        self._records: list[VectorRecord] = []

    def add(self, doc_id: str, chunks: list[str], embeddings: list[list[float]]) -> None:
        ...

    def search(self, query: list[float], k: int = 3) -> list[VectorRecord]:
        ...`,
    hints: ['step = size - overlap', 'dot / (norms product) for cosine', 'sorted scores[:k]'],
    acceptance: ['Chunks overlap correctly', 'Top-k by similarity', 'Dimension mismatch raises'],
    solutionApproach:
      'Slide window over text; store records; rank by cosine similarity.',
    concepts: [{ term: 'chunking', detail: 'Split long docs for embedding models with context limits.' }, { term: 'cosine similarity', detail: 'Measures angle between vectors for semantic nearness.' }],
    solution: `import math
from dataclasses import dataclass

def chunk_text(text: str, size: int = 500, overlap: int = 50) -> list[str]:
    if size <= overlap:
        raise ValueError("size must exceed overlap")
    chunks: list[str] = []
    start = 0
    while start < len(text):
        chunks.append(text[start : start + size])
        start += size - overlap
    return chunks

@dataclass
class VectorRecord:
    doc_id: str
    chunk: str
    embedding: list[float]

class InMemoryVectorStore:
    def __init__(self) -> None:
        self._records: list[VectorRecord] = []

    def add(self, doc_id: str, chunks: list[str], embeddings: list[list[float]]) -> None:
        if len(chunks) != len(embeddings):
            raise ValueError("chunks/embeddings length mismatch")
        for chunk, emb in zip(chunks, embeddings):
            self._records.append(VectorRecord(doc_id, chunk, emb))

    def _cosine(self, a: list[float], b: list[float]) -> float:
        dot = sum(x * y for x, y in zip(a, b))
        na = math.sqrt(sum(x * x for x in a))
        nb = math.sqrt(sum(x * x for x in b))
        if na == 0 or nb == 0:
            return 0.0
        return dot / (na * nb)

    def search(self, query: list[float], k: int = 3) -> list[VectorRecord]:
        ranked = sorted(self._records, key=lambda r: self._cosine(query, r.embedding), reverse=True)
        return ranked[:k]`,
    walkthrough:
      'chunk_text slides window; store pairs embedding/chunk; search sorts by cosine and slices top k.',
    mistakes: ['Non-overlapping chunks lose context', 'Dot product without normalization'],
    stretch: ['Pluggable embedding API', 'Persist to chromadb'],
  }),

  challenge({
    slug: '05-openai-structured-output',
    title: 'OpenAI Structured Output',
    difficulty: 'hard',
    topics: ['openai', 'pydantic'],
    goals: ['Request JSON schema responses', 'Parse into Pydantic models'],
    description:
      'Use OpenAI chat completions with `response_format` JSON schema to extract `Invoice` model fields from raw text via `parse_invoice(text) -> Invoice`.',
    requirements: ['Pydantic Invoice model', 'response_format json_schema', 'Handle API errors gracefully'],
    starter: `from openai import OpenAI
from pydantic import BaseModel

class Invoice(BaseModel):
    vendor: str
    total: float
    currency: str = "USD"

client = OpenAI()

def parse_invoice(text: str) -> Invoice:
    # TODO
    raise NotImplementedError`,
    hints: ['client.beta.chat.completions.parse', 'response_format=Invoice', 'or json_schema in response_format'],
    acceptance: ['Returns Invoice instance', 'Invalid response raises', 'Currency default USD'],
    solutionApproach:
      'Use structured outputs API binding Pydantic model to parsed completion.',
    concepts: [{ term: 'structured outputs', detail: 'Model constrained to valid JSON matching schema.' }, { term: 'Pydantic parsing', detail: 'Validates LLM JSON before app uses it.' }],
    solution: `from openai import OpenAI
from pydantic import BaseModel

class Invoice(BaseModel):
    vendor: str
    total: float
    currency: str = "USD"

client = OpenAI()

def parse_invoice(text: str) -> Invoice:
    completion = client.beta.chat.completions.parse(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Extract invoice fields."},
            {"role": "user", "content": text},
        ],
        response_format=Invoice,
    )
    message = completion.choices[0].message
    if message.parsed is None:
        raise ValueError("failed to parse invoice")
    return message.parsed`,
    walkthrough:
      'Chat completions.parse binds Invoice schema; parsed attribute gives validated model instance.',
    mistakes: ['Trusting free-form JSON', 'No guard when parsed is None'],
    stretch: ['Fallback regex parser', 'Batch extraction pipeline'],
  }),

  challenge({
    slug: '06-multi-agent-orchestrator',
    title: 'Multi-Agent Orchestrator',
    difficulty: 'hard',
    topics: ['agents', 'orchestration'],
    goals: ['Route tasks between agents', 'Aggregate results'],
    description:
      'Implement `Orchestrator` registering agents with `can_handle(task)` and `run(task)`; route first matching agent and return structured result.',
    requirements: ['Protocol for Agent', 'Raise if no agent matches', 'Collect metadata timing'],
    starter: `from dataclasses import dataclass
from typing import Protocol

@dataclass
class Task:
    kind: str
    payload: dict[str, object]

class Agent(Protocol):
    def can_handle(self, task: Task) -> bool: ...
    def run(self, task: Task) -> dict[str, object]: ...

class Orchestrator:
    def __init__(self, agents: list[Agent]) -> None:
        self._agents = agents

    def dispatch(self, task: Task) -> dict[str, object]:
        # TODO
        raise NotImplementedError`,
    hints: ['for agent in self._agents', 'if agent.can_handle(task): return agent.run(task)', 'raise RuntimeError("no agent")'],
    acceptance: ['Correct agent selected', 'Unknown task fails', 'Result includes agent name'],
    solutionApproach:
      'Linear scan agents; first match runs; enrich result with orchestrator metadata.',
    concepts: [{ term: 'orchestrator', detail: 'Coordinates specialized workers by task type.' }, { term: 'Protocol', detail: 'Agents share interface without base class.' }],
    solution: `from dataclasses import dataclass
from typing import Protocol

@dataclass
class Task:
    kind: str
    payload: dict[str, object]

class Agent(Protocol):
    name: str
    def can_handle(self, task: Task) -> bool: ...
    def run(self, task: Task) -> dict[str, object]: ...

class Orchestrator:
    def __init__(self, agents: list[Agent]) -> None:
        self._agents = agents

    def dispatch(self, task: Task) -> dict[str, object]:
        for agent in self._agents:
            if agent.can_handle(task):
                result = agent.run(task)
                return {"agent": agent.name, "result": result}
        raise RuntimeError(f"no agent for task kind {task.kind}")`,
    walkthrough:
      'Orchestrator iterates agents; first can_handle wins; wraps result with agent name; else error.',
    mistakes: ['Running all agents always', 'Silent None when unmatched'],
    stretch: ['Parallel fan-out merge', 'LLM-based router'],
  }),

  challenge({
    slug: '07-performance-profiling',
    title: 'Performance Profiling',
    difficulty: 'hard',
    topics: ['profiling', 'performance'],
    goals: ['Profile hot paths', 'Report actionable metrics'],
    description:
      'Use `cProfile` and `pstats` to wrap `expensive()` and return top 5 functions by cumulative time as list of dicts.',
    requirements: ['Use cProfile.Profile', 'Sort by cumulative', 'Include ncalls and cumtime'],
    starter: `import cProfile
import pstats
from io import StringIO

def profile_top(stats_target: callable, limit: int = 5) -> list[dict[str, object]]:
    # TODO
    raise NotImplementedError`,
    hints: ['prof = cProfile.Profile(); prof.enable()', 'prof.runctx or prof.runcall', 'stats.sort_stats("cumulative")'],
    acceptance: ['Returns up to 5 entries', 'Sorted by cumtime', 'Includes function names'],
    solutionApproach:
      'Run callable under cProfile; capture stats; extract top rows.',
    concepts: [{ term: 'cProfile', detail: 'Deterministic profiler for Python call stacks.' }, { term: 'cumulative time', detail: 'Includes time in nested calls— good for finding hot paths.' }],
    solution: `import cProfile
import pstats
from io import StringIO
from typing import Callable

def profile_top(stats_target: Callable[[], object], limit: int = 5) -> list[dict[str, object]]:
    profiler = cProfile.Profile()
    profiler.enable()
    stats_target()
    profiler.disable()
    stream = StringIO()
    stats = pstats.Stats(profiler, stream=stream)
    stats.sort_stats("cumulative")
    rows: list[dict[str, object]] = []
    for (filename, line, func), stat in stats.stats.items():
        rows.append({
            "function": f"{filename}:{line}({func})",
            "ncalls": stat.callcount,
            "cumtime": stat.cumtime,
        })
    rows.sort(key=lambda r: r["cumtime"], reverse=True)
    return rows[:limit]`,
    walkthrough:
      'Profile enables around target; Stats sorted cumulative; map to dict rows and slice top limit.',
    mistakes: ['Profiling in production always on', 'Sorting by tottime only'],
    stretch: ['py-spy flame graphs', 'Benchmark with pytest-benchmark'],
  }),

  challenge({
    slug: '08-production-dockerfile',
    title: 'Production Dockerfile',
    difficulty: 'hard',
    topics: ['docker', 'deployment'],
    goals: ['Multi-stage build', 'Run as non-root'],
    description:
      'Write Dockerfile multi-stage: builder installs deps with uv/pip; runtime slim image copies venv, sets USER app, CMD uvicorn.',
    requirements: ['Multi-stage build', 'Non-root USER', 'PYTHONUNBUFFERED=1'],
    starter: `# Dockerfile
# TODO builder and runtime stages`,
    hints: ['FROM python:3.12-slim AS builder', 'RUN pip install --prefix=/install', 'COPY --from=builder /install /install'],
    acceptance: ['Image builds successfully', 'Runs uvicorn on 8000', 'Non-root user configured'],
    solutionApproach:
      'Builder stage installs deps; runtime copies artifacts only; drop privileges.',
    concepts: [{ term: 'multi-stage', detail: 'Keeps final image small without build tools.' }, { term: 'non-root', detail: 'Reduces container escape blast radius.' }],
    solution: `# Dockerfile
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
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]`,
    walkthrough:
      'Builder installs requirements to prefix; runtime slim copies deps and app; USER appuser before CMD.',
    mistakes: ['Single stage with gcc left in image', 'Running as root in production'],
    stretch: ['Distroless final stage', 'Healthcheck instruction'],
  }),
];
