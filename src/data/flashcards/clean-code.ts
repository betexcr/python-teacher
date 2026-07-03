import type { FlashcardDeck } from './types';

export const cleanCodeDeck: FlashcardDeck = {
  "id": "clean-code",
  "slug": "clean-code",
  "title": "Clean Code & Patterns",
  "cards": [
    {
      "question": "PEP 8 essentials?",
      "explanation": "4 spaces, snake_case functions/vars, PascalCase classes, max line length often 88 (black). Imports grouped stdlib/third/p local."
    },
    {
      "question": "EAFP vs LBYL?",
      "explanation": "Easier to Ask Forgiveness than Permission: try/except. Look Before You Leap: explicit checks. Pythonic code often prefers EAFP for race-free file/Key cases.\n\n```python\ntry:\n    value = mapping[key]\nexcept KeyError:\n    value = default\n```"
    },
    {
      "question": "Single Responsibility Principle?",
      "explanation": "One reason to change per module/class/function. Split god modules into focused units with clear names."
    },
    {
      "question": "Dependency inversion in Python?",
      "explanation": "Depend on abstractions (Protocol/ABC), inject implementations—enables testing and swapping backends."
    },
    {
      "question": "Repository pattern?",
      "explanation": "Encapsulate data access behind interface; domain code does not import SQL directly.\n\n```python\nclass UserRepo(Protocol):\n    def get(self, id: str) -> User: ...\n```"
    },
    {
      "question": "Factory pattern?",
      "explanation": "Centralize object construction—create_from_config(), plugin registries for strategies."
    },
    {
      "question": "Strategy pattern?",
      "explanation": "Pluggable algorithms via callables or classes sharing Protocol—avoid giant if/elif chains.\n\n```python\nSTRATEGIES = {\"csv\": parse_csv, \"json\": parse_json}\n```"
    },
    {
      "question": "Guard clauses?",
      "explanation": "Early return on invalid input reduces nesting—keep happy path last at low indentation.\n\n```python\ndef process(data):\n    if not data:\n        return None\n    if not data.valid:\n        raise ValueError(\"invalid\")\n    ...\n```"
    },
    {
      "question": "Explicit is better than implicit?",
      "explanation": "Zen of Python: clear names, avoid magic globals, document non-obvious behavior. __all__ and public API boundaries."
    },
    {
      "question": "Exception hierarchy?",
      "explanation": "Catch specific exceptions. Define domain errors subclassing Exception. Do not bare except—log and re-raise or handle deliberately.\n\n```python\nclass AppError(Exception): ...\nclass NotFoundError(AppError): ...\n```"
    },
    {
      "question": "Context managers for resources?",
      "explanation": "Always release files, locks, connections— with statement or @contextmanager. Never rely on __del__."
    },
    {
      "question": "Avoid mutable default args?",
      "explanation": "Classic bug—use None sentinel and create fresh container inside function."
    },
    {
      "question": "Package layout src/ layout?",
      "explanation": "src/myproject/ prevents accidental imports from cwd. pyproject.toml declares package; tests import installed package."
    },
    {
      "question": "Logging over print in libraries?",
      "explanation": "Libraries log; applications configure handlers. Lets consumers control verbosity."
    },
    {
      "question": "Code review checklist for Python?",
      "explanation": "Types, tests, edge cases, security (injection, secrets), performance on hot paths, docs for public APIs."
    }
  ]
};
