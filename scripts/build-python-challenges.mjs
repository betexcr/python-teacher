/**
 * One-shot generator for Python challenge source files.
 * Run: node scripts/build-python-challenges.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, 'challenges');

const a = (summary, detail) => ({ summary, detail });

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

function sq(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function challengeBlock(c) {
  const fields = [
    `slug: '${c.slug}'`,
    `title: '${c.title.replace(/'/g, "\\'")}'`,
    `difficulty: '${c.difficulty}'`,
    `topics: [${c.topics.map((t) => `'${t}'`).join(', ')}]`,
    `goals: [${c.goals.map((g) => `'${g.replace(/'/g, "\\'")}'`).join(', ')}]`,
    `description:\n      '${c.description.replace(/'/g, "\\'")}'`,
    `requirements: [${c.requirements.map((r) => `'${r.replace(/'/g, "\\'")}'`).join(', ')}]`,
    `starter: \`${esc(c.starter)}\``,
    `hints: [${c.hints.map((h) => `'${h.replace(/'/g, "\\'")}'`).join(', ')}]`,
    `acceptance: [${c.acceptance.map((x) => `'${x.replace(/'/g, "\\'")}'`).join(', ')}]`,
    `solutionApproach:\n      '${c.solutionApproach.replace(/'/g, "\\'")}'`,
    `concepts: [${c.concepts.map((x) => `{ term: '${x.term.replace(/'/g, "\\'")}', detail: '${x.detail.replace(/'/g, "\\'")}' }`).join(', ')}]`,
    `solution: \`${esc(c.solution)}\``,
    `walkthrough:\n      '${c.walkthrough.replace(/'/g, "\\'")}'`,
    `mistakes: [${c.mistakes.map((m) => `'${m.replace(/'/g, "\\'")}'`).join(', ')}]`,
    `stretch: [${c.stretch.map((s) => `'${s.replace(/'/g, "\\'")}'`).join(', ')}]`,
  ];
  return `  challenge({\n    ${fields.join(',\n    ')},\n  })`;
}

function writeDifficultyFile(exportName, challenges) {
  const body = challenges.map(challengeBlock).join(',\n\n');
  const content = `import { challenge } from './helpers.mjs';\n\nexport const ${exportName} = [\n${body},\n];\n`;
  return content;
}

// —— EASY (20) ——
const easy = [
  {
    slug: '01-fizzbuzz',
    title: 'FizzBuzz',
    difficulty: 'easy',
    topics: ['control-flow', 'loops'],
    goals: ['Practice modulo and branching', 'Return a list from a pure function'],
    description:
      'Implement `fizzbuzz(n: int) -> list[str]` that returns values from 1 through `n` inclusive. Multiples of 3 become `"Fizz"`, multiples of 5 become `"Buzz"`, multiples of both become `"FizzBuzz"`, otherwise the number as a string.',
    requirements: [
      'Return exactly n items',
      '15 maps to FizzBuzz',
      '1 maps to "1"',
      'Do not print; return the list',
    ],
    starter: `def fizzbuzz(n: int) -> list[str]:
    """Return FizzBuzz strings for 1..n."""
    # TODO
    raise NotImplementedError`,
    hints: ['Use % for divisibility', 'Check 15 before 3 or 5 alone', 'str(i) for plain numbers'],
    acceptance: ['Correct FizzBuzz at 15', 'Plain numbers as strings', 'Length equals n'],
    solutionApproach: 'Loop 1..n and build strings with ordered divisibility checks.',
    concepts: [
      { term: 'Modulo', detail: '% returns the remainder and cleanly detects multiples.' },
      { term: 'Pure function', detail: 'No I/O; same input always yields the same output.' },
    ],
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
  },
  {
    slug: '02-string-parsing',
    title: 'Log Line Parser',
    difficulty: 'easy',
    topics: ['strings', 'parsing'],
    goals: ['Split and validate text', 'Return structured dicts'],
    description:
      'Parse simple log lines like `[ERROR] disk full` into `{"level": "ERROR", "message": "disk full"}`. Lines without a bracketed level should raise `ValueError`.',
    requirements: [
      'Level is uppercase inside brackets',
      'Message is trimmed',
      'Invalid format raises ValueError',
    ],
    starter: `def parse_log_line(line: str) -> dict[str, str]:
    # TODO: extract [LEVEL] and message
    raise NotImplementedError`,
    hints: ['line.startswith("[")', 'split("]", 1) once', 'strip() the message part'],
    acceptance: ['Valid line parses', 'Whitespace trimmed', 'Bad line raises'],
    solutionApproach: 'Split on the first closing bracket, validate, and return a dict.',
    concepts: [
      { term: 'split(maxsplit)', detail: 'Limits splits so messages containing ] stay intact.' },
      { term: 'Validation', detail: 'Raise ValueError early for malformed input.' },
    ],
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
  },
  {
    slug: '03-file-counter',
    title: 'File Line Counter',
    difficulty: 'easy',
    topics: ['files', 'io'],
    goals: ['Read text files safely', 'Count non-empty lines'],
    description:
      'Write `count_lines(path: Path) -> int` that returns how many non-empty lines a UTF-8 text file contains.',
    requirements: [
      'Use pathlib.Path',
      'Ignore blank lines',
      'Raise FileNotFoundError if missing',
    ],
    starter: `from pathlib import Path

def count_lines(path: Path) -> int:
  # TODO
  raise NotImplementedError`,
    hints: ['path.read_text(encoding="utf-8")', 'splitlines() handles newlines', 'if line.strip()'],
    acceptance: ['Counts non-empty lines', 'Empty file returns 0', 'Missing file raises'],
    solutionApproach: 'Read the file as UTF-8 text and count lines with content after strip.',
    concepts: [
      { term: 'pathlib', detail: 'Object-oriented paths replace manual string joins.' },
      { term: 'Context-free read', detail: 'read_text is fine for small files in exercises.' },
    ],
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
  },
  {
    slug: '04-json-reader',
    title: 'JSON Config Reader',
    difficulty: 'easy',
    topics: ['json', 'files'],
    goals: ['Load JSON safely', 'Validate required keys'],
    description:
      'Load a JSON object from disk and return it only if it contains required keys `name` and `version` (both strings). Otherwise raise `ValueError`.',
    requirements: [
      'Use json module',
      'Root must be an object',
      'Missing keys or wrong types raise ValueError',
    ],
    starter: `import json
from pathlib import Path

def load_config(path: Path) -> dict[str, str]:
    # TODO
    raise NotImplementedError`,
    hints: ['json.loads or json.load', 'isinstance(x, str)', 'REQUIRED = ("name", "version")'],
    acceptance: ['Valid JSON loads', 'Missing key fails', 'Non-object root fails'],
    solutionApproach: 'Parse JSON, ensure dict root, then validate required string fields.',
    concepts: [
      { term: 'json.load', detail: 'Reads and parses a file object or use read_text + loads.' },
      { term: 'Schema-lite validation', detail: 'Check types before trusting config values.' },
    ],
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
  },
  {
    slug: '05-cli-args',
    title: 'CLI Greeting',
    difficulty: 'easy',
    topics: ['argparse', 'cli'],
    goals: ['Parse command-line flags', 'Provide sensible defaults'],
    description:
      'Build a tiny CLI with `argparse`: `--name` (default `"world"`) and `--shout` to upper-case the greeting. `main(argv)` should return the greeting string (tests call it without subprocess).',
    requirements: [
      'Default name is world',
      '--shout uppercases output',
      'Return string like "Hello, Ada!"',
    ],
    starter: `import argparse

def build_parser() -> argparse.ArgumentParser:
    # TODO
    raise NotImplementedError

def main(argv: list[str] | None = None) -> str:
    # TODO
    raise NotImplementedError`,
    hints: ['parser.add_argument("--name", default="world")', 'store_true for --shout', 'parse_args(argv)'],
    acceptance: ['Default greeting works', 'Name flag works', 'Shout flag uppercases'],
    solutionApproach: 'Separate parser construction from main so tests can inject argv.',
    concepts: [
      { term: 'argparse', detail: 'stdlib CLI parsing with help text and types.' },
      { term: 'Testable main', detail: 'Accept argv list instead of only sys.argv.' },
    ],
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
  },
  {
    slug: '06-simple-class',
    title: 'Bank Account Class',
    difficulty: 'easy',
    topics: ['classes', 'encapsulation'],
    goals: ['Model state with a class', 'Guard invalid operations'],
    description:
      'Implement `BankAccount` with `deposit`, `withdraw`, and read-only `balance`. Withdrawals cannot exceed balance.',
    requirements: [
      'Balance starts at 0',
      'deposit adds positive amounts only',
      'withdraw raises ValueError if insufficient funds',
    ],
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
    solutionApproach: 'Keep private balance, validate amounts, expose property for reading.',
    concepts: [
      { term: 'Encapsulation', detail: 'Hide _balance; callers use methods and properties.' },
      { term: 'Invariants', detail: 'Methods enforce rules so balance never goes negative.' },
    ],
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
  },
  {
    slug: '07-list-dict-operations',
    title: 'Inventory Totals',
    difficulty: 'easy',
    topics: ['lists', 'dicts', 'comprehensions'],
    goals: ['Aggregate records with dicts', 'Use comprehensions cleanly'],
    description:
      'Given `list[dict]` items with `sku`, `qty`, and `price`, return total quantity and total value. Merge duplicate SKUs by summing quantity.',
    requirements: [
      'Return {"total_qty": int, "total_value": float}',
      'Duplicate SKUs combine quantities',
      'Empty input returns zeros',
    ],
    starter: `from typing import Any

def summarize_inventory(items: list[dict[str, Any]]) -> dict[str, float | int]:
    # TODO
    raise NotImplementedError`,
    hints: ['defaultdict or plain dict merge', 'total_value = sum(qty * price)', 'round if needed'],
    acceptance: ['Merges duplicate SKUs', 'Totals correct', 'Empty list ok'],
    solutionApproach: 'Merge into sku -> qty map, then compute weighted value.',
    concepts: [
      { term: 'Aggregation', detail: 'Combine repeated keys before computing totals.' },
      { term: 'Comprehension', detail: 'sum(...) over merged items stays readable.' },
    ],
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
  },
  {
    slug: '08-pathlib-walk',
    title: 'Find Python Files',
    difficulty: 'easy',
    topics: ['pathlib', 'filesystem'],
    goals: ['Walk directories with pathlib', 'Filter by extension'],
    description:
      'Return sorted paths of all `.py` files under a root directory (recursive), skipping `__pycache__` folders.',
    requirements: [
      'Paths relative to root or absolute ok',
      'Sorted ascending',
      'Skip __pycache__ directories',
    ],
    starter: `from pathlib import Path

def find_python_files(root: Path) -> list[Path]:
    # TODO
    raise NotImplementedError`,
    hints: ['root.rglob("*.py")', 'if "__pycache__" in p.parts: continue', 'sorted(...)'],
    acceptance: ['Finds nested .py files', 'Skips __pycache__', 'Sorted output'],
    solutionApproach: 'Use rglob and filter out cache segments before sorting.',
    concepts: [
      { term: 'rglob', detail: 'Recursive glob from a Path anchor.' },
      { term: 'path.parts', detail: 'Tuple of path segments for cheap filtering.' },
    ],
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
  },
  {
    slug: '09-env-vars',
    title: 'Environment Config',
    difficulty: 'easy',
    topics: ['os.environ', 'config'],
    goals: ['Read env vars with defaults', 'Validate required settings'],
    description:
      'Implement `load_settings()` reading `APP_ENV` (default `dev`) and required `DATABASE_URL`. Missing DATABASE_URL raises `RuntimeError`.',
    requirements: [
      'APP_ENV defaults to dev',
      'DATABASE_URL required',
      'Return typed dict or dataclass',
    ],
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
    solutionApproach: 'Read os.environ, apply defaults, fail fast on required vars.',
    concepts: [
      { term: '12-factor config', detail: 'Store config in the environment, not code.' },
      { term: 'Fail fast', detail: 'Raise at startup when required env is missing.' },
    ],
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
  },
  {
    slug: '10-pytest-basics',
    title: 'Pytest Temperature',
    difficulty: 'easy',
    topics: ['pytest', 'testing'],
    goals: ['Write parametric tests', 'Cover edge cases'],
    description:
      'Implement `celsius_to_fahrenheit(c: float) -> float` and accompanying tests in `test_temperature.py` using `@pytest.mark.parametrize`.',
    requirements: [
      'Formula: F = C * 9/5 + 32',
      'At least 3 parametrize cases including 0 and 100',
      'Tests live in test_temperature.py',
    ],
    starter: `# temperature.py
def celsius_to_fahrenheit(c: float) -> float:
    # TODO
    raise NotImplementedError

# test_temperature.py
import pytest
# TODO: import and parametrize`,
    hints: ['pytest.approx for floats', '@pytest.mark.parametrize("c,f", [(0,32), ...])', 'keep tests beside module'],
    acceptance: ['Conversion correct', 'Parametrize used', 'Edge cases covered'],
    solutionApproach: 'Pure function plus parametrized tests documenting examples.',
    concepts: [
      { term: 'parametrize', detail: 'One test function, many input/output tuples.' },
      { term: 'pytest.approx', detail: 'Compare floats with tolerance.' },
    ],
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
  },
  {
    slug: '11-csv-parse',
    title: 'CSV Sales Report',
    difficulty: 'easy',
    topics: ['csv', 'data'],
    goals: ['Parse CSV with csv module', 'Compute simple analytics'],
    description:
      'Read CSV with headers `product,quantity,price` and return total revenue as float.',
    requirements: [
      'Use csv.DictReader',
      'Skip blank rows',
      'Return sum of quantity * price',
    ],
    starter: `import csv
from pathlib import Path

def total_revenue(path: Path) -> float:
    # TODO
    raise NotImplementedError`,
    hints: ['open(path, newline="")', 'int(row["quantity"])', 'accumulate float total'],
    acceptance: ['Revenue correct', 'Blank rows ignored', 'Headers required'],
    solutionApproach: 'Stream rows with DictReader and sum extended price.',
    concepts: [
      { term: 'DictReader', detail: 'Rows as dicts keyed by header names.' },
      { term: 'newline=""', detail: 'Required on Windows for csv module.' },
    ],
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
  },
  {
    slug: '12-requests-get',
    title: 'HTTP GET JSON',
    difficulty: 'easy',
    topics: ['requests', 'http'],
    goals: ['Perform GET requests', 'Handle HTTP errors'],
    description:
      'Fetch JSON from a URL with `requests` and return the parsed object. Non-2xx responses should raise `requests.HTTPError`.',
    requirements: [
      'Use requests.get with timeout',
      'Call raise_for_status',
      'Return parsed JSON (dict or list)',
    ],
    starter: `import requests

def fetch_json(url: str, *, timeout: float = 10.0) -> dict | list:
    # TODO
    raise NotImplementedError`,
    hints: ['response.raise_for_status()', 'response.json()', 'always set timeout'],
    acceptance: ['200 returns JSON', '404 raises', 'Timeout configured'],
    solutionApproach: 'GET with timeout, check status, parse JSON body.',
    concepts: [
      { term: 'raise_for_status', detail: 'Turn 4xx/5xx into exceptions.' },
      { term: 'timeout', detail: 'Prevents hanging forever on bad networks.' },
    ],
    solution: `import requests

def fetch_json(url: str, *, timeout: float = 10.0) -> dict | list:
    response = requests.get(url, timeout=timeout)
    response.raise_for_status()
    return response.json()`,
    walkthrough:
      'Single GET with timeout, raise on bad status, return json() payload.',
    mistakes: ['No timeout', 'Returning response.text without parsing'],
    stretch: ['Add retries for 503', 'Return headers too'],
  },
  {
    slug: '13-dataclass',
    title: 'User Profile Dataclass',
    difficulty: 'easy',
    topics: ['dataclasses'],
    goals: ['Define a dataclass with defaults', 'Serialize to dict'],
    description:
      'Create frozen `User` dataclass (`id`, `email`, `active: bool = True`) plus `to_dict` using `dataclasses.asdict`.',
    requirements: [
      'frozen=True',
      'email must contain @ (validate in __post_init__)',
      'to_dict returns plain dict',
    ],
    starter: `from dataclasses import dataclass, asdict

@dataclass
class User:
    # TODO
    ...`,
    hints: ['@dataclass(frozen=True)', '__post_init__ validation', 'asdict(self)'],
    acceptance: ['Frozen instance', 'Invalid email fails', 'to_dict works'],
    solutionApproach: 'Dataclass with post-init validation and asdict helper.',
    concepts: [
      { term: 'frozen dataclass', detail: 'Instances are immutable after creation.' },
      { term: '__post_init__', detail: 'Hook to validate fields after __init__.' },
    ],
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
  },
  {
    slug: '14-enum',
    title: 'Order Status Enum',
    difficulty: 'easy',
    topics: ['enum'],
    goals: ['Model constants with Enum', 'Convert safely from strings'],
    description:
      'Define `OrderStatus` enum and `parse_status(value: str) -> OrderStatus` that accepts case-insensitive names or raises ValueError.',
    requirements: [
      'Statuses: pending, shipped, delivered, cancelled',
      'parse_status case-insensitive',
      'Unknown values raise ValueError',
    ],
    starter: `from enum import Enum

class OrderStatus(Enum):
    # TODO
    ...

def parse_status(value: str) -> OrderStatus:
    ...`,
    hints: ['class OrderStatus(str, Enum)', 'OrderStatus[value.upper()] with mapping', 'try/except KeyError'],
    acceptance: ['Enum members exist', 'Case insensitive parse', 'Invalid raises'],
    solutionApproach: 'str Enum for JSON friendliness; parse via normalized name lookup.',
    concepts: [
      { term: 'str Enum', detail: 'Compares like strings while staying typed.' },
      { term: 'Exhaustive handling', detail: 'Invalid states fail loudly at boundary.' },
    ],
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
  },
  {
    slug: '15-logging',
    title: 'Module Logger Setup',
    difficulty: 'easy',
    topics: ['logging'],
    goals: ['Configure logging basicConfig', 'Log at appropriate levels'],
    description:
      'Provide `configure_logging(level: str)` that sets up root logger with a standard format and returns a named logger `app`.',
    requirements: [
      'Format includes level and message',
      'Level from string DEBUG/INFO/WARNING',
      'Returns logging.getLogger("app")',
    ],
    starter: `import logging

def configure_logging(level: str = "INFO") -> logging.Logger:
    # TODO
    raise NotImplementedError`,
    hints: ['logging.basicConfig', 'getattr(logging, level.upper())', 'force=True on 3.8+'],
    acceptance: ['Logger returned', 'Level respected', 'Format readable'],
    solutionApproach: 'basicConfig once with force=True; fetch named logger.',
    concepts: [
      { term: 'logging hierarchy', detail: 'Named loggers inherit root handlers.' },
      { term: 'levels', detail: 'DEBUG < INFO < WARNING < ERROR < CRITICAL.' },
    ],
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
  },
  {
    slug: '16-config-file',
    title: 'TOML App Config',
    difficulty: 'easy',
    topics: ['tomllib', 'config'],
    goals: ['Load TOML configuration', 'Apply defaults'],
    description:
      'Load `pyproject`-style TOML config from bytes using `tomllib` (3.11+) and return `[tool.app]` section with defaults `host=127.0.0.1`, `port=8000`.',
    requirements: [
      'Use tomllib.loads',
      'Missing tool.app uses defaults',
      'port coerced to int',
    ],
    starter: `import tomllib

DEFAULTS = {"host": "127.0.0.1", "port": 8000}

def load_app_config(data: bytes) -> dict[str, object]:
    # TODO
    raise NotImplementedError`,
    hints: ['tomllib.loads(data)', 'doc.get("tool", {}).get("app", {})', '{**DEFAULTS, **section}'],
    acceptance: ['Defaults apply', 'Overrides merge', 'port is int'],
    solutionApproach: 'Parse TOML, drill into tool.app, merge over DEFAULTS, coerce port.',
    concepts: [
      { term: 'tomllib', detail: 'stdlib TOML parser in Python 3.11+.' },
      { term: 'shallow merge', detail: 'Defaults then user overrides for flat keys.' },
    ],
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
  },
  {
    slug: '17-unit-converter',
    title: 'Unit Converter',
    difficulty: 'easy',
    topics: ['functions', 'mapping'],
    goals: ['Build a small conversion API', 'Use dict dispatch'],
    description:
      'Implement `convert(value: float, from_unit: str, to_unit: str) -> float` for length units `m`, `cm`, `km` via meters as base.',
    requirements: [
      'Support m, cm, km',
      'Unknown unit raises ValueError',
      'Round not required; return float',
    ],
    starter: `TO_METERS = {"m": 1.0, "cm": 0.01, "km": 1000.0}

def convert(value: float, from_unit: str, to_unit: str) -> float:
    # TODO
    raise NotImplementedError`,
    hints: ['meters = value * TO_METERS[from]', 'return meters / TO_METERS[to]', 'normalize keys'],
    acceptance: ['km to m works', 'cm to km works', 'Bad unit raises'],
    solutionApproach: 'Convert to base meters, then divide into target unit.',
    concepts: [
      { term: 'canonical unit', detail: 'Convert through a single base to support N units.' },
      { term: 'dispatch table', detail: 'Dict mapping replaces long if chains.' },
    ],
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
  },
  {
    slug: '18-password-validator',
    title: 'Password Validator',
    difficulty: 'easy',
    topics: ['validation', 'strings'],
    goals: ['Encode password rules clearly', 'Return structured errors'],
    description:
      'Validate passwords: min length 8, at least one digit, one uppercase, one lowercase. Return `(ok: bool, errors: list[str])`.',
    requirements: [
      'Return all failed rules',
      'Empty password fails',
      'Do not mutate input',
    ],
    starter: `import re

def validate_password(password: str) -> tuple[bool, list[str]]:
    # TODO
    raise NotImplementedError`,
    hints: ['any(c.isdigit() for c in password)', 'collect messages in list', 'ok = not errors'],
    acceptance: ['Strong password passes', 'Weak lists errors', 'Multiple errors at once'],
    solutionApproach: 'Append rule messages; ok when errors empty.',
    concepts: [
      { term: 'validation result', detail: 'Return errors list instead of raising for UX forms.' },
      { term: 'character classes', detail: 'isupper/islower/isdigit are clearer than regex alone.' },
    ],
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
  },
  {
    slug: '19-text-search',
    title: 'Grep Lite',
    difficulty: 'easy',
    topics: ['files', 'search'],
    goals: ['Search lines in a file', 'Return line numbers'],
    description:
      'Implement `find_matches(path: Path, needle: str) -> list[tuple[int, str]]` returning (line_no, line_text) for case-sensitive substring matches.',
    requirements: [
      'Line numbers start at 1',
      'Case sensitive',
      'Empty needle matches every line',
    ],
    starter: `from pathlib import Path

def find_matches(path: Path, needle: str) -> list[tuple[int, str]]:
    # TODO
    raise NotImplementedError`,
    hints: ['enumerate(path.read_text().splitlines(), start=1)', 'if needle in line', 'strip optional'],
    acceptance: ['Correct line numbers', 'Multiple matches returned', 'Missing file raises'],
    solutionApproach: 'Stream lines with enumerate; collect hits.',
    concepts: [
      { term: 'enumerate start', detail: 'start=1 aligns with human line numbers.' },
      { term: 'substring search', detail: 'in operator is fine for grep-lite.' },
    ],
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
  },
  {
    slug: '20-api-client',
    title: 'REST API Client',
    difficulty: 'easy',
    topics: ['requests', 'api-design'],
    goals: ['Wrap HTTP in a small class', 'Reuse session'],
    description:
      'Build `ApiClient` with base URL and `get_user(user_id: int) -> dict` using a persistent `requests.Session`.',
    requirements: [
      'Session created in __init__',
      'GET /users/{id} relative to base',
      'raise_for_status on errors',
    ],
    starter: `import requests

class ApiClient:
    def __init__(self, base_url: str) -> None:
        # TODO
        ...

    def get_user(self, user_id: int) -> dict:
        ...`,
    hints: ['self._session = requests.Session()', 'url = f"{base}/users/{id}"', 'return response.json()'],
    acceptance: ['GET correct path', 'Session reused', 'HTTP errors propagate'],
    solutionApproach: 'Session per client; compose URLs; parse JSON responses.',
    concepts: [
      { term: 'Session', detail: 'Reuses TCP connections and default headers.' },
      { term: 'thin client', detail: 'One method per resource keeps API obvious.' },
    ],
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
  },
];

const medium = [
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
];

const hard = [
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
];

const veryHard = [
  {
    slug: '01-mcp-server',
    title: 'MCP Server',
    difficulty: 'very-hard',
    topics: ['mcp', 'stdio'],
    goals: ['Expose tools over MCP', 'Handle JSON-RPC lifecycle'],
    description:
      'Skeleton MCP stdio server registering tool `echo(text: str) -> str` using `mcp.server` SDK patterns with list_tools and call_tool handlers.',
    requirements: ['stdio transport', 'Tool schema in list_tools', 'echo returns input text'],
    starter: `from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp.types import Tool, TextContent

server = Server("demo")

# TODO register tools and run stdio_server`,
    hints: ['@server.list_tools()', '@server.call_tool()', 'return [TextContent(type="text", text=text)]'],
    acceptance: ['Lists echo tool', 'call_tool echo works', 'Runs on stdio transport'],
    solutionApproach:
      'Register handlers listing tool metadata and dispatching call_tool to Python functions.',
    concepts: [{ term: 'MCP', detail: 'Model Context Protocol connects LLM clients to tools.' }, { term: 'stdio transport', detail: 'Simple subprocess IPC for local servers.' }],
    solution: `from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp.types import Tool, TextContent

server = Server("demo")

@server.list_tools()
async def list_tools() -> list[Tool]:
    return [
        Tool(
            name="echo",
            description="Echo text back",
            inputSchema={
                "type": "object",
                "properties": {"text": {"type": "string"}},
                "required": ["text"],
            },
        )
    ]

@server.call_tool()
async def call_tool(name: str, arguments: dict) -> list[TextContent]:
    if name != "echo":
        raise ValueError("unknown tool")
    text = str(arguments.get("text", ""))
    return [TextContent(type="text", text=text)]

async def main() -> None:
    async with stdio_server() as (read, write):
        await server.run(read, write, server.create_initialization_options())`,
    walkthrough:
      'list_tools advertises echo schema; call_tool validates name and returns TextContent; stdio_server hosts IPC.',
    mistakes: ['Missing inputSchema', 'Blocking sync IO in handlers'],
    stretch: ['Resource providers', 'Auth for remote MCP'],
  },
  {
    slug: '02-production-rag',
    title: 'Production RAG Pipeline',
    difficulty: 'very-hard',
    topics: ['rag', 'production'],
    goals: ['End-to-end ingest and query', 'Observability hooks'],
    description:
      'Build `RagPipeline` with ingest(path), embed via provider callable, store in vector backend, and query(question, k) returning cited chunks.',
    requirements: ['Pluggable embedder', 'Citation includes doc_id', 'Empty store returns []'],
    starter: `from collections.abc import Callable
from pathlib import Path

class RagPipeline:
    def __init__(self, embed: Callable[[list[str]], list[list[float]]], store) -> None:
        self._embed = embed
        self._store = store

    def ingest(self, path: Path) -> int:
        # TODO
        raise NotImplementedError

    def query(self, question: str, k: int = 4) -> list[dict[str, object]]:
        ...`,
    hints: ['text = path.read_text()', 'chunks = chunk_text(text)', 'store.search(embed([question])[0], k)'],
    acceptance: ['Ingest returns chunk count', 'Query returns citations', 'Embedder invoked'],
    solutionApproach:
      'Ingest reads/chunks/embeds/adds; query embeds question and searches with metadata.',
    concepts: [{ term: 'RAG', detail: 'Retrieval augments generation with grounded context.' }, { term: 'citations', detail: 'Users verify answers against source doc ids.' }],
    solution: `from collections.abc import Callable
from pathlib import Path

def chunk_text(text: str, size: int = 400, overlap: int = 40) -> list[str]:
    chunks: list[str] = []
    start = 0
    while start < len(text):
        chunks.append(text[start : start + size])
        start += size - overlap
    return chunks

class RagPipeline:
    def __init__(self, embed: Callable[[list[str]], list[list[float]]], store) -> None:
        self._embed = embed
        self._store = store

    def ingest(self, path: Path) -> int:
        text = path.read_text(encoding="utf-8")
        chunks = chunk_text(text)
        vectors = self._embed(chunks)
        self._store.add(path.stem, chunks, vectors)
        return len(chunks)

    def query(self, question: str, k: int = 4) -> list[dict[str, object]]:
        q_vec = self._embed([question])[0]
        hits = self._store.search(q_vec, k=k)
        return [{"doc_id": h.doc_id, "chunk": h.chunk, "score": getattr(h, "score", None)} for h in hits]`,
    walkthrough:
      'Ingest chunks file and stores embeddings; query embeds question, searches, returns cited chunk dicts.',
    mistakes: ['No overlap on chunks', 'Query without embedding question'],
    stretch: ['Hybrid BM25 + vector', 'Reranker stage'],
  },
  {
    slug: '03-event-sourced-domain',
    title: 'Event-Sourced Domain',
    difficulty: 'very-hard',
    topics: ['event-sourcing', 'ddd'],
    goals: ['Append domain events', 'Rebuild aggregate state'],
    description:
      'Model `BankAccount` aggregate with events `AccountOpened`, `MoneyDeposited`, `MoneyWithdrawn`; rebuild balance from event log.',
    requirements: ['Immutable event dataclasses', 'apply(event) mutates state', 'withdraw cannot overdraw'],
    starter: `from dataclasses import dataclass

@dataclass(frozen=True)
class AccountOpened:
    account_id: str

@dataclass(frozen=True)
class MoneyDeposited:
    amount: int

@dataclass(frozen=True)
class MoneyWithdrawn:
    amount: int

class BankAccount:
    def __init__(self, account_id: str) -> None:
        self.account_id = account_id
        self.balance = 0
        self._events: list[object] = []

    def deposit(self, amount: int) -> None:
        # TODO emit event
        ...

    def withdraw(self, amount: int) -> None:
        ...`,
    hints: ['self._events.append(MoneyDeposited(amount))', 'self.apply(event) updates balance', 'if amount > self.balance: raise'],
    acceptance: ['Events recorded', 'Balance correct after replay', 'Overdraft blocked'],
    solutionApproach:
      'Commands append events; apply updates state; replay reproduces aggregate.',
    concepts: [{ term: 'event sourcing', detail: 'State is derived from immutable event history.' }, { term: 'aggregate', detail: 'Consistency boundary enforcing business rules.' }],
    solution: `from dataclasses import dataclass

@dataclass(frozen=True)
class AccountOpened:
    account_id: str

@dataclass(frozen=True)
class MoneyDeposited:
    amount: int

@dataclass(frozen=True)
class MoneyWithdrawn:
    amount: int

class BankAccount:
    def __init__(self, account_id: str) -> None:
        self.account_id = account_id
        self.balance = 0
        self._events: list[object] = [AccountOpened(account_id)]

    def apply(self, event: object) -> None:
        if isinstance(event, MoneyDeposited):
            self.balance += event.amount
        elif isinstance(event, MoneyWithdrawn):
            self.balance -= event.amount

    def deposit(self, amount: int) -> None:
        if amount <= 0:
            raise ValueError("amount must be positive")
        event = MoneyDeposited(amount)
        self._events.append(event)
        self.apply(event)

    def withdraw(self, amount: int) -> None:
        if amount <= 0:
            raise ValueError("amount must be positive")
        if amount > self.balance:
            raise ValueError("insufficient funds")
        event = MoneyWithdrawn(amount)
        self._events.append(event)
        self.apply(event)

    @classmethod
    def replay(cls, events: list[object]) -> "BankAccount":
        opened = events[0]
        if not isinstance(opened, AccountOpened):
            raise ValueError("first event must be AccountOpened")
        acc = cls(opened.account_id)
        acc._events = []
        acc.balance = 0
        for event in events:
            acc._events.append(event)
            acc.apply(event)
        return acc`,
    walkthrough:
      'Commands validate, append events, apply to balance; replay rebuilds from scratch from event list.',
    mistakes: ['Mutating events after append', 'Updating balance without event'],
    stretch: ['Event store persistence', 'Snapshots for long streams'],
  },
  {
    slug: '04-distributed-task-scheduler',
    title: 'Distributed Task Scheduler',
    difficulty: 'very-hard',
    topics: ['scheduling', 'redis'],
    goals: ['Schedule delayed jobs', 'Ensure at-least-once execution'],
    description:
      'Implement Redis-backed scheduler storing `(run_at, task_id, payload)` sorted set; worker polls due tasks and executes handlers idempotently.',
    requirements: ['schedule(run_at, task_id, payload)', 'Worker fetches due items', 'Idempotent task_id handling'],
    starter: `import json
import time
from dataclasses import dataclass

@dataclass
class ScheduledTask:
    task_id: str
    run_at: float
    payload: dict[str, object]

class RedisScheduler:
    def __init__(self, redis_client, queue_key: str = "sched:tasks") -> None:
        self._redis = redis_client
        self._key = queue_key
        self._seen: set[str] = set()

    def schedule(self, task: ScheduledTask) -> None:
        # TODO zadd with score run_at
        ...

    def poll_due(self, now: float | None = None) -> list[ScheduledTask]:
        ...`,
    hints: ['self._redis.zrangebyscore(key, 0, now)', 'json.dumps payload as member', 'skip if task_id in self._seen'],
    acceptance: ['Future tasks not polled', 'Due tasks returned', 'Duplicate task_id skipped'],
    solutionApproach:
      'Sorted set scores are timestamps; poll range; track processed ids for idempotency.',
    concepts: [{ term: 'sorted set', detail: 'Redis ZSET orders tasks by run_at score.' }, { term: 'idempotency', detail: 'Safe retries when workers duplicate delivery.' }],
    solution: `import json
import time
from dataclasses import dataclass

@dataclass
class ScheduledTask:
    task_id: str
    run_at: float
    payload: dict[str, object]

class RedisScheduler:
    def __init__(self, redis_client, queue_key: str = "sched:tasks") -> None:
        self._redis = redis_client
        self._key = queue_key
        self._seen: set[str] = set()

    def schedule(self, task: ScheduledTask) -> None:
        member = json.dumps({"task_id": task.task_id, "payload": task.payload})
        self._redis.zadd(self._key, {member: task.run_at})

    def poll_due(self, now: float | None = None) -> list[ScheduledTask]:
        now = now or time.time()
        raw = self._redis.zrangebyscore(self._key, 0, now)
        due: list[ScheduledTask] = []
        for item in raw:
            data = json.loads(item)
            task_id = data["task_id"]
            if task_id in self._seen:
                continue
            self._seen.add(task_id)
            due.append(ScheduledTask(task_id=task_id, run_at=now, payload=data["payload"]))
            self._redis.zrem(self._key, item)
        return due`,
    walkthrough:
      'schedule zadds JSON member with run_at score; poll_due reads range, dedupes task_id, removes processed entries.',
    mistakes: ['Polling without removing tasks', 'No idempotency on retries'],
    stretch: ['Leader election for workers', 'Dead letter queue'],
  },
  {
    slug: '05-llm-agent-memory',
    title: 'LLM Agent Memory',
    difficulty: 'very-hard',
    topics: ['agents', 'memory'],
    goals: ['Persist conversation turns', 'Retrieve relevant memory'],
    description:
      'Implement `AgentMemory` storing messages, summarizing when token budget exceeded, and retrieving last N plus summary for prompt context.',
    requirements: ['add(role, content)', 'summarize triggers over budget', 'context_for_query returns str'],
    starter: `from dataclasses import dataclass

@dataclass
class Message:
    role: str
    content: str

class AgentMemory:
    def __init__(self, token_budget: int = 2000) -> None:
        self.token_budget = token_budget
        self._messages: list[Message] = []
        self._summary: str = ""

    def add(self, role: str, content: str) -> None:
        # TODO
        ...

    def context_for_query(self, query: str, last_n: int = 6) -> str:
        ...`,
    hints: ['estimate tokens as len(content)//4', 'if over budget: self._summary = summarize', 'return summary + recent messages'],
    acceptance: ['Messages stored', 'Summary created when over budget', 'Context includes recent turns'],
    solutionApproach:
      'Track pseudo tokens; compress old messages to summary; build prompt context string.',
    concepts: [{ term: 'context window', detail: 'LLMs limit input size; memory must compress history.' }, { term: 'summarization', detail: 'Rolling summary preserves long-term intent cheaply.' }],
    solution: `from dataclasses import dataclass

@dataclass
class Message:
    role: str
    content: str

class AgentMemory:
    def __init__(self, token_budget: int = 2000) -> None:
        self.token_budget = token_budget
        self._messages: list[Message] = []
        self._summary: str = ""

    def _estimate_tokens(self) -> int:
        total = len(self._summary) // 4
        total += sum(len(m.content) // 4 for m in self._messages)
        return total

    def _summarize_old(self) -> None:
        if len(self._messages) <= 2:
            return
        old = self._messages[:-2]
        joined = " | ".join(f"{m.role}: {m.content}" for m in old)
        self._summary = (self._summary + " " + joined).strip()[:1000]
        self._messages = self._messages[-2:]

    def add(self, role: str, content: str) -> None:
        self._messages.append(Message(role=role, content=content))
        if self._estimate_tokens() > self.token_budget:
            self._summarize_old()

    def context_for_query(self, query: str, last_n: int = 6) -> str:
        recent = self._messages[-last_n:]
        parts = []
        if self._summary:
            parts.append(f"Summary: {self._summary}")
        parts.extend(f"{m.role}: {m.content}" for m in recent)
        parts.append(f"User query: {query}")
        return "\\n".join(parts)`,
    walkthrough:
      'add tracks messages; when pseudo tokens exceed budget, fold older into summary; context_for_query builds prompt string.',
    mistakes: ['Unbounded message list', 'Dropping summary on next add'],
    stretch: ['Vector memory retrieval', 'LLM-based summarizer'],
  },
];

const TOPIC_LEARN_URLS = {
  "control-flow": "https://docs.python.org/3/tutorial/controlflow.html",
  "loops": "https://docs.python.org/3/tutorial/controlflow.html#for-statements",
  "strings": "https://docs.python.org/3/library/stdtypes.html#text-sequence-type-str",
  "parsing": "https://docs.python.org/3/library/stdtypes.html#str.split",
  "files": "https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files",
  "io": "https://docs.python.org/3/library/io.html",
  "json": "https://docs.python.org/3/library/json.html",
  "argparse": "https://docs.python.org/3/library/argparse.html",
  "cli": "https://docs.python.org/3/library/argparse.html",
  "classes": "https://docs.python.org/3/tutorial/classes.html",
  "encapsulation": "https://docs.python.org/3/tutorial/classes.html#private-variables",
  "lists": "https://docs.python.org/3/tutorial/datastructures.html",
  "dicts": "https://docs.python.org/3/tutorial/datastructures.html#dictionaries",
  "comprehensions": "https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions",
  "pathlib": "https://docs.python.org/3/library/pathlib.html",
  "filesystem": "https://docs.python.org/3/library/pathlib.html",
  "os.environ": "https://docs.python.org/3/library/os.html#os.environ",
  "config": "https://docs.python.org/3/library/configparser.html",
  "pytest": "https://docs.pytest.org/en/stable/",
  "testing": "https://docs.python.org/3/library/unittest.html",
  "csv": "https://docs.python.org/3/library/csv.html",
  "data": "https://docs.python.org/3/library/csv.html",
  "requests": "https://requests.readthedocs.io/en/latest/",
  "http": "https://docs.python.org/3/library/http.client.html",
  "dataclasses": "https://docs.python.org/3/library/dataclasses.html",
  "enum": "https://docs.python.org/3/library/enum.html",
  "logging": "https://docs.python.org/3/library/logging.html",
  "tomllib": "https://docs.python.org/3/library/tomllib.html",
  "functions": "https://docs.python.org/3/tutorial/controlflow.html#defining-functions",
  "mapping": "https://docs.python.org/3/library/stdtypes.html#mapping-types-dict",
  "validation": "https://docs.python.org/3/library/exceptions.html",
  "search": "https://docs.python.org/3/library/re.html",
  "api-design": "https://requests.readthedocs.io/en/latest/user/advanced/",
  "decorators": "https://docs.python.org/3/glossary.html#term-decorator",
  "functools": "https://docs.python.org/3/library/functools.html",
  "contextlib": "https://docs.python.org/3/library/contextlib.html",
  "context-managers": "https://docs.python.org/3/reference/datamodel.html#context-managers",
  "generators": "https://docs.python.org/3/howto/functional.html#generators",
  "asyncio": "https://docs.python.org/3/library/asyncio.html",
  "fastapi": "https://fastapi.tiangolo.com/",
  "pydantic": "https://docs.pydantic.dev/latest/",
  "sqlalchemy": "https://docs.sqlalchemy.org/en/20/",
  "flask": "https://flask.palletsprojects.com/",
  "aiohttp": "https://docs.aiohttp.org/en/stable/",
  "typer": "https://typer.tiangolo.com/",
  "pydantic-settings": "https://docs.pydantic.dev/latest/concepts/pydantic_settings/",
  "repository-pattern": "https://docs.sqlalchemy.org/en/20/orm/quickstart.html",
  "webhooks": "https://fastapi.tiangolo.com/advanced/events/",
  "pagination": "https://fastapi.tiangolo.com/tutorial/query-params/",
  "upload": "https://fastapi.tiangolo.com/tutorial/request-files/",
  "background-tasks": "https://fastapi.tiangolo.com/tutorial/background-tasks/",
  "email": "https://docs.python.org/3/library/smtplib.html",
  "rate-limiting": "https://slowapi.readthedocs.io/en/latest/",
  "schema": "https://docs.pydantic.dev/latest/concepts/models/",
  "coverage": "https://coverage.readthedocs.io/en/latest/",
  "docker": "https://docs.docker.com/get-started/",
  "docker-compose": "https://docs.docker.com/compose/",
  "dependency-injection": "https://fastapi.tiangolo.com/tutorial/dependencies/",
  "jwt": "https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/",
  "auth": "https://fastapi.tiangolo.com/tutorial/security/",
  "asyncpg": "https://magicstack.github.io/asyncpg/current/",
  "celery": "https://docs.celeryq.dev/en/stable/",
  "rag": "https://python.langchain.com/docs/concepts/rag/",
  "openai": "https://platform.openai.com/docs/guides/structured-outputs",
  "agents": "https://platform.openai.com/docs/guides/agents",
  "profiling": "https://docs.python.org/3/library/profile.html",
  "dockerfile": "https://docs.docker.com/build/building/best-practices/",
  "mcp": "https://modelcontextprotocol.io/",
  "event-sourcing": "https://martinfowler.com/eaaDev/EventSourcing.html",
  "scheduler": "https://docs.celeryq.dev/en/stable/userguide/periodic-tasks.html",
  "memory": "https://python.langchain.com/docs/concepts/memory/",
};

function acceptanceDetail(c, summary) {
  const req = c.requirements.find((r) =>
    r.toLowerCase().includes(summary.toLowerCase().split(' ')[0] ?? ''),
  );
  const topicHints = {
    pytest: 'Run pytest in the project folder and confirm all parametrized cases pass.',
    fastapi: 'Start uvicorn, open /docs or curl the endpoint, and verify status code plus JSON shape.',
    flask: 'Run the dev server and hit the blueprint route with curl or httpie.',
    docker: 'Run docker compose config or docker build to validate the file parses and builds.',
    celery: 'Start a worker, enqueue a task, and confirm the result backend stores the outcome.',
    openai: 'Mock the API client in tests or use a test key; assert the parsed model fields.',
    asyncio: 'Run with asyncio.run() or pytest-asyncio and confirm concurrent tasks complete.',
    sqlalchemy: 'Use an in-memory SQLite engine in tests to verify ORM queries without Postgres.',
    aiohttp: 'Use pytest-aiohttp or asyncio.run with a mock server to avoid flaky network calls.',
    mcp: 'Connect with an MCP inspector or client SDK and list tools/resources.',
  };
  let detail = req
    ? `${summary}: ${req}. `
    : `${summary}. `;
  for (const t of c.topics) {
    if (topicHints[t]) {
      detail += topicHints[t];
      return detail;
    }
  }
  detail += `Write a small script or pytest test that demonstrates this behavior matches ${c.title}.`;
  return detail;
}

const RESOURCE_TITLES = {
  "control-flow": "Control flow – Python tutorial",
  "loops": "for statements – Python tutorial",
  "strings": "str – Python docs",
  "pathlib": "pathlib – Python docs",
  "argparse": "argparse – Python docs",
  "dataclasses": "dataclasses – Python docs",
  "pytest": "pytest documentation",
  "requests": "Requests documentation",
  "fastapi": "FastAPI documentation",
  "pydantic": "Pydantic documentation",
  "sqlalchemy": "SQLAlchemy 2.0 docs",
  "flask": "Flask documentation",
  "celery": "Celery documentation",
  "docker": "Docker Get Started",
  "mcp": "Model Context Protocol",
  "openai": "OpenAI structured outputs",
};

function defaultResources(c) {
  const seen = new Set();
  const out = [];
  for (const topic of c.topics) {
    const url = TOPIC_LEARN_URLS[topic];
    if (!url || seen.has(url)) continue;
    seen.add(url);
    const title = RESOURCE_TITLES[topic] ?? `${topic} – reference`;
    out.push({ title, url });
    if (out.length >= 4) break;
  }
  if (out.length < 2) {
    out.push({ title: 'Python Tutorial', url: 'https://docs.python.org/3/tutorial/' });
  }
  if (out.length < 2) {
    out.push({ title: 'Python standard library', url: 'https://docs.python.org/3/library/' });
  }
  return out.slice(0, 4);
}

function buildAcceptanceFile(challenges) {
  const entries = challenges
    .map((c) => {
      const key = `${c.difficulty}/${c.slug}`;
      const summaries = [...c.acceptance];
      while (summaries.length < 3) summaries.push(summaries[0] ?? 'Behavior matches requirements');
      const items = summaries.slice(0, 3).map((summary) => {
        const detail = acceptanceDetail(c, summary);
        return `    a(\n      '${sq(summary)}',\n      '${sq(detail)}'\n    )`;
      });
      return `  '${key}': [\n${items.join(',\n')},\n  ]`;
    })
    .join(',\n');
  return `/**
 * Beginner-friendly acceptance criteria per Python challenge.
 * Keys: {difficulty}/{slug}
 */

