# LLM Agent with Tools

## Requirements

Build an agent that plans multi-step tasks and calls backend tools (APIs, DB queries):

- **Tools:** Search docs, create ticket, run SQL (read-only), send email—each with JSON schema
- **Loop:** LLM decides tool calls → execute → feed results back until final answer
- **Safety:** Tool allowlist, argument validation, human approval for destructive ops
- **Observability:** Log every tool call, latency, and token usage
- **Timeout:** Max iterations (e.g. 10) and wall-clock budget (60s)

## API Design

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/agent/run` | POST | `{ "goal", "context" }` → SSE stream of thoughts, tool calls, result |
| `/agent/tools` | GET | List available tools (for debugging) |
| `/agent/runs/{id}` | GET | Full trace for audit |

Stream events: `planning`, `tool_call`, `tool_result`, `message`, `error`, `done`.

```text
User goal ──► LLM (with tool schemas) ──► tool_call JSON ──► execute Python function ──► loop
```

## Data Model

```sql
CREATE TABLE agent_runs (
  id           UUID PRIMARY KEY,
  user_id      UUID NOT NULL,
  goal         TEXT NOT NULL,
  status       TEXT DEFAULT 'running',
  total_tokens INT DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE agent_steps (
  id         UUID PRIMARY KEY,
  run_id     UUID REFERENCES agent_runs(id),
  step_index INT NOT NULL,
  kind       TEXT NOT NULL,  -- tool_call | tool_result | message
  payload    JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

Tool definitions stored in code (version controlled), not user-editable at runtime.

## Scaling

- **Queue long runs**—interactive agent in API, heavy research jobs in Celery
- **Parallel tool calls** when LLM returns multiple independent tools (OpenAI parallel function calling)
- **Rate limit** per user on LLM and expensive tools
- **Sandbox** SQL tool with read-only DB role and row limits
- **Cache** tool results within a run to avoid duplicate fetches

## Python Stack

| Layer | Choice |
|-------|--------|
| Framework | FastAPI |
| LLM | OpenAI function calling or Anthropic tool use |
| Validation | Pydantic models per tool |
| Tracing | LangSmith or custom `agent_steps` table |

```python
from pydantic import BaseModel, Field
from openai import AsyncOpenAI

client = AsyncOpenAI()

class SearchDocsArgs(BaseModel):
    query: str = Field(max_length=200)

class CreateTicketArgs(BaseModel):
    title: str
    body: str
    priority: str = "normal"

TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "search_docs",
            "description": "Search internal documentation",
            "parameters": SearchDocsArgs.model_json_schema(),
        },
    },
    {
        "type": "function",
        "function": {
            "name": "create_ticket",
            "description": "Create a support ticket",
            "parameters": CreateTicketArgs.model_json_schema(),
        },
    },
]

async def execute_tool(name: str, arguments: dict) -> str:
    if name == "search_docs":
        args = SearchDocsArgs.model_validate(arguments)
        return json.dumps(await search_docs(args.query))
    if name == "create_ticket":
        args = CreateTicketArgs.model_validate(arguments)
        ticket_id = await create_ticket(args.title, args.body, args.priority)
        return json.dumps({"ticket_id": ticket_id})
    raise ValueError(f"Unknown tool: {name}")

async def run_agent(goal: str, max_steps: int = 10):
    messages = [{"role": "user", "content": goal}]
    for _ in range(max_steps):
        response = await client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
            tools=TOOLS,
        )
        msg = response.choices[0].message
        if not msg.tool_calls:
            yield {"event": "message", "data": msg.content}
            break
        messages.append(msg)
        for call in msg.tool_calls:
            args = json.loads(call.function.arguments)
            yield {"event": "tool_call", "data": {"name": call.function.name, "args": args}}
            result = await execute_tool(call.function.name, args)
            yield {"event": "tool_result", "data": result}
            messages.append({"role": "tool", "tool_call_id": call.id, "content": result})
```

**Interview tip:** Contrast ReAct loop vs single-shot function calling. Emphasize guardrails: validate args, never pass raw LLM SQL to production DB, require approval for `delete_*` tools.
