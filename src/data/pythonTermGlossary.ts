/** Python vocabulary: tooltips for Python Basics prose and code legends. */
export type PythonTermId =
  | 'python'
  | 'gil'
  | 'pep8'
  | 'dunder'
  | 'decorator'
  | 'generator'
  | 'dataclass'
  | 'protocol'
  | 'asyncio'
  | 'pytest'
  | 'venv'
  | 'pip'
  | 'fstring'
  | 'comprehension'
  | 'pathlib'
  | 'exception'
  | 'raise'
  | 'import'
  | 'module'
  | 'package'
  | 'typeHint'
  | 'isinstance'
  | 'none'
  | 'truthy'
  | 'iterable'
  | 'iterator'
  | 'lambda'
  | 'withStatement'
  | 'self'
  | 'snakeCase'
  | 'repl'
  | 'interpreter'
  | 'stdlib'
  | 'mypy'
  | 'typing'
  | 'listComprehension'
  | 'dictComprehension'
  | 'zenOfPython';

export const PYTHON_TERM_LABELS: Record<PythonTermId, string> = {
  python: 'Python',
  gil: 'GIL',
  pep8: 'PEP 8',
  dunder: 'dunder methods',
  decorator: 'decorator',
  generator: 'generator',
  dataclass: 'dataclass',
  protocol: 'Protocol',
  asyncio: 'asyncio',
  pytest: 'pytest',
  venv: 'venv',
  pip: 'pip',
  fstring: 'f-string',
  comprehension: 'comprehension',
  pathlib: 'pathlib',
  exception: 'exception',
  raise: 'raise',
  import: 'import',
  module: 'module',
  package: 'package',
  typeHint: 'type hints',
  isinstance: 'isinstance',
  none: 'None',
  truthy: 'truthy',
  iterable: 'iterable',
  iterator: 'iterator',
  lambda: 'lambda',
  withStatement: 'with statement',
  self: 'self',
  snakeCase: 'snake_case',
  repl: 'REPL',
  interpreter: 'interpreter',
  stdlib: 'standard library',
  mypy: 'mypy',
  typing: 'typing',
  listComprehension: 'list comprehension',
  dictComprehension: 'dict comprehension',
  zenOfPython: 'Zen of Python',
};

