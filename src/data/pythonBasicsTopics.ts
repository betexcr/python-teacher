export type PythonBasicsTopic = {
  title: string;
  explanation: readonly string[];
  code: string;
};

export const pythonBasicsTopics: readonly PythonBasicsTopic[] = [
  {
    title: 'Running Python',
    explanation: [
      'Python is an interpreted language — you write `.py` files and run them with the `python` command (or `python3` on some systems).',
      'The REPL (Read-Eval-Print Loop) lets you try one line at a time: open a terminal, type `python`, then expressions like `2 + 2`.',
      'Use `print()` to show output. Most challenges and scripts start with a small program in a file, then `python main.py`.',
    ],
    code: `# save as hello.py, then: python hello.py
print("Hello, Python!")

# REPL one-liners
2 + 2          # → 4
print(3 * 7)   # → 21`,
  },
  {
    title: 'Variables',
    explanation: [
      'A variable is a name that points to a value — like labeling a box `count` and putting `0` inside.',
      'Python has no `const` keyword. Convention: `UPPER_SNAKE` for constants you do not intend to change; otherwise use lowercase `snake_case` names.',
      'Assignment uses `=` — `name = "Ada"`. Reassigning replaces what the name points to: `name = "Alan"`.',
    ],
    code: `count = 0
name = "Ada"
name = "Alan"       # reassign: same name, new value

MAX_RETRIES = 3     # constant by convention`,
  },
  {
    title: 'Types',
    explanation: [
      'Every value has a type. Common built-ins: `int`, `float`, `str`, `bool`, `list`, `dict`, `set`, and `NoneType` (the type of `None`).',
      'Python is dynamically typed — you do not declare types unless you add optional type hints later.',
      'Use `type(value)` while learning, or `isinstance(value, str)` when you need a reliable check.',
    ],
    code: `type(42)              # <class 'int'>
type(3.14)            # <class 'float'>
type("hi")            # <class 'str'>
type(True)            # <class 'bool'>
type([1, 2])          # <class 'list'>

isinstance("hi", str) # True`,
  },
  {
    title: 'Numbers, strings & f-strings',
    explanation: [
      'Numbers: `int` for whole numbers, `float` for decimals. Operators: `+`, `-`, `*`, `/` (always float division), `//` floor division, `%` remainder, `**` power.',
      'Strings use single or double quotes. Multiline strings use triple quotes `""" ... """`.',
      'F-strings (formatted string literals) start with `f"` and embed expressions: `f"Hello, {name}!"`.',
    ],
    code: `price = 19.99
qty = 3
total = price * qty

name = "Ada"
greeting = f"Hello, {name}!"   # f-string
path = f"/users/{name}/profile"

"py" * 3                       # 'pyppy'`,
  },
  {
    title: 'Booleans & truthiness',
    explanation: [
      'Booleans are `True` and `False` (capitalized — not `true`/`false` like JavaScript).',
      'Comparisons return booleans: `==`, `!=`, `<`, `>`, `<=`, `>=`. Use `==` for equality; `is` only when checking identity (usually `None`).',
      'Truthy values: non-zero numbers, non-empty strings/collections. Falsy: `0`, `""`, `[]`, `{}`, `None`, `False`.',
    ],
    code: `score = 85
score >= 60          # True
name == "Ada"        # True

if name:             # truthy non-empty string
    print("has name")

if not items:        # falsy empty list
    print("empty")`,
  },
  {
    title: 'if / elif / else',
    explanation: [
      'Indentation (usually 4 spaces) defines blocks — no curly braces. Colons start blocks: `if condition:`',
      '`elif` adds more branches; `else` is the fallback. Only one branch runs.',
      'Combine conditions with `and`, `or`, `not`. Parentheses help readability for complex checks.',
    ],
    code: `if score >= 90:
    grade = "A"
elif score >= 60:
    grade = "Pass"
else:
    grade = "Fail"

if age >= 18 and has_id:
    admit()`,
  },
  {
    title: 'for loops',
    explanation: [
      '`for item in sequence:` loops over each element in a list, string, dict keys, or any iterable.',
      '`range(n)` produces 0 .. n-1. `range(start, stop, step)` controls the sequence — common for indexed work.',
      '`enumerate(items)` gives `(index, value)` pairs when you need both.',
    ],
    code: `for n in [10, 20, 30]:
    print(n)

for i in range(3):       # 0, 1, 2
    print(i)

for i, name in enumerate(["Ada", "Alan"]):
    print(i, name)`,
  },
  {
    title: 'while loops',
    explanation: [
      '`while condition:` repeats while the condition is true. Make sure something inside eventually makes it false.',
      'Use `break` to exit early, `continue` to skip to the next iteration.',
      'Prefer `for` when iterating a known sequence; `while` fits “until done” logic (reading input, polling).',
    ],
    code: `n = 0
while n < 3:
    print(n)
    n += 1

while True:
    cmd = input("> ")
    if cmd == "quit":
        break`,
  },
  {
    title: 'Lists & comprehensions',
    explanation: [
      'Lists are ordered, mutable sequences: `[1, 2, 3]`. Index from `0`; negative indexes count from the end (`items[-1]` is last).',
      'Useful methods: `.append()`, `.extend()`, `.pop()`, `len(items)`. Slicing: `items[1:4]`, `items[:3]`.',
      'List comprehensions build a new list in one line: `[x * 2 for x in nums if x > 0]`.',
    ],
    code: `nums = [10, 20, 30]
nums[0]              # 10
nums.append(40)

doubled = [n * 2 for n in nums]
evens = [n for n in nums if n % 2 == 0]

first, *rest = nums  # unpacking`,
  },
  {
    title: 'Dicts & sets',
    explanation: [
      'Dicts map keys to values: `{"name": "Ada", "score": 98}`. Access with `user["name"]` or `.get("name", default)`.',
      'Sets hold unique unordered items: `{1, 2, 3}`. Fast membership tests and deduplication.',
      'Loop dicts with `.items()` for key-value pairs. Dict comprehensions mirror list comprehensions.',
    ],
    code: `user = {"name": "Ada", "score": 98}
user["name"]
user.get("email", "")

tags = {"python", "tutorial", "python"}
unique_ids = {u["id"] for u in users}

for key, val in user.items():
    print(key, val)`,
  },
  {
    title: 'Functions',
    explanation: [
      'Define with `def name(params):` — indentation is the function body. `return` sends a value back (or `None` implicitly).',
      'Default parameters: `def greet(name="world"):`. Keyword args: `greet(name="Ada")`.',
      '`*args` collects extra positional args; `**kwargs` collects extra keyword args — common in decorators and wrappers.',
    ],
    code: `def add(a, b):
    return a + b

def greet(name="world"):
    return f"Hello, {name}!"

def log(msg, *args, **kwargs):
    print(msg, args, kwargs)

square = lambda n: n * n`,
  },
  {
    title: 'Modules & imports',
    explanation: [
      'A module is a `.py` file. A package is a folder with `__init__.py` (or namespace package).',
      '`import math` then `math.sqrt(9)`. `from pathlib import Path` imports one name. `import module as alias` shortens long names.',
      'The standard library is batteries-included — `json`, `pathlib`, `datetime`, `re`, and more ship with Python.',
    ],
    code: `import json
from pathlib import Path
import httpx as http

data = json.loads('{"ok": true}')
root = Path(".")
http.get("https://example.com")`,
  },
  {
    title: 'Virtual environments',
    explanation: [
      'A venv is an isolated Python environment with its own `pip` packages — avoids polluting system Python.',
      'Create: `python -m venv .venv`. Activate: `.venv\\Scripts\\activate` (Windows) or `source .venv/bin/activate` (macOS/Linux).',
      'Install deps with `pip install requests`, record them in `requirements.txt`, and add `.venv/` to `.gitignore`.',
    ],
    code: `# terminal
python -m venv .venv
.venv\\Scripts\\activate    # Windows
pip install pytest httpx
pip freeze > requirements.txt`,
  },
  {
    title: 'Files & pathlib',
    explanation: [
      'pathlib is the modern way to handle paths: `Path("data") / "users.json"` — works across operating systems.',
      'Read text: `path.read_text(encoding="utf-8")`. Write: `path.write_text(text)`. Check existence: `.exists()`, `.is_file()`.',
      'The `with open(...) as f:` pattern opens files and closes them automatically — even if an error occurs.',
    ],
    code: `from pathlib import Path

config = Path("config") / "app.toml"
if config.exists():
    text = config.read_text(encoding="utf-8")

with open("notes.txt", "w", encoding="utf-8") as f:
    f.write("hello\\n")`,
  },
  {
    title: 'Exceptions',
    explanation: [
      'When something goes wrong, Python raises an exception. Uncaught exceptions stop the program with a traceback.',
      'Handle errors with `try` / `except` / `else` / `finally`. Catch specific types: `except ValueError as e:`.',
      'Raise your own: `raise ValueError("invalid age")`. Use exceptions for exceptional cases, not normal control flow.',
    ],
    code: `try:
    age = int(input("Age? "))
except ValueError:
    print("Not a number")
else:
    print(f"Got {age}")
finally:
    print("Done")

def parse_id(raw: str) -> int:
    if not raw.isdigit():
        raise ValueError(f"bad id: {raw}")
    return int(raw)`,
  },
];

