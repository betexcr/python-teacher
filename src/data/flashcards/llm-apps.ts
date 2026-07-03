import type { FlashcardDeck } from './types';

export const llmAppsDeck: FlashcardDeck = {
  "id": "llm-apps",
  "slug": "llm-apps",
  "title": "LLM Applications",
  "cards": [
    {
      "question": "OpenAI SDK basic chat?",
      "explanation": "Client with api_key from env. chat.completions.create with messages roles system/user/assistant.\n\n```python\nfrom openai import OpenAI\n\nclient = OpenAI()\nresp = client.chat.completions.create(\n    model=\"gpt-4o\",\n    messages=[{\"role\": \"user\", \"content\": \"Hello\"}],\n)\n```"
    },
    {
      "question": "Prompt structure best practices?",
      "explanation": "Clear instructions, examples (few-shot), output format spec, delimiters for untrusted input. Separate system vs user content."
    },
    {
      "question": "Temperature and top_p?",
      "explanation": "Temperature: randomness (0 deterministic-ish, higher creative). top_p nucleus sampling—usually tune one not both aggressively."
    },
    {
      "question": "Token limits and counting?",
      "explanation": "Models have context windows; tiktoken estimates tokens. Trim history, summarize, or retrieve only relevant chunks.\n\n```python\nimport tiktoken\n\nenc = tiktoken.encoding_for_model(\"gpt-4o\")\nlen(enc.encode(text))\n```"
    },
    {
      "question": "Structured outputs?",
      "explanation": "JSON mode or response_format / tool schemas constrain model to parseable output—validate with Pydantic after.\n\n```python\nclass Answer(BaseModel):\n    summary: str\n    score: int\n```"
    },
    {
      "question": "Streaming responses?",
      "explanation": "stream=True yields deltas—better UX latency. Accumulate chunks for display; handle errors mid-stream.\n\n```python\nstream = client.chat.completions.create(..., stream=True)\nfor chunk in stream:\n    print(chunk.choices[0].delta.content or \"\", end=\"\")\n```"
    },
    {
      "question": "System prompt vs user prompt?",
      "explanation": "System sets behavior/policy; user carries task.input. Keep system stable; inject dynamic context in user or tool results."
    },
    {
      "question": "Embeddings API use?",
      "explanation": "Vector representations for semantic search, clustering, dedup. Normalize vectors for cosine similarity.\n\n```python\nemb = client.embeddings.create(model=\"text-embedding-3-small\", input=text)\nvector = emb.data[0].embedding\n```"
    },
    {
      "question": "Cost control?",
      "explanation": "Cheaper models for routing/summarization, cache embeddings, batch API, limit max_tokens, monitor usage per feature."
    },
    {
      "question": "Evals for LLM apps?",
      "explanation": "Golden datasets, LLM-as-judge (careful), human review, regression on prompt changes. Track latency and cost metrics."
    },
    {
      "question": "Prompt injection awareness?",
      "explanation": "Treat user content as untrusted—delimit instructions vs data, output filtering, least privilege tools, human approval for sensitive actions."
    },
    {
      "question": "LangChain / LlamaIndex role?",
      "explanation": "Orchestration abstractions for chains, retrievers, agents. Useful prototypes; understand primitives before heavy framework lock-in."
    },
    {
      "question": "Local models (Ollama)?",
      "explanation": "Run open weights locally for dev/privacy. Trade GPU resources and quality vs cloud APIs."
    },
    {
      "question": "Observability?",
      "explanation": "Log prompts/responses with PII redaction, trace IDs, LangSmith/Arize/Phoenix for debugging retrieval and tool calls."
    },
    {
      "question": "Fallback and retries?",
      "explanation": "Exponential backoff on rate limits, fallback model, graceful degradation message to user when provider down."
    }
  ]
};