export const PYTHON_TERM_TIPS: Record<PythonTermId, string> = {
  python:
    'A high-level, dynamically typed language known for readable syntax and a large ecosystem. Runs via an interpreter — no compile step before execution.',
  gil:
    'Global Interpreter Lock — a mutex that lets only one thread execute Python bytecode at a time in CPython. Matters for CPU-bound multithreading; use multiprocessing or native extensions for parallel CPU work.',
  pep8:
    'Style guide for Python code (PEP 8): 4-space indentation, snake_case names, spacing around operators, and import ordering. Linters like ruff enforce it.',
  dunder:
    'Double-underscore special methods like __init__, __str__, __len__. Python calls them for built-in behavior — construction, printing, len(), iteration, etc.',
  decorator:
    'Syntax @wrapper above a function or class. A decorator is a callable that takes a function and returns a modified or wrapped version — used for logging, auth, retries.',
  generator:
    'A function that uses yield to produce values lazily, one at a time, without building the whole list in memory. Generator expressions use (x for x in items).',
  dataclass:
    '@dataclass decorator (dataclasses module) auto-generates __init__, __repr__, and optional ordering for classes that mainly hold data fields.',
  protocol:
    'typing.Protocol defines a structural interface — “anything with a .close() method” — without inheritance. Great for duck typing with static type checkers.',
  asyncio:
    'Standard library for async/await concurrency on a single thread. Ideal for I/O-bound work (network, disk). async def, await, and asyncio.run() are the basics.',
  pytest:
    'Popular test runner. Write test_ functions or Test classes; assert failures show helpful diffs. Fixtures share setup; parametrize runs many cases.',
  venv:
    'Virtual environment — an isolated folder with its own Python and site-packages. Create with python -m venv .venv so project deps do not clash globally.',
  pip:
    'Package installer for Python. pip install package downloads from PyPI. Pin versions in requirements.txt or pyproject.toml for reproducible installs.',
  fstring:
    'Formatted string literal: f"Hello, {name}" evaluates expressions inside braces at runtime. Preferred over % formatting and .format() for most cases.',
  comprehension:
    'Compact syntax to build lists, dicts, or sets from iterables: [f(x) for x in items if cond]. Readable and often faster than manual append loops.',
  pathlib:
    'pathlib.Path treats paths as objects — join with /, read and write text, check exists(). Preferred over os.path for new code.',
  exception:
    'An error object raised when something fails (ValueError, KeyError, …). Catch with except; uncaught exceptions print a traceback and exit.',
  raise:
    'Explicitly trigger an exception: raise ValueError("message"). Re-raise with bare raise inside except to preserve the original traceback.',
  import:
    'Load code from another module: import json or from pathlib import Path. Imports run the module once; cached in sys.modules.',
  module:
    'A single .py file is a module. Its top-level names (functions, classes) are attributes accessed as module.name.',
  package:
    'A folder of modules, usually with __init__.py. Enables dotted imports like mypkg.utils.helpers.',
  typeHint:
    'Optional annotations like def f(x: int) -> str: document types for humans and tools. Python ignores them at runtime unless you use a runtime checker.',
  isinstance:
    'isinstance(obj, cls) checks whether an object is an instance of a class or tuple of classes. Prefer over type(x) == int when subclasses matter.',
  none:
    'None is Python’s null — a singleton meaning “no value”. Functions without return implicitly return None. Use is None / is not None, not == None.',
  truthy:
    'Values treated as True in if/while: non-zero numbers, non-empty strings, non-empty collections. Falsy: 0, "", [], {}, None, False.',
  iterable:
    'Any object you can loop over with for — lists, strings, dict keys, files, range(). Implements __iter__ or __getitem__.',
  iterator:
    'An object with __next__() that yields items until StopIteration. for loops call iter() then next() under the hood.',
  lambda:
    'Anonymous one-expression function: lambda x: x * 2. Fine for short callbacks; use def for anything multi-line or named for clarity.',
  withStatement:
    'with open(path) as f: acquires a resource and guarantees cleanup in __exit__ — even on exceptions. Context managers implement __enter__/__exit__.',
  self:
    'First parameter of instance methods — the object being called. self.count refers to that instance’s attribute, not the class’s.',
  snakeCase:
    'Python naming convention: lowercase words joined by underscores (user_name, parse_json). Functions, variables, modules; CapWords for classes.',
  repl:
    'Read-Eval-Print Loop — interactive Python shell. Type python, enter expressions, see results immediately. Great for experiments.',
  interpreter:
    'The program that executes Python bytecode line by line (CPython is the reference implementation). python script.py starts the interpreter on your file.',
  stdlib:
    'Batteries-included modules shipped with Python — json, pathlib, datetime, re, unittest. No pip install needed.',
  mypy:
    'Static type checker for Python. Reads type hints and reports mismatches before runtime. Run mypy src/ in CI for typed projects.',
  typing:
    'Standard library module for type hints — Optional, Union, Protocol, TypedDict, Generic, and more. from typing import … or use built-in generics in 3.9+.',
  listComprehension:
    '[expr for x in items if cond] builds a new list. Nested comprehensions are possible but keep them readable — sometimes a plain loop is clearer.',
  dictComprehension:
    '{k: v for k, v in pairs} or {x: f(x) for x in items} builds a dict in one expression.',
  zenOfPython:
    'import this prints guiding principles — “Explicit is better than implicit”, “Readability counts”. Cultural shorthand for Pythonic style.',
};

