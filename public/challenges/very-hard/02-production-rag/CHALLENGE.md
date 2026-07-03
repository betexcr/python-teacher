# Production RAG Pipeline

**Difficulty:** very-hard  
**Topics:** rag, production

## Learning goals

- End-to-end ingest and query
- Observability hooks

## Challenge

Build `RagPipeline` with ingest(path), embed via provider callable, store in vector backend, and query(question, k) returning cited chunks.

## Requirements

1. Pluggable embedder
2. Citation includes doc_id
3. Empty store returns []

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/very-hard/02-production-rag/`. Reference write-ups in this repo live under `challenges/very-hard/02-production-rag/` (not loaded by the app).

```python
from collections.abc import Callable
from pathlib import Path

class RagPipeline:
    def __init__(self, embed: Callable[[list[str]], list[list[float]]], store) -> None:
        self._embed = embed
        self._store = store

    def ingest(self, path: Path) -> int:
        # TODO
        raise NotImplementedError

    def query(self, question: str, k: int = 4) -> list[dict[str, object]]:
        ...
```

## Hints

1. text = path.read_text()
2. chunks = chunk_text(text)
3. store.search(embed([question])[0], k)

## Acceptance criteria

- [ ] **Ingest returns chunk count**
  Ingest returns chunk count. Write a small script or pytest test that demonstrates this behavior matches Production RAG Pipeline.

- [ ] **Query returns citations**
  Query returns citations. Write a small script or pytest test that demonstrates this behavior matches Production RAG Pipeline.

- [ ] **Embedder invoked**
  Embedder invoked: Pluggable embedder. Write a small script or pytest test that demonstrates this behavior matches Production RAG Pipeline.

## Resources

- [rag – reference](https://python.langchain.com/docs/concepts/rag/)
- [Python Tutorial](https://docs.python.org/3/tutorial/)
