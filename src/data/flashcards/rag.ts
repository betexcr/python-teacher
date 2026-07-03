import type { FlashcardDeck } from './types';

export const ragDeck: FlashcardDeck = {
  "id": "rag",
  "slug": "rag",
  "title": "RAG",
  "cards": [
    {
      "question": "What is RAG?",
      "explanation": "Retrieval-Augmented Generation: fetch relevant documents, inject into prompt, then generate—grounds answers in your data."
    },
    {
      "question": "RAG pipeline steps?",
      "explanation": "Ingest → chunk → embed → store → retrieve on query → rerank (optional) → prompt LLM with context → cite sources."
    },
    {
      "question": "Chunking strategies?",
      "explanation": "Fixed size with overlap, semantic splits, markdown/header-aware. Too small loses context; too large dilutes relevance.\n\n```python\nchunk_size = 512\noverlap = 64\n# split text with sliding window\n```"
    },
    {
      "question": "Vector database options?",
      "explanation": "pgvector, Pinecone, Weaviate, Chroma, Qdrant, FAISS (local). Choose by scale, filtering, ops model, hybrid search needs."
    },
    {
      "question": "Similarity search basics?",
      "explanation": "Cosine similarity common for normalized embeddings. Approximate nearest neighbor (HNSW) trades recall for speed."
    },
    {
      "question": "Metadata filtering?",
      "explanation": "Store doc_id, source, date, ACL with vectors—filter before vector search for tenant isolation and freshness."
    },
    {
      "question": "Hybrid search?",
      "explanation": "Combine keyword (BM25) + vector scores—helps exact matches (SKUs, error codes) pure semantic search misses."
    },
    {
      "question": "Reranking?",
      "explanation": "Cross-encoder rerank top-k retrieved chunks for better ordering before LLM context window fill."
    },
    {
      "question": "Citation and attribution?",
      "explanation": "Pass source ids to UI; instruct model to quote only from context; detect hallucination when no chunk supports claim."
    },
    {
      "question": "Context window budgeting?",
      "explanation": "Rank chunks by score; truncate to fit model limit; summarize long docs hierarchically (map-reduce)."
    },
    {
      "question": "Evaluation metrics for RAG?",
      "explanation": "Retrieval: recall@k, MRR. Generation: faithfulness, answer relevance. Use held-out Q&A pairs from domain docs."
    },
    {
      "question": "Ingestion freshness?",
      "explanation": "Re-embed on document update; version indexes; tombstone deleted docs. Event-driven pipelines on CMS/webhook changes."
    },
    {
      "question": "LlamaIndex vs custom?",
      "explanation": "Frameworks provide loaders, index abstractions. Production still needs custom ACL, evals, and monitoring.\n\n```python\nfrom llama_index.core import VectorStoreIndex, SimpleDirectoryReader\n\ndocs = SimpleDirectoryReader(\"data\").load_data()\nindex = VectorStoreIndex.from_documents(docs)\n```"
    },
    {
      "question": "Multimodal RAG?",
      "explanation": "Embed images/PDF pages with multimodal models; store alongside text metadata for unified retrieval."
    },
    {
      "question": "Common RAG failures?",
      "explanation": "Bad chunks, stale index, no hybrid for keyword queries, prompt ignores context, missing access control on retrieval."
    }
  ]
};
