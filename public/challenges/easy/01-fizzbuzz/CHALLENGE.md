# FizzBuzz

**Difficulty:** easy  
**Topics:** control-flow, loops

## Learning goals

- Practice modulo and branching
- Return a list from a pure function

## Challenge

Implement `fizzbuzz(n: int) -> list[str]` that returns values from 1 through `n` inclusive. Multiples of 3 become `"Fizz"`, multiples of 5 become `"Buzz"`, multiples of both become `"FizzBuzz"`, otherwise the number as a string.

## Requirements

1. Return exactly n items
2. 15 maps to FizzBuzz
3. 1 maps to "1"
4. Do not print; return the list

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/easy/01-fizzbuzz/`. Reference write-ups in this repo live under `challenges/easy/01-fizzbuzz/` (not loaded by the app).

```python
def fizzbuzz(n: int) -> list[str]:
    """Return FizzBuzz strings for 1..n."""
    # TODO
    raise NotImplementedError
```

## Hints

1. Use % for divisibility
2. Check 15 before 3 or 5 alone
3. str(i) for plain numbers

## Acceptance criteria

- [ ] **Correct FizzBuzz at 15**
  Correct FizzBuzz at 15. Write a small script or pytest test that demonstrates this behavior matches FizzBuzz.

- [ ] **Plain numbers as strings**
  Plain numbers as strings. Write a small script or pytest test that demonstrates this behavior matches FizzBuzz.

- [ ] **Length equals n**
  Length equals n. Write a small script or pytest test that demonstrates this behavior matches FizzBuzz.

## Resources

- [Control flow – Python tutorial](https://docs.python.org/3/tutorial/controlflow.html)
- [for statements – Python tutorial](https://docs.python.org/3/tutorial/controlflow.html#for-statements)
