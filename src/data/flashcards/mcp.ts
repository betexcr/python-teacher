import type { FlashcardDeck } from './types';

export const mcpDeck: FlashcardDeck = {
  "id": "mcp",
  "slug": "mcp",
  "title": "Model Context Protocol",
  "cards": [
    {
      "question": "What is MCP?",
      "explanation": "Model Context Protocol: open standard for connecting AI apps to tools, data sources, and prompts via JSON-RPC—USB-C for LLM integrations."
    },
    {
      "question": "MCP architecture components?",
      "explanation": "Host (IDE, chat app), Client (connector in host), Server (exposes tools/resources/prompts). One client per server connection."
    },
    {
      "question": "Tools vs Resources vs Prompts?",
      "explanation": "Tools: model-invoked actions with side effects. Resources: read-only data URIs/files. Prompts: reusable templated workflows."
    },
    {
      "question": "stdio transport?",
      "explanation": "Local servers communicate over stdin/stdout JSON-RPC—common for Claude Desktop and Cursor local MCP servers."
    },
    {
      "question": "SSE / HTTP transport?",
      "explanation": "Remote MCP servers over HTTP for shared team tools—consider auth, TLS, and network policies."
    },
    {
      "question": "Python MCP SDK server sketch?",
      "explanation": "FastMCP or mcp package defines tools with decorators; run server main for stdio or sse.\n\n```python\nfrom mcp.server.fastmcp import FastMCP\n\nmcp = FastMCP(\"demo\")\n\n@mcp.tool()\ndef add(a: int, b: int) -> int:\n    return a + b\n```"
    },
    {
      "question": "Tool schema design?",
      "explanation": "Clear names, typed parameters, docstrings become descriptions. Small focused tools beat monolithic swiss-army tools."
    },
    {
      "question": "Security for MCP servers?",
      "explanation": "Least privilege credentials, validate inputs, no arbitrary shell without sandbox, audit tool calls, user consent for destructive ops."
    },
    {
      "question": "Cursor / Claude integration?",
      "explanation": "Configure mcp.json with command/env to spawn server. Host exposes server tools to model during chat sessions."
    },
    {
      "question": "Error handling in tools?",
      "explanation": "Return structured errors to model; do not leak stack traces with secrets. Timeouts on external API calls."
    },
    {
      "question": "Testing MCP servers?",
      "explanation": "Unit test tool functions; integration test JSON-RPC messages; mock external services."
    },
    {
      "question": "Resources for context?",
      "explanation": "Expose logs, schemas, docs as readable URIs—model pulls context without copying huge prompts manually."
    },
    {
      "question": "Composing multiple MCP servers?",
      "explanation": "Host aggregates tool namespaces—watch name collisions; prefix tools per server in config when possible."
    },
    {
      "question": "MCP vs custom tool plugins?",
      "explanation": "MCP standardizes discovery, schema, transport—portable across hosts. Custom plugins tie to one vendor SDK."
    },
    {
      "question": "Production considerations?",
      "explanation": "Auth for remote servers, rate limits, versioning tools without breaking agents, observability on tool latency/errors."
    }
  ]
};
