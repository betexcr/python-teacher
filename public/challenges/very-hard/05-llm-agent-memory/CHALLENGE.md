# LLM Agent Memory

**Difficulty:** very-hard  
**Topics:** agents, memory

## Learning goals

- Persist conversation turns
- Retrieve relevant memory

## Challenge

Implement `AgentMemory` storing messages, summarizing when token budget exceeded, and retrieving last N plus summary for prompt context.

## Requirements

1. add(role, content)
2. summarize triggers over budget
3. context_for_query returns str

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/very-hard/05-llm-agent-memory/`. Reference write-ups in this repo live under `challenges/very-hard/05-llm-agent-memory/` (not loaded by the app).

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

    def add(self, role: str, content: str) -> None:
        # TODO
        ...

    def context_for_query(self, query: str, last_n: int = 6) -> str:
        ...
```

## Hints

1. estimate tokens as len(content)//4
2. if over budget: self._summary = summarize
3. return summary + recent messages

## Acceptance criteria

- [ ] **Messages stored**
  Messages stored. Write a small script or pytest test that demonstrates this behavior matches LLM Agent Memory.

- [ ] **Summary created when over budget**
  Summary created when over budget. Write a small script or pytest test that demonstrates this behavior matches LLM Agent Memory.

- [ ] **Context includes recent turns**
  Context includes recent turns: context_for_query returns str. Write a small script or pytest test that demonstrates this behavior matches LLM Agent Memory.

## Resources

- [agents – reference](https://platform.openai.com/docs/guides/agents)
- [memory – reference](https://python.langchain.com/docs/concepts/memory/)
