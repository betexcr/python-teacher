/** Python interview flashcard deck seeds — { id, title, cards: [{ front, back }] }. */

export const pythonDecks = [
  {
    id: 'python-fundamentals',
    title: 'Python Fundamentals',
    cards: [
      {
        front: 'What are the main built-in numeric types in Python?',
        back: 'int (arbitrary precision), float (IEEE double), complex. bool is a subclass of int. Use decimal.Decimal for money, fractions.Fraction for rationals.',
      },
      {
        front: 'Mutable vs immutable types?',
        back: 'Immutable: int, float, str, tuple, frozenset, bytes. Mutable: list, dict, set, bytearray. Immutable objects cannot change in place; rebinding a name creates a new object.',
      },
      {
        front: 'How does variable assignment work in Python?',
        back: 'Names bind to objects; assignment does not copy unless you explicitly copy. Multiple names can refer to the same object.',
        code: 'a = [1, 2]\nb = a\nb.append(3)\nprint(a)  # [1, 2, 3]',
      },
      {
        front: 'What is truthiness in Python?',
        back: 'Falsy: None, False, 0, 0.0, empty "", [], {}, set(), range(0). Everything else is truthy. Use `if items:` not `if len(items) > 0`.',
      },
      {
        front: 'List vs tuple?',
        back: 'Lists are mutable, growable sequences; tuples are immutable and hashable (when elements are hashable). Tuples are lighter and safe as dict keys or return values.',
        code: 'coords = (10.0, 20.0)\npoints = [(0, 0), (1, 1)]',
      },
      {
        front: 'How do dicts work internally (high level)?',
        back: 'CPython 3.7+ preserves insertion order. Average O(1) lookup via hash table. Keys must be hashable. dict.get(k, default) avoids KeyError.',
        code: 'user = {"name": "Ada", "role": "admin"}\nuser.get("email", "unknown")',
      },
      {
        front: 'What is slicing?',
        back: 'sequence[start:stop:step] — stop is exclusive. Negative indices count from the end. Slicing creates a shallow copy for lists.',
        code: 'nums = [0, 1, 2, 3, 4, 5]\nnums[1:4]    # [1, 2, 3]\nnums[::-1]   # reversed',
      },
      {
        front: 'for loop over a dict?',
        back: 'Iterate keys by default. Use .items() for key-value pairs, .values() for values. Never mutate a dict while iterating keys you may delete—collect keys first or iterate a copy.',
        code: 'for key, value in config.items():\n    print(f"{key}={value}")',
      },
      {
        front: 'What is the walrus operator (:=)?',
        back: 'Assignment expression (Python 3.8+). Assigns and returns value in one expression—useful in while/if when you need the value twice.',
        code: 'while (line := f.readline()):\n    process(line)',
      },
      {
        front: 'f-strings vs str.format?',
        back: 'f-strings are fastest and most readable for interpolation. format() and % still appear in legacy code. f"{x=}" debug syntax prints name and value.',
        code: 'name = "Ada"\nf"Hello, {name}"\nf"{name=}"  # name=\'Ada\'',
      },
      {
        front: 'What is enumerate?',
        back: 'Yields (index, item) pairs while iterating—prefer over manual counter variables.',
        code: 'for i, fruit in enumerate(["apple", "banana"], start=1):\n    print(i, fruit)',
      },
      {
        front: 'What is zip?',
        back: 'Pairs elements from iterables in lockstep. Stops at shortest. Use itertools.zip_longest for unequal lengths with fillvalue.',
        code: 'names = ["Ada", "Bob"]\nscores = [98, 87]\nlist(zip(names, scores))  # [("Ada", 98), ("Bob", 87)]',
      },
      {
        front: 'How does `is` differ from `==`?',
        back: '`==` compares value equality (__eq__). `is` compares identity (same object in memory). Use `is` only for None, True, False, and singleton checks.',
        code: 'a = [1]\nb = [1]\na == b  # True\na is b  # False',
      },
      {
        front: 'What is a comprehension?',
        back: 'Concise syntax to build list/dict/set from iterables. List comp: [f(x) for x in items if cond]. Dict/set comps mirror this pattern.',
        code: 'squares = [n * n for n in range(10) if n % 2 == 0]\nunique = {word.lower() for word in words}',
      },
      {
        front: 'How do you read and write files safely?',
        back: 'Use `with open(path, encoding="utf-8") as f:` so the file closes even on exceptions. Always specify encoding for text files on Windows.',
        code: 'from pathlib import Path\n\npath = Path("data.txt")\ntext = path.read_text(encoding="utf-8")\npath.write_text(text + "\\n", encoding="utf-8")',
      },
    ],
  },
  {
    id: 'data-structures',
    title: 'Data Structures',
    cards: [
      {
        front: 'When to use list vs deque?',
        back: 'list: fast append/pop at end. collections.deque: O(1) append/pop at both ends—queues, BFS, sliding windows.',
        code: 'from collections import deque\n\nq = deque([1, 2, 3])\nq.appendleft(0)\nq.pop()',
      },
      {
        front: 'What is defaultdict?',
        back: 'dict subclass that calls a factory for missing keys—avoids KeyError boilerplate for grouping and counting.',
        code: 'from collections import defaultdict\n\ngroups = defaultdict(list)\ngroups["a"].append(1)',
      },
      {
        front: 'What is Counter?',
        back: 'Multiset / frequency map. most_common(n) returns top items. Supports arithmetic with other Counters.',
        code: 'from collections import Counter\n\nc = Counter("abracadabra")\nc.most_common(2)  # [("a", 5), ("b", 2)]',
      },
      {
        front: 'OrderedDict vs dict today?',
        back: 'Since 3.7, plain dict preserves insertion order. OrderedDict still useful for move_to_end, popitem(last=False), and ordered equality semantics.',
      },
      {
        front: 'What is a heap in Python?',
        back: 'heapq implements a min-heap on a list. heappush/heappop are O(log n). Use for priority queues; negate values for max-heap pattern.',
        code: 'import heapq\n\nh = [3, 1, 4]\nheapq.heapify(h)\nheapq.heappush(h, 2)\nheapq.heappop(h)  # 1',
      },
      {
        front: 'bisect module use case?',
        back: 'Maintain sorted lists with O(log n) insert/search position. Useful for timelines, leaderboards, offline sorted data.',
        code: 'import bisect\n\nscores = [10, 20, 30]\nbisect.insort(scores, 25)',
      },
      {
        front: 'What is namedtuple?',
        back: 'Lightweight immutable record with named fields. typing.NamedTuple adds type hints; dataclass is richer for mutable models.',
        code: 'from typing import NamedTuple\n\nclass Point(NamedTuple):\n    x: float\n    y: float',
      },
      {
        front: 'set operations?',
        back: 'Union |, intersection &, difference -, symmetric_difference ^. Sets require hashable elements; dedupe with set(seq) preserving order via dict.fromkeys in 3.7+.',
        code: 'a = {1, 2, 3}\nb = {3, 4}\na & b  # {3}\nlist(dict.fromkeys([1, 2, 1, 3]))  # [1, 2, 3]',
      },
      {
        front: 'What is array.array?',
        back: 'Compact homogeneous numeric array (C types). Use when you need memory-efficient numeric buffers before reaching for NumPy.',
      },
      {
        front: 'ChainMap use case?',
        back: 'Logical stack of dicts for scoped lookups—defaults layered with overrides (config: env > file > defaults).',
        code: 'from collections import ChainMap\n\ndefaults = {"debug": False}\nenv = {"debug": True}\nChainMap(env, defaults)["debug"]  # True',
      },
      {
        front: 'Tree structures in stdlib?',
        back: 'No built-in tree. Use classes, dict-of-dicts, or third-party (anytree). Binary search: bisect on sorted list or implement nodes.',
      },
      {
        front: 'Graph representation in Python?',
        back: 'Adjacency list: dict[node, list[neighbor]]. For weighted graphs use dict[node, list[tuple[neighbor, weight]]]. NetworkX for heavy graph work.',
        code: 'graph = {\n    "A": ["B", "C"],\n    "B": ["D"],\n    "C": [],\n    "D": [],\n}',
      },
      {
        front: 'What is __slots__?',
        back: 'Declares fixed attributes on a class—reduces per-instance __dict__ memory and speeds attribute access. Tradeoff: no dynamic attributes.',
        code: 'class Point:\n    __slots__ = ("x", "y")\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y',
      },
      {
        front: 'Shallow vs deep copy?',
        back: 'copy.copy is shallow (nested objects shared). copy.deepcopy recursively copies nested structures—needed before mutating nested mutable state.',
        code: 'import copy\n\noriginal = {"a": [1, 2]}\nshallow = copy.copy(original)\ndeep = copy.deepcopy(original)',
      },
      {
        front: 'LRU cache pattern?',
        back: 'functools.lru_cache memoizes pure functions. OrderedDict or cachetools for custom eviction. Thread-safe caches need locks or cachetools.',
        code: 'from functools import lru_cache\n\n@lru_cache(maxsize=128)\ndef fib(n: int) -> int:\n    return n if n < 2 else fib(n - 1) + fib(n - 2)',
      },
    ],
  },
  {
    id: 'functions',
    title: 'Functions',
    cards: [
      {
        front: 'Positional vs keyword arguments?',
        back: 'Positional fill parameters in order; keyword by name. After *, only keyword-only params allowed (PEP 3102).',
        code: 'def connect(host, port=443, *, timeout=30, ssl=True):\n    ...',
      },
      {
        front: 'What does *args do?',
        back: 'Collects extra positional arguments into a tuple. Often used for wrappers that forward calls.',
        code: 'def log_call(func, *args, **kwargs):\n    print(args, kwargs)\n    return func(*args, **kwargs)',
      },
      {
        front: 'What does **kwargs do?',
        back: 'Collects extra keyword arguments into a dict. Unpack with ** when forwarding: func(**kwargs).',
      },
      {
        front: 'Default argument gotcha?',
        back: 'Defaults evaluate once at function definition. Mutable defaults (list, dict) are shared across calls—use None sentinel instead.',
        code: 'def append_item(item, bucket=None):\n    if bucket is None:\n        bucket = []\n    bucket.append(item)\n    return bucket',
      },
      {
        front: 'What is a closure?',
        back: 'Inner function capturing variables from enclosing scope. nonlocal rebinding works in nested functions; global for module-level.',
        code: 'def make_multiplier(n):\n    def mul(x):\n        return x * n\n    return mul\n\ndouble = make_multiplier(2)',
      },
      {
        front: 'Lambda limitations?',
        back: 'Single expression only—no statements. Fine for short key/sort functions; prefer def for anything non-trivial or debuggable.',
        code: 'sorted(users, key=lambda u: u["last_login"], reverse=True)',
      },
      {
        front: 'What are decorators?',
        back: 'Functions wrapping functions (or classes) to add behavior. @decorator is syntactic sugar for func = decorator(func). functools.wraps preserves metadata.',
        code: 'from functools import wraps\n\ndef retry(fn):\n    @wraps(fn)\n    def wrapper(*args, **kwargs):\n        ...\n    return wrapper',
      },
      {
        front: 'functools.partial?',
        back: 'Freezes some arguments of a callable—useful for callbacks and configuring library functions.',
        code: 'from functools import partial\n\nint_from_hex = partial(int, base=16)\nint_from_hex("ff")  # 255',
      },
      {
        front: 'First-class functions meaning?',
        back: 'Functions are objects: assign to variables, pass as args, return from functions, store in data structures.',
        code: 'handlers = {"info": log_info, "error": log_error}\nhandlers[level](message)',
      },
      {
        front: 'Generator functions?',
        back: 'yield produces lazy iterators—memory efficient for large/streaming data. Each yield saves state; resumes on next().',
        code: 'def read_chunks(path, size=4096):\n    with open(path, "rb") as f:\n        while chunk := f.read(size):\n            yield chunk',
      },
      {
        front: 'yield from?',
        back: 'Delegates to sub-generator—flattens nested iteration and forwards send/throw.',
        code: 'def chain(*iterables):\n    for it in iterables:\n        yield from it',
      },
      {
        front: 'Recursion limits?',
        back: 'sys.getrecursionlimit() default ~1000. Deep recursion risks RecursionError—prefer iteration or trampolining for very deep trees.',
      },
      {
        front: 'What is functools.cache?',
        back: 'Python 3.9+ unbounded memoization—simpler than lru_cache when maxsize is not needed.',
        code: 'from functools import cache\n\n@cache\ndef expensive(n: int) -> int:\n    ...',
      },
      {
        front: 'Callable typing?',
        back: 'typing.Callable[[ArgTypes], ReturnType] documents function signatures. Protocols (typing.Protocol) for structural subtyping.',
        code: 'from collections.abc import Callable\n\ndef apply(fn: Callable[[int], int], x: int) -> int:\n    return fn(x)',
      },
      {
        front: 'Docstrings and __annotations__?',
        back: 'First string literal is __doc__. Annotations on params/return stored in __annotations__—used by type checkers and FastAPI.',
        code: 'def greet(name: str) -> str:\n    """Return a greeting."""\n    return f"Hello, {name}"',
      },
    ],
  },
  {
    id: 'oop',
    title: 'Object-Oriented Python',
    cards: [
      {
        front: 'What is the Method Resolution Order (MRO)?',
        back: 'C3 linearization determines lookup order in multiple inheritance. View with ClassName.__mro__ or .mro().',
        code: 'class A: pass\nclass B(A): pass\nclass C(A): pass\nclass D(B, C): pass\nD.__mro__',
      },
      {
        front: '@classmethod vs @staticmethod?',
        back: 'classmethod receives cls—factory methods, alternative constructors. staticmethod no implicit first arg—namespaced utility.',
        code: 'class User:\n    @classmethod\n    def from_dict(cls, data):\n        return cls(**data)',
      },
      {
        front: 'What is @property?',
        back: 'Computed attribute with getter; optional setter/deleter for validation while keeping attribute syntax.',
        code: 'class Circle:\n    def __init__(self, r):\n        self.r = r\n    @property\n    def area(self):\n        return 3.14159 * self.r ** 2',
      },
      {
        front: 'Dunder methods for operators?',
        back: '__eq__, __lt__, __add__, __repr__, __str__ customize behavior. __repr__ for developers, __str__ for users.',
        code: 'def __repr__(self):\n    return f"User(id={self.id!r})"',
      },
      {
        front: 'What is dataclass?',
        back: '@dataclass auto-generates __init__, __repr__, comparisons. field(default_factory=...) for mutable defaults. slots=True (3.10+) saves memory.',
        code: 'from dataclasses import dataclass, field\n\n@dataclass(slots=True)\nclass Item:\n    name: str\n    tags: list[str] = field(default_factory=list)',
      },
      {
        front: 'Abstract base classes?',
        back: 'abc.ABC and @abstractmethod enforce interface contracts. Subclasses must implement abstract methods before instantiation.',
        code: 'from abc import ABC, abstractmethod\n\nclass Repo(ABC):\n    @abstractmethod\n    def get(self, id: str): ...',
      },
      {
        front: 'Composition vs inheritance?',
        back: 'Favor composition (has-a) for flexibility; inheritance (is-a) for true subtype polymorphism. Mixins for shared behavior across unrelated classes.',
      },
      {
        front: 'What is __init__ vs __new__?',
        back: '__new__ creates instance (rare override, e.g. singletons/immutable subclasses). __init__ initializes instance after creation.',
      },
      {
        front: 'Context managers in classes?',
        back: 'Implement __enter__/__exit__ or use @contextmanager generator. __exit__ receives exception info; return True suppresses exception.',
        code: 'class Timer:\n    def __enter__(self):\n        self.start = time.perf_counter()\n    def __exit__(self, *exc):\n        print(time.perf_counter() - self.start)',
      },
      {
        front: 'What is __dict__?',
        back: 'Instance namespace mapping attribute names to values. __slots__ classes may omit __dict__. vars(obj) returns obj.__dict__ for plain objects.',
      },
      {
        front: 'Enum for constants?',
        back: 'enum.Enum gives named constants, comparison by identity, and prevents accidental string/int confusion.',
        code: 'from enum import Enum, auto\n\nclass Status(Enum):\n    PENDING = auto()\n    DONE = auto()',
      },
      {
        front: 'Protocols (structural typing)?',
        back: 'typing.Protocol defines duck-typed interfaces without inheritance. runtime_checkable enables isinstance checks.',
        code: 'from typing import Protocol\n\nclass Drawable(Protocol):\n    def draw(self) -> None: ...',
      },
      {
        front: 'Super() usage?',
        back: 'super() follows MRO to call parent implementation—essential in cooperative multiple inheritance __init__ chains.',
        code: 'class Admin(User):\n    def __init__(self, name, permissions):\n        super().__init__(name)\n        self.permissions = permissions',
      },
      {
        front: 'Private attributes convention?',
        back: 'Leading underscore _name is convention (not enforced). Name mangling __name in classes becomes _ClassName__name—discourage accidental override in subclasses.',
      },
      {
        front: 'When to use NamedTuple vs dataclass?',
        back: 'NamedTuple: immutable, lightweight records. dataclass: mutable, defaults, methods, richer tooling. Both beat plain tuples for clarity.',
      },
    ],
  },
  {
    id: 'typing',
    title: 'Type Hints & Typing',
    cards: [
      {
        front: 'Why add type hints in Python?',
        back: 'Documentation, static analysis (mypy/pyright), better IDE support. Runtime ignores annotations unless using typing.get_type_hints or frameworks like FastAPI/Pydantic.',
      },
      {
        front: 'list vs List vs list[str]?',
        back: 'Python 3.9+: use built-in generics list[str], dict[str, int]. Legacy code uses typing.List, Dict from typing module.',
        code: 'def names(users: list[dict[str, str]]) -> list[str]:\n    return [u["name"] for u in users]',
      },
      {
        front: 'Optional and union types?',
        back: 'Optional[T] means T | None. Python 3.10+ uses X | Y union syntax instead of Union[X, Y].',
        code: 'def find_user(id: str) -> User | None:\n    ...',
      },
      {
        front: 'What is TypedDict?',
        back: 'Typed structure for dicts with known keys—great for JSON payloads before Pydantic models.',
        code: 'class UserDict(TypedDict):\n    id: str\n    email: str',
      },
      {
        front: 'Literal and Final?',
        back: 'Literal restricts to specific values. Final marks names not to be rebound; Final class prevents subclassing.',
        code: 'Mode = Literal["r", "w"]\nMAX_RETRIES: Final = 3',
      },
      {
        front: 'TypeVar and generics?',
        back: 'TypeVar declares generic type parameters for reusable typed functions/classes.',
        code: 'T = TypeVar("T")\n\ndef first(items: list[T]) -> T:\n    return items[0]',
      },
      {
        front: 'Protocol vs ABC?',
        back: 'Protocol: structural (duck typing). ABC: nominal inheritance required. Protocols fit third-party types you cannot subclass.',
      },
      {
        front: 'What is cast()?',
        back: 'typing.cast tells the type checker to treat a value as a type—no runtime conversion. Use sparingly when checker cannot narrow.',
        code: 'from typing import cast\n\nvalue = cast(str, maybe_str)',
      },
      {
        front: 'Type narrowing patterns?',
        back: 'isinstance, is None checks, match/case, assert for checker. TypeGuard (3.13+) for custom narrowing functions.',
        code: 'def process(value: str | bytes) -> None:\n    if isinstance(value, str):\n        ...  # narrowed to str',
      },
      {
        front: 'ParamSpec and Callable?',
        back: 'ParamSpec preserves decorator wrapper signatures. Callable[[int, str], bool] documents function types.',
        code: 'from collections.abc import Callable\n\nHandler = Callable[[Request], Response]',
      },
      {
        front: 'Generic classes?',
        back: 'class Box(Generic[T]) or class Box[T] (3.12+) parameterize containers and repositories.',
        code: 'class Stack[T]:\n    def push(self, item: T) -> None: ...',
      },
      {
        front: 'NewType vs type alias?',
        back: 'NewType creates distinct type for checker (UserId = NewType("UserId", str)). type Alias = ... (3.12 TypeAlias) is synonym.',
      },
      {
        front: 'mypy vs pyright?',
        back: 'mypy: mature, configurable strictness. pyright/pylance: fast, powers VS Code. Many projects run both or standardize on one in CI.',
      },
      {
        front: 'Any vs object?',
        back: 'object is top type for values; Any disables checking (escape hatch). Prefer object or TypeVar bounds over Any.',
      },
      {
        front: 'Pydantic integration?',
        back: 'Pydantic v2 validates at runtime using type hints—bridges static types and API/input validation in FastAPI.',
        code: 'class User(BaseModel):\n    id: int\n    email: EmailStr',
      },
    ],
  },
  {
    id: 'stdlib',
    title: 'Standard Library',
    cards: [
      {
        front: 'pathlib vs os.path?',
        back: 'pathlib.Path is object-oriented, cross-platform, readable. Prefer Path.read_text, / operator for joining segments.',
        code: 'from pathlib import Path\n\nroot = Path("src") / "app"\nfor py in root.rglob("*.py"):\n    print(py)',
      },
      {
        front: 'json module essentials?',
        back: 'json.loads/dumps for str; load/dump for file objects. default= for non-serializable types; use datetime.isoformat pattern.',
        code: 'import json\n\ndata = json.loads(\'{"a": 1}\')\njson.dumps(data, indent=2)',
      },
      {
        front: 'datetime best practices?',
        back: 'Store UTC internally; use datetime.timezone.utc or zoneinfo. Never mix naive and aware datetimes without conversion.',
        code: 'from datetime import datetime, timezone\n\nnow = datetime.now(timezone.utc)',
      },
      {
        front: 're module basics?',
        back: 're.compile for reuse. raw strings for patterns. Prefer re.search/finditer over match when pattern not anchored.',
        code: 'import re\n\nEMAIL = re.compile(r"[\\w.-]+@[\\w.-]+")\nEMAIL.search(text)',
      },
      {
        front: 'itertools highlights?',
        back: 'chain, islice, groupby (requires sorted input), product, combinations—lazy iterator building blocks.',
        code: 'from itertools import islice\n\nlist(islice(range(100), 5))  # first 5',
      },
      {
        front: 'functools highlights?',
        back: 'partial, wraps, lru_cache, cache, reduce, singledispatch (overloaded functions by first arg type).',
        code: 'from functools import singledispatch\n\n@singledispatch\ndef serialize(obj): ...',
      },
      {
        front: 'contextlib utilities?',
        back: 'contextmanager decorator, suppress for ignored exceptions, ExitStack for dynamic context manager lists.',
        code: 'from contextlib import contextmanager\n\n@contextmanager\ndef temp_env(**env):\n    ...',
      },
      {
        front: 'logging vs print?',
        back: 'logging supports levels, handlers, structured fields, rotation. Configure once at app entry; use logger = logging.getLogger(__name__).',
        code: 'import logging\n\nlog = logging.getLogger(__name__)\nlog.info("started", extra={"user_id": uid})',
      },
      {
        front: 'subprocess safety?',
        back: 'Prefer subprocess.run with list args (no shell=True unless necessary). capture_output, check, timeout parameters.',
        code: 'import subprocess\n\nsubprocess.run(["git", "status"], check=True, capture_output=True, text=True)',
      },
      {
        front: 'tempfile and shutil?',
        back: 'TemporaryDirectory/NamedTemporaryFile for scratch space. shutil.copytree, rmtree, disk_usage for filesystem ops.',
      },
      {
        front: 'secrets module?',
        back: 'Cryptographically strong random for tokens/passwords. Never use random module for security-sensitive values.',
        code: 'import secrets\n\ntoken = secrets.token_urlsafe(32)',
      },
      {
        front: 'hashlib for checksums?',
        back: 'hashlib.sha256(data).hexdigest() for file integrity. Use hmac for keyed authentication.',
        code: 'import hashlib\n\nhashlib.sha256(b"data").hexdigest()',
      },
      {
        front: 'dataclasses vs attrs?',
        back: 'dataclasses in stdlib covers most needs. attrs/third-party pydantic add validators, converters, richer ecosystem.',
      },
      {
        front: 'enum, uuid, csv?',
        back: 'uuid.uuid4() for IDs. csv.DictReader/Writer for tabular data. enum for constrained constants—common interview trio.',
        code: 'import uuid\n\nuid = str(uuid.uuid4())',
      },
      {
        front: 'importlib and packages?',
        back: '__init__.py marks packages (namespace packages optional PEP 420). importlib.import_module for dynamic imports; __all__ controls from pkg import *.',
      },
    ],
  },
  {
    id: 'async',
    title: 'Async Python',
    cards: [
      {
        front: 'async def vs def?',
        back: 'async def returns a coroutine object—must be awaited or scheduled. Regular def blocks the thread; async enables cooperative concurrency on one thread.',
        code: 'async def fetch():\n    async with httpx.AsyncClient() as client:\n        return await client.get(url)',
      },
      {
        front: 'await rules?',
        back: 'await only inside async def (except asyncio.run top level). Awaiting a coroutine suspends until complete, letting event loop run other tasks.',
      },
      {
        front: 'asyncio.run purpose?',
        back: 'Python 3.7+ entry point: creates loop, runs main coroutine, closes loop. Use once at program entry—not inside already-async contexts.',
        code: 'import asyncio\n\nasyncio.run(main())',
      },
      {
        front: 'asyncio.gather vs TaskGroup?',
        back: 'gather runs awaitables concurrently; return_exceptions controls error handling. TaskGroup (3.11+) structured concurrency—cancels siblings on failure.',
        code: 'async with asyncio.TaskGroup() as tg:\n    t1 = tg.create_task(fetch_a())\n    t2 = tg.create_task(fetch_b())',
      },
      {
        front: 'When not to use async?',
        back: 'CPU-bound work blocks the event loop—use ProcessPoolExecutor or multiprocessing. Async shines for I/O-bound: HTTP, DB, files with async drivers.',
      },
      {
        front: 'asyncio.create_task?',
        back: 'Schedules coroutine concurrently; returns Task. Remember to await or gather tasks before shutdown to avoid warnings.',
        code: 'task = asyncio.create_task(poll())\nresult = await task',
      },
      {
        front: 'Async context managers?',
        back: 'async with for resources with async setup/teardown (HTTP clients, DB pools). Implement __aenter__/__aexit__.',
        code: 'async with session.begin():\n    await session.execute(stmt)',
      },
      {
        front: 'asyncio.Queue?',
        back: 'Producer-consumer coordination between coroutines. await queue.put/get; join() waits for all tasks done.',
      },
      {
        front: 'asyncio.to_thread?',
        back: 'Runs blocking callable in thread pool without blocking loop—bridge sync libraries in async apps.',
        code: 'result = await asyncio.to_thread(blocking_io, path)',
      },
      {
        front: 'Timeouts in asyncio?',
        back: 'async with asyncio.timeout(5): (3.11+) or asyncio.wait_for(coro, timeout=5). Always handle TimeoutError.',
        code: 'async with asyncio.timeout(5):\n    await slow_operation()',
      },
      {
        front: 'Event loop policy and uvloop?',
        back: 'Default loop on Linux/macOS is efficient; uvloop (third-party) can speed some workloads. Not available on Windows.',
      },
      {
        front: 'Async generators?',
        back: 'async def with yield; async for to iterate. Useful for streaming paginated API results.',
        code: 'async def pages():\n    page = 1\n    while batch := await fetch_page(page):\n        yield batch\n        page += 1',
      },
      {
        front: 'Cancellation semantics?',
        back: 'Task.cancel() raises CancelledError at await points. Handle cleanup in finally; shield() protects inner coroutines from cancellation.',
      },
      {
        front: 'Async vs threading?',
        back: 'Threading: preemptive, GIL limits CPU parallelism for Python bytecode. Async: single-thread cooperative—lower overhead, no race on shared state if truly single-threaded.',
      },
      {
        front: 'Common async libraries?',
        back: 'httpx/aiohttp (HTTP), asyncpg/aiomysql (DB), redis.asyncio, anyio/trio as alternatives. FastAPI builds on Starlette async stack.',
      },
    ],
  },
  {
    id: 'pytest',
    title: 'pytest',
    cards: [
      {
        front: 'Why pytest over unittest?',
        back: 'Less boilerplate, plain assert with introspection, powerful fixtures, plugins (cov, asyncio, xdist). Still runs unittest-style tests.',
      },
      {
        front: 'Basic test discovery?',
        back: 'Files test_*.py or *_test.py; functions test_*; classes Test*. Run pytest or pytest path/to/test_module.py.',
        code: 'def test_addition():\n    assert 1 + 1 == 2',
      },
      {
        front: 'What are fixtures?',
        back: 'Setup/teardown via dependency injection. Scope: function, class, module, package, session. yield fixtures run teardown after test.',
        code: '@pytest.fixture\ndef db():\n    conn = connect()\n    yield conn\n    conn.close()',
      },
      {
        front: 'conftest.py role?',
        back: 'Shared fixtures and hooks for a directory tree—no import needed; pytest auto-discovers.',
      },
      {
        front: 'parametrize?',
        back: 'Run same test with multiple inputs—table-driven tests without copy-paste.',
        code: '@pytest.mark.parametrize("n,expected", [(1, 2), (2, 4)])\ndef test_double(n, expected):\n    assert double(n) == expected',
      },
      {
        front: 'Mocking with pytest-mock?',
        back: 'mocker fixture wraps unittest.mock. patch object paths where used, not where defined.',
        code: 'def test_api(mocker):\n    mocker.patch("myapp.client.fetch", return_value={"ok": True})',
      },
      {
        front: 'pytest.raises?',
        back: 'Assert exception type and optionally match message regex.',
        code: 'with pytest.raises(ValueError, match="invalid"):\n    parse("")',
      },
      {
        front: 'Markers?',
        back: '@pytest.mark.slow, skip, xfail. Register custom markers in pytest.ini to avoid warnings. -m "not slow" to filter.',
      },
      {
        front: 'tmp_path fixture?',
        back: 'Built-in pathlib temp directory per test—preferred over manual tempfile for filesystem tests.',
        code: 'def test_write(tmp_path):\n    p = tmp_path / "out.txt"\n    p.write_text("hi")',
      },
      {
        front: 'monkeypatch?',
        back: 'Safely set env vars, attributes, dict items for test isolation—auto-restored after test.',
        code: 'def test_env(monkeypatch):\n    monkeypatch.setenv("API_KEY", "test")',
      },
      {
        front: 'pytest-asyncio?',
        back: 'Mark async tests @pytest.mark.asyncio or configure asyncio_mode=auto. Use async fixtures for async DB/API setup.',
        code: '@pytest.mark.asyncio\nasync def test_fetch():\n    assert await fetch_status() == 200',
      },
      {
        front: 'Coverage with pytest-cov?',
        back: 'pytest --cov=myapp --cov-report=term-missing. Fail under threshold: --cov-fail-under=90.',
      },
      {
        front: 'Factory patterns in tests?',
        back: 'pytest-factoryboy or plain factory functions build model instances—keep tests readable and DRY.',
      },
      {
        front: 'Snapshot / approval testing?',
        back: 'syrupy or inline golden files for complex outputs. Review diffs on intentional changes.',
      },
      {
        front: 'CI pytest command?',
        back: 'pytest -q --tb=short --strict-markers -x for fail-fast PR checks. Parallel: pytest -n auto with xdist.',
      },
    ],
  },
  {
    id: 'fastapi',
    title: 'FastAPI',
    cards: [
      {
        front: 'Why FastAPI is fast?',
        back: 'Starlette (async ASGI) + Pydantic validation (v2 uses Rust core). Not magic—efficient I/O and compiled validation help under load.',
      },
      {
        front: 'Minimal FastAPI app?',
        back: 'App instance, path operation decorators, uvicorn to serve. Return dict for JSON; type hints drive OpenAPI schema.',
        code: 'from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get("/health")\ndef health():\n    return {"status": "ok"}',
      },
      {
        front: 'Path vs query parameters?',
        back: 'Path params in route signature without default. Query params have defaults or use Query(...) for validation.',
        code: '@app.get("/items/{item_id}")\ndef read_item(item_id: int, q: str | None = None): ...',
      },
      {
        front: 'Request body with Pydantic?',
        back: 'Single Pydantic model parameter becomes JSON body. Automatic 422 on validation errors with detail payload.',
        code: 'class ItemCreate(BaseModel):\n    name: str\n    price: float\n\n@app.post("/items")\ndef create(item: ItemCreate): ...',
      },
      {
        front: 'Dependency Injection?',
        back: 'Depends() resolves shared resources (DB session, auth user, settings) per request—testable and composable.',
        code: 'def get_db():\n    db = SessionLocal()\n    try:\n        yield db\n    finally:\n        db.close()',
      },
      {
        front: 'APIRouter?',
        back: 'Modular routes: router = APIRouter(prefix="/users", tags=["users"]); app.include_router(router).',
      },
      {
        front: 'Background tasks?',
        back: 'BackgroundTasks for fire-and-forget work after response—email, logging. Not durable; use Celery/RQ for heavy jobs.',
        code: 'def send_email(): ...\n\n@app.post("/signup")\ndef signup(bg: BackgroundTasks):\n    bg.add_task(send_email)',
      },
      {
        front: 'Middleware?',
        back: 'ASGI middleware for cross-cutting concerns: CORS, timing, request IDs. app.add_middleware(CORSMiddleware, ...).',
      },
      {
        front: 'Exception handlers?',
        back: '@app.exception_handler(CustomError) return JSONResponse—consistent error shape across app.',
      },
      {
        front: 'Async path operations?',
        back: 'async def when using await (async DB/HTTP). def for CPU-light sync code—FastAPI runs sync in threadpool.',
        code: '@app.get("/data")\nasync def data():\n    return await fetch_remote()',
      },
      {
        front: 'OpenAPI and /docs?',
        back: 'Auto-generated Swagger UI at /docs, ReDoc at /redoc from type hints and Pydantic models.',
      },
      {
        front: 'Security: OAuth2PasswordBearer?',
        back: 'Depends(get_current_user) pattern with JWT or opaque tokens. Use HTTPS; store secrets in env, not code.',
      },
      {
        front: 'Testing FastAPI?',
        back: 'TestClient (Starlette) or httpx.AsyncClient with ASGITransport. Override dependencies for mocks.',
        code: 'from fastapi.testclient import TestClient\n\nclient = TestClient(app)\nassert client.get("/health").status_code == 200',
      },
      {
        front: 'lifespan events?',
        back: '@asynccontextmanager lifespan replaces startup/shutdown hooks—open/close pools, warm caches.',
        code: '@asynccontextmanager\nasync def lifespan(app: FastAPI):\n    await pool.connect()\n    yield\n    await pool.disconnect()',
      },
      {
        front: 'Deployment stack?',
        back: 'uvicorn/gunicorn with uvicorn workers behind nginx. Docker + health endpoint. Consider Hypercorn for HTTP/2.',
      },
    ],
  },
  {
    id: 'flask',
    title: 'Flask',
    cards: [
      {
        front: 'Flask app structure?',
        back: 'Application factory pattern scales better than single global app—create_app(config) registers blueprints and extensions.',
        code: 'def create_app():\n    app = Flask(__name__)\n    app.register_blueprint(api_bp)\n    return app',
      },
      {
        front: 'Routing and methods?',
        back: '@app.route("/items", methods=["GET", "POST"]) or @app.get/@app.post (Flask 2+).',
        code: '@app.post("/items")\ndef create_item():\n    data = request.get_json()\n    ...',
      },
      {
        front: 'request and json?',
        back: 'request.args query dict, request.form, request.get_json(silent=True). Validate input—Flask does not auto-validate like Pydantic.',
      },
      {
        front: 'Blueprints?',
        back: 'Modular routes + templates + static files. url_prefix groups API versions or features.',
        code: 'bp = Blueprint("api", __name__, url_prefix="/api")\n\n@bp.get("/users")\ndef users(): ...',
      },
      {
        front: 'Flask-SQLAlchemy pattern?',
        back: 'db = SQLAlchemy(); db.init_app(app). Models inherit db.Model; sessions scoped per request via teardown.',
      },
      {
        front: 'Jinja2 templates?',
        back: 'render_template("page.html", user=user). Auto-escaping for HTML; use Markup carefully. extends/include for layout.',
      },
      {
        front: 'Sessions and cookies?',
        back: 'session dict signed with SECRET_KEY— not encrypted. Do not store secrets in session; set SECURE, HTTPONLY, SAMESITE on cookies.',
      },
      {
        front: 'Flask vs FastAPI?',
        back: 'Flask: mature sync WSGI ecosystem, extensions for everything. FastAPI: async-first, OpenAPI, Pydantic validation. Choose based on team and I/O model.',
      },
      {
        front: 'Error handlers?',
        back: '@app.errorhandler(404) def not_found(e): return jsonify(...), 404. Consistent JSON errors for APIs.',
      },
      {
        front: 'before_request / after_request?',
        back: 'Hooks for auth, logging, CORS headers, DB session per request.',
        code: '@app.before_request\ndef load_user():\n    g.user = current_user()',
      },
      {
        front: 'g object?',
        back: 'Request-local storage during one request—attach user, db connection, trace id.',
      },
      {
        front: 'Testing Flask?',
        back: 'app.test_client() with context. pytest fixtures for app and client; TRANSACTION rollback pattern for DB tests.',
        code: 'def test_index(client):\n    resp = client.get("/")\n    assert resp.status_code == 200',
      },
      {
        front: 'Production WSGI server?',
        back: 'Never use app.run() in production. gunicorn, waitress, uWSGI behind reverse proxy with TLS termination.',
      },
      {
        front: 'Flask-Login overview?',
        back: 'current_user, login_user, login_required decorator—session-based auth common in server-rendered apps.',
      },
      {
        front: 'Configuration pattern?',
        back: 'app.config.from_object(Config) or from_envvar. Separate Dev/Prod configs; never commit secrets.',
      },
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    cards: [
      {
        front: 'SQLAlchemy Core vs ORM?',
        back: 'Core: table-centric SQL expression language. ORM: class-centric models mapped to tables. 2.0 style unified select()/session.execute.',
        code: 'from sqlalchemy import select\n\nstmt = select(User).where(User.active.is_(True))',
      },
      {
        front: 'Session lifecycle?',
        back: 'Open session per request/unit of work. commit on success, rollback on error, close always. Avoid long-lived sessions.',
        code: 'with Session(engine) as session:\n    session.add(user)\n    session.commit()',
      },
      {
        front: 'N+1 query problem?',
        back: 'Loading related objects in a loop triggers extra queries. Fix with joinedload/selectinload eager loading or explicit joins.',
        code: 'select(User).options(selectinload(User.orders))',
      },
      {
        front: 'Alembic migrations?',
        back: 'Version schema changes: alembic revision --autogenerate, upgrade head. Review autogen scripts— not always perfect.',
      },
      {
        front: 'Connection pooling?',
        back: 'Reuse DB connections—SQLAlchemy QueuePool. Size pool for concurrency; pre_ping detects stale connections.',
      },
      {
        front: 'Transactions and isolation?',
        back: 'ACID transactions group work atomically. Understand READ COMMITTED vs SERIALIZABLE for anomalies (dirty read, phantom).',
      },
      {
        front: 'Raw SQL when?',
        back: 'Complex reports, bulk ops, DB-specific features. sqlalchemy.text() with bound params—never f-string SQL (injection).',
        code: 'session.execute(text("SELECT * FROM users WHERE id = :id"), {"id": user_id})',
      },
      {
        front: 'asyncpg / async SQLAlchemy?',
        back: 'AsyncSession with async engine for FastAPI. await session.execute(stmt); avoid mixing sync ORM in async routes without to_thread.',
      },
      {
        front: 'Redis use cases?',
        back: 'Cache, rate limiting, pub/sub, session store, Celery broker. Set TTL; define eviction policy for memory limits.',
      },
      {
        front: 'MongoDB vs Postgres?',
        back: 'Postgres: relational integrity, joins, JSONB when needed. Mongo: flexible schema, document model—trade consistency and query patterns.',
      },
      {
        front: 'Indexes?',
        back: 'Speed reads, slow writes. Index columns in WHERE/JOIN/ORDER BY. EXPLAIN ANALYZE validates plans. Avoid over-indexing.',
      },
      {
        front: 'UUID primary keys?',
        back: 'Globally unique, opaque—good for distributed systems. Slightly larger indexes than bigint; consider uuid7 for time-ordering.',
      },
      {
        front: 'Soft deletes?',
        back: 'deleted_at column instead of DELETE—preserve history. Filter active rows in queries or use SQLAlchemy session events.',
      },
      {
        front: 'Database testing?',
        back: 'Separate test DB, transactions rolled back per test, or pytest-postgresql/docker fixtures. Never run tests against prod.',
      },
      {
        front: 'ORM anti-patterns?',
        back: 'God models, implicit lazy loads in APIs, missing migrations, storing large blobs in rows without consideration.',
      },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps for Python',
    cards: [
      {
        front: 'venv vs poetry vs uv?',
        back: 'venv+pip: stdlib baseline. Poetry: lockfile, packaging. uv: fast resolver/installer (Rust). All isolate dependencies per project.',
        code: 'python -m venv .venv\nsource .venv/bin/activate  # or .venv\\Scripts\\activate on Windows\npip install -r requirements.txt',
      },
      {
        front: 'requirements.txt vs pyproject.toml?',
        back: 'requirements.txt/pip-tools pin deps for apps. pyproject.toml (PEP 621) defines project metadata and tool config; poetry/uv/pdm manage locks.',
      },
      {
        front: 'Dockerfile for Python app?',
        back: 'Multi-stage: builder installs deps, runtime slim image copies venv/app. Non-root user, .dockerignore, pin base image digest.',
        code: 'FROM python:3.12-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY . .\nCMD ["gunicorn", "app:app"]',
      },
      {
        front: '12-factor app basics?',
        back: 'Config in env, stateless processes, logs as streams, disposability, dev/prod parity. PYTHONPATH and settings from environment.',
      },
      {
        front: 'GitHub Actions CI for Python?',
        back: 'Matrix python-version, cache pip, run ruff/mypy/pytest, build Docker on main.',
        code: '- uses: actions/setup-python@v5\n  with:\n    python-version: "3.12"\n- run: pip install -e ".[test]"\n- run: pytest',
      },
      {
        front: 'Pre-commit hooks?',
        back: 'ruff format/check, mypy, trailing whitespace before commit. Same checks in CI.',
      },
      {
        front: 'Environment variables with pydantic-settings?',
        back: 'BaseSettings loads from env/.env with validation—type-safe config for apps.',
        code: 'class Settings(BaseSettings):\n    database_url: str\n    debug: bool = False',
      },
      {
        front: 'Health and readiness probes?',
        back: '/health live (process up), /ready checks DB/redis—Kubernetes uses these for routing and restarts.',
      },
      {
        front: 'Structured logging in prod?',
        back: 'JSON logs to stdout for aggregation (Datadog, CloudWatch). Include trace_id, request_id, level, timestamp.',
      },
      {
        front: 'Secrets management?',
        back: 'Never in git. Use vault, SSM Parameter Store, K8s secrets. Inject at runtime; rotate regularly.',
      },
      {
        front: 'Gunicorn + Uvicorn workers?',
        back: 'gunicorn -k uvicorn.workers.UvicornWorker for ASGI FastAPI. Worker count ~ 2*CPU+1 rule of thumb, tune under load.',
      },
      {
        front: 'Makefile / task runner?',
        back: 'Standardize dev commands: make test, lint, run. invoke, just, or npm-style scripts in pyproject optional.',
      },
      {
        front: 'Semantic versioning and releases?',
        back: 'Semver for libraries. Tag releases, publish to PyPI with trusted publishing/GitHub Actions OIDC.',
      },
      {
        front: 'Monitoring Python services?',
        back: 'Prometheus metrics (prometheus_client), Sentry for errors, OpenTelemetry traces. Watch memory—C extensions can leak.',
      },
      {
        front: 'Blue/green or rolling deploys?',
        back: 'Rolling: gradual pod replacement. Blue/green: switch traffic between two envs—faster rollback, more resources.',
      },
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud & Python',
    cards: [
      {
        front: 'AWS Lambda with Python?',
        back: 'Handler function(event, context). Cold starts, package size limits, stateless. Use layers for deps; avoid fat imports at module level.',
        code: 'def handler(event, context):\n    return {"statusCode": 200, "body": "ok"}',
      },
      {
        front: 'S3 with boto3?',
        back: 'upload_file, download_file, list_objects_v2. IAM least privilege; presigned URLs for client uploads.',
        code: 'import boto3\n\ns3 = boto3.client("s3")\ns3.upload_file("local.txt", "bucket", "key.txt")',
      },
      {
        front: 'SQS / SNS patterns?',
        back: 'Decouple services: SNS fan-out, SQS queue workers (Celery, Lambda pollers). Idempotent consumers handle at-least-once delivery.',
      },
      {
        front: 'GCP Cloud Functions / Cloud Run?',
        back: 'Cloud Run: containerized HTTP services, scale to zero. Cloud Functions: event-triggered snippets. Both support Python runtimes.',
      },
      {
        front: 'Azure Functions Python?',
        back: 'Similar serverless model; binding triggers (HTTP, queue, timer). Use Application Insights for monitoring.',
      },
      {
        front: 'Object storage vs block storage?',
        back: 'S3/GCS for blobs, backups, static assets. EBS/Persistent disks for DB volumes. Choose by access pattern and durability needs.',
      },
      {
        front: 'IAM roles for services?',
        back: 'Instance/task roles grant AWS permissions without static keys on disk—prefer over access keys in env.',
      },
      {
        front: 'Secrets in cloud?',
        back: 'AWS Secrets Manager, GCP Secret Manager, Azure Key Vault. Rotate and audit access; cache briefly in app memory if needed.',
      },
      {
        front: 'Infrastructure as Code?',
        back: 'Terraform/CDK define resources in code. Separate state per env; review plans in CI before apply.',
      },
      {
        front: 'Managed Postgres (RDS/Cloud SQL)?',
        back: 'Automated backups, patching, read replicas. Connect via private VPC; use connection pooling (PgBouncer) in app tier.',
      },
      {
        front: 'Serverless vs containers?',
        back: 'Serverless: ops-light, pay per invoke, cold starts. Containers/K8s: control, long-running workers, predictable performance.',
      },
      {
        front: 'CDN for Python APIs?',
        back: 'Cache GET at edge when responses are public and cacheable. Dynamic authenticated APIs usually bypass CDN cache.',
      },
      {
        front: 'CloudWatch / logging?',
        back: 'Ship structured logs and custom metrics. Alarms on error rate, latency p99, queue depth.',
      },
      {
        front: 'Multi-region considerations?',
        back: 'Data residency, replication lag, failover DNS. Stateless app tiers easier than single-primary DB failover.',
      },
      {
        front: 'Cost optimization?',
        back: 'Right-size instances, reserved capacity, S3 lifecycle policies, delete idle resources, profile expensive API calls.',
      },
    ],
  },
  {
    id: 'data-eng',
    title: 'Data Engineering',
    cards: [
      {
        front: 'pandas DataFrame basics?',
        back: 'Tabular data with labeled columns. read_csv, head, info, describe for exploration. Vectorized ops beat Python loops.',
        code: 'import pandas as pd\n\ndf = pd.read_csv("data.csv")\ndf.groupby("category")["amount"].sum()',
      },
      {
        front: 'Handling missing data?',
        back: 'isna(), fillna(), dropna(). Impute carefully—document strategy. Nullable dtypes in pandas 2.x.',
      },
      {
        front: 'Polars vs pandas?',
        back: 'Polars: Rust engine, lazy API, faster on large data. pandas: ecosystem maturity. Consider Polars for new ETL pipelines.',
        code: 'import polars as pl\n\ndf = pl.scan_csv("big.csv").filter(pl.col("x") > 0).collect()',
      },
      {
        front: 'Apache Arrow role?',
        back: 'Columnar in-memory format—zero-copy interchange between pandas, Polars, PySpark. Parquet built on Arrow types.',
      },
      {
        front: 'Parquet vs CSV?',
        back: 'Parquet: columnar, compressed, schema embedded—preferred for data lakes. CSV: human-readable, no types, larger.',
      },
      {
        front: 'PySpark when?',
        back: 'Distributed processing on huge datasets in Spark clusters. pandas on single machine hits memory wall.',
        code: 'df = spark.read.parquet("s3://bucket/events/")\ndf.groupBy("user_id").count()',
      },
      {
        front: 'ETL vs ELT?',
        back: 'ETL transforms before load. ELT loads raw then transforms in warehouse (dbt, SQL)—common with Snowflake/BigQuery.',
      },
      {
        front: 'Airflow / Dagster / Prefect?',
        back: 'Orchestrate scheduled pipelines with retries, sensors, lineage. Dagster/Prefect modern DX; Airflow widely adopted.',
      },
      {
        front: 'dbt role?',
        back: 'Transform data in warehouse via versioned SQL models—tests, docs, incremental models.',
      },
      {
        front: 'Idempotent pipelines?',
        back: 'Re-running same date partition yields same result. Use merge/upsert, partition keys, deterministic transforms.',
      },
      {
        front: 'Data quality checks?',
        back: 'Great Expectations, dbt tests, custom asserts on row counts, null rates, schema. Fail pipeline on violation.',
      },
      {
        front: 'Streaming vs batch?',
        back: 'Batch: hourly/daily jobs, simpler. Streaming: Kafka + Flink/Spark Structured Streaming for low latency.',
      },
      {
        front: 'Python in notebooks vs scripts?',
        back: 'Notebooks for exploration; production jobs as tested modules with CLI entry points and scheduling.',
      },
      {
        front: 'Memory-efficient iteration?',
        back: 'Read chunks with pandas chunksize, pyarrow record batches, or generators. Avoid loading 100GB into RAM.',
        code: 'for chunk in pd.read_csv("big.csv", chunksize=50_000):\n    process(chunk)',
      },
      {
        front: 'Warehouse loading pattern?',
        back: 'Stage files (S3/GCS) → COPY/LOAD into Snowflake/BQ/Redshift → dbt transform → expose marts to BI.',
      },
    ],
  },
  {
    id: 'performance',
    title: 'Performance',
    cards: [
      {
        front: 'Profiling before optimizing?',
        back: 'cProfile, py-spy, scalene find hotspots. Guess less—measure CPU vs I/O bound first.',
        code: 'python -m cProfile -o out.prof script.py',
      },
      {
        front: 'Big-O in Python interviews?',
        back: 'list append O(1) amortized, insert O(n), lookup in set/dict O(1) avg. Sorting O(n log n). Nested loops on large data hurt.',
      },
      {
        front: 'GIL impact?',
        back: 'Global Interpreter Lock: one thread executes Python bytecode at a time. Threading helps I/O-bound; multiprocessing for CPU-bound parallelism.',
      },
      {
        front: 'multiprocessing vs concurrent.futures?',
        back: 'ProcessPoolExecutor for CPU work across cores. ThreadPoolExecutor for I/O blocking calls.',
        code: 'with ProcessPoolExecutor() as pool:\n    results = list(pool.map heavy, items)',
      },
      {
        front: 'NumPy vectorization?',
        back: 'Operate on arrays in C loops—not Python for loops. Broadcasting avoids explicit expansion.',
        code: 'import numpy as np\n\na = np.array([1, 2, 3])\n(a * 2).sum()',
      },
      {
        front: 'C extensions and Cython?',
        back: 'NumPy, pandas, pydantic core use native code. Cython/Rust extensions for hot paths—last resort after profiling.',
      },
      {
        front: '__slots__ and memory?',
        back: 'Reduce per-object overhead for millions of small instances. dataclass(slots=True) easy win.',
      },
      {
        front: 'Generator vs list?',
        back: 'Generators stream—O(1) memory. Lists materialize everything. Use yield for large file/API pagination pipelines.',
      },
      {
        front: 'Caching layers?',
        back: 'functools.lru_cache, Redis, HTTP Cache-Control. Cache invalidation is hard—TTL + version keys help.',
      },
      {
        front: 'Database performance?',
        back: 'Indexes, avoid N+1, connection pooling, EXPLAIN plans, pagination not OFFSET on huge tables (keyset pagination).',
      },
      {
        front: 'Serialization speed?',
        back: 'orjson/msgpack faster than json for APIs. Measure payload size—compression (gzip, zstd) for large responses.',
      },
      {
        front: 'Lazy imports?',
        back: 'Defer heavy imports until needed—speeds CLI startup and Lambda cold starts if structured carefully.',
        code: 'def get_pd():\n    import pandas as pd\n    return pd',
      },
      {
        front: 'Algorithmic wins?',
        back: 'Set membership vs list scan, heap vs sorted full list, bisect vs linear search—right structure beats micro-opts.',
      },
      {
        front: 'Async for throughput?',
        back: 'Many concurrent I/O waits on one thread. Does not speed CPU Python—pair with process pool for mixed workloads.',
      },
      {
        front: 'Benchmarking pitfalls?',
        back: 'Warmup runs, stable hardware, realistic data size, time.perf_counter. Beware debugging overhead and GC during micro-benchmarks.',
        code: 'import timeit\n\ntimeit.timeit("sum(range(1000))", number=10000)',
      },
    ],
  },
  {
    id: 'clean-code',
    title: 'Clean Code & Patterns',
    cards: [
      {
        front: 'PEP 8 essentials?',
        back: '4 spaces, snake_case functions/vars, PascalCase classes, max line length often 88 (black). Imports grouped stdlib/third/p local.',
      },
      {
        front: 'EAFP vs LBYL?',
        back: 'Easier to Ask Forgiveness than Permission: try/except. Look Before You Leap: explicit checks. Pythonic code often prefers EAFP for race-free file/Key cases.',
        code: 'try:\n    value = mapping[key]\nexcept KeyError:\n    value = default',
      },
      {
        front: 'Single Responsibility Principle?',
        back: 'One reason to change per module/class/function. Split god modules into focused units with clear names.',
      },
      {
        front: 'Dependency inversion in Python?',
        back: 'Depend on abstractions (Protocol/ABC), inject implementations—enables testing and swapping backends.',
      },
      {
        front: 'Repository pattern?',
        back: 'Encapsulate data access behind interface; domain code does not import SQL directly.',
        code: 'class UserRepo(Protocol):\n    def get(self, id: str) -> User: ...',
      },
      {
        front: 'Factory pattern?',
        back: 'Centralize object construction—create_from_config(), plugin registries for strategies.',
      },
      {
        front: 'Strategy pattern?',
        back: 'Pluggable algorithms via callables or classes sharing Protocol—avoid giant if/elif chains.',
        code: 'STRATEGIES = {"csv": parse_csv, "json": parse_json}',
      },
      {
        front: 'Guard clauses?',
        back: 'Early return on invalid input reduces nesting—keep happy path last at low indentation.',
        code: 'def process(data):\n    if not data:\n        return None\n    if not data.valid:\n        raise ValueError("invalid")\n    ...',
      },
      {
        front: 'Explicit is better than implicit?',
        back: 'Zen of Python: clear names, avoid magic globals, document non-obvious behavior. __all__ and public API boundaries.',
      },
      {
        front: 'Exception hierarchy?',
        back: 'Catch specific exceptions. Define domain errors subclassing Exception. Do not bare except—log and re-raise or handle deliberately.',
        code: 'class AppError(Exception): ...\nclass NotFoundError(AppError): ...',
      },
      {
        front: 'Context managers for resources?',
        back: 'Always release files, locks, connections— with statement or @contextmanager. Never rely on __del__.',
      },
      {
        front: 'Avoid mutable default args?',
        back: 'Classic bug—use None sentinel and create fresh container inside function.',
      },
      {
        front: 'Package layout src/ layout?',
        back: 'src/myproject/ prevents accidental imports from cwd. pyproject.toml declares package; tests import installed package.',
      },
      {
        front: 'Logging over print in libraries?',
        back: 'Libraries log; applications configure handlers. Lets consumers control verbosity.',
      },
      {
        front: 'Code review checklist for Python?',
        back: 'Types, tests, edge cases, security (injection, secrets), performance on hot paths, docs for public APIs.',
      },
    ],
  },
  {
    id: 'llm-apps',
    title: 'LLM Applications',
    cards: [
      {
        front: 'OpenAI SDK basic chat?',
        back: 'Client with api_key from env. chat.completions.create with messages roles system/user/assistant.',
        code: 'from openai import OpenAI\n\nclient = OpenAI()\nresp = client.chat.completions.create(\n    model="gpt-4o",\n    messages=[{"role": "user", "content": "Hello"}],\n)',
      },
      {
        front: 'Prompt structure best practices?',
        back: 'Clear instructions, examples (few-shot), output format spec, delimiters for untrusted input. Separate system vs user content.',
      },
      {
        front: 'Temperature and top_p?',
        back: 'Temperature: randomness (0 deterministic-ish, higher creative). top_p nucleus sampling—usually tune one not both aggressively.',
      },
      {
        front: 'Token limits and counting?',
        back: 'Models have context windows; tiktoken estimates tokens. Trim history, summarize, or retrieve only relevant chunks.',
        code: 'import tiktoken\n\nenc = tiktoken.encoding_for_model("gpt-4o")\nlen(enc.encode(text))',
      },
      {
        front: 'Structured outputs?',
        back: 'JSON mode or response_format / tool schemas constrain model to parseable output—validate with Pydantic after.',
        code: 'class Answer(BaseModel):\n    summary: str\n    score: int',
      },
      {
        front: 'Streaming responses?',
        back: 'stream=True yields deltas—better UX latency. Accumulate chunks for display; handle errors mid-stream.',
        code: 'stream = client.chat.completions.create(..., stream=True)\nfor chunk in stream:\n    print(chunk.choices[0].delta.content or "", end="")',
      },
      {
        front: 'System prompt vs user prompt?',
        back: 'System sets behavior/policy; user carries task.input. Keep system stable; inject dynamic context in user or tool results.',
      },
      {
        front: 'Embeddings API use?',
        back: 'Vector representations for semantic search, clustering, dedup. Normalize vectors for cosine similarity.',
        code: 'emb = client.embeddings.create(model="text-embedding-3-small", input=text)\nvector = emb.data[0].embedding',
      },
      {
        front: 'Cost control?',
        back: 'Cheaper models for routing/summarization, cache embeddings, batch API, limit max_tokens, monitor usage per feature.',
      },
      {
        front: 'Evals for LLM apps?',
        back: 'Golden datasets, LLM-as-judge (careful), human review, regression on prompt changes. Track latency and cost metrics.',
      },
      {
        front: 'Prompt injection awareness?',
        back: 'Treat user content as untrusted—delimit instructions vs data, output filtering, least privilege tools, human approval for sensitive actions.',
      },
      {
        front: 'LangChain / LlamaIndex role?',
        back: 'Orchestration abstractions for chains, retrievers, agents. Useful prototypes; understand primitives before heavy framework lock-in.',
      },
      {
        front: 'Local models (Ollama)?',
        back: 'Run open weights locally for dev/privacy. Trade GPU resources and quality vs cloud APIs.',
      },
      {
        front: 'Observability?',
        back: 'Log prompts/responses with PII redaction, trace IDs, LangSmith/Arize/Phoenix for debugging retrieval and tool calls.',
      },
      {
        front: 'Fallback and retries?',
        back: 'Exponential backoff on rate limits, fallback model, graceful degradation message to user when provider down.',
      },
    ],
  },
  {
    id: 'rag',
    title: 'RAG',
    cards: [
      {
        front: 'What is RAG?',
        back: 'Retrieval-Augmented Generation: fetch relevant documents, inject into prompt, then generate—grounds answers in your data.',
      },
      {
        front: 'RAG pipeline steps?',
        back: 'Ingest → chunk → embed → store → retrieve on query → rerank (optional) → prompt LLM with context → cite sources.',
      },
      {
        front: 'Chunking strategies?',
        back: 'Fixed size with overlap, semantic splits, markdown/header-aware. Too small loses context; too large dilutes relevance.',
        code: 'chunk_size = 512\noverlap = 64\n# split text with sliding window',
      },
      {
        front: 'Vector database options?',
        back: 'pgvector, Pinecone, Weaviate, Chroma, Qdrant, FAISS (local). Choose by scale, filtering, ops model, hybrid search needs.',
      },
      {
        front: 'Similarity search basics?',
        back: 'Cosine similarity common for normalized embeddings. Approximate nearest neighbor (HNSW) trades recall for speed.',
      },
      {
        front: 'Metadata filtering?',
        back: 'Store doc_id, source, date, ACL with vectors—filter before vector search for tenant isolation and freshness.',
      },
      {
        front: 'Hybrid search?',
        back: 'Combine keyword (BM25) + vector scores—helps exact matches (SKUs, error codes) pure semantic search misses.',
      },
      {
        front: 'Reranking?',
        back: 'Cross-encoder rerank top-k retrieved chunks for better ordering before LLM context window fill.',
      },
      {
        front: 'Citation and attribution?',
        back: 'Pass source ids to UI; instruct model to quote only from context; detect hallucination when no chunk supports claim.',
      },
      {
        front: 'Context window budgeting?',
        back: 'Rank chunks by score; truncate to fit model limit; summarize long docs hierarchically (map-reduce).',
      },
      {
        front: 'Evaluation metrics for RAG?',
        back: 'Retrieval: recall@k, MRR. Generation: faithfulness, answer relevance. Use held-out Q&A pairs from domain docs.',
      },
      {
        front: 'Ingestion freshness?',
        back: 'Re-embed on document update; version indexes; tombstone deleted docs. Event-driven pipelines on CMS/webhook changes.',
      },
      {
        front: 'LlamaIndex vs custom?',
        back: 'Frameworks provide loaders, index abstractions. Production still needs custom ACL, evals, and monitoring.',
        code: 'from llama_index.core import VectorStoreIndex, SimpleDirectoryReader\n\ndocs = SimpleDirectoryReader("data").load_data()\nindex = VectorStoreIndex.from_documents(docs)',
      },
      {
        front: 'Multimodal RAG?',
        back: 'Embed images/PDF pages with multimodal models; store alongside text metadata for unified retrieval.',
      },
      {
        front: 'Common RAG failures?',
        back: 'Bad chunks, stale index, no hybrid for keyword queries, prompt ignores context, missing access control on retrieval.',
      },
    ],
  },
  {
    id: 'agents',
    title: 'AI Agents',
    cards: [
      {
        front: 'What is an LLM agent?',
        back: 'Loop: model plans → calls tools → observes results → repeats until task done or limit reached. Autonomy bounded by tool set and policies.',
      },
      {
        front: 'ReAct pattern?',
        back: 'Reason + Act interleaved: Thought, Action, Observation traces improve tool use transparency and debugging.',
      },
      {
        front: 'Tool calling / function calling?',
        back: 'Model emits structured tool name + JSON args; runtime executes and returns tool message to model.',
        code: 'tools = [{"type": "function", "function": {"name": "search", "parameters": {...}}}]\nclient.chat.completions.create(..., tools=tools)',
      },
      {
        front: 'Agent loop implementation?',
        back: 'while not done: response = llm(messages, tools); if tool_call: run tool, append result; else return answer. Max iterations guard.',
      },
      {
        front: 'Planning vs reactive agents?',
        back: 'Planning decomposes upfront (task lists). Reactive decides next step each turn—simpler, can drift without checkpoints.',
      },
      {
        front: 'Memory types for agents?',
        back: 'Short-term: conversation buffer. Long-term: vector store summaries. Working memory: scratchpad the model writes to.',
      },
      {
        front: 'Human-in-the-loop?',
        back: 'Approve sensitive tool calls (payments, deletes). Pause/resume with audit log—required in enterprise workflows.',
      },
      {
        front: 'Agent safety guardrails?',
        back: 'Allowlist tools, input validation, output filters, sandbox code execution, rate limits, cost caps per session.',
      },
      {
        front: 'Multi-agent systems?',
        back: 'Specialized agents (researcher, coder, reviewer) coordinate via supervisor or message bus—watch latency and cost multiplication.',
      },
      {
        front: 'LangGraph concept?',
        back: 'State machine / graph of nodes for agent workflows—cycles, checkpoints, persistence vs ad-hoc while loops.',
      },
      {
        front: 'Evaluating agents?',
        back: 'Task success rate, steps to completion, tool error rate, human rubrics. Simulate with mock tools in CI.',
      },
      {
        front: 'Idempotent tools?',
        back: 'Design tools safe to retry—agents will call twice. Use idempotency keys for side effects.',
      },
      {
        front: 'OpenAI Assistants / Responses API?',
        back: 'Hosted threads, tools, code interpreter—faster prototype; less control than custom agent loop.',
      },
      {
        front: 'Debugging agent failures?',
        back: 'Log full message trace, tool I/O, token usage. Replay with frozen model version. Simplify tool surface.',
      },
      {
        front: 'When not to use agents?',
        back: 'Fixed pipelines (ETL), deterministic APIs, strict latency—plain code or single-shot RAG may suffice.',
      },
    ],
  },
  {
    id: 'mcp',
    title: 'Model Context Protocol',
    cards: [
      {
        front: 'What is MCP?',
        back: 'Model Context Protocol: open standard for connecting AI apps to tools, data sources, and prompts via JSON-RPC—USB-C for LLM integrations.',
      },
      {
        front: 'MCP architecture components?',
        back: 'Host (IDE, chat app), Client (connector in host), Server (exposes tools/resources/prompts). One client per server connection.',
      },
      {
        front: 'Tools vs Resources vs Prompts?',
        back: 'Tools: model-invoked actions with side effects. Resources: read-only data URIs/files. Prompts: reusable templated workflows.',
      },
      {
        front: 'stdio transport?',
        back: 'Local servers communicate over stdin/stdout JSON-RPC—common for Claude Desktop and Cursor local MCP servers.',
      },
      {
        front: 'SSE / HTTP transport?',
        back: 'Remote MCP servers over HTTP for shared team tools—consider auth, TLS, and network policies.',
      },
      {
        front: 'Python MCP SDK server sketch?',
        back: 'FastMCP or mcp package defines tools with decorators; run server main for stdio or sse.',
        code: 'from mcp.server.fastmcp import FastMCP\n\nmcp = FastMCP("demo")\n\n@mcp.tool()\ndef add(a: int, b: int) -> int:\n    return a + b',
      },
      {
        front: 'Tool schema design?',
        back: 'Clear names, typed parameters, docstrings become descriptions. Small focused tools beat monolithic swiss-army tools.',
      },
      {
        front: 'Security for MCP servers?',
        back: 'Least privilege credentials, validate inputs, no arbitrary shell without sandbox, audit tool calls, user consent for destructive ops.',
      },
      {
        front: 'Cursor / Claude integration?',
        back: 'Configure mcp.json with command/env to spawn server. Host exposes server tools to model during chat sessions.',
      },
      {
        front: 'Error handling in tools?',
        back: 'Return structured errors to model; do not leak stack traces with secrets. Timeouts on external API calls.',
      },
      {
        front: 'Testing MCP servers?',
        back: 'Unit test tool functions; integration test JSON-RPC messages; mock external services.',
      },
      {
        front: 'Resources for context?',
        back: 'Expose logs, schemas, docs as readable URIs—model pulls context without copying huge prompts manually.',
      },
      {
        front: 'Composing multiple MCP servers?',
        back: 'Host aggregates tool namespaces—watch name collisions; prefix tools per server in config when possible.',
      },
      {
        front: 'MCP vs custom tool plugins?',
        back: 'MCP standardizes discovery, schema, transport—portable across hosts. Custom plugins tie to one vendor SDK.',
      },
      {
        front: 'Production considerations?',
        back: 'Auth for remote servers, rate limits, versioning tools without breaking agents, observability on tool latency/errors.',
      },
    ],
  },
];