const a = (summary, detail) => ({ summary, detail });

/** @type {Record<string, { summary: string; detail: string }[]>} */
const CHALLENGE_ACCEPTANCE = {
${entries}
};

export function getAcceptanceCriteria(difficulty, slug) {
  return CHALLENGE_ACCEPTANCE[\`\${difficulty}/\${slug}\`];
}
`;
}

function buildResourcesFile(challenges) {
  const entries = challenges
    .map((c) => {
      const key = `${c.difficulty}/${c.slug}`;
      const links = defaultResources(c)
        .map((r) => `    { title: '${sq(r.title)}', url: '${sq(r.url)}' }`)
        .join(',\n');
      return `  '${key}': [\n${links},\n  ]`;
    })
    .join(',\n');
  return `/**
 * Curated docs per Python challenge (2-4 links). Keys: {difficulty}/{slug}
 */

/** @type {Record<string, { title: string; url: string }[]>} */
const CHALLENGE_RESOURCES = {
${entries}
};

export function getChallengeResources(difficulty, slug, topics) {
  const key = \`\${difficulty}/\${slug}\`;
  if (CHALLENGE_RESOURCES[key]) return CHALLENGE_RESOURCES[key];
  const seen = new Set();
  const fromTopics = [];
  for (const topic of topics) {
    const url = TOPIC_LEARN_URLS[topic];
    if (!url || seen.has(url)) continue;
    seen.add(url);
    fromTopics.push({ title: \`\${topic} – Python docs\`, url });
    if (fromTopics.length >= 3) break;
  }
  if (fromTopics.length) return fromTopics;
  return [
    { title: 'Python Tutorial', url: 'https://docs.python.org/3/tutorial/' },
    { title: 'Python docs', url: 'https://docs.python.org/3/' },
  ];
}
`;
}

const allChallenges = [...easy, ...medium, ...hard, ...veryHard];

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'easy.mjs'), writeDifficultyFile('easyChallenges', easy));
fs.writeFileSync(path.join(outDir, 'medium.mjs'), writeDifficultyFile('mediumChallenges', medium));
fs.writeFileSync(path.join(outDir, 'hard.mjs'), writeDifficultyFile('hardChallenges', hard));
fs.writeFileSync(path.join(outDir, 'very-hard.mjs'), writeDifficultyFile('veryHardChallenges', veryHard));
fs.writeFileSync(path.join(outDir, 'acceptance.mjs'), buildAcceptanceFile(allChallenges));
fs.writeFileSync(path.join(outDir, 'resources.mjs'), buildResourcesFile(allChallenges));

console.log(
  `Python challenges: easy=${easy.length} medium=${medium.length} hard=${hard.length} very-hard=${veryHard.length} total=${allChallenges.length}`
);
console.log(`Wrote challenge source files to ${outDir}`);
