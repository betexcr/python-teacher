# Multi-Agent Orchestrator

**Difficulty:** hard  
**Topics:** agents, orchestration

## Learning goals

- Route tasks between agents
- Aggregate results

## Challenge

Implement `Orchestrator` registering agents with `can_handle(task)` and `run(task)`; route first matching agent and return structured result.

## Requirements

1. Protocol for Agent
2. Raise if no agent matches
3. Collect metadata timing

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/hard/06-multi-agent-orchestrator/`. Reference write-ups in this repo live under `challenges/hard/06-multi-agent-orchestrator/` (not loaded by the app).

```python
from dataclasses import dataclass
from typing import Protocol

@dataclass
class Task:
    kind: str
    payload: dict[str, object]

class Agent(Protocol):
    def can_handle(self, task: Task) -> bool: ...
    def run(self, task: Task) -> dict[str, object]: ...

class Orchestrator:
    def __init__(self, agents: list[Agent]) -> None:
        self._agents = agents

    def dispatch(self, task: Task) -> dict[str, object]:
        # TODO
        raise NotImplementedError
```

## Hints

1. for agent in self._agents
2. if agent.can_handle(task): return agent.run(task)
3. raise RuntimeError("no agent")

## Acceptance criteria

- [ ] **Correct agent selected**
  Correct agent selected. Write a small script or pytest test that demonstrates this behavior matches Multi-Agent Orchestrator.

- [ ] **Unknown task fails**
  Unknown task fails. Write a small script or pytest test that demonstrates this behavior matches Multi-Agent Orchestrator.

- [ ] **Result includes agent name**
  Result includes agent name. Write a small script or pytest test that demonstrates this behavior matches Multi-Agent Orchestrator.

## Resources

- [agents – reference](https://platform.openai.com/docs/guides/agents)
- [Python Tutorial](https://docs.python.org/3/tutorial/)
