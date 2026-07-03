import type { FlashcardDeck } from './types';

export const performanceDeck: FlashcardDeck = {
  "id": "performance",
  "slug": "performance",
  "title": "Performance",
  "cards": [
    {
      "question": "Profiling before optimizing?",
      "explanation": "cProfile, py-spy, scalene find hotspots. Guess less—measure CPU vs I/O bound first.\n\n```python\npython -m cProfile -o out.prof script.py\n```"
    },
    {
      "question": "Big-O in Python interviews?",
      "explanation": "list append O(1) amortized, insert O(n), lookup in set/dict O(1) avg. Sorting O(n log n). Nested loops on large data hurt."
    },
    {
      "question": "GIL impact?",
      "explanation": "Global Interpreter Lock: one thread executes Python bytecode at a time. Threading helps I/O-bound; multiprocessing for CPU-bound parallelism."
    },
    {
      "question": "multiprocessing vs concurrent.futures?",
      "explanation": "ProcessPoolExecutor for CPU work across cores. ThreadPoolExecutor for I/O blocking calls.\n\n```python\nwith ProcessPoolExecutor() as pool:\n    results = list(pool.map heavy, items)\n```"
    },
    {
      "question": "NumPy vectorization?",
      "explanation": "Operate on arrays in C loops—not Python for loops. Broadcasting avoids explicit expansion.\n\n```python\nimport numpy as np\n\na = np.array([1, 2, 3])\n(a * 2).sum()\n```"
    },
    {
      "question": "C extensions and Cython?",
      "explanation": "NumPy, pandas, pydantic core use native code. Cython/Rust extensions for hot paths—last resort after profiling."
    },
    {
      "question": "__slots__ and memory?",
      "explanation": "Reduce per-object overhead for millions of small instances. dataclass(slots=True) easy win."
    },
    {
      "question": "Generator vs list?",
      "explanation": "Generators stream—O(1) memory. Lists materialize everything. Use yield for large file/API pagination pipelines."
    },
    {
      "question": "Caching layers?",
      "explanation": "functools.lru_cache, Redis, HTTP Cache-Control. Cache invalidation is hard—TTL + version keys help."
    },
    {
      "question": "Database performance?",
      "explanation": "Indexes, avoid N+1, connection pooling, EXPLAIN plans, pagination not OFFSET on huge tables (keyset pagination)."
    },
    {
      "question": "Serialization speed?",
      "explanation": "orjson/msgpack faster than json for APIs. Measure payload size—compression (gzip, zstd) for large responses."
    },
    {
      "question": "Lazy imports?",
      "explanation": "Defer heavy imports until needed—speeds CLI startup and Lambda cold starts if structured carefully.\n\n```python\ndef get_pd():\n    import pandas as pd\n    return pd\n```"
    },
    {
      "question": "Algorithmic wins?",
      "explanation": "Set membership vs list scan, heap vs sorted full list, bisect vs linear search—right structure beats micro-opts."
    },
    {
      "question": "Async for throughput?",
      "explanation": "Many concurrent I/O waits on one thread. Does not speed CPU Python—pair with process pool for mixed workloads."
    },
    {
      "question": "Benchmarking pitfalls?",
      "explanation": "Warmup runs, stable hardware, realistic data size, time.perf_counter. Beware debugging overhead and GC during micro-benchmarks.\n\n```python\nimport timeit\n\ntimeit.timeit(\"sum(range(1000))\", number=10000)\n```"
    }
  ]
};
