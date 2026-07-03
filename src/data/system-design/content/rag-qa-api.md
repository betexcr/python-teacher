# RAG Q&A API

## Requirements

Answer user questions grounded in private documents (PDFs, wikis, tickets):

- **Ingestion:** Chunk documents, embed, store in vector DB
- **Query:** Retrieve top-k relevant chunks, compose LLM prompt, stream answer
- **Citations:** Return source document IDs and snippets with each answer
- **Guardrails:** Refuse when retrieval confidence is low; no hallucinated policies
- **Scale:** 10k documents, 100 QPS with caching for repeated questions

## API Design

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/documents` | POST | Upload + async index job |
| `/documents/{id}` | DELETE | Remove chunks from vector store |
| `/ask` | POST | `{ "question", "conversation_id?" }` → streamed SSE answer + citations |
| `/ask/sync` | POST | Non-streaming for batch/testing |

SSE stream events: `retrieval`, `token`, `citation`, `done`.

```text
Question ──► embed query ──► vector search (top-k) ──► rerank ──► LLM prompt ──► stream tokens
```

## Data Model

```sql
CREATE TABLE documents (
  id          UUID PRIMARY KEY,
  title       TEXT NOT NULL,
  source_uri  TEXT,
  status      TEXT DEFAULT 'indexing',
  created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE chunks (
  id           UUID PRIMARY KEY,
  document_id  UUID REFERENCES documents(id),
  content      TEXT NOT NULL,
  chunk_index  INT NOT NULL,
  token_count  INT
);
```

Vector store (pgvector or Pinecone): `{ chunk_id, embedding[1536], metadata }`.

Conversation memory: Redis `conv:{id}` → last N turns for follow-up questions.

## Scaling

- **Async indexing** via Celery—don't block upload on embedding
- **Batch embeddings** (OpenAI `embeddings.create` accepts arrays)
- **Cache** `(question_hash, corpus_version)` → answer for FAQ-style repeats
- **Reranker** (Cohere cross-encoder) on top-50 before top-5 to LLM—better precision
- **Separate read replicas** for chunk metadata; vector DB handles ANN search

## Python Stack

| Layer | Choice |
|-------|--------|
| API | FastAPI + SSE (`sse-starlette`) |
| Embeddings | OpenAI / `sentence-transformers` |
| Vector DB | pgvector, Qdrant, or Pinecone |
| LLM | OpenAI / Anthropic via `litellm` |
| Chunking | LangChain `RecursiveCharacterTextSplitter` or custom |

```python
from fastapi import FastAPI
from sse_starlette.sse import EventSourceResponse
from openai import AsyncOpenAI

client = AsyncOpenAI()
app = FastAPI()

async def retrieve_chunks(question: str, k: int = 5) -> list[dict]:
    embedding = await client.embeddings.create(input=question, model="text-embedding-3-small")
    vector = embedding.data[0].embedding
    return vector_db.search(vector, top_k=k)

def build_prompt(question: str, chunks: list[dict]) -> list[dict]:
    context = "\n\n".join(f"[{c['document_id']}] {c['content']}" for c in chunks)
    return [
        {"role": "system", "content": "Answer only from the context. Cite sources as [doc_id]."},
        {"role": "user", "content": f"Context:\n{context}\n\nQuestion: {question}"},
    ]

@app.post("/ask")
async def ask(body: AskRequest):
    async def event_generator():
        chunks = await retrieve_chunks(body.question)
        yield {"event": "retrieval", "data": {"count": len(chunks)}}
        messages = build_prompt(body.question, chunks)
        stream = await client.chat.completions.create(model="gpt-4o-mini", messages=messages, stream=True)
        async for chunk in stream:
            if token := chunk.choices[0].delta.content:
                yield {"event": "token", "data": token}
        yield {"event": "citation", "data": [c["document_id"] for c in chunks]}
        yield {"event": "done", "data": ""}

    return EventSourceResponse(event_generator())
```

**Interview tip:** RAG failure modes—stale corpus, wrong chunk size, no reranking. Mention hybrid search (BM25 + vector) for keyword-heavy queries like error codes.
