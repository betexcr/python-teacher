import type { FlashcardDeck } from './types';

export const pythonFundamentalsDeck: FlashcardDeck = {
  "id": "python-fundamentals",
  "slug": "fundamentals",
  "title": "Python Fundamentals",
  "cards": [
    {
      "question": "What are the main built-in numeric types in Python?",
      "explanation": "int (arbitrary precision), float (IEEE double), complex. bool is a subclass of int. Use decimal.Decimal for money, fractions.Fraction for rationals."
    },
    {
      "question": "Mutable vs immutable types?",
      "explanation": "Immutable: int, float, str, tuple, frozenset, bytes. Mutable: list, dict, set, bytearray. Immutable objects cannot change in place; rebinding a name creates a new object."
    },
    {
      "question": "How does variable assignment work in Python?",
      "explanation": "Names bind to objects; assignment does not copy unless you explicitly copy. Multiple names can refer to the same object.\n\n```python\na = [1, 2]\nb = a\nb.append(3)\nprint(a)  # [1, 2, 3]\n```"
    },
    {
      "question": "What is truthiness in Python?",
      "explanation": "Falsy: None, False, 0, 0.0, empty \"\", [], {}, set(), range(0). Everything else is truthy. Use `if items:` not `if len(items) > 0`."
    },
    {
      "question": "List vs tuple?",
      "explanation": "Lists are mutable, growable sequences; tuples are immutable and hashable (when elements are hashable). Tuples are lighter and safe as dict keys or return values.\n\n```python\ncoords = (10.0, 20.0)\npoints = [(0, 0), (1, 1)]\n```"
    },
    {
      "question": "How do dicts work internally (high level)?",
      "explanation": "CPython 3.7+ preserves insertion order. Average O(1) lookup via hash table. Keys must be hashable. dict.get(k, default) avoids KeyError.\n\n```python\nuser = {\"name\": \"Ada\", \"role\": \"admin\"}\nuser.get(\"email\", \"unknown\")\n```"
    },
    {
      "question": "What is slicing?",
      "explanation": "sequence[start:stop:step] — stop is exclusive. Negative indices count from the end. Slicing creates a shallow copy for lists.\n\n```python\nnums = [0, 1, 2, 3, 4, 5]\nnums[1:4]    # [1, 2, 3]\nnums[::-1]   # reversed\n```"
    },
    {
      "question": "for loop over a dict?",
      "explanation": "Iterate keys by default. Use .items() for key-value pairs, .values() for values. Never mutate a dict while iterating keys you may delete—collect keys first or iterate a copy.\n\n```python\nfor key, value in config.items():\n    print(f\"{key}={value}\")\n```"
    },
    {
      "question": "What is the walrus operator (:=)?",
      "explanation": "Assignment expression (Python 3.8+). Assigns and returns value in one expression—useful in while/if when you need the value twice.\n\n```python\nwhile (line := f.readline()):\n    process(line)\n```"
    },
    {
      "question": "f-strings vs str.format?",
      "explanation": "f-strings are fastest and most readable for interpolation. format() and % still appear in legacy code. f\"{x=}\" debug syntax prints name and value.\n\n```python\nname = \"Ada\"\nf\"Hello, {name}\"\nf\"{name=}\"  # name='Ada'\n```"
    },
    {
      "question": "What is enumerate?",
      "explanation": "Yields (index, item) pairs while iterating—prefer over manual counter variables.\n\n```python\nfor i, fruit in enumerate([\"apple\", \"banana\"], start=1):\n    print(i, fruit)\n```"
    },
    {
      "question": "What is zip?",
      "explanation": "Pairs elements from iterables in lockstep. Stops at shortest. Use itertools.zip_longest for unequal lengths with fillvalue.\n\n```python\nnames = [\"Ada\", \"Bob\"]\nscores = [98, 87]\nlist(zip(names, scores))  # [(\"Ada\", 98), (\"Bob\", 87)]\n```"
    },
    {
      "question": "How does `is` differ from `==`?",
      "explanation": "`==` compares value equality (__eq__). `is` compares identity (same object in memory). Use `is` only for None, True, False, and singleton checks.\n\n```python\na = [1]\nb = [1]\na == b  # True\na is b  # False\n```"
    },
    {
      "question": "What is a comprehension?",
      "explanation": "Concise syntax to build list/dict/set from iterables. List comp: [f(x) for x in items if cond]. Dict/set comps mirror this pattern.\n\n```python\nsquares = [n * n for n in range(10) if n % 2 == 0]\nunique = {word.lower() for word in words}\n```"
    },
    {
      "question": "How do you read and write files safely?",
      "explanation": "Use `with open(path, encoding=\"utf-8\") as f:` so the file closes even on exceptions. Always specify encoding for text files on Windows.\n\n```python\nfrom pathlib import Path\n\npath = Path(\"data.txt\")\ntext = path.read_text(encoding=\"utf-8\")\npath.write_text(text + \"\\n\", encoding=\"utf-8\")\n```"
    }
  ]
};
