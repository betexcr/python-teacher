# MCP Server

**Difficulty:** very-hard  
**Topics:** mcp, stdio

## Learning goals

- Expose tools over MCP
- Handle JSON-RPC lifecycle

## Challenge

Skeleton MCP stdio server registering tool `echo(text: str) -> str` using `mcp.server` SDK patterns with list_tools and call_tool handlers.

## Requirements

1. stdio transport
2. Tool schema in list_tools
3. echo returns input text

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/very-hard/01-mcp-server/`. Reference write-ups in this repo live under `challenges/very-hard/01-mcp-server/` (not loaded by the app).

```python
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp.types import Tool, TextContent

server = Server("demo")

# TODO register tools and run stdio_server
```

## Hints

1. @server.list_tools()
2. @server.call_tool()
3. return [TextContent(type="text", text=text)]

## Acceptance criteria

- [ ] **Lists echo tool**
  Lists echo tool. Connect with an MCP inspector or client SDK and list tools/resources.

- [ ] **call_tool echo works**
  call_tool echo works. Connect with an MCP inspector or client SDK and list tools/resources.

- [ ] **Runs on stdio transport**
  Runs on stdio transport. Connect with an MCP inspector or client SDK and list tools/resources.

## Resources

- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Python Tutorial](https://docs.python.org/3/tutorial/)
