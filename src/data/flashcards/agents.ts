import type { FlashcardDeck } from './types';

export const agentsDeck: FlashcardDeck = {
  "id": "agents",
  "slug": "agents",
  "title": "AI Agents",
  "cards": [
    {
      "question": "What is an LLM agent?",
      "explanation": "Loop: model plans → calls tools → observes results → repeats until task done or limit reached. Autonomy bounded by tool set and policies."
    },
    {
      "question": "ReAct pattern?",
      "explanation": "Reason + Act interleaved: Thought, Action, Observation traces improve tool use transparency and debugging."
    },
    {
      "question": "Tool calling / function calling?",
      "explanation": "Model emits structured tool name + JSON args; runtime executes and returns tool message to model.\n\n```python\ntools = [{\"type\": \"function\", \"function\": {\"name\": \"search\", \"parameters\": {...}}}]\nclient.chat.completions.create(..., tools=tools)\n```"
    },
    {
      "question": "Agent loop implementation?",
      "explanation": "while not done: response = llm(messages, tools); if tool_call: run tool, append result; else return answer. Max iterations guard."
    },
    {
      "question": "Planning vs reactive agents?",
      "explanation": "Planning decomposes upfront (task lists). Reactive decides next step each turn—simpler, can drift without checkpoints."
    },
    {
      "question": "Memory types for agents?",
      "explanation": "Short-term: conversation buffer. Long-term: vector store summaries. Working memory: scratchpad the model writes to."
    },
    {
      "question": "Human-in-the-loop?",
      "explanation": "Approve sensitive tool calls (payments, deletes). Pause/resume with audit log—required in enterprise workflows."
    },
    {
      "question": "Agent safety guardrails?",
      "explanation": "Allowlist tools, input validation, output filters, sandbox code execution, rate limits, cost caps per session."
    },
    {
      "question": "Multi-agent systems?",
      "explanation": "Specialized agents (researcher, coder, reviewer) coordinate via supervisor or message bus—watch latency and cost multiplication."
    },
    {
      "question": "LangGraph concept?",
      "explanation": "State machine / graph of nodes for agent workflows—cycles, checkpoints, persistence vs ad-hoc while loops."
    },
    {
      "question": "Evaluating agents?",
      "explanation": "Task success rate, steps to completion, tool error rate, human rubrics. Simulate with mock tools in CI."
    },
    {
      "question": "Idempotent tools?",
      "explanation": "Design tools safe to retry—agents will call twice. Use idempotency keys for side effects."
    },
    {
      "question": "OpenAI Assistants / Responses API?",
      "explanation": "Hosted threads, tools, code interpreter—faster prototype; less control than custom agent loop."
    },
    {
      "question": "Debugging agent failures?",
      "explanation": "Log full message trace, tool I/O, token usage. Replay with frozen model version. Simplify tool surface."
    },
    {
      "question": "When not to use agents?",
      "explanation": "Fixed pipelines (ETL), deterministic APIs, strict latency—plain code or single-shot RAG may suffice."
    }
  ]
};
