# Solution: Log Line Parser

## Approach

Split on the first closing bracket, validate, and return a dict.

## Key concepts

- **split(maxsplit)**: Limits splits so messages containing ] stay intact.
- **Validation**: Raise ValueError early for malformed input.

## Code highlights

- `return {"level": level.upper(), "message": message.strip()}` — **return** — Returns the computed result to the caller. We strip input, require bracket structure, split once on ], normalize level, and return message stripped.
- `def parse_log_line(line: str) -> dict[str, str]:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `raise ValueError("invalid log line")` — **raise** — Fail fast with a clear error when input or state is invalid. We strip input, require bracket structure, split once on ], normalize level, and return message stripped.
- `raise ValueError("missing level")` — **raise** — Fail fast with a clear error when input or state is invalid. We strip input, require bracket structure, split once on ], normalize level, and return message stripped.

## Solution code

```python
def parse_log_line(line: str) -> dict[str, str]:
    line = line.strip()
    if not line.startswith("[") or "]" not in line:
        raise ValueError("invalid log line")
    level_part, message = line.split("]", 1)
    level = level_part.removeprefix("[").strip()
    if not level:
        raise ValueError("missing level")
    return {"level": level.upper(), "message": message.strip()}
```

## Walkthrough

We strip input, require bracket structure, split once on ], normalize level, and return message stripped.

## Common mistakes

- Using regex when split suffices
- Swallowing errors and returning None

## Stretch goals

- Support optional timestamp prefix
- Return a TypedDict or dataclass