export const PYTHON_BASICS_TOPIC_COUNT = pythonBasicsTopics.length;

/** Optional depth — useful after core basics and easy challenges. */
export const pythonBasicsOptionalTopics: readonly PythonBasicsTopic[] = [
  {
    title: 'Classes (intro)',
    explanation: [
      'A class defines a type with data (attributes) and behavior (methods). `__init__` initializes new instances; `self` refers to the current instance.',
      'Dunder methods (double underscores) hook into Python protocols — `__str__` for printing, `__len__` for `len(obj)`.',
      'Prefer functions and dataclasses for simple data; reach for classes when you need stateful objects or custom behavior.',
    ],
    code: `class Counter:
    def __init__(self, start=0):
        self.count = start

    def increment(self):
        self.count += 1
        return self.count

    def __str__(self):
        return f"Counter({self.count})"

c = Counter()
c.increment()`,
  },
  {
    title: 'Type hints (deep dive)',
    explanation: [
      'Type hints document expected types: `def greet(name: str) -> str:`. They are checked by tools like mypy and editors — not enforced at runtime by default.',
      'Use `list[int]`, `dict[str, int]`, `Optional[str]` (or `str | None` in Python 3.10+), and Protocol for structural typing.',
      'Dataclasses (`@dataclass`) auto-generate `__init__`, `__repr__`, and comparisons for data-focused classes.',
    ],
    code: `from dataclasses import dataclass
from typing import Protocol

@dataclass
class User:
    id: str
    name: str

class SupportsClose(Protocol):
    def close(self) -> None: ...

def first(items: list[int]) -> int | None:
    return items[0] if items else None`,
  },
];
