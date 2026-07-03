import type { FlashcardDeck } from './types';

export const oopDeck: FlashcardDeck = {
  "id": "oop",
  "slug": "oop",
  "title": "Object-Oriented Python",
  "cards": [
    {
      "question": "What is the Method Resolution Order (MRO)?",
      "explanation": "C3 linearization determines lookup order in multiple inheritance. View with ClassName.__mro__ or .mro().\n\n```python\nclass A: pass\nclass B(A): pass\nclass C(A): pass\nclass D(B, C): pass\nD.__mro__\n```"
    },
    {
      "question": "@classmethod vs @staticmethod?",
      "explanation": "classmethod receives cls—factory methods, alternative constructors. staticmethod no implicit first arg—namespaced utility.\n\n```python\nclass User:\n    @classmethod\n    def from_dict(cls, data):\n        return cls(**data)\n```"
    },
    {
      "question": "What is @property?",
      "explanation": "Computed attribute with getter; optional setter/deleter for validation while keeping attribute syntax.\n\n```python\nclass Circle:\n    def __init__(self, r):\n        self.r = r\n    @property\n    def area(self):\n        return 3.14159 * self.r ** 2\n```"
    },
    {
      "question": "Dunder methods for operators?",
      "explanation": "__eq__, __lt__, __add__, __repr__, __str__ customize behavior. __repr__ for developers, __str__ for users.\n\n```python\ndef __repr__(self):\n    return f\"User(id={self.id!r})\"\n```"
    },
    {
      "question": "What is dataclass?",
      "explanation": "@dataclass auto-generates __init__, __repr__, comparisons. field(default_factory=...) for mutable defaults. slots=True (3.10+) saves memory.\n\n```python\nfrom dataclasses import dataclass, field\n\n@dataclass(slots=True)\nclass Item:\n    name: str\n    tags: list[str] = field(default_factory=list)\n```"
    },
    {
      "question": "Abstract base classes?",
      "explanation": "abc.ABC and @abstractmethod enforce interface contracts. Subclasses must implement abstract methods before instantiation.\n\n```python\nfrom abc import ABC, abstractmethod\n\nclass Repo(ABC):\n    @abstractmethod\n    def get(self, id: str): ...\n```"
    },
    {
      "question": "Composition vs inheritance?",
      "explanation": "Favor composition (has-a) for flexibility; inheritance (is-a) for true subtype polymorphism. Mixins for shared behavior across unrelated classes."
    },
    {
      "question": "What is __init__ vs __new__?",
      "explanation": "__new__ creates instance (rare override, e.g. singletons/immutable subclasses). __init__ initializes instance after creation."
    },
    {
      "question": "Context managers in classes?",
      "explanation": "Implement __enter__/__exit__ or use @contextmanager generator. __exit__ receives exception info; return True suppresses exception.\n\n```python\nclass Timer:\n    def __enter__(self):\n        self.start = time.perf_counter()\n    def __exit__(self, *exc):\n        print(time.perf_counter() - self.start)\n```"
    },
    {
      "question": "What is __dict__?",
      "explanation": "Instance namespace mapping attribute names to values. __slots__ classes may omit __dict__. vars(obj) returns obj.__dict__ for plain objects."
    },
    {
      "question": "Enum for constants?",
      "explanation": "enum.Enum gives named constants, comparison by identity, and prevents accidental string/int confusion.\n\n```python\nfrom enum import Enum, auto\n\nclass Status(Enum):\n    PENDING = auto()\n    DONE = auto()\n```"
    },
    {
      "question": "Protocols (structural typing)?",
      "explanation": "typing.Protocol defines duck-typed interfaces without inheritance. runtime_checkable enables isinstance checks.\n\n```python\nfrom typing import Protocol\n\nclass Drawable(Protocol):\n    def draw(self) -> None: ...\n```"
    },
    {
      "question": "Super() usage?",
      "explanation": "super() follows MRO to call parent implementation—essential in cooperative multiple inheritance __init__ chains.\n\n```python\nclass Admin(User):\n    def __init__(self, name, permissions):\n        super().__init__(name)\n        self.permissions = permissions\n```"
    },
    {
      "question": "Private attributes convention?",
      "explanation": "Leading underscore _name is convention (not enforced). Name mangling __name in classes becomes _ClassName__name—discourage accidental override in subclasses."
    },
    {
      "question": "When to use NamedTuple vs dataclass?",
      "explanation": "NamedTuple: immutable, lightweight records. dataclass: mutable, defaults, methods, richer tooling. Both beat plain tuples for clarity."
    }
  ]
};
