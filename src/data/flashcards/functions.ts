import type { FlashcardDeck } from './types';

export const functionsDeck: FlashcardDeck = {
  "id": "functions",
  "slug": "functions",
  "title": "Functions",
  "cards": [
    {
      "question": "Positional vs keyword arguments?",
      "explanation": "Positional fill parameters in order; keyword by name. After *, only keyword-only params allowed (PEP 3102).\n\n```python\ndef connect(host, port=443, *, timeout=30, ssl=True):\n    ...\n```"
    },
    {
      "question": "What does *args do?",
      "explanation": "Collects extra positional arguments into a tuple. Often used for wrappers that forward calls.\n\n```python\ndef log_call(func, *args, **kwargs):\n    print(args, kwargs)\n    return func(*args, **kwargs)\n```"
    },
    {
      "question": "What does **kwargs do?",
      "explanation": "Collects extra keyword arguments into a dict. Unpack with ** when forwarding: func(**kwargs)."
    },
    {
      "question": "Default argument gotcha?",
      "explanation": "Defaults evaluate once at function definition. Mutable defaults (list, dict) are shared across calls—use None sentinel instead.\n\n```python\ndef append_item(item, bucket=None):\n    if bucket is None:\n        bucket = []\n    bucket.append(item)\n    return bucket\n```"
    },
    {
      "question": "What is a closure?",
      "explanation": "Inner function capturing variables from enclosing scope. nonlocal rebinding works in nested functions; global for module-level.\n\n```python\ndef make_multiplier(n):\n    def mul(x):\n        return x * n\n    return mul\n\ndouble = make_multiplier(2)\n```"
    },
    {
      "question": "Lambda limitations?",
      "explanation": "Single expression only—no statements. Fine for short key/sort functions; prefer def for anything non-trivial or debuggable.\n\n```python\nsorted(users, key=lambda u: u[\"last_login\"], reverse=True)\n```"
    },
    {
      "question": "What are decorators?",
      "explanation": "Functions wrapping functions (or classes) to add behavior. @decorator is syntactic sugar for func = decorator(func). functools.wraps preserves metadata.\n\n```python\nfrom functools import wraps\n\ndef retry(fn):\n    @wraps(fn)\n    def wrapper(*args, **kwargs):\n        ...\n    return wrapper\n```"
    },
    {
      "question": "functools.partial?",
      "explanation": "Freezes some arguments of a callable—useful for callbacks and configuring library functions.\n\n```python\nfrom functools import partial\n\nint_from_hex = partial(int, base=16)\nint_from_hex(\"ff\")  # 255\n```"
    },
    {
      "question": "First-class functions meaning?",
      "explanation": "Functions are objects: assign to variables, pass as args, return from functions, store in data structures.\n\n```python\nhandlers = {\"info\": log_info, \"error\": log_error}\nhandlers[level](message)\n```"
    },
    {
      "question": "Generator functions?",
      "explanation": "yield produces lazy iterators—memory efficient for large/streaming data. Each yield saves state; resumes on next().\n\n```python\ndef read_chunks(path, size=4096):\n    with open(path, \"rb\") as f:\n        while chunk := f.read(size):\n            yield chunk\n```"
    },
    {
      "question": "yield from?",
      "explanation": "Delegates to sub-generator—flattens nested iteration and forwards send/throw.\n\n```python\ndef chain(*iterables):\n    for it in iterables:\n        yield from it\n```"
    },
    {
      "question": "Recursion limits?",
      "explanation": "sys.getrecursionlimit() default ~1000. Deep recursion risks RecursionError—prefer iteration or trampolining for very deep trees."
    },
    {
      "question": "What is functools.cache?",
      "explanation": "Python 3.9+ unbounded memoization—simpler than lru_cache when maxsize is not needed.\n\n```python\nfrom functools import cache\n\n@cache\ndef expensive(n: int) -> int:\n    ...\n```"
    },
    {
      "question": "Callable typing?",
      "explanation": "typing.Callable[[ArgTypes], ReturnType] documents function signatures. Protocols (typing.Protocol) for structural subtyping.\n\n```python\nfrom collections.abc import Callable\n\ndef apply(fn: Callable[[int], int], x: int) -> int:\n    return fn(x)\n```"
    },
    {
      "question": "Docstrings and __annotations__?",
      "explanation": "First string literal is __doc__. Annotations on params/return stored in __annotations__—used by type checkers and FastAPI.\n\n```python\ndef greet(name: str) -> str:\n    \"\"\"Return a greeting.\"\"\"\n    return f\"Hello, {name}\"\n```"
    }
  ]
};
