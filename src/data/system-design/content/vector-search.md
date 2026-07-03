# Vector Search

## Requirements

Semantic similarity search over embeddings for RAG, recommendations, or deduplication:

- **Index:** Store millions of vectors (768–1536 dims) with metadata filters
- **Query:** k-NN search in < 100ms; optional metadata filters (`tenant_id`, `category`)
- **Updates:** Upsert on document change; delete by document ID
- **Hybrid:** Combine dense vectors with sparse BM25 for keyword matches
- **Scale:** Billion-scale requires approximate nearest neighbor (ANN) indexes

## API Design

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/vectors/upsert` | POST | Batch `{ "items": [{ "id", "vector", "metadata" }] }` |
| `/vectors/search` | POST | `{ "vector", "top_k", "filter" }` → ranked hits |
| `/vectors/{id}` | DELETE | Remove vector |
| `/embed` | POST | Text → vector (wrapper around embedding model) |

Internal service—authenticate with service token.

```text
Text ──► embedding model ──► vector ──► ANN index ──► top-k IDs + scores
Filter: metadata.tenant_id == X applied before or after ANN (engine-dependent)
```

## Data Model

**pgvector:**

```sql
CREATE EXTENSION vector;

CREATE TABLE embeddings (
  id         UUID PRIMARY KEY,
  tenant_id  UUID NOT NULL,
  document_id UUID NOT NULL,
  embedding  vector(1536) NOT NULL,
  metadata   JSONB DEFAULT '{}'
);

CREATE INDEX idx_embeddings_hnsw ON embeddings
  USING hnsw (embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);
```

**Qdrant collection:** named vectors + payload indexes on `tenant_id`.

Metadata always includes `tenant_id` for isolation in multi-tenant systems.

## Scaling

- **HNSW** (Qdrant, pgvector, Pinecone)—trade memory for speed; tune `ef_search` for recall
- **Sharding** by tenant or hash of id at 100M+ vectors
- **Quantization** (PQ, scalar) reduces memory 4–8x with small recall loss
- **Separate embedding service**—GPU nodes batch-encode; API nodes query only
- **Reindex** strategy: dual-write new collection, swap alias, delete old

## Python Stack

| Layer | Choice |
|-------|--------|
| API | FastAPI |
| pgvector | `pgvector` Python + SQLAlchemy |
| Qdrant | `qdrant-client` |
| Embeddings | OpenAI or `sentence-transformers` |

```python
from qdrant_client import QdrantClient
from qdrant_client.models import PointStruct, Filter, FieldCondition, MatchValue

client = QdrantClient(url="http://localhost:6333")
COLLECTION = "documents"

async def upsert_vectors(items: list[VectorItem]):
    points = [
        PointStruct(
            id=item.id,
            vector=item.vector,
            payload={"tenant_id": item.tenant_id, "document_id": item.document_id, **item.metadata},
        )
        for item in items
    ]
    client.upsert(collection_name=COLLECTION, points=points)

async def search(query_vector: list[float], tenant_id: str, top_k: int = 10):
    return client.search(
        collection_name=COLLECTION,
        query_vector=query_vector,
        limit=top_k,
        query_filter=Filter(
            must=[FieldCondition(key="tenant_id", match=MatchValue(value=str(tenant_id)))]
        ),
    )

@app.post("/vectors/search")
async def search_vectors(body: SearchRequest, user=Depends(current_user)):
    results = await search(body.vector, user.tenant_id, body.top_k)
    return {
        "hits": [
            {"id": hit.id, "score": hit.score, "metadata": hit.payload}
            for hit in results
        ]
    }
```

**Interview tip:** Cosine vs L2 vs inner product—normalize embeddings for cosine. Explain ANN vs exact search: ANN is O(log n) but approximate; increase `ef_search` to improve recall at latency cost.