const PROSE_PATTERNS: { id: PythonTermId; pattern: RegExp }[] = [
  { id: 'listComprehension', pattern: /\blist comprehensions?\b/gi },
  { id: 'dictComprehension', pattern: /\bdict comprehensions?\b/gi },
  { id: 'comprehension', pattern: /\bcomprehensions?\b/gi },
  { id: 'typeHint', pattern: /\btype hints?\b/gi },
  { id: 'withStatement', pattern: /\bwith statement\b/gi },
  { id: 'zenOfPython', pattern: /\bZen of Python\b/g },
  { id: 'stdlib', pattern: /\bstandard library\b/gi },
  { id: 'snakeCase', pattern: /\bsnake_case\b/g },
  { id: 'fstring', pattern: /\bf-strings?\b/gi },
  { id: 'venv', pattern: /\bvirtual environments?\b/gi },
  { id: 'dunder', pattern: /\bdunder methods?\b/gi },
  { id: 'asyncio', pattern: /\basyncio\b/g },
  { id: 'pytest', pattern: /\bpytest\b/g },
  { id: 'pathlib', pattern: /\bpathlib\b/g },
  { id: 'dataclass', pattern: /\bdataclasses?\b/gi },
  { id: 'protocol', pattern: /\bProtocol\b/g },
  { id: 'decorator', pattern: /\bdecorators?\b/gi },
  { id: 'generator', pattern: /\bgenerators?\b/gi },
  { id: 'mypy', pattern: /\bmypy\b/g },
  { id: 'typing', pattern: /\btyping\b/g },
  { id: 'isinstance', pattern: /\bisinstance\b/g },
  { id: 'iterable', pattern: /\biterables?\b/gi },
  { id: 'iterator', pattern: /\biterators?\b/gi },
  { id: 'interpreter', pattern: /\binterpreter\b/gi },
  { id: 'truthy', pattern: /\btruthy\b/gi },
  { id: 'module', pattern: /\bmodules?\b/gi },
  { id: 'package', pattern: /\bpackages?\b/gi },
  { id: 'exception', pattern: /\bexceptions?\b/gi },
  { id: 'raise', pattern: /\braises?\b/gi },
  { id: 'pip', pattern: /\bpip\b/g },
  { id: 'venv', pattern: /\bvenv\b/g },
  { id: 'repl', pattern: /\bREPL\b/g },
  { id: 'gil', pattern: /\bGIL\b/g },
  { id: 'pep8', pattern: /\bPEP 8\b/g },
  { id: 'lambda', pattern: /\blambda\b/g },
  { id: 'self', pattern: /\bself\b/g },
  { id: 'none', pattern: /\bNone\b/g },
  { id: 'python', pattern: /\bPython\b/g },
  { id: 'import', pattern: /\bimports?\b/gi },
];

const CODE_PATTERNS: { id: PythonTermId; pattern: RegExp }[] = [
  ...PROSE_PATTERNS,
  { id: 'fstring', pattern: /f["']/g },
  { id: 'import', pattern: /\b(?:from|import)\s+\w+/g },
  { id: 'withStatement', pattern: /\bwith\s+\w+/g },
  { id: 'lambda', pattern: /\blambda\b/g },
  { id: 'raise', pattern: /\braise\b/g },
  { id: 'self', pattern: /\bself\b/g },
  { id: 'dataclass', pattern: /@dataclass\b/g },
  { id: 'decorator', pattern: /@\w+/g },
];

function findTermIds(text: string, patterns: { id: PythonTermId; pattern: RegExp }[]): PythonTermId[] {
  const found = new Set<PythonTermId>();
  for (const { id, pattern } of patterns) {
    pattern.lastIndex = 0;
    if (pattern.test(text)) found.add(id);
  }
  return [...found];
}

export function collectPythonTermIds(text: string): PythonTermId[] {
  return findTermIds(text, CODE_PATTERNS);
}

export function findPythonTermMatches(
  text: string,
): { start: number; end: number; id: PythonTermId; text: string }[] {
  const matches: { start: number; end: number; id: PythonTermId; text: string }[] = [];

  for (const { id, pattern } of PROSE_PATTERNS) {
    pattern.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = pattern.exec(text)) !== null) {
      matches.push({
        start: m.index,
        end: m.index + m[0].length,
        id,
        text: m[0],
      });
    }
  }

  matches.sort((a, b) => a.start - b.start || b.end - a.end);

  const taken: typeof matches = [];
  let cursor = 0;
  for (const match of matches) {
    if (match.start < cursor) continue;
    taken.push(match);
    cursor = match.end;
  }

  return taken;
}
