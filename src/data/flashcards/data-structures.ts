import type { FlashcardDeck } from './types';

export const dataStructuresDeck: FlashcardDeck = {
  "id": "data-structures",
  "slug": "data-structures",
  "title": "Data Structures",
  "cards": [
    {
      "question": "When to use list vs deque?",
      "explanation": "list: fast append/pop at end. collections.deque: O(1) append/pop at both ends—queues, BFS, sliding windows.\n\n```python\nfrom collections import deque\n\nq = deque([1, 2, 3])\nq.appendleft(0)\nq.pop()\n```"
    },
    {
      "question": "What is defaultdict?",
      "explanation": "dict subclass that calls a factory for missing keys—avoids KeyError boilerplate for grouping and counting.\n\n```python\nfrom collections import defaultdict\n\ngroups = defaultdict(list)\ngroups[\"a\"].append(1)\n```"
    },
    {
      "question": "What is Counter?",
      "explanation": "Multiset / frequency map. most_common(n) returns top items. Supports arithmetic with other Counters.\n\n```python\nfrom collections import Counter\n\nc = Counter(\"abracadabra\")\nc.most_common(2)  # [(\"a\", 5), (\"b\", 2)]\n```"
    },
    {
      "question": "OrderedDict vs dict today?",
      "explanation": "Since 3.7, plain dict preserves insertion order. OrderedDict still useful for move_to_end, popitem(last=False), and ordered equality semantics."
    },
    {
      "question": "What is a heap in Python?",
      "explanation": "heapq implements a min-heap on a list. heappush/heappop are O(log n). Use for priority queues; negate values for max-heap pattern.\n\n```python\nimport heapq\n\nh = [3, 1, 4]\nheapq.heapify(h)\nheapq.heappush(h, 2)\nheapq.heappop(h)  # 1\n```"
    },
    {
      "question": "bisect module use case?",
      "explanation": "Maintain sorted lists with O(log n) insert/search position. Useful for timelines, leaderboards, offline sorted data.\n\n```python\nimport bisect\n\nscores = [10, 20, 30]\nbisect.insort(scores, 25)\n```"
    },
    {
      "question": "What is namedtuple?",
      "explanation": "Lightweight immutable record with named fields. typing.NamedTuple adds type hints; dataclass is richer for mutable models.\n\n```python\nfrom typing import NamedTuple\n\nclass Point(NamedTuple):\n    x: float\n    y: float\n```"
    },
    {
      "question": "set operations?",
      "explanation": "Union |, intersection &, difference -, symmetric_difference ^. Sets require hashable elements; dedupe with set(seq) preserving order via dict.fromkeys in 3.7+.\n\n```python\na = {1, 2, 3}\nb = {3, 4}\na & b  # {3}\nlist(dict.fromkeys([1, 2, 1, 3]))  # [1, 2, 3]\n```"
    },
    {
      "question": "What is array.array?",
      "explanation": "Compact homogeneous numeric array (C types). Use when you need memory-efficient numeric buffers before reaching for NumPy."
    },
    {
      "question": "ChainMap use case?",
      "explanation": "Logical stack of dicts for scoped lookups—defaults layered with overrides (config: env > file > defaults).\n\n```python\nfrom collections import ChainMap\n\ndefaults = {\"debug\": False}\nenv = {\"debug\": True}\nChainMap(env, defaults)[\"debug\"]  # True\n```"
    },
    {
      "question": "Tree structures in stdlib?",
      "explanation": "No built-in tree. Use classes, dict-of-dicts, or third-party (anytree). Binary search: bisect on sorted list or implement nodes."
    },
    {
      "question": "Graph representation in Python?",
      "explanation": "Adjacency list: dict[node, list[neighbor]]. For weighted graphs use dict[node, list[tuple[neighbor, weight]]]. NetworkX for heavy graph work.\n\n```python\ngraph = {\n    \"A\": [\"B\", \"C\"],\n    \"B\": [\"D\"],\n    \"C\": [],\n    \"D\": [],\n}\n```"
    },
    {
      "question": "What is __slots__?",
      "explanation": "Declares fixed attributes on a class—reduces per-instance __dict__ memory and speeds attribute access. Tradeoff: no dynamic attributes.\n\n```python\nclass Point:\n    __slots__ = (\"x\", \"y\")\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n```"
    },
    {
      "question": "Shallow vs deep copy?",
      "explanation": "copy.copy is shallow (nested objects shared). copy.deepcopy recursively copies nested structures—needed before mutating nested mutable state.\n\n```python\nimport copy\n\noriginal = {\"a\": [1, 2]}\nshallow = copy.copy(original)\ndeep = copy.deepcopy(original)\n```"
    },
    {
      "question": "LRU cache pattern?",
      "explanation": "functools.lru_cache memoizes pure functions. OrderedDict or cachetools for custom eviction. Thread-safe caches need locks or cachetools.\n\n```python\nfrom functools import lru_cache\n\n@lru_cache(maxsize=128)\ndef fib(n: int) -> int:\n    return n if n < 2 else fib(n - 1) + fib(n - 2)\n```"
    }
  ]
};
