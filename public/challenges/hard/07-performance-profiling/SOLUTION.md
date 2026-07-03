# Solution: Performance Profiling

## Approach

Run callable under cProfile; capture stats; extract top rows.

## Key concepts

- **cProfile**: Deterministic profiler for Python call stacks.
- **cumulative time**: Includes time in nested calls— good for finding hot paths.

## Code highlights

- `def profile_top(stats_target: Callable[[], object], limit: int = 5) -> list[dict[str, object]]:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `return rows[:limit]` — **return** — Returns the computed result to the caller. Profile enables around target; Stats sorted cumulative; map to dict rows and slice top limit.

## Solution code

```python
import cProfile
import pstats
from io import StringIO
from typing import Callable

def profile_top(stats_target: Callable[[], object], limit: int = 5) -> list[dict[str, object]]:
    profiler = cProfile.Profile()
    profiler.enable()
    stats_target()
    profiler.disable()
    stream = StringIO()
    stats = pstats.Stats(profiler, stream=stream)
    stats.sort_stats("cumulative")
    rows: list[dict[str, object]] = []
    for (filename, line, func), stat in stats.stats.items():
        rows.append({
            "function": f"{filename}:{line}({func})",
            "ncalls": stat.callcount,
            "cumtime": stat.cumtime,
        })
    rows.sort(key=lambda r: r["cumtime"], reverse=True)
    return rows[:limit]
```

## Walkthrough

Profile enables around target; Stats sorted cumulative; map to dict rows and slice top limit.

## Common mistakes

- Profiling in production always on
- Sorting by tottime only

## Stretch goals

- py-spy flame graphs
- Benchmark with pytest-benchmark
