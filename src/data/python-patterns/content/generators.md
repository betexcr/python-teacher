# Generators & Iterators

## What they are

An **iterator** is any object with `__iter__` and `__next__`. A **generator** is a function that uses `yield` to produce values lazily, one at a time, without building the full sequence in memory. Generator expressions offer the same laziness inline.

## When to use

- Processing large files or streams line by line
- Pipelines where each stage transforms items on demand
- Infinite or unbounded sequences
- Replacing lists that would consume too much memory

## Generator function

```python
def read_chunks(path: str, size: int = 4096):
    with open(path, "rb") as f:
        while chunk := f.read(size):
            yield chunk

for block in read_chunks("data.bin"):
    process(block)
```

Each `yield` pauses the function and resumes on the next iteration. Local variables persist between yields.

## Generator expression

```python
lines = (line.strip() for line in open("log.txt") if "ERROR" in line)
for entry in lines:
    handle(entry)
```

Parentheses create a generator object. Unlike a list comprehension, nothing is computed until you iterate.

## itertools and manual iteration

```python
from itertools import islice, chain

def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

first_ten = list(islice(fibonacci(), 10))
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

`islice` takes from an infinite generator without hanging. `chain` flattens multiple iterables lazily.

## send, throw, and close

Generators support `send(value)` to receive data into the generator, `throw(exc)` to inject exceptions, and `close()` to terminate early. These power coroutine-style patterns but are less common than simple `yield` pipelines.

## Tradeoffs

| Aspect | Details |
|--------|---------|
| Pros | Low memory footprint, composable pipelines, lazy evaluation |
| Cons | Single-pass — cannot rewind without `tee`; debugging lazy chains is harder |
| Interview angle | Contrast generators with lists; explain `yield` vs `return` and when laziness matters |
