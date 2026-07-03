# Solution: FizzBuzz

## Approach

Loop 1..n and build strings with ordered divisibility checks.

## Key concepts

- **Modulo**: % returns the remainder and cleanly detects multiples.
- **Pure function**: No I/O; same input always yields the same output.

## Code highlights

- `def fizzbuzz(n: int) -> list[str]:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `for i in range(1, n + 1):` — **for loop** — Iterates over a sequence. We iterate inclusively with range(1, n + 1).
- `return out` — **return** — Returns the computed result to the caller. We iterate inclusively with range(1, n + 1). Testing 15 first avoids falling through to Fizz or Buzz alone. Otherwise we append str(i).

## Solution code

```python
def fizzbuzz(n: int) -> list[str]:
    out: list[str] = []
    for i in range(1, n + 1):
        if i % 15 == 0:
            out.append("FizzBuzz")
        elif i % 3 == 0:
            out.append("Fizz")
        elif i % 5 == 0:
            out.append("Buzz")
        else:
            out.append(str(i))
    return out
```

## Walkthrough

We iterate inclusively with range(1, n + 1). Testing 15 first avoids falling through to Fizz or Buzz alone. Otherwise we append str(i).

## Common mistakes

- Checking 3 and 5 in separate ifs without elif
- Using print instead of return

## Stretch goals

- Generator version with yield
- Accept custom words for 3 and 5
