# Solution: RAG Document Ingestion

## Approach

Slide window over text; store records; rank by cosine similarity.

## Key concepts

- **chunking**: Split long docs for embedding models with context limits.
- **cosine similarity**: Measures angle between vectors for semantic nearness.

## Code highlights

- `def add(self, doc_id: str, chunks: list[str], embeddings: list[list[float]]) -> None:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `def chunk_text(text: str, size: int = 500, overlap: int = 50) -> list[str]:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `def search(self, query: list[float], k: int = 3) -> list[VectorRecord]:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `def _cosine(self, a: list[float], b: list[float]) -> float:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `raise ValueError("chunks/embeddings length mismatch")` — **raise** — Fail fast with a clear error when input or state is invalid. chunk_text slides window; store pairs embedding/chunk; search sorts by cosine and slices top k.
- `raise ValueError("size must exceed overlap")` — **raise** — Fail fast with a clear error when input or state is invalid. chunk_text slides window; store pairs embedding/chunk; search sorts by cosine and slices top k.
- `@dataclass
class VectorRecord` — **dataclass VectorRecord** — `VectorRecord` is a dataclass — boilerplate __init__, __repr__, and comparisons are generated. chunk_text slides window; store pairs embedding/chunk; search sorts by cosine and slices top k.
- `def __init__(self) -> None:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `return dot / (na * nb)` — **return** — Returns the computed result to the caller. chunk_text slides window; store pairs embedding/chunk; search sorts by cosine and slices top k.
- `return ranked[:k]` — **return** — Returns the computed result to the caller. chunk_text slides window; store pairs embedding/chunk; search sorts by cosine and slices top k.
- `return chunks` — **return** — Returns the computed result to the caller. chunk_text slides window; store pairs embedding/chunk; search sorts by cosine and slices top k.
- `return 0.0` — **return** — Returns the computed result to the caller. chunk_text slides window; store pairs embedding/chunk; search sorts by cosine and slices top k.

## Solution code

```python
import math
from dataclasses import dataclass

def chunk_text(text: str, size: int = 500, overlap: int = 50) -> list[str]:
    if size <= overlap:
        raise ValueError("size must exceed overlap")
    chunks: list[str] = []
    start = 0
    while start < len(text):
        chunks.append(text[start : start + size])
        start += size - overlap
    return chunks

@dataclass
class VectorRecord:
    doc_id: str
    chunk: str
    embedding: list[float]

class InMemoryVectorStore:
    def __init__(self) -> None:
        self._records: list[VectorRecord] = []

    def add(self, doc_id: str, chunks: list[str], embeddings: list[list[float]]) -> None:
        if len(chunks) != len(embeddings):
            raise ValueError("chunks/embeddings length mismatch")
        for chunk, emb in zip(chunks, embeddings):
            self._records.append(VectorRecord(doc_id, chunk, emb))

    def _cosine(self, a: list[float], b: list[float]) -> float:
        dot = sum(x * y for x, y in zip(a, b))
        na = math.sqrt(sum(x * x for x in a))
        nb = math.sqrt(sum(x * x for x in b))
        if na == 0 or nb == 0:
            return 0.0
        return dot / (na * nb)

    def search(self, query: list[float], k: int = 3) -> list[VectorRecord]:
        ranked = sorted(self._records, key=lambda r: self._cosine(query, r.embedding), reverse=True)
        return ranked[:k]
```

## Walkthrough

chunk_text slides window; store pairs embedding/chunk; search sorts by cosine and slices top k.

## Common mistakes

- Non-overlapping chunks lose context
- Dot product without normalization

## Stretch goals

- Pluggable embedding API
- Persist to chromadb
