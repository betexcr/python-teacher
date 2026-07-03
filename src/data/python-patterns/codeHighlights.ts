import type { SolutionHighlight } from '../../lib/solutionHighlights';

/** Per-pattern tooltips for fenced python code in python-patterns markdown. */
const bySlug: Record<string, SolutionHighlight[]> = {
  comprehensions: [
    {
      match: '[u["name"] for u in users if u["active"]]',
      label: 'list comprehension',
      tip: 'Filter and transform in one expression — replaces a for-loop plus append.',
    },
    {
      match: '{name: score for name, score in scores.items() if score >= 80}',
      label: 'dict comprehension',
      tip: 'Build a new dict from key-value pairs that pass a condition.',
    },
    {
      match: '{len(name) for name in scores}',
      label: 'set comprehension',
      tip: 'Curly braces without a colon produce a set — unique values only.',
    },
    {
      match: '[n for row in matrix for n in row]',
      label: 'nested comprehension',
      tip: 'Read left to right like nested loops — flattens a 2D list in one line.',
    },
  ],
  'context-managers': [
    {
      match: 'def __enter__(self)',
      label: '__enter__',
      tip: 'Called when entering the with block — return value binds to as-target if used.',
    },
    {
      match: 'def __exit__(self, exc_type, exc_val, exc_tb)',
      label: '__exit__',
      tip: 'Always runs on exit — receives exception info; return True to suppress it.',
    },
    {
      match: '@contextmanager',
      label: '@contextmanager',
      tip: 'Turn a generator with yield into a context manager — setup before, cleanup in finally.',
    },
    {
      match: 'yield',
      label: 'yield',
      tip: 'Separates setup from teardown — code after yield runs when the block ends.',
    },
    {
      match: 'return False',
      label: 'return False',
      tip: 'Do not swallow exceptions — let them propagate after cleanup runs.',
    },
  ],
  decorators: [
    {
      match: '@functools.wraps(func)',
      label: '@functools.wraps',
      tip: 'Copies __name__ and __doc__ to the wrapper — keeps introspection and debugging sane.',
    },
    {
      match: '@timed',
      label: '@timed',
      tip: 'Syntax sugar for func = timed(func) — applies cross-cutting timing without changing call sites.',
    },
    {
      match: 'def retry(max_attempts: int = 3)',
      label: 'parameterized decorator',
      tip: 'Outer function receives decorator args; inner function receives the target callable.',
    },
    {
      match: 'def wrapper(*args, **kwargs)',
      label: 'wrapper',
      tip: 'Accepts any signature — forwards args to the original function after adding behavior.',
    },
  ],
  generators: [
    {
      match: 'yield chunk',
      label: 'yield',
      tip: 'Pauses the function and returns a value — resumes on next iteration without rebuilding the full list.',
    },
    {
      match: 'while chunk := f.read(size)',
      label: 'walrus loop',
      tip: 'Reads fixed-size blocks lazily — memory stays constant regardless of file size.',
    },
    {
      match: '(line.strip() for line in open("log.txt") if "ERROR" in line)',
      label: 'generator expression',
      tip: 'Lazy equivalent of a list comprehension — computes each line only when consumed.',
    },
    {
      match: 'islice(fibonacci(), 10)',
      label: 'islice',
      tip: 'Takes the first N items from an infinite generator without hanging the loop.',
    },
  ],
  dataclasses: [
    {
      match: '@dataclass',
      label: '@dataclass',
      tip: 'Auto-generates __init__, __repr__, and __eq__ from annotated fields.',
    },
    {
      match: 'field(default_factory=list)',
      label: 'default_factory',
      tip: 'Mutable defaults must use a factory — never use tags: list = [] directly.',
    },
    {
      match: 'frozen=True, slots=True',
      label: 'frozen + slots',
      tip: 'Immutable and memory-efficient instances — hashable and no arbitrary attribute assignment.',
    },
    {
      match: 'def __post_init__(self)',
      label: '__post_init__',
      tip: 'Runs after generated __init__ — ideal place for validation logic.',
    },
  ],
  protocols: [
    {
      match: 'class Readable(Protocol)',
      label: 'Protocol',
      tip: 'Structural interface — any type with read() satisfies it without explicit inheritance.',
    },
    {
      match: '@runtime_checkable',
      label: '@runtime_checkable',
      tip: 'Enables isinstance(obj, Readable) at runtime for simple structural checks.',
    },
    {
      match: 'def read(self, n: int = -1) -> bytes: ...',
      label: 'ellipsis body',
      tip: 'Protocol methods use ... as stub bodies — no implementation required in the protocol itself.',
    },
    {
      match: 'class SupportsLessThan(Protocol)',
      label: 'generic protocol',
      tip: 'Expresses behavioral contracts for type checkers — works with builtins and third-party types.',
    },
  ],
  'dependency-injection': [
    {
      match: 'class Notifier(Protocol)',
      label: 'Notifier protocol',
      tip: 'Abstraction injected into services — swap EmailNotifier for SlackNotifier without changing WelcomeService.',
    },
    {
      match: 'def __init__(self, notifier: Notifier)',
      label: 'constructor injection',
      tip: 'Dependencies arrive from outside — the class does not construct its own collaborators.',
    },
    {
      match: 'class FakeNotifier',
      label: 'FakeNotifier',
      tip: 'Test double records sent messages — no mocking framework needed for simple cases.',
    },
    {
      match: 'def build_app() -> WelcomeService',
      label: 'composition root',
      tip: 'Single place wires concrete implementations — library code stays free of env-specific imports.',
    },
  ],
  'repository-pattern': [
    {
      match: 'class UserRepository(Protocol)',
      label: 'UserRepository',
      tip: 'Collection-like interface hides SQL/ORM — domain code calls get/save/list, not raw queries.',
    },
    {
      match: 'class SqlUserRepository',
      label: 'SqlUserRepository',
      tip: 'Adapter translates protocol methods into SQL — swap for MongoUserRepository later.',
    },
    {
      match: 'class InMemoryUserRepository',
      label: 'InMemoryUserRepository',
      tip: 'Fake store for fast unit tests — same interface as production repository.',
    },
    {
      match: 'def list_active(self) -> list[User]',
      label: 'list_active',
      tip: 'Domain-specific query method — keeps filtering logic out of service layers.',
    },
  ],
  'factory-pattern': [
    {
      match: 'def create_storage(backend: str, **kwargs) -> Storage',
      label: 'create_storage',
      tip: 'Central factory picks the concrete Storage class from a config string.',
    },
    {
      match: 'class Storage(Protocol)',
      label: 'Storage protocol',
      tip: 'Callers depend on the interface — factory returns LocalStorage or S3Storage transparently.',
    },
    {
      match: 'def register(kind: str)',
      label: 'register',
      tip: 'Decorator registers parser classes in a dict — add formats without editing the factory.',
    },
    {
      match: '_HANDLERS[kind]()',
      label: '_HANDLERS lookup',
      tip: 'Registry lookup instantiates the right class by name — plugin-style extensibility.',
    },
  ],
  'strategy-pattern': [
    {
      match: 'class DiscountStrategy(Protocol)',
      label: 'DiscountStrategy',
      tip: 'Common interface for interchangeable pricing algorithms.',
    },
    {
      match: 'def apply(self, subtotal: float) -> float',
      label: 'apply',
      tip: 'Each strategy implements the same method — context delegates without if/elif chains.',
    },
    {
      match: 'self._discount = discount',
      label: 'injected strategy',
      tip: 'Strategy passed at construction — swap PercentOff for FixedAmount without subclassing Checkout.',
    },
    {
      match: 'Checkout(loyalty_discount)',
      label: 'function strategy',
      tip: 'Plain functions work as strategies when they match the call signature and hold no state.',
    },
  ],
  'error-handling': [
    {
      match: 'class AppError(Exception)',
      label: 'AppError',
      tip: 'Base exception for the app — catch at HTTP/CLI boundary for consistent error responses.',
    },
    {
      match: 'raise AppError(f"Cannot read config {path!r}") from exc',
      label: 'raise from',
      tip: 'Exception chaining sets __cause__ — tracebacks show both wrapper and original error.',
    },
    {
      match: 'except json.JSONDecodeError as exc',
      label: 'specific except',
      tip: 'Catch narrow exception types — never use bare except: which hides bugs.',
    },
    {
      match: 'try:\n        value = mapping[key]\n    except KeyError',
      label: 'EAFP',
      tip: 'Easier to Ask Forgiveness than Permission — idiomatic Python for dict/key access.',
    },
  ],
  'logging-patterns': [
    {
      match: 'logger = logging.getLogger(__name__)',
      label: 'getLogger(__name__)',
      tip: 'Module-scoped logger — log records show which file emitted them.',
    },
    {
      match: 'logger.exception("Payment failed',
      label: 'logger.exception',
      tip: 'Logs at ERROR level and includes the full traceback — use inside except blocks.',
    },
    {
      match: 'extra={"order_id": order_id}',
      label: 'extra context',
      tip: 'Attach structured fields to log records — format them in the handler or ship to aggregators.',
    },
    {
      match: 'class RequestIdFilter(logging.Filter)',
      label: 'RequestIdFilter',
      tip: 'Inject request_id from ContextVar into every log record in the request scope.',
    },
  ],
  configuration: [
    {
      match: 'class Settings(BaseSettings)',
      label: 'BaseSettings',
      tip: 'pydantic-settings loads and validates config from env vars and .env files at startup.',
    },
    {
      match: 'SettingsConfigDict(',
      label: 'SettingsConfigDict',
      tip: 'Configure env file path, encoding, and case sensitivity for settings loading.',
    },
    {
      match: 'Field(..., description=',
      label: 'Field(...)',
      tip: 'Ellipsis marks a required setting — app fails fast if the env var is missing.',
    },
    {
      match: '@computed_field',
      label: '@computed_field',
      tip: 'Derived settings built from other fields — not set directly from environment.',
    },
    {
      match: 'env_prefix="APP_"',
      label: 'env_prefix',
      tip: 'Namespace env vars — APP_REDIS_URL maps to redis_url field.',
    },
  ],
  'cli-design': [
    {
      match: 'app = typer.Typer()',
      label: 'Typer app',
      tip: 'Root CLI group — add commands with @app.command() decorators.',
    },
    {
      match: 'typer.Option(False, "--loud", "-l"',
      label: 'typer.Option',
      tip: 'Defines a flag with short/long names, default, and help text.',
    },
    {
      match: '@click.group()',
      label: '@click.group',
      tip: 'Click root group for nesting subcommands like ingest and export.',
    },
    {
      match: 'click.Path(exists=True)',
      label: 'click.Path',
      tip: 'Validates the path exists before your command runs — fails with clear CLI error.',
    },
  ],
  'async-patterns': [
    {
      match: 'await client.get(url)',
      label: 'await',
      tip: 'Yields control to the event loop while waiting on I/O — other tasks run meanwhile.',
    },
    {
      match: 'asyncio.gather(',
      label: 'asyncio.gather',
      tip: 'Runs multiple coroutines concurrently and collects results in order.',
    },
    {
      match: 'return_exceptions=True',
      label: 'return_exceptions',
      tip: 'Failed tasks return exceptions instead of cancelling the whole gather.',
    },
    {
      match: 'asyncio.create_task(poll_status(job_id))',
      label: 'create_task',
      tip: 'Schedules a coroutine as a Task — can be cancelled or awaited with a timeout.',
    },
    {
      match: 'asyncio.Semaphore(limit)',
      label: 'Semaphore',
      tip: 'Caps concurrent operations — essential for rate-limited APIs.',
    },
  ],
  'clean-architecture': [
    {
      match: '@dataclass(frozen=True)\nclass Account',
      label: 'Account entity',
      tip: 'Domain entity with no framework imports — pure business data and invariants.',
    },
    {
      match: 'class TransferFunds',
      label: 'use case',
      tip: 'Application workflow orchestrates entities via repository ports — no SQL or HTTP here.',
    },
    {
      match: 'raise InsufficientFunds()',
      label: 'domain exception',
      tip: 'Business rule violation — map to HTTP 400 at the adapter layer, not inside the use case.',
    },
    {
      match: 'HTTPException(status_code=400',
      label: 'HTTPException',
      tip: 'Framework concern at the edge — translates domain errors to HTTP responses.',
    },
    {
      match: 'Depends(get_transfer_use_case)',
      label: 'Depends',
      tip: 'FastAPI injects wired use case — composition root provides the real repository.',
    },
  ],
};

function sortByMatchLength(highlights: SolutionHighlight[]): SolutionHighlight[] {
  return highlights.toSorted((a, b) => b.match.length - a.match.length);
}

export function getPythonPatternHighlights(slug: string): SolutionHighlight[] {
  const list = bySlug[slug];
  return list ? sortByMatchLength(list) : [];
}
