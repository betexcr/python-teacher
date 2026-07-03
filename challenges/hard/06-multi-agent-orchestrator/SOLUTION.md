# Solution: Multi-Agent Orchestrator

## Approach

Linear scan agents; first match runs; enrich result with orchestrator metadata.

## Key concepts

- **orchestrator**: Coordinates specialized workers by task type.
- **Protocol**: Agents share interface without base class.

## Code highlights

- `raise RuntimeError(f"no agent for task kind {task.kind}")` — **raise** — Fail fast with a clear error when input or state is invalid. Orchestrator iterates agents; first can_handle wins; wraps result with agent name; else error.
- `def dispatch(self, task: Task) -> dict[str, object]:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `def run(self, task: Task) -> dict[str, object]: ...` — **type hints** — Return and parameter types document the contract and enable static checking.
- `def __init__(self, agents: list[Agent]) -> None:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `return {"agent": agent.name, "result": result}` — **return** — Returns the computed result to the caller. Orchestrator iterates agents; first can_handle wins; wraps result with agent name; else error.
- `def can_handle(self, task: Task) -> bool: ...` — **type hints** — Return and parameter types document the contract and enable static checking.
- `@dataclass
class Task` — **dataclass Task** — `Task` is a dataclass — boilerplate __init__, __repr__, and comparisons are generated. Orchestrator iterates agents; first can_handle wins; wraps result with agent name; else error.

## Solution code

```python
from dataclasses import dataclass
from typing import Protocol

@dataclass
class Task:
    kind: str
    payload: dict[str, object]

class Agent(Protocol):
    name: str
    def can_handle(self, task: Task) -> bool: ...
    def run(self, task: Task) -> dict[str, object]: ...

class Orchestrator:
    def __init__(self, agents: list[Agent]) -> None:
        self._agents = agents

    def dispatch(self, task: Task) -> dict[str, object]:
        for agent in self._agents:
            if agent.can_handle(task):
                result = agent.run(task)
                return {"agent": agent.name, "result": result}
        raise RuntimeError(f"no agent for task kind {task.kind}")
```

## Walkthrough

Orchestrator iterates agents; first can_handle wins; wraps result with agent name; else error.

## Common mistakes

- Running all agents always
- Silent None when unmatched

## Stretch goals

- Parallel fan-out merge
- LLM-based router
