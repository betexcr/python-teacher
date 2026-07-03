import type { FlashcardDeck } from './types';

export const typingDeck: FlashcardDeck = {
  "id": "typing",
  "slug": "typing",
  "title": "Type Hints & Typing",
  "cards": [
    {
      "question": "Why add type hints in Python?",
      "explanation": "Documentation, static analysis (mypy/pyright), better IDE support. Runtime ignores annotations unless using typing.get_type_hints or frameworks like FastAPI/Pydantic."
    },
    {
      "question": "list vs List vs list[str]?",
      "explanation": "Python 3.9+: use built-in generics list[str], dict[str, int]. Legacy code uses typing.List, Dict from typing module.\n\n```python\ndef names(users: list[dict[str, str]]) -> list[str]:\n    return [u[\"name\"] for u in users]\n```"
    },
    {
      "question": "Optional and union types?",
      "explanation": "Optional[T] means T | None. Python 3.10+ uses X | Y union syntax instead of Union[X, Y].\n\n```python\ndef find_user(id: str) -> User | None:\n    ...\n```"
    },
    {
      "question": "What is TypedDict?",
      "explanation": "Typed structure for dicts with known keys—great for JSON payloads before Pydantic models.\n\n```python\nclass UserDict(TypedDict):\n    id: str\n    email: str\n```"
    },
    {
      "question": "Literal and Final?",
      "explanation": "Literal restricts to specific values. Final marks names not to be rebound; Final class prevents subclassing.\n\n```python\nMode = Literal[\"r\", \"w\"]\nMAX_RETRIES: Final = 3\n```"
    },
    {
      "question": "TypeVar and generics?",
      "explanation": "TypeVar declares generic type parameters for reusable typed functions/classes.\n\n```python\nT = TypeVar(\"T\")\n\ndef first(items: list[T]) -> T:\n    return items[0]\n```"
    },
    {
      "question": "Protocol vs ABC?",
      "explanation": "Protocol: structural (duck typing). ABC: nominal inheritance required. Protocols fit third-party types you cannot subclass."
    },
    {
      "question": "What is cast()?",
      "explanation": "typing.cast tells the type checker to treat a value as a type—no runtime conversion. Use sparingly when checker cannot narrow.\n\n```python\nfrom typing import cast\n\nvalue = cast(str, maybe_str)\n```"
    },
    {
      "question": "Type narrowing patterns?",
      "explanation": "isinstance, is None checks, match/case, assert for checker. TypeGuard (3.13+) for custom narrowing functions.\n\n```python\ndef process(value: str | bytes) -> None:\n    if isinstance(value, str):\n        ...  # narrowed to str\n```"
    },
    {
      "question": "ParamSpec and Callable?",
      "explanation": "ParamSpec preserves decorator wrapper signatures. Callable[[int, str], bool] documents function types.\n\n```python\nfrom collections.abc import Callable\n\nHandler = Callable[[Request], Response]\n```"
    },
    {
      "question": "Generic classes?",
      "explanation": "class Box(Generic[T]) or class Box[T] (3.12+) parameterize containers and repositories.\n\n```python\nclass Stack[T]:\n    def push(self, item: T) -> None: ...\n```"
    },
    {
      "question": "NewType vs type alias?",
      "explanation": "NewType creates distinct type for checker (UserId = NewType(\"UserId\", str)). type Alias = ... (3.12 TypeAlias) is synonym."
    },
    {
      "question": "mypy vs pyright?",
      "explanation": "mypy: mature, configurable strictness. pyright/pylance: fast, powers VS Code. Many projects run both or standardize on one in CI."
    },
    {
      "question": "Any vs object?",
      "explanation": "object is top type for values; Any disables checking (escape hatch). Prefer object or TypeVar bounds over Any."
    },
    {
      "question": "Pydantic integration?",
      "explanation": "Pydantic v2 validates at runtime using type hints—bridges static types and API/input validation in FastAPI.\n\n```python\nclass User(BaseModel):\n    id: int\n    email: EmailStr\n```"
    }
  ]
};
