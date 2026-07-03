import { challenge } from './helpers.mjs';

export const mediumChallenges = [
  challenge({
    slug: '01-decorator-timing',
    title: 'Timing Decorator',
    difficulty: 'medium',
    topics: ['decorators', 'functools'],
    goals: ['Wrap functions with timing logic', 'Preserve metadata with functools.wraps'],
    description:
      'Write `@timed` that prints elapsed seconds for sync callables. Use `time.perf_counter()` and `functools.wraps`.',
    requirements: ['Print format: "{name} took {seconds:.4f}s"', 'Return original result', 'Preserve __name__ and __doc__'],
    starter: `import functools
import time
from collections.abc import Callable
from typing import TypeVar

F = TypeVar("F", bound=Callable[..., object])

def timed(func: F) -> F:
    # TODO
    raise NotImplementedError`,
    hints: ['@functools.wraps(func)', 'start = time.perf_counter()', 'print after call in wrapper'],
    acceptance: ['Prints elapsed time', 'Returns func result', 'Wrapped __name__ matches original'],
    solutionApproach:
      'Define wrapper with wraps, measure perf_counter around call, print, return.',
    concepts: [{ term: 'decorator', detail: 'A function that takes a callable and returns a wrapped callable.' }, { term: 'wraps', detail: 'Copies metadata so debugging and introspection stay accurate.' }],
    solution: `import functools
import time
from collections.abc import Callable
from typing import TypeVar

F = TypeVar("F", bound=Callable[..., object])

def timed(func: F) -> F:
    @functools.wraps(func)
    def wrapper(*args: object, **kwargs: object) -> object:
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"{func.__name__} took {elapsed:.4f}s")
        return result
    return wrapper  # type: ignore[return-value]`,
    walkthrough:
      'Wrapper records perf_counter before/after, prints formatted elapsed, returns result. wraps keeps metadata.',
    mistakes: ['Forgetting wraps', 'Using time.time() for short benchmarks'],
    stretch: ['Optional logger instead of print', 'Async variant with asyncio'],
  }),

  challenge({
    slug: '02-context-manager',
    title: 'Timer Context Manager',
    difficulty: 'medium',
    topics: ['contextlib', 'context-managers'],
    goals: ['Implement __enter__/__exit__', 'Use contextlib.contextmanager alternative'],
    description:
      'Build `Timer(label: str)` context manager printing `{label}: {seconds:.4f}s` on exit, even when exceptions occur.',
    requirements: ['Measure block duration', 'Print on exit', 'Do not swallow exceptions'],
    starter: `import time

class Timer:
    def __init__(self, label: str) -> None:
        self.label = label

    def __enter__(self) -> "Timer":
        # TODO
        raise NotImplementedError

    def __exit__(self, exc_type, exc, tb) -> None:
        ...`,
    hints: ['self._start in __enter__', 'elapsed in __exit__', 'return None to propagate errors'],
    acceptance: ['Prints label and duration', 'Works with with statement', 'Exception still raises'],
    solutionApproach:
      'Store start in enter; compute and print in exit; return None.',
    concepts: [{ term: 'context manager', detail: 'Guarantees setup/teardown around a with block.' }, { term: '__exit__ return', detail: 'Return True only to suppress exceptions.' }],
    solution: `import time

class Timer:
    def __init__(self, label: str) -> None:
        self.label = label
        self._start = 0.0

    def __enter__(self) -> "Timer":
        self._start = time.perf_counter()
        return self

    def __exit__(self, exc_type, exc, tb) -> None:
        elapsed = time.perf_counter() - self._start
        print(f"{self.label}: {elapsed:.4f}s")`,
    walkthrough:
      'Enter captures start time; exit always prints duration; exceptions propagate because __exit__ returns None.',
    mistakes: ['Returning True from __exit__', 'Starting timer in __init__ instead of enter'],
    stretch: ['contextlib.contextmanager version', 'Accumulate stats across runs'],
  }),

  challenge({
    slug: '03-generator-pipeline',
    title: 'Generator Pipeline',
    difficulty: 'medium',
    topics: ['generators', 'iterators'],
    goals: ['Chain lazy iterators', 'Avoid materializing large lists'],
    description:
      'Implement `read_lines(path)`, `skip_comments(lines)`, and `parse_csv_rows(lines)` as generators yielding stripped non-comment CSV rows.',
    requirements: ['Lines starting with # skipped', 'Yield stripped strings', 'Compose without list()'],
    starter: `from collections.abc import Iterator
from pathlib import Path

def read_lines(path: Path) -> Iterator[str]:
    # TODO
    raise NotImplementedError

def skip_comments(lines: Iterator[str]) -> Iterator[str]:
    ...

def parse_csv_rows(lines: Iterator[str]) -> Iterator[list[str]]:
    ...`,
    hints: ['yield from path.open()', 'if not line.lstrip().startswith("#")', 'line.split(",")'],
    acceptance: ['Comments skipped', 'Lazy iteration', 'CSV split correct'],
    solutionApproach:
      'Each stage yields from previous; pipeline stays lazy end-to-end.',
    concepts: [{ term: 'yield from', detail: 'Delegates iteration to a sub-iterator cleanly.' }, { term: 'lazy pipeline', detail: 'Process one row at a time for memory efficiency.' }],
    solution: `from collections.abc import Iterator
from pathlib import Path

def read_lines(path: Path) -> Iterator[str]:
    with path.open(encoding="utf-8") as fh:
        yield from fh

def skip_comments(lines: Iterator[str]) -> Iterator[str]:
    for line in lines:
        stripped = line.strip()
        if stripped and not stripped.startswith("#"):
            yield stripped

def parse_csv_rows(lines: Iterator[str]) -> Iterator[list[str]]:
    for line in lines:
        yield [part.strip() for part in line.split(",")]`,
    walkthrough:
      'read_lines streams file; skip_comments filters; parse_csv_rows splits. Compose with nested calls.',
    mistakes: ['Building full list upfront', 'Not stripping parts'],
    stretch: ['TypedDict row parser', 'Handle quoted CSV fields'],
  }),

  challenge({
    slug: '04-dataclass-validation',
    title: 'Validated Dataclass',
    difficulty: 'medium',
    topics: ['dataclasses', 'validation'],
    goals: ['Use __post_init__ for validation', 'Raise clear errors'],
    description:
      'Create `@dataclass User` with `email: str` and `age: int`. Validate email contains `@` and age is 0-150 in `__post_init__`.',
    requirements: ['Invalid email raises ValueError', 'Age out of range raises', 'Frozen optional'],
    starter: `from dataclasses import dataclass

@dataclass
class User:
    email: str
    age: int

    def __post_init__(self) -> None:
        # TODO
        ...`,
    hints: ['if "@" not in email', 'if not 0 <= age <= 150', 'raise ValueError with message'],
    acceptance: ['Valid user constructs', 'Bad email fails', 'Bad age fails'],
    solutionApproach:
      'Centralize rules in __post_init__ immediately after field assignment.',
    concepts: [{ term: '__post_init__', detail: 'Runs after dataclass-generated __init__ for extra checks.' }, { term: 'invariants', detail: 'Rules that must always hold for a valid instance.' }],
    solution: `from dataclasses import dataclass

@dataclass
class User:
    email: str
    age: int

    def __post_init__(self) -> None:
        if "@" not in self.email:
            raise ValueError("invalid email")
        if not 0 <= self.age <= 150:
            raise ValueError("age out of range")`,
    walkthrough:
      'Dataclass creates init; __post_init__ validates email and age before object is used.',
    mistakes: ['Validating in every method instead of init', 'Silent coercion of bad data'],
    stretch: ['Use pydantic model instead', 'Add email normalization'],
  }),

  challenge({
    slug: '05-pytest-fixtures-mocks',
    title: 'Pytest Fixtures and Mocks',
    difficulty: 'medium',
    topics: ['pytest', 'unittest.mock'],
    goals: ['Share setup via fixtures', 'Mock external HTTP calls'],
    description:
      'Implement `fetch_status(url) -> int` using `requests.get`. Write tests with `@pytest.fixture` client and `unittest.mock.patch` so no real HTTP occurs.',
    requirements: ['Fixture provides base URL', 'Mock returns 200', 'Assert called with expected URL'],
    starter: `import requests

def fetch_status(url: str) -> int:
    response = requests.get(url, timeout=5.0)
    return response.status_code

# test_fetch.py — add fixture and patch`,
    hints: ['@pytest.fixture def api_url()', '@patch("module.requests.get")', 'mock_get.return_value.status_code = 200'],
    acceptance: ['Test passes offline', 'Mock called once', 'Fixture reused'],
    solutionApproach:
      'Patch requests.get in test module path; fixture holds URL; assert status and call args.',
    concepts: [{ term: 'fixture', detail: 'Reusable setup injected into tests by name.' }, { term: 'patch', detail: 'Replace object during test, restored after.' }],
    solution: `import requests

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
    mock_get.assert_called_once_with(api_url, timeout=5.0)`,
    walkthrough:
      'Fixture supplies URL; patch replaces requests.get; mock configures response; assert behavior.',
    mistakes: ['Patching wrong import path', 'Forgetting timeout in assert'],
    stretch: ['pytest-httpx for async', 'Parametrize status codes'],
  }),

  challenge({
    slug: '06-flask-blueprint',
    title: 'Flask Blueprint',
    difficulty: 'medium',
    topics: ['flask', 'blueprints'],
    goals: ['Organize routes in blueprints', 'Register on app factory'],
    description:
      'Create `users_bp` blueprint with `GET /users` returning JSON list and register it on a Flask app at `/api` prefix.',
    requirements: ['Blueprint named users', 'Route returns JSON', 'url_prefix /api'],
    starter: `from flask import Blueprint, Flask, jsonify

users_bp = Blueprint("users", __name__)

# TODO: route and create_app()`,
    hints: ['@users_bp.get("/users")', 'app.register_blueprint(users_bp, url_prefix="/api")', 'return jsonify([...])'],
    acceptance: ['GET /api/users works', 'JSON response', 'Blueprint registered'],
    solutionApproach:
      'Define blueprint routes; app factory registers with prefix.',
    concepts: [{ term: 'Blueprint', detail: 'Modular route group you mount on an app.' }, { term: 'app factory', detail: 'create_app() pattern enables testing and config.' }],
    solution: `from flask import Blueprint, Flask, jsonify

users_bp = Blueprint("users", __name__)

@users_bp.get("/users")
def list_users():
    return jsonify([{"id": 1, "name": "Ada"}])

def create_app() -> Flask:
    app = Flask(__name__)
    app.register_blueprint(users_bp, url_prefix="/api")
    return app`,
    walkthrough:
      'Blueprint holds users route; create_app registers it under /api so path is /api/users.',
    mistakes: ['Registering without url_prefix', 'Returning dict without jsonify in older Flask'],
    stretch: ['Add POST /users', 'Separate admin blueprint'],
  }),

  challenge({
    slug: '07-fastapi-crud',
    title: 'FastAPI CRUD',
    difficulty: 'medium',
    topics: ['fastapi', 'crud'],
    goals: ['Build REST endpoints', 'Use in-memory store'],
    description:
      'Implement FastAPI app with in-memory `items: dict[int, dict]` and GET/POST/DELETE for `/items` and `/items/{item_id}`.',
    requirements: ['POST creates with auto id', 'GET 404 when missing', 'DELETE removes item'],
    starter: `from fastapi import FastAPI, HTTPException

app = FastAPI()
items: dict[int, dict[str, str]] = {}
_next_id = 1

# TODO: routes`,
    hints: ['global _next_id increment', 'raise HTTPException(404)', 'return item on POST'],
    acceptance: ['POST returns id', 'GET by id works', 'DELETE 404 when gone'],
    solutionApproach:
      'Mutable module store; POST assigns id; GET/DELETE validate existence.',
    concepts: [{ term: 'HTTPException', detail: 'FastAPI converts to proper status codes.' }, { term: 'in-memory store', detail: 'Fine for learning; swap for DB later.' }],
    solution: `from fastapi import FastAPI, HTTPException

app = FastAPI()
items: dict[int, dict[str, str]] = {}
_next_id = 1

@app.post("/items")
def create_item(body: dict[str, str]) -> dict[str, object]:
    global _next_id
    item_id = _next_id
    _next_id += 1
    items[item_id] = body
    return {"id": item_id, **body}

@app.get("/items/{item_id}")
def get_item(item_id: int) -> dict[str, str]:
    if item_id not in items:
        raise HTTPException(status_code=404, detail="not found")
    return items[item_id]

@app.delete("/items/{item_id}")
def delete_item(item_id: int) -> dict[str, str]:
    if item_id not in items:
        raise HTTPException(status_code=404, detail="not found")
    return items.pop(item_id)`,
    walkthrough:
      'POST assigns incremental id; GET/DELETE check dict membership and raise 404 otherwise.',
    mistakes: ['Reusing ids after delete', 'No 404 on missing keys'],
    stretch: ['Pydantic Item model', 'Persist to SQLite'],
  }),

  challenge({
    slug: '08-pydantic-models',
    title: 'Pydantic Models',
    difficulty: 'medium',
    topics: ['pydantic', 'validation'],
    goals: ['Define BaseModel schemas', 'Parse and export JSON'],
    description:
      'Create `Product` model with `name: str`, `price: float > 0`, `tags: list[str] = []`. Implement `from_json(data: str) -> Product`.',
    requirements: ['Reject price <= 0', 'Default empty tags', 'model_dump_json round trip'],
    starter: `from pydantic import BaseModel, Field

class Product(BaseModel):
    name: str
    price: float = Field(gt=0)
    tags: list[str] = []

def from_json(data: str) -> Product:
    # TODO
    raise NotImplementedError`,
    hints: ['Product.model_validate_json(data)', 'Field(gt=0)', 'tags default factory not needed with = []'],
    acceptance: ['Valid JSON parses', 'Bad price fails', 'Defaults applied'],
    solutionApproach:
      'Pydantic validates on construction; use model_validate_json for input.',
    concepts: [{ term: 'BaseModel', detail: 'Declarative schema with validation and serialization.' }, { term: 'Field constraints', detail: 'gt/ge/len embed rules beside types.' }],
    solution: `from pydantic import BaseModel, Field

class Product(BaseModel):
    name: str
    price: float = Field(gt=0)
    tags: list[str] = []

def from_json(data: str) -> Product:
    return Product.model_validate_json(data)`,
    walkthrough:
      'model_validate_json parses and validates; Field(gt=0) rejects non-positive prices; tags default to [].',
    mistakes: ['Manual json.loads without validation', 'Mutable default list without Field(default_factory) in older code'],
    stretch: ['model_validator for cross-field rules', 'Add SKU pattern'],
  }),

  challenge({
    slug: '09-sqlalchemy-models',
    title: 'SQLAlchemy Models',
    difficulty: 'medium',
    topics: ['sqlalchemy', 'orm'],
    goals: ['Define declarative models', 'Create tables and query'],
    description:
      'Define `Book` model with `id`, `title`, `author`. Provide `init_db(engine)` and `add_book(session, title, author) -> Book`.',
    requirements: ['Integer primary key', 'String title and author', 'Use session.add/commit'],
    starter: `from sqlalchemy import String, create_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, Session

class Base(DeclarativeBase):
    pass

class Book(Base):
    __tablename__ = "books"
    # TODO

def init_db(url: str) -> None:
    ...

def add_book(session: Session, title: str, author: str) -> Book:
    ...`,
    hints: ['Mapped[int] mapped_column(primary_key=True)', 'Base.metadata.create_all', 'session.commit()'],
    acceptance: ['Table created', 'Book persisted', 'Fields stored correctly'],
    solutionApproach:
      'Declarative mapped columns; create_all on init; session add/commit pattern.',
    concepts: [{ term: 'DeclarativeBase', detail: 'Modern SQLAlchemy 2 style ORM base.' }, { term: 'Session', detail: 'Unit of work tracking inserts and queries.' }],
    solution: `from sqlalchemy import String, create_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, Session

class Base(DeclarativeBase):
    pass

class Book(Base):
    __tablename__ = "books"
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(200))
    author: Mapped[str] = mapped_column(String(200))

def init_db(url: str) -> None:
    engine = create_engine(url)
    Base.metadata.create_all(engine)

def add_book(session: Session, title: str, author: str) -> Book:
    book = Book(title=title, author=author)
    session.add(book)
    session.commit()
    session.refresh(book)
    return book`,
    walkthrough:
      'Book maps columns; init_db create_all; add_book builds instance, commits, refreshes for id.',
    mistakes: ['Forgetting commit', 'Using deprecated declarative_base import style inconsistently'],
    stretch: ['Alembic migration', 'Relationship to Author table'],
  }),

  challenge({
    slug: '10-async-gather',
    title: 'Async Gather',
    difficulty: 'medium',
    topics: ['asyncio', 'concurrency'],
    goals: ['Run coroutines concurrently', 'Handle exceptions with return_exceptions'],
    description:
      'Implement `fetch_all(urls: list[str]) -> list[int]` using `asyncio.gather` and `aiohttp` to GET each URL and collect status codes.',
    requirements: ['Concurrent requests', 'Preserve input order', 'Use ClientSession context manager'],
    starter: `import asyncio
import aiohttp

async def fetch_status(session: aiohttp.ClientSession, url: str) -> int:
    # TODO
    raise NotImplementedError

async def fetch_all(urls: list[str]) -> list[int]:
    ...`,
    hints: ['async with aiohttp.ClientSession()', 'tasks = [fetch_status(session, u) for u in urls]', 'await asyncio.gather(*tasks)'],
    acceptance: ['All URLs fetched', 'Order matches input', 'Session closed properly'],
    solutionApproach:
      'Single session; list of coroutines; gather awaits all concurrently.',
    concepts: [{ term: 'asyncio.gather', detail: 'Schedule multiple awaitables and collect results in order.' }, { term: 'ClientSession', detail: 'Reuses connections across async HTTP calls.' }],
    solution: `import asyncio
import aiohttp

async def fetch_status(session: aiohttp.ClientSession, url: str) -> int:
    async with session.get(url) as response:
        return response.status

async def fetch_all(urls: list[str]) -> list[int]:
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_status(session, url) for url in urls]
        return list(await asyncio.gather(*tasks))`,
    walkthrough:
      'Open session once, build coroutine per URL, gather runs them concurrently preserving order.',
    mistakes: ['Sequential await in loop', 'Creating session per URL'],
    stretch: ['Semaphore to limit concurrency', 'return_exceptions=True handling'],
  }),

  challenge({
    slug: '11-aiohttp-client',
    title: 'Aiohttp Client Wrapper',
    difficulty: 'medium',
    topics: ['aiohttp', 'async'],
    goals: ['Wrap aiohttp session', 'Parse JSON responses safely'],
    description:
      'Build `AsyncApiClient` with `get_json(path: str) -> dict` using shared `ClientSession` and base URL.',
    requirements: ['Session in __init__ or context', 'raise on status >= 400', 'Timeout 10s'],
    starter: `import aiohttp

class AsyncApiClient:
    def __init__(self, base_url: str, session: aiohttp.ClientSession) -> None:
        self._base_url = base_url.rstrip("/")
        self._session = session

    async def get_json(self, path: str) -> dict:
        # TODO
        raise NotImplementedError`,
    hints: ['url = f"{self._base_url}{path}"', 'response.raise_for_status()', 'await response.json()'],
    acceptance: ['JSON dict returned', 'HTTP errors raise', 'Base URL joined correctly'],
    solutionApproach:
      'Compose URL, GET with timeout, raise_for_status, return parsed JSON.',
    concepts: [{ term: 'raise_for_status', detail: 'Turns HTTP error codes into exceptions.' }, { term: 'shared session', detail: 'One session per app lifecycle for connection pooling.' }],
    solution: `import aiohttp

class AsyncApiClient:
    def __init__(self, base_url: str, session: aiohttp.ClientSession) -> None:
        self._base_url = base_url.rstrip("/")
        self._session = session

    async def get_json(self, path: str) -> dict:
        url = f"{self._base_url}{path}"
        async with self._session.get(url, timeout=aiohttp.ClientTimeout(total=10)) as response:
            response.raise_for_status()
            data = await response.json()
            if not isinstance(data, dict):
                raise TypeError("expected JSON object")
            return data`,
    walkthrough:
      'Client stores base and session; get_json builds URL, GETs, checks status, parses JSON object.',
    mistakes: ['No timeout', 'Not validating JSON root type'],
    stretch: ['Retry on 503', 'Generic get method with TypeVar'],
  }),

  challenge({
    slug: '12-retry-decorator',
    title: 'Retry Decorator',
    difficulty: 'medium',
    topics: ['decorators', 'retry'],
    goals: ['Retry flaky calls', 'Exponential backoff'],
    description:
      'Implement `@retry(max_attempts=3, delay=0.1)` retrying on `Exception` with doubling delay between attempts.',
    requirements: ['Raise last exception after max', 'Reset delay each call', 'Use functools.wraps'],
    starter: `import functools
import time
from collections.abc import Callable
from typing import TypeVar

F = TypeVar("F", bound=Callable[..., object])

def retry(max_attempts: int = 3, delay: float = 0.1):
    # TODO
    raise NotImplementedError`,
    hints: ['for attempt in range(max_attempts)', 'time.sleep(wait); wait *= 2', 'except Exception as exc'],
    acceptance: ['Succeeds when later attempt works', 'Raises after max failures', 'Backoff increases'],
    solutionApproach:
      'Loop attempts; sleep with exponential backoff; re-raise final error.',
    concepts: [{ term: 'exponential backoff', detail: 'Increasing wait reduces load on failing deps.' }, { term: 'parametrized decorator', detail: 'Outer function returns decorator with config.' }],
    solution: `import functools
import time
from collections.abc import Callable
from typing import TypeVar

F = TypeVar("F", bound=Callable[..., object])

def retry(max_attempts: int = 3, delay: float = 0.1):
    def decorator(func: F) -> F:
        @functools.wraps(func)
        def wrapper(*args: object, **kwargs: object) -> object:
            wait = delay
            last_exc: Exception | None = None
            for _ in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as exc:
                    last_exc = exc
                    time.sleep(wait)
                    wait *= 2
            assert last_exc is not None
            raise last_exc
        return wrapper  # type: ignore[return-value]
    return decorator`,
    walkthrough:
      'Decorator factory sets attempts; wrapper loops, sleeps with doubling delay, raises last exception.',
    mistakes: ['Catching BaseException', 'Infinite retry without cap'],
    stretch: ['Retry only specific exceptions', 'Async retry variant'],
  }),

  challenge({
    slug: '13-caching-decorator',
    title: 'Caching Decorator',
    difficulty: 'medium',
    topics: ['functools', 'lru-cache'],
    goals: ['Memoize pure functions', 'Understand cache keys'],
    description:
      'Implement `memoize` decorator using a dict cache keyed by `(args, frozenset(kwargs.items()))`.',
    requirements: ['Return cached result on repeat', 'Separate calls for different args', 'Use functools.wraps'],
    starter: `import functools
from collections.abc import Callable
from typing import TypeVar

F = TypeVar("F", bound=Callable[..., object])

def memoize(func: F) -> F:
    # TODO
    raise NotImplementedError`,
    hints: ['cache: dict[tuple, object] = {}', 'key = (args, frozenset(kwargs.items()))', 'or use functools.lru_cache'],
    acceptance: ['Second call skips work', 'Different args recompute', 'Metadata preserved'],
    solutionApproach:
      'Dict cache in closure; build hashable key from args/kwargs; wraps preserves metadata.',
    concepts: [{ term: 'memoization', detail: 'Trade memory for speed on repeated pure calls.' }, { term: 'hashable key', detail: 'kwargs need frozenset of items for dict key.' }],
    solution: `import functools
from collections.abc import Callable
from typing import TypeVar

F = TypeVar("F", bound=Callable[..., object])

def memoize(func: F) -> F:
    cache: dict[tuple[tuple[object, ...], frozenset[tuple[str, object]]], object] = {}

    @functools.wraps(func)
    def wrapper(*args: object, **kwargs: object) -> object:
        key = (args, frozenset(kwargs.items()))
        if key not in cache:
            cache[key] = func(*args, **kwargs)
        return cache[key]
    return wrapper  # type: ignore[return-value]`,
    walkthrough:
      'Closure holds cache dict; key combines args tuple and frozenset of kwargs; return cached or compute.',
    mistakes: ['Using lists as cache keys', 'Caching mutable results that change'],
    stretch: ['Use functools.lru_cache(maxsize=128)', 'Add cache_info stats'],
  }),

  challenge({
    slug: '14-typer-cli',
    title: 'Typer CLI',
    difficulty: 'medium',
    topics: ['typer', 'cli'],
    goals: ['Build typed CLI commands', 'Validate options'],
    description:
      'Create Typer app with command `greet(name: str, loud: bool = False)` printing hello, uppercased when loud.',
    requirements: ['Typer app entrypoint', 'Boolean flag --loud', 'name positional argument'],
    starter: `import typer

app = typer.Typer()

# TODO: greet command and main guard`,
    hints: ['@app.command()', 'def greet(name: str, loud: bool = False)', 'if __name__ == "__main__": app()'],
    acceptance: ['Default greeting works', '--loud uppercases', 'Help text generated'],
    solutionApproach:
      'Typer infers CLI from type hints; bool flag becomes --loud/--no-loud.',
    concepts: [{ term: 'Typer', detail: 'CLI framework powered by Click and type hints.' }, { term: 'command decorator', detail: 'Registers function as subcommand.' }],
    solution: `import typer

app = typer.Typer()

@app.command()
def greet(name: str, loud: bool = False) -> None:
    message = f"Hello, {name}!"
    if loud:
        message = message.upper()
    typer.echo(message)

if __name__ == "__main__":
    app()`,
    walkthrough:
      'Typer command takes name and loud flag; echo message with optional uppercasing; app() runs CLI.',
    mistakes: ['Using print instead of typer.echo', 'Forgetting app() guard'],
    stretch: ['Subcommands group', 'Env var defaults with pydantic-settings'],
  }),

  challenge({
    slug: '15-structured-logging',
    title: 'Structured Logging',
    difficulty: 'medium',
    topics: ['logging', 'json'],
    goals: ['Emit JSON log lines', 'Include request context'],
    description:
      'Configure logger with `JsonFormatter` outputting `{"level","message","logger","extra"}` and helper `log_event(logger, message, **fields)`.',
    requirements: ['JSON one line per record', 'extra fields merged', 'INFO default level'],
    starter: `import json
import logging
from datetime import datetime, timezone

class JsonFormatter(logging.Formatter):
    def format(self, record: logging.LogRecord) -> str:
        # TODO
        raise NotImplementedError

def log_event(logger: logging.Logger, message: str, **fields: object) -> None:
    ...`,
    hints: ['payload = {"level": record.levelname, ...}', 'json.dumps(payload)', 'logger.info(message, extra=fields)'],
    acceptance: ['Valid JSON output', 'Extra fields appear', 'Timestamp optional in extra'],
    solutionApproach:
      'Custom formatter builds dict; log_event passes structured extra to logger.',
    concepts: [{ term: 'structured logging', detail: 'Machine-readable fields for search and dashboards.' }, { term: 'LogRecord.extra', detail: 'Arbitrary key-values attached to a log entry.' }],
    solution: `import json
import logging

class JsonFormatter(logging.Formatter):
    def format(self, record: logging.LogRecord) -> str:
        payload = {
            "level": record.levelname,
            "message": record.getMessage(),
            "logger": record.name,
        }
        for key, value in record.__dict__.items():
            if key not in logging.LogRecord.__dict__ and key not in payload:
                payload[key] = value
        return json.dumps(payload)

def log_event(logger: logging.Logger, message: str, **fields: object) -> None:
    logger.info(message, extra=fields)`,
    walkthrough:
      'Formatter serializes level, message, logger plus extra attributes; log_event forwards kwargs as extra.',
    mistakes: ['Logging raw dict without JSON', 'Handlers duplicated on re-import'],
    stretch: ['structlog library', 'Correlation id middleware'],
  }),

  challenge({
    slug: '16-pydantic-settings',
    title: 'Pydantic Settings',
    difficulty: 'medium',
    topics: ['pydantic-settings', 'config'],
    goals: ['Load settings from env', 'Validate types at startup'],
    description:
      'Define `Settings(BaseSettings)` with `database_url: str`, `debug: bool = False`, `port: int = 8000` loading from environment.',
    requirements: ['DATABASE_URL required', 'DEBUG parses bool', 'model_config env prefix APP_ optional'],
    starter: `from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")
    # TODO fields

def load_settings() -> Settings:
    ...`,
    hints: ['database_url: str', 'debug: bool = False', 'return Settings()'],
    acceptance: ['Missing DB URL fails', 'Defaults apply', 'Env overrides work'],
    solutionApproach:
      'BaseSettings reads env; validation happens on Settings() instantiation.',
    concepts: [{ term: 'BaseSettings', detail: 'Pydantic model populated from environment variables.' }, { term: 'fail fast', detail: 'Invalid config raises before app serves traffic.' }],
    solution: `from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")
    database_url: str
    debug: bool = False
    port: int = 8000

def load_settings() -> Settings:
    return Settings()`,
    walkthrough:
      'Settings declares fields with types; instantiation reads env and .env; missing required fields error early.',
    mistakes: ['Manual os.environ parsing', 'Silently ignoring type errors'],
    stretch: ['Secrets from SecretStr', 'Nested settings groups'],
  }),

  challenge({
    slug: '17-repository-pattern',
    title: 'Repository Pattern',
    difficulty: 'medium',
    topics: ['repository', 'architecture'],
    goals: ['Hide persistence behind interface', 'Enable testing with fakes'],
    description:
      'Define `UserRepository` protocol with `get(user_id: int) -> User | None` and in-memory `InMemoryUserRepository`.',
    requirements: ['Protocol or ABC', 'CRUD get/save', 'No SQL in service layer'],
    starter: `from dataclasses import dataclass
from typing import Protocol

@dataclass
class User:
    id: int
    email: str

class UserRepository(Protocol):
    def get(self, user_id: int) -> User | None: ...
    def save(self, user: User) -> None: ...

class InMemoryUserRepository:
    # TODO
    ...`,
    hints: ['self._store: dict[int, User] = {}', 'def get return store.get', 'def save store[id]=user'],
    acceptance: ['Save then get works', 'Missing id returns None', 'Protocol typed'],
    solutionApproach:
      'Protocol documents contract; in-memory dict implementation for tests.',
    concepts: [{ term: 'Repository', detail: 'Collection-like API abstracting storage technology.' }, { term: 'Protocol', detail: 'Structural typing without inheritance.' }],
    solution: `from dataclasses import dataclass
from typing import Protocol

@dataclass
class User:
    id: int
    email: str

class UserRepository(Protocol):
    def get(self, user_id: int) -> User | None: ...
    def save(self, user: User) -> None: ...

class InMemoryUserRepository:
    def __init__(self) -> None:
        self._store: dict[int, User] = {}

    def get(self, user_id: int) -> User | None:
        return self._store.get(user_id)

    def save(self, user: User) -> None:
        self._store[user.id] = user`,
    walkthrough:
      'User dataclass holds data; Protocol defines get/save; in-memory repo uses dict storage.',
    mistakes: ['Leaking dict into services', 'Repository returning ORM models everywhere'],
    stretch: ['SQLAlchemy-backed repo', 'Unit of work pattern'],
  }),

  challenge({
    slug: '18-service-layer',
    title: 'Service Layer',
    difficulty: 'medium',
    topics: ['service-layer', 'architecture'],
    goals: ['Orchestrate domain logic', 'Keep routes thin'],
    description:
      'Implement `UserService` using `UserRepository` with `register(email: str) -> User` assigning next id and validating email.',
    requirements: ['Email must contain @', 'Duplicate email raises ValueError', 'Service uses repo only'],
    starter: `from dataclasses import dataclass

@dataclass
class User:
    id: int
    email: str

class UserService:
    def __init__(self, repo) -> None:
        self._repo = repo
        self._next_id = 1

    def register(self, email: str) -> User:
        # TODO
        raise NotImplementedError`,
    hints: ['if "@" not in email', 'scan repo for duplicate', 'user = User(self._next_id, email); self._next_id += 1'],
    acceptance: ['Valid registration works', 'Bad email fails', 'Duplicate rejected'],
    solutionApproach:
      'Service validates, assigns id, persists via repository abstraction.',
    concepts: [{ term: 'service layer', detail: 'Application logic coordinating domain and persistence.' }, { term: 'thin controller', detail: 'HTTP layer delegates to services.' }],
    solution: `from dataclasses import dataclass

@dataclass
class User:
    id: int
    email: str

class UserService:
    def __init__(self, repo) -> None:
        self._repo = repo
        self._next_id = 1

    def register(self, email: str) -> User:
        if "@" not in email:
            raise ValueError("invalid email")
        for uid in range(1, self._next_id):
            existing = self._repo.get(uid)
            if existing and existing.email == email:
                raise ValueError("duplicate email")
        user = User(id=self._next_id, email=email)
        self._next_id += 1
        self._repo.save(user)
        return user`,
    walkthrough:
      'Service validates email, checks duplicates via repo, increments id, saves and conservative in the user.',
    mistakes: ['SQL in service', 'Skipping duplicate check'],
    stretch: ['Hash passwords in service', 'Domain events on register'],
  }),

  challenge({
    slug: '19-webhook-handler',
    title: 'Webhook Handler',
    difficulty: 'medium',
    topics: ['fastapi', 'webhooks'],
    goals: ['Verify HMAC signatures', 'Parse event payloads'],
    description:
      'Implement `verify_signature(body: bytes, signature: str, secret: str) -> bool` using HMAC-SHA256 hex compare and FastAPI route accepting webhooks.',
    requirements: ['Timing-safe compare', 'Reject bad signature with 401', 'Parse JSON event type'],
    starter: `import hashlib
import hmac
from fastapi import FastAPI, Header, HTTPException, Request

app = FastAPI()

def verify_signature(body: bytes, signature: str, secret: str) -> bool:
    # TODO
    raise NotImplementedError

@app.post("/webhooks/github")
async def github_webhook(request: Request, x_hub_signature_256: str = Header(...)):
    ...`,
    hints: ['hmac.new(secret.encode(), body, hashlib.sha256).hexdigest()', 'hmac.compare_digest', 'expected = "sha256=" + digest'],
    acceptance: ['Valid signature accepted', 'Tampered body rejected', 'Returns 200 on success'],
    solutionApproach:
      'Compute HMAC digest; compare safely; route reads raw body before JSON.',
    concepts: [{ term: 'HMAC', detail: 'Proves payload integrity with shared secret.' }, { term: 'compare_digest', detail: 'Constant-time comparison prevents timing leaks.' }],
    solution: `import hashlib
import hmac
from fastapi import FastAPI, Header, HTTPException, Request

app = FastAPI()
WEBHOOK_SECRET = "dev-secret"

def verify_signature(body: bytes, signature: str, secret: str) -> bool:
    digest = hmac.new(secret.encode(), body, hashlib.sha256).hexdigest()
    expected = f"sha256={digest}"
    return hmac.compare_digest(expected, signature)

@app.post("/webhooks/github")
async def github_webhook(request: Request, x_hub_signature_256: str = Header(...)):
    body = await request.body()
    if not verify_signature(body, x_hub_signature_256, WEBHOOK_SECRET):
        raise HTTPException(status_code=401, detail="invalid signature")
    return {"ok": True}`,
    walkthrough:
      'verify_signature builds sha256 HMAC; route reads raw bytes; invalid sig returns 401.',
    mistakes: ['Using == for digest compare', 'Parsing JSON before verify (body consumed wrong)'],
    stretch: ['Idempotency keys', 'Queue event for async processing'],
  }),

  challenge({
    slug: '20-pagination',
    title: 'API Pagination',
    difficulty: 'medium',
    topics: ['pagination', 'fastapi'],
    goals: ['Paginate list endpoints', 'Return metadata'],
    description:
      'Implement `paginate(items: list[T], page: int, page_size: int) -> dict` returning items slice plus total/pages/has_next.',
    requirements: ['page starts at 1', 'page_size max 100', 'Empty page valid when in range'],
    starter: `from math import ceil
from typing import TypeVar

T = TypeVar("T")

def paginate(items: list[T], page: int, page_size: int) -> dict[str, object]:
    # TODO
    raise NotImplementedError`,
    hints: ['if page < 1 or page_size < 1: raise ValueError', 'start = (page-1)*page_size', 'total_pages = ceil(total/page_size)'],
    acceptance: ['Correct slice returned', 'Metadata accurate', 'Invalid page_size rejected'],
    solutionApproach:
      'Validate params; compute offset; return window plus pagination metadata.',
    concepts: [{ term: 'offset pagination', detail: 'Simple page/page_size slicing for APIs.' }, { term: 'metadata', detail: 'Clients need total count to render page controls.' }],
    solution: `from math import ceil
from typing import TypeVar

T = TypeVar("T")

def paginate(items: list[T], page: int, page_size: int) -> dict[str, object]:
    if page < 1 or page_size < 1 or page_size > 100:
        raise ValueError("invalid pagination")
    total = len(items)
    total_pages = ceil(total / page_size) if total else 0
    start = (page - 1) * page_size
    end = start + page_size
    return {
        "items": items[start:end],
        "page": page,
        "page_size": page_size,
        "total": total,
        "total_pages": total_pages,
        "has_next": page < total_pages,
    }`,
    walkthrough:
      'Validate page and size caps; slice list; compute totals and has_next for clients.',
    mistakes: ['0-based page without documenting', 'No max page_size guard'],
    stretch: ['Cursor-based pagination', 'FastAPI query params integration'],
  }),

  challenge({
    slug: '21-file-upload',
    title: 'File Upload',
    difficulty: 'medium',
    topics: ['fastapi', 'files'],
    goals: ['Accept multipart uploads', 'Validate size and type'],
    description:
      'FastAPI endpoint `POST /upload` saving `UploadFile` to `./uploads/` allowing only `.txt` and max 1MB.',
    requirements: ['Reject non-txt extension', 'Reject files > 1MB', 'Return saved filename'],
    starter: `from pathlib import Path
from fastapi import FastAPI, HTTPException, UploadFile

app = FastAPI()
UPLOAD_DIR = Path("uploads")
MAX_BYTES = 1_000_000

@app.post("/upload")
async def upload(file: UploadFile):
    # TODO
    ...`,
    hints: ['if not file.filename.endswith(".txt")', 'contents = await file.read()', 'len(contents) > MAX_BYTES'],
    acceptance: ['Valid txt saved', 'Big file 413', 'Wrong extension 400'],
    solutionApproach:
      'Check extension, read bytes with limit, write to uploads dir.',
    concepts: [{ term: 'UploadFile', detail: 'Starlette wrapper streaming multipart file data.' }, { term: 'validation first', detail: 'Check metadata before writing disk.' }],
    solution: `from pathlib import Path
from fastapi import FastAPI, HTTPException, UploadFile

app = FastAPI()
UPLOAD_DIR = Path("uploads")
MAX_BYTES = 1_000_000

@app.post("/upload")
async def upload(file: UploadFile):
    if not file.filename or not file.filename.endswith(".txt"):
        raise HTTPException(status_code=400, detail="txt only")
    data = await file.read()
    if len(data) > MAX_BYTES:
        raise HTTPException(status_code=413, detail="too large")
    UPLOAD_DIR.mkdir(exist_ok=True)
    dest = UPLOAD_DIR / Path(file.filename).name
    dest.write_bytes(data)
    return {"filename": dest.name}`,
    walkthrough:
      'Validate extension, read content, enforce size cap, mkdir uploads, write sanitized filename.',
    mistakes: ['Trusting client mime type', 'Path traversal via filename'],
    stretch: ['Streaming write without full read', 'Virus scan hook'],
  }),

  challenge({
    slug: '22-background-task',
    title: 'Background Tasks',
    difficulty: 'medium',
    topics: ['fastapi', 'background-tasks'],
    goals: ['Defer work after response', 'Log async side effects'],
    description:
      'Endpoint `POST /notify` accepts email and schedules `send_email` via FastAPI `BackgroundTasks`.',
    requirements: ['Return 202 immediately', 'Background task called', 'Task function pure/loggable'],
    starter: `import logging
from fastapi import BackgroundTasks, FastAPI

logger = logging.getLogger(__name__)
app = FastAPI()

def send_email(to: str, subject: str) -> None:
    logger.info("Sending email to %s: %s", to, subject)

@app.post("/notify")
async def notify(email: str, background: BackgroundTasks):
    # TODO
    ...`,
    hints: ['background.add_task(send_email, email, "Hello")', 'return {"status": "accepted"}', 'status code 202 optional'],
    acceptance: ['Response before task completes', 'Task receives email', 'No blocking sleep in route'],
    solutionApproach:
      'Register callable on BackgroundTasks; return acceptance payload immediately.',
    concepts: [{ term: 'BackgroundTasks', detail: 'Runs sync work after response sent— not for heavy jobs.' }, { term: '202 Accepted', detail: 'Signals processing continues asynchronously.' }],
    solution: `import logging
from fastapi import BackgroundTasks, FastAPI

logger = logging.getLogger(__name__)
app = FastAPI()

def send_email(to: str, subject: str) -> None:
    logger.info("Sending email to %s: %s", to, subject)

@app.post("/notify", status_code=202)
async def notify(email: str, background: BackgroundTasks):
    background.add_task(send_email, email, "Hello")
    return {"status": "accepted"}`,
    walkthrough:
      'Route enqueues send_email on background tasks and returns 202 accepted immediately.',
    mistakes: ['await long IO in route', 'Using BackgroundTasks for CPU-heavy work'],
    stretch: ['Celery for real queues', 'Retry failed sends'],
  }),

  challenge({
    slug: '23-email-sender',
    title: 'Email Sender',
    difficulty: 'medium',
    topics: ['email', 'smtplib'],
    goals: ['Build MIME messages', 'Send via SMTP SSL'],
    description:
      'Implement `send_message(host, port, user, password, to, subject, body) -> None` using `smtplib.SMTP_SSL` and `EmailMessage`.',
    requirements: ['Use EmailMessage', 'Login with credentials', 'Set From/To/Subject'],
    starter: `from email.message import EmailMessage
import smtplib

def send_message(
    host: str,
    port: int,
    user: str,
    password: str,
    to: str,
    subject: str,
    body: str,
) -> None:
    # TODO
    raise NotImplementedError`,
    hints: ['msg = EmailMessage()', 'msg.set_content(body)', 'with smtplib.SMTP_SSL(host, port) as smtp'],
    acceptance: ['EmailMessage constructed', 'SMTP login called', 'Message sent to recipient'],
    solutionApproach:
      'Build EmailMessage; connect SSL SMTP; login; send_message.',
    concepts: [{ term: 'EmailMessage', detail: 'Modern stdlib API for MIME emails.' }, { term: 'SMTP_SSL', detail: 'Encrypted connection suitable for submission ports.' }],
    solution: `from email.message import EmailMessage
import smtplib

def send_message(
    host: str,
    port: int,
    user: str,
    password: str,
    to: str,
    subject: str,
    body: str,
) -> None:
    msg = EmailMessage()
    msg["From"] = user
    msg["To"] = to
    msg["Subject"] = subject
    msg.set_content(body)
    with smtplib.SMTP_SSL(host, port) as smtp:
        smtp.login(user, password)
        smtp.send_message(msg)`,
    walkthrough:
      'Compose EmailMessage headers and body; SMTP_SSL context login; send_message delivers.',
    mistakes: ['Plain SMTP on port 465', 'Hardcoding secrets in code'],
    stretch: ['HTML multipart', 'aiosmtplib async sender'],
  }),

  challenge({
    slug: '24-rate-limiter',
    title: 'Rate Limiter',
    difficulty: 'medium',
    topics: ['rate-limiting', 'decorators'],
    goals: ['Limit calls per window', 'Raise when exceeded'],
    description:
      'Implement `@rate_limit(max_calls: int, period: float)` allowing only `max_calls` within rolling `period` seconds per function.',
    requirements: ['Track call timestamps', 'Raise RuntimeError when exceeded', 'Prune old timestamps'],
    starter: `import functools
import time
from collections import deque
from collections.abc import Callable
from typing import TypeVar

F = TypeVar("F", bound=Callable[..., object])

def rate_limit(max_calls: int, period: float):
    # TODO
    raise NotImplementedError`,
    hints: ['calls: deque[float] = deque()', 'while calls and calls[0] <= now - period: pop', 'if len(calls) >= max_calls: raise'],
    acceptance: ['Allows burst under limit', 'Blocks excess calls', 'Window rolls forward'],
    solutionApproach:
      'Deque stores call times; drop expired; enforce max length before call.',
    concepts: [{ term: 'sliding window', detail: 'Counts events in rolling time interval.' }, { term: 'deque', detail: 'Efficient pops from left for timestamp pruning.' }],
    solution: `import functools
import time
from collections import deque
from collections.abc import Callable
from typing import TypeVar

F = TypeVar("F", bound=Callable[..., object])

def rate_limit(max_calls: int, period: float):
    def decorator(func: F) -> F:
        calls: deque[float] = deque()

        @functools.wraps(func)
        def wrapper(*args: object, **kwargs: object) -> object:
            now = time.monotonic()
            while calls and calls[0] <= now - period:
                calls.popleft()
            if len(calls) >= max_calls:
                raise RuntimeError("rate limit exceeded")
            calls.append(now)
            return func(*args, **kwargs)
        return wrapper  # type: ignore[return-value]
    return decorator`,
    walkthrough:
      'Monotonic timestamps in deque; prune outside window; reject when at capacity; record call.',
    mistakes: ['Using wall clock time.time()', 'Global limit shared across unrelated functions incorrectly'],
    stretch: ['Token bucket algorithm', 'Redis-backed limiter'],
  }),

  challenge({
    slug: '25-schema-validation',
    title: 'JSON Schema Validation',
    difficulty: 'medium',
    topics: ['jsonschema', 'validation'],
    goals: ['Validate payloads against schema', 'Return readable errors'],
    description:
      'Implement `validate_payload(data: dict, schema: dict) -> None` using `jsonschema` raising `ValueError` with first error message.',
    requirements: ['Use jsonschema.validate', 'Map ValidationError to ValueError', 'No silent failures'],
    starter: `from jsonschema import ValidationError, validate

def validate_payload(data: dict, schema: dict) -> None:
    # TODO
    raise NotImplementedError`,
    hints: ['try: validate(data, schema)', 'except ValidationError as exc', 'raise ValueError(str(exc.message))'],
    acceptance: ['Valid data passes', 'Invalid type fails', 'Missing required fails'],
    solutionApproach:
      'Delegate to jsonschema; translate ValidationError to ValueError for app consistency.',
    concepts: [{ term: 'JSON Schema', detail: 'Declarative contract for JSON documents.' }, { term: 'ValidationError', detail: 'Rich path info for failed schema checks.' }],
    solution: `from jsonschema import ValidationError, validate

def validate_payload(data: dict, schema: dict) -> None:
    try:
        validate(instance=data, schema=schema)
    except ValidationError as exc:
        raise ValueError(exc.message) from exc`,
    walkthrough:
      'jsonschema.validate raises on mismatch; catch and re-raise ValueError with schema message.',
    mistakes: ['Returning bool instead of raising', 'Validating after persisting'],
    stretch: ['Collect all errors with iter_errors', 'Generate schema from Pydantic'],
  }),

  challenge({
    slug: '26-test-coverage',
    title: 'Test Coverage Setup',
    difficulty: 'medium',
    topics: ['pytest', 'coverage'],
    goals: ['Configure coverage.py', 'Fail under threshold'],
    description:
      'Given module `math_utils.py` with functions, add pytest tests achieving 100% line coverage and `pyproject.toml` coverage fail_under=90.',
    requirements: ['pytest-cov in config', 'Tests for all branches', 'Document running pytest --cov'],
    starter: `# math_utils.py
def clamp(value: float, low: float, high: float) -> float:
    if low > high:
        raise ValueError("low > high")
    return max(low, min(value, high))

# test_math_utils.py — TODO`,
    hints: ['pytest --cov=math_utils', 'test edge value==low', 'fail_under in [tool.coverage.report]'],
    acceptance: ['All lines covered', 'Bad range raises tested', 'Coverage report generated'],
    solutionApproach:
      'Parametrize edge cases; run pytest-cov; enforce fail_under in pyproject.',
    concepts: [{ term: 'coverage.py', detail: 'Measures which lines tests execute.' }, { term: 'fail_under', detail: 'CI gate preventing untested code merges.' }],
    solution: `# math_utils.py
def clamp(value: float, low: float, high: float) -> float:
    if low > high:
        raise ValueError("low > high")
    return max(low, min(value, high))

# test_math_utils.py
import pytest
from math_utils import clamp

def test_clamp_middle() -> None:
    assert clamp(5, 0, 10) == 5

def test_clamp_edges() -> None:
    assert clamp(-1, 0, 10) == 0
    assert clamp(99, 0, 10) == 10

def test_clamp_invalid_range() -> None:
    with pytest.raises(ValueError):
        clamp(1, 10, 0)`,
    walkthrough:
      'Tests hit middle, both clamps, and error branch; pytest-cov verifies full line coverage.',
    mistakes: ['Testing only happy path', 'Ignoring branch coverage'],
    stretch: ['Branch coverage threshold', 'Coverage badge in CI'],
  }),

  challenge({
    slug: '27-docker-compose',
    title: 'Docker Compose Stack',
    difficulty: 'medium',
    topics: ['docker', 'docker-compose'],
    goals: ['Define multi-service compose', 'Wire env and ports'],
    description:
      'Author `docker-compose.yml` for `web` (FastAPI on 8000) and `db` (postgres:16) with healthcheck and DATABASE_URL env for web.',
    requirements: ['Two services defined', 'db volume persisted', 'web depends_on db'],
    starter: `# docker-compose.yml
services:
  web:
    build: .
    ports:
      - "8000:8000"
    # TODO env and depends_on
  db:
    image: postgres:16
    # TODO`,
    hints: ['environment DATABASE_URL=postgresql://...', 'volumes: pgdata:/var/lib/postgresql/data', 'depends_on: [db]'],
    acceptance: ['Stack starts with compose up', 'Web connects to db host', 'Port 8000 exposed'],
    solutionApproach:
      'Compose services with env linking web to db hostname `db` on internal network.',
    concepts: [{ term: 'depends_on', detail: 'Startup ordering hint between services.' }, { term: 'named volume', detail: 'Persists database data across restarts.' }],
    solution: `# docker-compose.yml
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
  pgdata:`,
    walkthrough:
      'Web service gets DATABASE_URL pointing at db host; postgres persists volume; healthcheck waits for readiness.',
    mistakes: ['Using localhost for db from web container', 'No volume so data lost on restart'],
    stretch: ['Add redis cache service', 'Use compose profiles'],
  }),

  challenge({
    slug: '28-dependency-injection',
    title: 'Dependency Injection',
    difficulty: 'medium',
    topics: ['dependency-injection', 'fastapi'],
    goals: ['Wire dependencies with Depends', 'Override in tests'],
    description:
      'FastAPI app with `get_db()` yielding connection dict and route `GET /health` using `Depends(get_db)` returning db status.',
    requirements: ['yield cleanup in get_db', 'Test override get_db', 'Type annotated Depends'],
    starter: `from collections.abc import Generator
from fastapi import Depends, FastAPI

app = FastAPI()

def get_db() -> Generator[dict[str, str], None, None]:
    # TODO yield and cleanup
    ...

@app.get("/health")
def health(db: dict = Depends(get_db)):
    ...`,
    hints: ['db = {"status": "connected"}; yield db', 'return {"database": db["status"]}', 'app.dependency_overrides[get_db] in tests'],
    acceptance: ['Health returns connected', 'Dependency injected', 'Override works in test'],
    solutionApproach:
      'Generator dependency with teardown; route declares Depends; tests override provider.',
    concepts: [{ term: 'Depends', detail: 'FastAPI resolves and injects dependencies per request.' }, { term: 'dependency_overrides', detail: 'Swap providers in tests without changing routes.' }],
    solution: `from collections.abc import Generator
from fastapi import Depends, FastAPI

app = FastAPI()

def get_db() -> Generator[dict[str, str], None, None]:
    db = {"status": "connected"}
    try:
        yield db
    finally:
        db["status"] = "closed"

@app.get("/health")
def health(db: dict[str, str] = Depends(get_db)):
    return {"database": db["status"]}`,
    walkthrough:
      'get_db yields connection dict and closes in finally; health reads injected db; tests override get_db.',
    mistakes: ['Not using yield for teardown', 'Instantiating DB globally'],
    stretch: ['Inject service layer', 'Use dependency-injector library'],
  }),
];
