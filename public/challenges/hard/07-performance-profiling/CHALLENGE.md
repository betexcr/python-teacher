# Performance Profiling

**Difficulty:** hard  
**Topics:** profiling, performance

## Learning goals

- Profile hot paths
- Report actionable metrics

## Challenge

Use `cProfile` and `pstats` to wrap `expensive()` and return top 5 functions by cumulative time as list of dicts.

## Requirements

1. Use cProfile.Profile
2. Sort by cumulative
3. Include ncalls and cumtime

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/hard/07-performance-profiling/`. Reference write-ups in this repo live under `challenges/hard/07-performance-profiling/` (not loaded by the app).

```python
import cProfile
import pstats
from io import StringIO

def profile_top(stats_target: callable, limit: int = 5) -> list[dict[str, object]]:
    # TODO
    raise NotImplementedError
```

## Hints

1. prof = cProfile.Profile(); prof.enable()
2. prof.runctx or prof.runcall
3. stats.sort_stats("cumulative")

## Acceptance criteria

- [ ] **Returns up to 5 entries**
  Returns up to 5 entries. Write a small script or pytest test that demonstrates this behavior matches Performance Profiling.

- [ ] **Sorted by cumtime**
  Sorted by cumtime. Write a small script or pytest test that demonstrates this behavior matches Performance Profiling.

- [ ] **Includes function names**
  Includes function names. Write a small script or pytest test that demonstrates this behavior matches Performance Profiling.

## Resources

- [profiling – reference](https://docs.python.org/3/library/profile.html)
- [Python Tutorial](https://docs.python.org/3/tutorial/)
