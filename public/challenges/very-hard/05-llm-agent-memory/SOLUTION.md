# Solution: LLM Agent Memory

## Approach

Track pseudo tokens; compress old messages to summary; build prompt context string.

## Key concepts

- **context window**: LLMs limit input size; memory must compress history.
- **summarization**: Rolling summary preserves long-term intent cheaply.

## Code highlights

- `def context_for_query(self, query: str, last_n: int = 6) -> str:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `def __init__(self, token_budget: int = 2000) -> None:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `def add(self, role: str, content: str) -> None:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `def _estimate_tokens(self) -> int:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `def _summarize_old(self) -> None:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `@dataclass
class Message` — **dataclass Message** — `Message` is a dataclass — boilerplate __init__, __repr__, and comparisons are generated. add tracks messages; when pseudo tokens exceed budget, fold older into summary; context_for_query builds prompt string.
- `return "\n".join(parts)` — **return** — Returns the computed result to the caller. add tracks messages; when pseudo tokens exceed budget, fold older into summary; context_for_query builds prompt string.
- `return total` — **return** — Returns the computed result to the caller. add tracks messages; when pseudo tokens exceed budget, fold older into summary; context_for_query builds prompt string.

## Solution code

```python
from dataclasses import dataclass

@dataclass
class Message:
    role: str
    content: str

class AgentMemory:
    def __init__(self, token_budget: int = 2000) -> None:
        self.token_budget = token_budget
        self._messages: list[Message] = []
        self._summary: str = ""

    def _estimate_tokens(self) -> int:
        total = len(self._summary) // 4
        total += sum(len(m.content) // 4 for m in self._messages)
        return total

    def _summarize_old(self) -> None:
        if len(self._messages) <= 2:
            return
        old = self._messages[:-2]
        joined = " | ".join(f"{m.role}: {m.content}" for m in old)
        self._summary = (self._summary + " " + joined).strip()[:1000]
        self._messages = self._messages[-2:]

    def add(self, role: str, content: str) -> None:
        self._messages.append(Message(role=role, content=content))
        if self._estimate_tokens() > self.token_budget:
            self._summarize_old()

    def context_for_query(self, query: str, last_n: int = 6) -> str:
        recent = self._messages[-last_n:]
        parts = []
        if self._summary:
            parts.append(f"Summary: {self._summary}")
        parts.extend(f"{m.role}: {m.content}" for m in recent)
        parts.append(f"User query: {query}")
        return "\n".join(parts)
```

## Walkthrough

add tracks messages; when pseudo tokens exceed budget, fold older into summary; context_for_query builds prompt string.

## Common mistakes

- Unbounded message list
- Dropping summary on next add

## Stretch goals

- Vector memory retrieval
- LLM-based summarizer
