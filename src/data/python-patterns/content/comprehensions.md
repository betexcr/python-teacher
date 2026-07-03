# List & Dict Comprehensions

## What they are

Comprehensions build collections from iterables in a single expression. They replace verbose `for` loops plus `.append()` or manual dict insertion with readable, often faster syntax. Python supports list, dict, set, and generator comprehensions.

## When to use

- Transform or filter a sequence in one pass
- Build lookup tables from existing data
- Replace simple loops where the intent is "collect results"
- Prefer generator comprehensions when you only iterate once and want lazy evaluation

## List comprehension

```python
users = [
    {"name": "Ada", "active": True},
    {"name": "Bob", "active": False},
    {"name": "Lin", "active": True},
]

active_names = [u["name"] for u in users if u["active"]]
# ['Ada', 'Lin']
```

The pattern is `[expression for item in iterable if condition]`. The `if` clause is optional.

## Dict and set comprehensions

```python
scores = {"ada": 98, "bob": 72, "lin": 85}

passed = {name: score for name, score in scores.items() if score >= 80}
# {'ada': 98, 'lin': 85}

unique_lengths = {len(name) for name in scores}
```

Dict comprehensions use `{key: value for ...}`. Set comprehensions use `{expr for ...}` with curly braces and no colon.

## Nested comprehensions

```python
matrix = [[1, 2], [3, 4], [5, 6]]
flat = [n for row in matrix for n in row]
# [1, 2, 3, 4, 5, 6]
```

Read nested comprehensions left to right like nested loops. Keep nesting shallow — two levels is usually the limit before a plain loop is clearer.

## Tradeoffs

| Aspect | Details |
|--------|---------|
| Pros | Concise, often faster than manual loops, expresses intent clearly |
| Cons | Complex nested comprehensions hurt readability; side effects belong in regular loops |
| Interview angle | Know when a comprehension is clearer than `map`/`filter`, and when to stop and use a `for` loop |

## Guidelines

- One comprehension should do one thing: filter, transform, or flatten — not all three at once
- Use generator expressions `(x for x in items)` inside functions like `sum()` or `max()` to avoid building intermediate lists
- Walrus operator `:=` can help in comprehensions when you need a temporary binding, but use sparingly
