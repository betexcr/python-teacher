import { challenge } from './helpers.mjs';

export const easyChallenges = [
  challenge({
    slug: '01-fizzbuzz',
    title: 'FizzBuzz',
    difficulty: 'easy',
    topics: ['control-flow', 'loops'],
    goals: ['Practice modulo and branching', 'Return a list from a pure function'],
    description:
      'Implement `fizzbuzz(n: int) -> list[str]` that returns values from 1 through `n` inclusive. Multiples of 3 become `"Fizz"`, multiples of 5 become `"Buzz"`, multiples of both become `"FizzBuzz"`, otherwise the number as a string.',
    requirements: ['Return exactly n items', '15 maps to FizzBuzz', '1 maps to "1"', 'Do not print; return the list'],
    starter: `def fizzbuzz(n: int) -> list[str]:
    """Return FizzBuzz strings for 1..n."""
    # TODO
    raise NotImplementedError`,
    hints: ['Use % for divisibility', 'Check 15 before 3 or 5 alone', 'str(i) for plain numbers'],
    acceptance: ['Correct FizzBuzz at 15', 'Plain numbers as strings', 'Length equals n'],
    solutionApproach:
      'Loop 1..n and build strings with ordered divisibility checks.',
    concepts: [{ term: 'Modulo', detail: '% returns the remainder and cleanly detects multiples.' }, { term: 'Pure function', detail: 'No I/O; same input always yields the same output.' }],
    solution: `def fizzbuzz(n: int) -> list[str]:
    out: list[str] = []
    for i in range(1, n + 1):
        if i % 15 == 0:
            out.append("FizzBuzz")
        elif i % 3 == 0:
            out.append("Fizz")
        elif i % 5 == 0:
            out.append("Buzz")
        else:
            out.append(str(i))
    return out`,
    walkthrough:
      'We iterate inclusively with range(1, n + 1). Testing 15 first avoids falling through to Fizz or Buzz alone. Otherwise we append str(i).',
    mistakes: ['Checking 3 and 5 in separate ifs without elif', 'Using print instead of return'],
    stretch: ['Generator version with yield', 'Accept custom words for 3 and 5'],
  }),

  challenge({
    slug: '02-string-parsing',
    title: 'Log Line Parser',
    difficulty: 'easy',
    topics: ['strings', 'parsing'],
    goals: ['Split and validate text', 'Return structured dicts'],
    description:
      'Parse simple log lines like `[ERROR] disk full` into `{"level": "ERROR", "message": "disk full"}`. Lines without a bracketed level should raise `ValueError`.',
    requirements: ['Level is uppercase inside brackets', 'Message is trimmed', 'Invalid format raises ValueError'],
    starter: `def parse_log_line(line: str) -> dict[str, str]:
    # TODO: extract [LEVEL] and message
    raise NotImplementedError`,
    hints: ['line.startswith("[")', 'split("]", 1) once', 'strip() the message part'],
    acceptance: ['Valid line parses', 'Whitespace trimmed', 'Bad line raises'],
    solutionApproach:
      'Split on the first closing bracket, validate, and return a dict.',
    concepts: [{ term: 'split(maxsplit)', detail: 'Limits splits so messages containing ] stay intact.' }, { term: 'Validation', detail: 'Raise ValueError early for malformed input.' }],
    solution: `def parse_log_line(line: str) -> dict[str, str]:
    line = line.strip()
    if not line.startswith("[") or "]" not in line:
        raise ValueError("invalid log line")
    level_part, message = line.split("]", 1)
    level = level_part.removeprefix("[").strip()
    if not level:
        raise ValueError("missing level")
    return {"level": level.upper(), "message": message.strip()}`,
    walkthrough:
      'We strip input, require bracket structure, split once on ], normalize level, and return message stripped.',
    mistakes: ['Using regex when split suffices', 'Swallowing errors and returning None'],
    stretch: ['Support optional timestamp prefix', 'Return a TypedDict or dataclass'],
  }),

  challenge({
    slug: '03-file-counter',
    title: 'File Line Counter',
    difficulty: 'easy',
    topics: ['files', 'io'],
    goals: ['Read text files safely', 'Count non-empty lines'],
    description:
      'Write `count_lines(path: Path) -> int` that returns how many non-empty lines a UTF-8 text file contains.',
    requirements: ['Use pathlib.Path', 'Ignore blank lines', 'Raise FileNotFoundError if missing'],
    starter: `from pathlib import Path

def count_lines(path: Path) -> int:
  # TODO
  raise NotImplementedError`,
    hints: ['path.read_text(encoding="utf-8")', 'splitlines() handles newlines', 'if line.strip()'],
    acceptance: ['Counts non-empty lines', 'Empty file returns 0', 'Missing file raises'],
    solutionApproach:
      'Read the file as UTF-8 text and count lines with content after strip.',
    concepts: [{ term: 'pathlib', detail: 'Object-oriented paths replace manual string joins.' }, { term: 'Context-free read', detail: 'read_text is fine for small files in exercises.' }],
    solution: `from pathlib import Path

def count_lines(path: Path) -> int:
    if not path.is_file():
        raise FileNotFoundError(path)
    text = path.read_text(encoding="utf-8")
    return sum(1 for line in text.splitlines() if line.strip())`,
    walkthrough:
      'Verify the path is a file, read UTF-8 text, split lines, and count those with stripped content.',
    mistakes: ['Counting newline characters manually', 'Opening without encoding on Windows'],
    stretch: ['Stream large files line by line', 'Add optional comment prefix skip'],
  }),

  challenge({
    slug: '04-json-reader',
    title: 'JSON Config Reader',
    difficulty: 'easy',
    topics: ['json', 'files'],
    goals: ['Load JSON safely', 'Validate required keys'],
    description:
      'Load a JSON object from disk and return it only if it contains required keys `name` and `version` (both strings). Otherwise raise `ValueError`.',
    requirements: ['Use json module', 'Root must be an object', 'Missing keys or wrong types raise ValueError'],
    starter: `import json
from pathlib import Path

def load_config(path: Path) -> dict[str, str]:
    # TODO
    raise NotImplementedError`,
    hints: ['json.loads or json.load', 'isinstance(x, str)', 'REQUIRED = ("name", "version")'],
    acceptance: ['Valid JSON loads', 'Missing key fails', 'Non-object root fails'],
    solutionApproach:
      'Parse JSON, ensure dict root, then validate required string fields.',
    concepts: [{ term: 'json.load', detail: 'Reads and parses a file object or use read_text + loads.' }, { term: 'Schema-lite validation', detail: 'Check types before trusting config values.' }],
    solution: `import json
from pathlib import Path

REQUIRED_KEYS = ("name", "version")

def load_config(path: Path) -> dict[str, str]:
    data = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(data, dict):
        raise ValueError("root must be object")
    for key in REQUIRED_KEYS:
        value = data.get(key)
        if not isinstance(value, str) or not value:
            raise ValueError(f"missing or invalid {key}")
    return {k: data[k] for k in REQUIRED_KEYS}`,
    walkthrough:
      'Parse JSON to a Python value, reject non-dicts, verify each required key is a non-empty string, return a slim dict.',
    mistakes: ['Trusting any JSON shape', 'Catching JSONDecodeError and returning {}'],
    stretch: ['Support nested settings with defaults', 'Use pydantic later in medium track'],
  }),

  challenge({
    slug: '05-cli-args',
    title: 'CLI Greeting',
    difficulty: 'easy',
    topics: ['argparse', 'cli'],
    goals: ['Parse command-line flags', 'Provide sensible defaults'],
    description:
      'Build a tiny CLI with `argparse`: `--name` (default `"world"`) and `--shout` to upper-case the greeting. `main(argv)` should return the greeting string (tests call it without subprocess).',
    requirements: ['Default name is world', '--shout uppercases output', 'Return string like "Hello, Ada!"'],
    starter: `import argparse

def build_parser() -> argparse.ArgumentParser:
    # TODO
    raise NotImplementedError

def main(argv: list[str] | None = None) -> str:
    # TODO
    raise NotImplementedError`,
    hints: ['parser.add_argument("--name", default="world")', 'store_true for --shout', 'parse_args(argv)'],
    acceptance: ['Default greeting works', 'Name flag works', 'Shout flag uppercases'],
    solutionApproach:
      'Separate parser construction from main so tests can inject argv.',
    concepts: [{ term: 'argparse', detail: 'stdlib CLI parsing with help text and types.' }, { term: 'Testable main', detail: 'Accept argv list instead of only sys.argv.' }],
    solution: `import argparse

def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Greet someone")
    parser.add_argument("--name", default="world", help="Name to greet")
    parser.add_argument("--shout", action="store_true", help="Uppercase greeting")
    return parser

def main(argv: list[str] | None = None) -> str:
    args = build_parser().parse_args(argv)
    message = f"Hello, {args.name}!"
    return message.upper() if args.shout else message`,
    walkthrough:
      'build_parser configures flags. main parses argv, formats Hello, name, and optionally uppercases.',
    mistakes: ['Parsing sys.argv directly in tests', 'Forgetting store_true for boolean flags'],
    stretch: ['Add --count to repeat greeting', 'Switch to typer in medium track'],
  }),

  challenge({
    slug: '06-simple-class',
    title: 'Bank Account Class',
    difficulty: 'easy',
    topics: ['classes', 'encapsulation'],
    goals: ['Model state with a class', 'Guard invalid operations'],
    description:
      'Implement `BankAccount` with `deposit`, `withdraw`, and read-only `balance`. Withdrawals cannot exceed balance.',
    requirements: ['Balance starts at 0', 'deposit adds positive amounts only', 'withdraw raises ValueError if insufficient funds'],
    starter: `class BankAccount:
    def __init__(self) -> None:
        # TODO
        raise NotImplementedError

    def deposit(self, amount: float) -> None:
        ...

    def withdraw(self, amount: float) -> None:
        ...

    @property
    def balance(self) -> float:
        ...`,
    hints: ['Validate amount > 0', 'self._balance private field', 'raise ValueError on overdraft'],
    acceptance: ['Deposit increases balance', 'Withdraw decreases', 'Overdraft blocked'],
    solutionApproach:
      'Keep private balance, validate amounts, expose property for reading.',
    concepts: [{ term: 'Encapsulation', detail: 'Hide _balance; callers use methods and properties.' }, { term: 'Invariants', detail: 'Methods enforce rules so balance never goes negative.' }],
    solution: `class BankAccount:
    def __init__(self) -> None:
        self._balance: float = 0.0

    def deposit(self, amount: float) -> None:
        if amount <= 0:
            raise ValueError("deposit must be positive")
        self._balance += amount

    def withdraw(self, amount: float) -> None:
        if amount <= 0:
            raise ValueError("withdraw must be positive")
        if amount > self._balance:
            raise ValueError("insufficient funds")
        self._balance -= amount

    @property
    def balance(self) -> float:
        return self._balance`,
    walkthrough:
      'Store _balance privately. deposit and withdraw validate positivity; withdraw also checks funds. balance is read-only via property.',
    mistakes: ['Public mutable balance field', 'Returning negative balance instead of raising'],
    stretch: ['Add transfer between accounts', 'Track transaction history list'],
  }),

  challenge({
    slug: '07-list-dict-operations',
    title: 'Inventory Totals',
    difficulty: 'easy',
    topics: ['lists', 'dicts', 'comprehensions'],
    goals: ['Aggregate records with dicts', 'Use comprehensions cleanly'],
    description:
      'Given `list[dict]` items with `sku`, `qty`, and `price`, return total quantity and total value. Merge duplicate SKUs by summing quantity.',
    requirements: ['Return {"total_qty": int, "total_value": float}', 'Duplicate SKUs combine quantities', 'Empty input returns zeros'],
    starter: `from typing import Any

def summarize_inventory(items: list[dict[str, Any]]) -> dict[str, float | int]:
    # TODO
    raise NotImplementedError`,
    hints: ['defaultdict or plain dict merge', 'total_value = sum(qty * price)', 'round if needed'],
    acceptance: ['Merges duplicate SKUs', 'Totals correct', 'Empty list ok'],
    solutionApproach:
      'Merge into sku -> qty map, then compute weighted value.',
    concepts: [{ term: 'Aggregation', detail: 'Combine repeated keys before computing totals.' }, { term: 'Comprehension', detail: 'sum(...) over merged items stays readable.' }],
    solution: `from typing import Any

def summarize_inventory(items: list[dict[str, Any]]) -> dict[str, float | int]:
    merged: dict[str, dict[str, float | int]] = {}
    for item in items:
        sku = str(item["sku"])
        qty = int(item["qty"])
        price = float(item["price"])
        bucket = merged.setdefault(sku, {"qty": 0, "price": price})
        bucket["qty"] = int(bucket["qty"]) + qty
        bucket["price"] = price
    total_qty = sum(int(v["qty"]) for v in merged.values())
    total_value = sum(int(v["qty"]) * float(v["price"]) for v in merged.values())
    return {"total_qty": total_qty, "total_value": total_value}`,
    walkthrough:
      'Walk items, merge qty per sku, keep latest price per sku, then sum qty and extended price.',
    mistakes: ['Summing prices without qty', 'Mutating input dicts in place'],
    stretch: ['Return per-sku breakdown', 'Use Counter for qty only'],
  }),

  challenge({
    slug: '08-pathlib-walk',
    title: 'Find Python Files',
    difficulty: 'easy',
    topics: ['pathlib', 'filesystem'],
    goals: ['Walk directories with pathlib', 'Filter by extension'],
    description:
      'Return sorted paths of all `.py` files under a root directory (recursive), skipping `__pycache__` folders.',
    requirements: ['Paths relative to root or absolute ok', 'Sorted ascending', 'Skip __pycache__ directories'],
    starter: `from pathlib import Path

def find_python_files(root: Path) -> list[Path]:
    # TODO
    raise NotImplementedError`,
    hints: ['root.rglob("*.py")', 'if "__pycache__" in p.parts: continue', 'sorted(...)'],
    acceptance: ['Finds nested .py files', 'Skips __pycache__', 'Sorted output'],
    solutionApproach:
      'Use rglob and filter out cache segments before sorting.',
    concepts: [{ term: 'rglob', detail: 'Recursive glob from a Path anchor.' }, { term: 'path.parts', detail: 'Tuple of path segments for cheap filtering.' }],
    solution: `from pathlib import Path

def find_python_files(root: Path) -> list[Path]:
    files: list[Path] = []
    for path in root.rglob("*.py"):
        if any(part == "__pycache__" for part in path.parts):
            continue
        files.append(path)
    return sorted(files)`,
    walkthrough:
      'rglob all Python files, skip any path containing __pycache__, return sorted list.',
    mistakes: ['Using os.walk when pathlib suffices', 'Forgetting sorted output'],
    stretch: ['Add max depth limit', 'Return file sizes too'],
  }),

  challenge({
    slug: '09-env-vars',
    title: 'Environment Config',
    difficulty: 'easy',
    topics: ['os.environ', 'config'],
    goals: ['Read env vars with defaults', 'Validate required settings'],
    description:
      'Implement `load_settings()` reading `APP_ENV` (default `dev`) and required `DATABASE_URL`. Missing DATABASE_URL raises `RuntimeError`.',
    requirements: ['APP_ENV defaults to dev', 'DATABASE_URL required', 'Return typed dict or dataclass'],
    starter: `import os
from dataclasses import dataclass

@dataclass(frozen=True)
class Settings:
    app_env: str
    database_url: str

def load_settings() -> Settings:
    # TODO
    raise NotImplementedError`,
    hints: ['os.environ.get("APP_ENV", "dev")', 'os.getenv("DATABASE_URL")', 'raise RuntimeError if missing'],
    acceptance: ['Default APP_ENV', 'Missing DB URL fails', 'Returns Settings'],
    solutionApproach:
      'Read os.environ, apply defaults, fail fast on required vars.',
    concepts: [{ term: '12-factor config', detail: 'Store config in the environment, not code.' }, { term: 'Fail fast', detail: 'Raise at startup when required env is missing.' }],
    solution: `import os
from dataclasses import dataclass

@dataclass(frozen=True)
class Settings:
    app_env: str
    database_url: str

def load_settings() -> Settings:
    app_env = os.environ.get("APP_ENV", "dev")
    database_url = os.environ.get("DATABASE_URL")
    if not database_url:
        raise RuntimeError("DATABASE_URL is required")
    return Settings(app_env=app_env, database_url=database_url)`,
    walkthrough:
      'Pull APP_ENV with default dev, require DATABASE_URL, return immutable Settings dataclass.',
    mistakes: ['Hard-coding secrets', 'Silently using empty string for missing URL'],
    stretch: ['Coerce APP_ENV to Literal dev/staging/prod', 'Use pydantic-settings later'],
  }),

  challenge({
    slug: '10-pytest-basics',
    title: 'Pytest Temperature',
    difficulty: 'easy',
    topics: ['pytest', 'testing'],
    goals: ['Write parametric tests', 'Cover edge cases'],
    description:
      'Implement `celsius_to_fahrenheit(c: float) -> float` and accompanying tests in `test_temperature.py` using `@pytest.mark.parametrize`.',
    requirements: ['Formula: F = C * 9/5 + 32', 'At least 3 parametrize cases including 0 and 100', 'Tests live in test_temperature.py'],
    starter: `# temperature.py
def celsius_to_fahrenheit(c: float) -> float:
    # TODO
    raise NotImplementedError

# test_temperature.py
import pytest
# TODO: import and parametrize`,
    hints: ['pytest.approx for floats', '@pytest.mark.parametrize("c,f", [(0,32), ...])', 'keep tests beside module'],
    acceptance: ['Conversion correct', 'Parametrize used', 'Edge cases covered'],
    solutionApproach:
      'Pure function plus parametrized tests documenting examples.',
    concepts: [{ term: 'parametrize', detail: 'One test function, many input/output tuples.' }, { term: 'pytest.approx', detail: 'Compare floats with tolerance.' }],
    solution: `# temperature.py
def celsius_to_fahrenheit(c: float) -> float:
    return c * 9 / 5 + 32

# test_temperature.py
import pytest
from temperature import celsius_to_fahrenheit

@pytest.mark.parametrize(
    "celsius, expected",
    [(0, 32), (100, 212), (-40, -40)],
)
def test_celsius_to_fahrenheit(celsius: float, expected: float) -> None:
    assert celsius_to_fahrenheit(celsius) == pytest.approx(expected)`,
    walkthrough:
      'Implement the formula once. Tests use parametrize to lock common conversions including -40 crossover.',
    mistakes: ['Exact float equality without approx', 'Only one assert case'],
    stretch: ['Add hypothesis property test', 'Round trip f_to_c'],
  }),

  challenge({
    slug: '11-csv-parse',
    title: 'CSV Sales Report',
    difficulty: 'easy',
    topics: ['csv', 'data'],
    goals: ['Parse CSV with csv module', 'Compute simple analytics'],
    description:
      'Read CSV with headers `product,quantity,price` and return total revenue as float.',
    requirements: ['Use csv.DictReader', 'Skip blank rows', 'Return sum of quantity * price'],
    starter: `import csv
from pathlib import Path

def total_revenue(path: Path) -> float:
    # TODO
    raise NotImplementedError`,
    hints: ['open(path, newline="")', 'int(row["quantity"])', 'accumulate float total'],
    acceptance: ['Revenue correct', 'Blank rows ignored', 'Headers required'],
    solutionApproach:
      'Stream rows with DictReader and sum extended price.',
    concepts: [{ term: 'DictReader', detail: 'Rows as dicts keyed by header names.' }, { term: 'newline=""', detail: 'Required on Windows for csv module.' }],
    solution: `import csv
from pathlib import Path

def total_revenue(path: Path) -> float:
    total = 0.0
    with path.open(newline="", encoding="utf-8") as fh:
        for row in csv.DictReader(fh):
            if not any(row.values()):
                continue
            qty = int(row["quantity"])
            price = float(row["price"])
            total += qty * price
    return total`,
    walkthrough:
      'Open with newline="", iterate DictReader rows, skip empty rows, sum qty*price.',
    mistakes: ['Splitting lines manually', 'Forgetting newline="" on Windows'],
    stretch: ['Group revenue by product', 'Validate negative qty'],
  }),

  challenge({
    slug: '12-requests-get',
    title: 'HTTP GET JSON',
    difficulty: 'easy',
    topics: ['requests', 'http'],
    goals: ['Perform GET requests', 'Handle HTTP errors'],
    description:
      'Fetch JSON from a URL with `requests` and return the parsed object. Non-2xx responses should raise `requests.HTTPError`.',
    requirements: ['Use requests.get with timeout', 'Call raise_for_status', 'Return parsed JSON (dict or list)'],
    starter: `import requests

def fetch_json(url: str, *, timeout: float = 10.0) -> dict | list:
    # TODO
    raise NotImplementedError`,
    hints: ['response.raise_for_status()', 'response.json()', 'always set timeout'],
    acceptance: ['200 returns JSON', '404 raises', 'Timeout configured'],
    solutionApproach:
      'GET with timeout, check status, parse JSON body.',
    concepts: [{ term: 'raise_for_status', detail: 'Turn 4xx/5xx into exceptions.' }, { term: 'timeout', detail: 'Prevents hanging forever on bad networks.' }],
    solution: `import requests

def fetch_json(url: str, *, timeout: float = 10.0) -> dict | list:
    response = requests.get(url, timeout=timeout)
    response.raise_for_status()
    return response.json()`,
    walkthrough:
      'Single GET with timeout, raise on bad status, return json() payload.',
    mistakes: ['No timeout', 'Returning response.text without parsing'],
    stretch: ['Add retries for 503', 'Return headers too'],
  }),

  challenge({
    slug: '13-dataclass',
    title: 'User Profile Dataclass',
    difficulty: 'easy',
    topics: ['dataclasses'],
    goals: ['Define a dataclass with defaults', 'Serialize to dict'],
    description:
      'Create frozen `User` dataclass (`id`, `email`, `active: bool = True`) plus `to_dict` using `dataclasses.asdict`.',
    requirements: ['frozen=True', 'email must contain @ (validate in __post_init__)', 'to_dict returns plain dict'],
    starter: `from dataclasses import dataclass, asdict

@dataclass
class User:
    # TODO
    ...`,
    hints: ['@dataclass(frozen=True)', '__post_init__ validation', 'asdict(self)'],
    acceptance: ['Frozen instance', 'Invalid email fails', 'to_dict works'],
    solutionApproach:
      'Dataclass with post-init validation and asdict helper.',
    concepts: [{ term: 'frozen dataclass', detail: 'Instances are immutable after creation.' }, { term: '__post_init__', detail: 'Hook to validate fields after __init__.' }],
    solution: `from dataclasses import asdict, dataclass

@dataclass(frozen=True)
class User:
    id: int
    email: str
    active: bool = True

    def __post_init__(self) -> None:
        if "@" not in self.email:
            raise ValueError("invalid email")

    def to_dict(self) -> dict[str, object]:
        return asdict(self)`,
    walkthrough:
      'frozen dataclass stores fields; __post_init__ checks email; to_dict delegates to asdict.',
    mistakes: ['Mutable default list on dataclass', 'Skipping validation in post_init'],
    stretch: ['Add from_dict classmethod', 'Use slots=True for memory'],
  }),

  challenge({
    slug: '14-enum',
    title: 'Order Status Enum',
    difficulty: 'easy',
    topics: ['enum'],
    goals: ['Model constants with Enum', 'Convert safely from strings'],
    description:
      'Define `OrderStatus` enum and `parse_status(value: str) -> OrderStatus` that accepts case-insensitive names or raises ValueError.',
    requirements: ['Statuses: pending, shipped, delivered, cancelled', 'parse_status case-insensitive', 'Unknown values raise ValueError'],
    starter: `from enum import Enum

class OrderStatus(Enum):
    # TODO
    ...

def parse_status(value: str) -> OrderStatus:
    ...`,
    hints: ['class OrderStatus(str, Enum)', 'OrderStatus[value.upper()] with mapping', 'try/except KeyError'],
    acceptance: ['Enum members exist', 'Case insensitive parse', 'Invalid raises'],
    solutionApproach:
      'str Enum for JSON friendliness; parse via normalized name lookup.',
    concepts: [{ term: 'str Enum', detail: 'Compares like strings while staying typed.' }, { term: 'Exhaustive handling', detail: 'Invalid states fail loudly at boundary.' }],
    solution: `from enum import Enum

class OrderStatus(str, Enum):
    PENDING = "pending"
    SHIPPED = "shipped"
    DELIVERED = "delivered"
    CANCELLED = "cancelled"

def parse_status(value: str) -> OrderStatus:
    key = value.strip().upper()
    try:
        return OrderStatus[key]
    except KeyError as exc:
        raise ValueError(f"unknown status: {value}") from exc`,
    walkthrough:
      'str Enum defines allowed values. parse_status uppercases input and uses Enum name lookup with clear errors.',
    mistakes: ['Stringly-typed status everywhere', 'Using if/elif chain instead of Enum'],
    stretch: ['Add transitions validator', 'Serialize to OpenAPI schema'],
  }),

  challenge({
    slug: '15-logging',
    title: 'Module Logger Setup',
    difficulty: 'easy',
    topics: ['logging'],
    goals: ['Configure logging basicConfig', 'Log at appropriate levels'],
    description:
      'Provide `configure_logging(level: str)` that sets up root logger with a standard format and returns a named logger `app`.',
    requirements: ['Format includes level and message', 'Level from string DEBUG/INFO/WARNING', 'Returns logging.getLogger("app")'],
    starter: `import logging

def configure_logging(level: str = "INFO") -> logging.Logger:
    # TODO
    raise NotImplementedError`,
    hints: ['logging.basicConfig', 'getattr(logging, level.upper())', 'force=True on 3.8+'],
    acceptance: ['Logger returned', 'Level respected', 'Format readable'],
    solutionApproach:
      'basicConfig once with force=True; fetch named logger.',
    concepts: [{ term: 'logging hierarchy', detail: 'Named loggers inherit root handlers.' }, { term: 'levels', detail: 'DEBUG < INFO < WARNING < ERROR < CRITICAL.' }],
    solution: `import logging

def configure_logging(level: str = "INFO") -> logging.Logger:
    numeric_level = getattr(logging, level.upper(), logging.INFO)
    logging.basicConfig(
        level=numeric_level,
        format="%(levelname)s | %(message)s",
        force=True,
    )
    return logging.getLogger("app")`,
    walkthrough:
      'Map string level to logging constant, basicConfig with format, return app logger.',
    mistakes: ['print debugging instead of logger', 'Creating duplicate handlers without force'],
    stretch: ['Add JSON formatter', 'Rotate log files with RotatingFileHandler'],
  }),

  challenge({
    slug: '16-config-file',
    title: 'TOML App Config',
    difficulty: 'easy',
    topics: ['tomllib', 'config'],
    goals: ['Load TOML configuration', 'Apply defaults'],
    description:
      'Load `pyproject`-style TOML config from bytes using `tomllib` (3.11+) and return `[tool.app]` section with defaults `host=127.0.0.1`, `port=8000`.',
    requirements: ['Use tomllib.loads', 'Missing tool.app uses defaults', 'port coerced to int'],
    starter: `import tomllib

DEFAULTS = {"host": "127.0.0.1", "port": 8000}

def load_app_config(data: bytes) -> dict[str, object]:
    # TODO
    raise NotImplementedError`,
    hints: ['tomllib.loads(data)', 'doc.get("tool", {}).get("app", {})', '{**DEFAULTS, **section}'],
    acceptance: ['Defaults apply', 'Overrides merge', 'port is int'],
    solutionApproach:
      'Parse TOML, drill into tool.app, merge over DEFAULTS, coerce port.',
    concepts: [{ term: 'tomllib', detail: 'stdlib TOML parser in Python 3.11+.' }, { term: 'shallow merge', detail: 'Defaults then user overrides for flat keys.' }],
    solution: `import tomllib

DEFAULTS = {"host": "127.0.0.1", "port": 8000}

def load_app_config(data: bytes) -> dict[str, object]:
    doc = tomllib.loads(data.decode("utf-8"))
    section = doc.get("tool", {}).get("app", {})
    merged = {**DEFAULTS, **section}
    merged["port"] = int(merged["port"])
    return merged`,
    walkthrough:
      'Decode bytes, parse TOML, extract tool.app, merge defaults, int-cast port.',
    mistakes: ['Using yaml for simple config unintentionally', 'Mutating DEFAULTS dict'],
    stretch: ['Validate with typed Settings', 'Support env override layer'],
  }),

  challenge({
    slug: '17-unit-converter',
    title: 'Unit Converter',
    difficulty: 'easy',
    topics: ['functions', 'mapping'],
    goals: ['Build a small conversion API', 'Use dict dispatch'],
    description:
      'Implement `convert(value: float, from_unit: str, to_unit: str) -> float` for length units `m`, `cm`, `km` via meters as base.',
    requirements: ['Support m, cm, km', 'Unknown unit raises ValueError', 'Round not required; return float'],
    starter: `TO_METERS = {"m": 1.0, "cm": 0.01, "km": 1000.0}

def convert(value: float, from_unit: str, to_unit: str) -> float:
    # TODO
    raise NotImplementedError`,
    hints: ['meters = value * TO_METERS[from]', 'return meters / TO_METERS[to]', 'normalize keys'],
    acceptance: ['km to m works', 'cm to km works', 'Bad unit raises'],
    solutionApproach:
      'Convert to base meters, then divide into target unit.',
    concepts: [{ term: 'canonical unit', detail: 'Convert through a single base to support N units.' }, { term: 'dispatch table', detail: 'Dict mapping replaces long if chains.' }],
    solution: `TO_METERS = {"m": 1.0, "cm": 0.01, "km": 1000.0}

def convert(value: float, from_unit: str, to_unit: str) -> float:
    try:
        meters = value * TO_METERS[from_unit]
        return meters / TO_METERS[to_unit]
    except KeyError as exc:
        raise ValueError("unknown unit") from exc`,
    walkthrough:
      'Multiply into meters using from_unit factor, divide by to_unit factor, KeyError becomes ValueError.',
    mistakes: ['Hard-coded formulas per pair', 'Integer division'],
    stretch: ['Add temperature units', 'Register units dynamically'],
  }),

  challenge({
    slug: '18-password-validator',
    title: 'Password Validator',
    difficulty: 'easy',
    topics: ['validation', 'strings'],
    goals: ['Encode password rules clearly', 'Return structured errors'],
    description:
      'Validate passwords: min length 8, at least one digit, one uppercase, one lowercase. Return `(ok: bool, errors: list[str])`.',
    requirements: ['Return all failed rules', 'Empty password fails', 'Do not mutate input'],
    starter: `import re

def validate_password(password: str) -> tuple[bool, list[str]]:
    # TODO
    raise NotImplementedError`,
    hints: ['any(c.isdigit() for c in password)', 'collect messages in list', 'ok = not errors'],
    acceptance: ['Strong password passes', 'Weak lists errors', 'Multiple errors at once'],
    solutionApproach:
      'Append rule messages; ok when errors empty.',
    concepts: [{ term: 'validation result', detail: 'Return errors list instead of raising for UX forms.' }, { term: 'character classes', detail: 'isupper/islower/isdigit are clearer than regex alone.' }],
    solution: `def validate_password(password: str) -> tuple[bool, list[str]]:
    errors: list[str] = []
    if len(password) < 8:
        errors.append("must be at least 8 characters")
    if not any(c.islower() for c in password):
        errors.append("needs a lowercase letter")
    if not any(c.isupper() for c in password):
        errors.append("needs an uppercase letter")
    if not any(c.isdigit() for c in password):
        errors.append("needs a digit")
    return (len(errors) == 0, errors)`,
    walkthrough:
      'Check each rule independently, collect messages, return tuple of pass flag and errors.',
    mistakes: ['Return on first error only', 'Regex-only without readability'],
    stretch: ['Check breached passwords via k-anonymity API', 'zxcvbn scoring'],
  }),

  challenge({
    slug: '19-text-search',
    title: 'Grep Lite',
    difficulty: 'easy',
    topics: ['files', 'search'],
    goals: ['Search lines in a file', 'Return line numbers'],
    description:
      'Implement `find_matches(path: Path, needle: str) -> list[tuple[int, str]]` returning (line_no, line_text) for case-sensitive substring matches.',
    requirements: ['Line numbers start at 1', 'Case sensitive', 'Empty needle matches every line'],
    starter: `from pathlib import Path

def find_matches(path: Path, needle: str) -> list[tuple[int, str]]:
    # TODO
    raise NotImplementedError`,
    hints: ['enumerate(path.read_text().splitlines(), start=1)', 'if needle in line', 'strip optional'],
    acceptance: ['Correct line numbers', 'Multiple matches returned', 'Missing file raises'],
    solutionApproach:
      'Stream lines with enumerate; collect hits.',
    concepts: [{ term: 'enumerate start', detail: 'start=1 aligns with human line numbers.' }, { term: 'substring search', detail: 'in operator is fine for grep-lite.' }],
    solution: `from pathlib import Path

def find_matches(path: Path, needle: str) -> list[tuple[int, str]]:
    text = path.read_text(encoding="utf-8")
    return [
        (lineno, line)
        for lineno, line in enumerate(text.splitlines(), start=1)
        if needle in line
    ]`,
    walkthrough:
      'Read file, enumerate from 1, keep lines where needle substring appears.',
    mistakes: ['0-based line numbers', 'Loading binary files as text blindly'],
    stretch: ['Regex mode', 'Generator for huge files'],
  }),

  challenge({
    slug: '20-api-client',
    title: 'REST API Client',
    difficulty: 'easy',
    topics: ['requests', 'api-design'],
    goals: ['Wrap HTTP in a small class', 'Reuse session'],
    description:
      'Build `ApiClient` with base URL and `get_user(user_id: int) -> dict` using a persistent `requests.Session`.',
    requirements: ['Session created in __init__', 'GET /users/{id} relative to base', 'raise_for_status on errors'],
    starter: `import requests

class ApiClient:
    def __init__(self, base_url: str) -> None:
        # TODO
        ...

    def get_user(self, user_id: int) -> dict:
        ...`,
    hints: ['self._session = requests.Session()', 'url = f"{base}/users/{id}"', 'return response.json()'],
    acceptance: ['GET correct path', 'Session reused', 'HTTP errors propagate'],
    solutionApproach:
      'Session per client; compose URLs; parse JSON responses.',
    concepts: [{ term: 'Session', detail: 'Reuses TCP connections and default headers.' }, { term: 'thin client', detail: 'One method per resource keeps API obvious.' }],
    solution: `import requests

class ApiClient:
    def __init__(self, base_url: str) -> None:
        self._base_url = base_url.rstrip("/")
        self._session = requests.Session()

    def get_user(self, user_id: int) -> dict:
        url = f"{self._base_url}/users/{user_id}"
        response = self._session.get(url, timeout=10.0)
        response.raise_for_status()
        return response.json()`,
    walkthrough:
      'Store base URL and Session. get_user builds path, GETs with timeout, checks status, returns JSON dict.',
    mistakes: ['New Session per request', 'No timeout'],
    stretch: ['Add POST create_user', 'Attach auth header'],
  }),
];
