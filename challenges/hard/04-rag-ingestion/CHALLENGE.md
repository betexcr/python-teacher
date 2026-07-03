# RAG Document Ingestion

**Difficulty:** hard  
**Topics:** rag, embeddings

## Learning goals

- Chunk documents
- Store embeddings for search

## Challenge

Implement `chunk_text(text, size=500, overlap=50) -> list[str]` and `InMemoryVectorStore.add(doc_id, chunks, embeddings)` with cosine similarity search.

## Requirements

1. Overlapping chunks
2. Cosine similarity top-k
3. Embedding list same dim

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/hard/04-rag-ingestion/`. Reference write-ups in this repo live under `challenges/hard/04-rag-ingestion/` (not loaded by the app).

```python
import math
from dataclasses import dataclass

def chunk_text(text: str, size: int = 500, overlap: int = 50) -> list[str]:
    # TODO
    raise NotImplementedError

@dataclass
class VectorRecord:
    doc_id: str
    chunk: str
    embedding: list[float]

class InMemoryVectorStore:
    def __init__(self) -> None:
        self._records: list[VectorRecord] = []

    def add(self, doc_id: str, chunks: list[str], embeddings: list[list[float]]) -> None:
        ...

    def search(self, query: list[float], k: int = 3) -> list[VectorRecord]:
        ...
```

## Hints

1. step = size - overlap
2. dot / (norms product) for cosine
3. sorted scores[:k]

## Acceptance criteria

- [ ] **Chunks overlap correctly**
  Chunks overlap correctly: Overlapping chunks. Write a small script or pytest test that demonstrates this behavior matches RAG Document Ingestion.

- [ ] **Top-k by similarity**
  Top-k by similarity: Cosine similarity top-k. Write a small script or pytest test that demonstrates this behavior matches RAG Document Ingestion.

- [ ] **Dimension mismatch raises**
  Dimension mismatch raises. Write a small script or pytest test that demonstrates this behavior matches RAG Document Ingestion.

## Resources

- [rag – reference](https://python.langchain.com/docs/concepts/rag/)
- [Python Tutorial](https://docs.python.org/3/tutorial/)
