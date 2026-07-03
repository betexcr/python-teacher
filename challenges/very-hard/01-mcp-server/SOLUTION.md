# Solution: MCP Server

## Approach

Register handlers listing tool metadata and dispatching call_tool to Python functions.

## Key concepts

- **MCP**: Model Context Protocol connects LLM clients to tools.
- **stdio transport**: Simple subprocess IPC for local servers.

## Code highlights

- `await server.run(read, write, server.create_initialization_options())` — **await** — Suspends until the coroutine or future completes. list_tools advertises echo schema; call_tool validates name and returns TextContent; stdio_server hosts IPC.
- `async def call_tool(name: str, arguments: dict)` — **async call_tool** — `call_tool` is a coroutine — call it with await or asyncio.run. list_tools advertises echo schema; call_tool validates name and returns TextContent; stdio_server hosts IPC.
- `return [TextContent(type="text", text=text)]` — **return** — Returns the computed result to the caller. list_tools advertises echo schema; call_tool validates name and returns TextContent; stdio_server hosts IPC.
- `with stdio_server() as (read, write):` — **with** — Context manager — setup on enter, cleanup on exit even if an exception occurs. list_tools advertises echo schema; call_tool validates name and returns TextContent; stdio_server hosts IPC.
- `raise ValueError("unknown tool")` — **raise** — Fail fast with a clear error when input or state is invalid. list_tools advertises echo schema; call_tool validates name and returns TextContent; stdio_server hosts IPC.
- `async def list_tools()` — **async list_tools** — `list_tools` is a coroutine — call it with await or asyncio.run. list_tools advertises echo schema; call_tool validates name and returns TextContent; stdio_server hosts IPC.
- `async def main()` — **async main** — `main` is a coroutine — call it with await or asyncio.run. list_tools advertises echo schema; call_tool validates name and returns TextContent; stdio_server hosts IPC.
- `return [` — **return** — Returns the computed result to the caller. list_tools advertises echo schema; call_tool validates name and returns TextContent; stdio_server hosts IPC.

## Solution code

```python
from mcp.server import Server
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
        await server.run(read, write, server.create_initialization_options())
```

## Walkthrough

list_tools advertises echo schema; call_tool validates name and returns TextContent; stdio_server hosts IPC.

## Common mistakes

- Missing inputSchema
- Blocking sync IO in handlers

## Stretch goals

- Resource providers
- Auth for remote MCP
