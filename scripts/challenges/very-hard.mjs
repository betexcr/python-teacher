import { challenge } from './helpers.mjs';

export const veryHardChallenges = [
  challenge({
    slug: '01-mcp-server',
    title: 'MCP Server',
    difficulty: 'very-hard',
    topics: ['mcp', 'stdio'],
    goals: ['Expose tools over MCP', 'Handle JSON-RPC lifecycle'],
    description:
      'Skeleton MCP stdio server registering tool `echo(text: str) -> str` using `mcp.server` SDK patterns with list_tools and call_tool handlers.',
    requirements: ['stdio transport', 'Tool schema in list_tools', 'echo returns input text'],
    starter: `from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp.types import Tool, TextContent

server = Server("demo")

# TODO register tools and run stdio_server`,
    hints: ['@server.list_tools()', '@server.call_tool()', 'return [TextContent(type="text", text=text)]'],
    acceptance: ['Lists echo tool', 'call_tool echo works', 'Runs on stdio transport'],
    solutionApproach:
      'Register handlers listing tool metadata and dispatching call_tool to Python functions.',
    concepts: [{ term: 'MCP', detail: 'Model Context Protocol connects LLM clients to tools.' }, { term: 'stdio transport', detail: 'Simple subprocess IPC for local servers.' }],
    solution: `from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp.types import Tool, TextContent

server = Server("demo")

@server.list_tools()
async def list_tools() -> list[Tool]:
    return [
        Tool(
            name="echo",
            description="Echo text back",
            inputSchema={
                "type": "object",
                "properties": {"text": {"type": "string"}},
                "required": ["text"],
            },
        )
    ]

@server.call_tool()
async def call_tool(name: str, arguments: dict) -> list[TextContent]:
    if name != "echo":
        raise ValueError("unknown tool")
    text = str(arguments.get("text", ""))
    return [TextContent(type="text", text=text)]

async def main() -> None:
    async with stdio_server() as (read, write):
        await server.run(read, write, server.create_initialization_options())`,
    walkthrough:
      'list_tools advertises echo schema; call_tool validates name and returns TextContent; stdio_server hosts IPC.',
    mistakes: ['Missing inputSchema', 'Blocking sync IO in handlers'],
    stretch: ['Resource providers', 'Auth for remote MCP'],
  }),

  challenge({
    slug: '02-production-rag',
    title: 'Production RAG Pipeline',
    difficulty: 'very-hard',
    topics: ['rag', 'production'],
    goals: ['End-to-end ingest and query', 'Observability hooks'],
    description:
      'Build `RagPipeline` with ingest(path), embed via provider callable, store in vector backend, and query(question, k) returning cited chunks.',
    requirements: ['Pluggable embedder', 'Citation includes doc_id', 'Empty store returns []'],
    starter: `from collections.abc import Callable
from pathlib import Path

class RagPipeline:
    def __init__(self, embed: Callable[[list[str]], list[list[float]]], store) -> None:
        self._embed = embed
        self._store = store

    def ingest(self, path: Path) -> int:
        # TODO
        raise NotImplementedError

    def query(self, question: str, k: int = 4) -> list[dict[str, object]]:
        ...`,
    hints: ['text = path.read_text()', 'chunks = chunk_text(text)', 'store.search(embed([question])[0], k)'],
    acceptance: ['Ingest returns chunk count', 'Query returns citations', 'Embedder invoked'],
    solutionApproach:
      'Ingest reads/chunks/embeds/adds; query embeds question and searches with metadata.',
    concepts: [{ term: 'RAG', detail: 'Retrieval augments generation with grounded context.' }, { term: 'citations', detail: 'Users verify answers against source doc ids.' }],
    solution: `from collections.abc import Callable
from pathlib import Path

def chunk_text(text: str, size: int = 400, overlap: int = 40) -> list[str]:
    chunks: list[str] = []
    start = 0
    while start < len(text):
        chunks.append(text[start : start + size])
        start += size - overlap
    return chunks

class RagPipeline:
    def __init__(self, embed: Callable[[list[str]], list[list[float]]], store) -> None:
        self._embed = embed
        self._store = store

    def ingest(self, path: Path) -> int:
        text = path.read_text(encoding="utf-8")
        chunks = chunk_text(text)
        vectors = self._embed(chunks)
        self._store.add(path.stem, chunks, vectors)
        return len(chunks)

    def query(self, question: str, k: int = 4) -> list[dict[str, object]]:
        q_vec = self._embed([question])[0]
        hits = self._store.search(q_vec, k=k)
        return [{"doc_id": h.doc_id, "chunk": h.chunk, "score": getattr(h, "score", None)} for h in hits]`,
    walkthrough:
      'Ingest chunks file and stores embeddings; query embeds question, searches, returns cited chunk dicts.',
    mistakes: ['No overlap on chunks', 'Query without embedding question'],
    stretch: ['Hybrid BM25 + vector', 'Reranker stage'],
  }),

  challenge({
    slug: '03-event-sourced-domain',
    title: 'Event-Sourced Domain',
    difficulty: 'very-hard',
    topics: ['event-sourcing', 'ddd'],
    goals: ['Append domain events', 'Rebuild aggregate state'],
    description:
      'Model `BankAccount` aggregate with events `AccountOpened`, `MoneyDeposited`, `MoneyWithdrawn`; rebuild balance from event log.',
    requirements: ['Immutable event dataclasses', 'apply(event) mutates state', 'withdraw cannot overdraw'],
    starter: `from dataclasses import dataclass

@dataclass(frozen=True)
class AccountOpened:
    account_id: str

@dataclass(frozen=True)
class MoneyDeposited:
    amount: int

@dataclass(frozen=True)
class MoneyWithdrawn:
    amount: int

class BankAccount:
    def __init__(self, account_id: str) -> None:
        self.account_id = account_id
        self.balance = 0
        self._events: list[object] = []

    def deposit(self, amount: int) -> None:
        # TODO emit event
        ...

    def withdraw(self, amount: int) -> None:
        ...`,
    hints: ['self._events.append(MoneyDeposited(amount))', 'self.apply(event) updates balance', 'if amount > self.balance: raise'],
    acceptance: ['Events recorded', 'Balance correct after replay', 'Overdraft blocked'],
    solutionApproach:
      'Commands append events; apply updates state; replay reproduces aggregate.',
    concepts: [{ term: 'event sourcing', detail: 'State is derived from immutable event history.' }, { term: 'aggregate', detail: 'Consistency boundary enforcing business rules.' }],
    solution: `from dataclasses import dataclass

@dataclass(frozen=True)
class AccountOpened:
    account_id: str

@dataclass(frozen=True)
class MoneyDeposited:
    amount: int

@dataclass(frozen=True)
class MoneyWithdrawn:
    amount: int

class BankAccount:
    def __init__(self, account_id: str) -> None:
        self.account_id = account_id
        self.balance = 0
        self._events: list[object] = [AccountOpened(account_id)]

    def apply(self, event: object) -> None:
        if isinstance(event, MoneyDeposited):
            self.balance += event.amount
        elif isinstance(event, MoneyWithdrawn):
            self.balance -= event.amount

    def deposit(self, amount: int) -> None:
        if amount <= 0:
            raise ValueError("amount must be positive")
        event = MoneyDeposited(amount)
        self._events.append(event)
        self.apply(event)

    def withdraw(self, amount: int) -> None:
        if amount <= 0:
            raise ValueError("amount must be positive")
        if amount > self.balance:
            raise ValueError("insufficient funds")
        event = MoneyWithdrawn(amount)
        self._events.append(event)
        self.apply(event)

    @classmethod
    def replay(cls, events: list[object]) -> "BankAccount":
        opened = events[0]
        if not isinstance(opened, AccountOpened):
            raise ValueError("first event must be AccountOpened")
        acc = cls(opened.account_id)
        acc._events = []
        acc.balance = 0
        for event in events:
            acc._events.append(event)
            acc.apply(event)
        return acc`,
    walkthrough:
      'Commands validate, append events, apply to balance; replay rebuilds from scratch from event list.',
    mistakes: ['Mutating events after append', 'Updating balance without event'],
    stretch: ['Event store persistence', 'Snapshots for long streams'],
  }),

  challenge({
    slug: '04-distributed-task-scheduler',
    title: 'Distributed Task Scheduler',
    difficulty: 'very-hard',
    topics: ['scheduling', 'redis'],
    goals: ['Schedule delayed jobs', 'Ensure at-least-once execution'],
    description:
      'Implement Redis-backed scheduler storing `(run_at, task_id, payload)` sorted set; worker polls due tasks and executes handlers idempotently.',
    requirements: ['schedule(run_at, task_id, payload)', 'Worker fetches due items', 'Idempotent task_id handling'],
    starter: `import json
import time
from dataclasses import dataclass

@dataclass
class ScheduledTask:
    task_id: str
    run_at: float
    payload: dict[str, object]

class RedisScheduler:
    def __init__(self, redis_client, queue_key: str = "sched:tasks") -> None:
        self._redis = redis_client
        self._key = queue_key
        self._seen: set[str] = set()

    def schedule(self, task: ScheduledTask) -> None:
        # TODO zadd with score run_at
        ...

    def poll_due(self, now: float | None = None) -> list[ScheduledTask]:
        ...`,
    hints: ['self._redis.zrangebyscore(key, 0, now)', 'json.dumps payload as member', 'skip if task_id in self._seen'],
    acceptance: ['Future tasks not polled', 'Due tasks returned', 'Duplicate task_id skipped'],
    solutionApproach:
      'Sorted set scores are timestamps; poll range; track processed ids for idempotency.',
    concepts: [{ term: 'sorted set', detail: 'Redis ZSET orders tasks by run_at score.' }, { term: 'idempotency', detail: 'Safe retries when workers duplicate delivery.' }],
    solution: `import json
import time
from dataclasses import dataclass

@dataclass
class ScheduledTask:
    task_id: str
    run_at: float
    payload: dict[str, object]

class RedisScheduler:
    def __init__(self, redis_client, queue_key: str = "sched:tasks") -> None:
        self._redis = redis_client
        self._key = queue_key
        self._seen: set[str] = set()

    def schedule(self, task: ScheduledTask) -> None:
        member = json.dumps({"task_id": task.task_id, "payload": task.payload})
        self._redis.zadd(self._key, {member: task.run_at})

    def poll_due(self, now: float | None = None) -> list[ScheduledTask]:
        now = now or time.time()
        raw = self._redis.zrangebyscore(self._key, 0, now)
        due: list[ScheduledTask] = []
        for item in raw:
            data = json.loads(item)
            task_id = data["task_id"]
            if task_id in self._seen:
                continue
            self._seen.add(task_id)
            due.append(ScheduledTask(task_id=task_id, run_at=now, payload=data["payload"]))
            self._redis.zrem(self._key, item)
        return due`,
    walkthrough:
      'schedule zadds JSON member with run_at score; poll_due reads range, dedupes task_id, removes processed entries.',
    mistakes: ['Polling without removing tasks', 'No idempotency on retries'],
    stretch: ['Leader election for workers', 'Dead letter queue'],
  }),

  challenge({
    slug: '05-llm-agent-memory',
    title: 'LLM Agent Memory',
    difficulty: 'very-hard',
    topics: ['agents', 'memory'],
    goals: ['Persist conversation turns', 'Retrieve relevant memory'],
    description:
      'Implement `AgentMemory` storing messages, summarizing when token budget exceeded, and retrieving last N plus summary for prompt context.',
    requirements: ['add(role, content)', 'summarize triggers over budget', 'context_for_query returns str'],
    starter: `from dataclasses import dataclass

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
        ...`,
    hints: ['estimate tokens as len(content)//4', 'if over budget: self._summary = summarize', 'return summary + recent messages'],
    acceptance: ['Messages stored', 'Summary created when over budget', 'Context includes recent turns'],
    solutionApproach:
      'Track pseudo tokens; compress old messages to summary; build prompt context string.',
    concepts: [{ term: 'context window', detail: 'LLMs limit input size; memory must compress history.' }, { term: 'summarization', detail: 'Rolling summary preserves long-term intent cheaply.' }],
    solution: `from dataclasses import dataclass

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
        return "\\n".join(parts)`,
    walkthrough:
      'add tracks messages; when pseudo tokens exceed budget, fold older into summary; context_for_query builds prompt string.',
    mistakes: ['Unbounded message list', 'Dropping summary on next add'],
    stretch: ['Vector memory retrieval', 'LLM-based summarizer'],
  }),
];
