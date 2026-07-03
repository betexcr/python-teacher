# Log Line Parser

**Difficulty:** easy  
**Topics:** strings, parsing

## Learning goals

- Split and validate text
- Return structured dicts

## Challenge

Parse simple log lines like `[ERROR] disk full` into `{"level": "ERROR", "message": "disk full"}`. Lines without a bracketed level should raise `ValueError`.

## Requirements

1. Level is uppercase inside brackets
2. Message is trimmed
3. Invalid format raises ValueError

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/easy/02-string-parsing/`. Reference write-ups in this repo live under `challenges/easy/02-string-parsing/` (not loaded by the app).

```python
def parse_log_line(line: str) -> dict[str, str]:
    # TODO: extract [LEVEL] and message
    raise NotImplementedError
```

## Hints

1. line.startswith("[")
2. split("]", 1) once
3. strip() the message part

## Acceptance criteria

- [ ] **Valid line parses**
  Valid line parses: Invalid format raises ValueError. Write a small script or pytest test that demonstrates this behavior matches Log Line Parser.

- [ ] **Whitespace trimmed**
  Whitespace trimmed. Write a small script or pytest test that demonstrates this behavior matches Log Line Parser.

- [ ] **Bad line raises**
  Bad line raises. Write a small script or pytest test that demonstrates this behavior matches Log Line Parser.

## Resources

- [str – Python docs](https://docs.python.org/3/library/stdtypes.html#text-sequence-type-str)
- [parsing – reference](https://docs.python.org/3/library/stdtypes.html#str.split)
