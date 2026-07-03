import type { FlashcardDeck } from './types';

export const dataEngDeck: FlashcardDeck = {
  "id": "data-eng",
  "slug": "data-eng",
  "title": "Data Engineering",
  "cards": [
    {
      "question": "pandas DataFrame basics?",
      "explanation": "Tabular data with labeled columns. read_csv, head, info, describe for exploration. Vectorized ops beat Python loops.\n\n```python\nimport pandas as pd\n\ndf = pd.read_csv(\"data.csv\")\ndf.groupby(\"category\")[\"amount\"].sum()\n```"
    },
    {
      "question": "Handling missing data?",
      "explanation": "isna(), fillna(), dropna(). Impute carefully—document strategy. Nullable dtypes in pandas 2.x."
    },
    {
      "question": "Polars vs pandas?",
      "explanation": "Polars: Rust engine, lazy API, faster on large data. pandas: ecosystem maturity. Consider Polars for new ETL pipelines.\n\n```python\nimport polars as pl\n\ndf = pl.scan_csv(\"big.csv\").filter(pl.col(\"x\") > 0).collect()\n```"
    },
    {
      "question": "Apache Arrow role?",
      "explanation": "Columnar in-memory format—zero-copy interchange between pandas, Polars, PySpark. Parquet built on Arrow types."
    },
    {
      "question": "Parquet vs CSV?",
      "explanation": "Parquet: columnar, compressed, schema embedded—preferred for data lakes. CSV: human-readable, no types, larger."
    },
    {
      "question": "PySpark when?",
      "explanation": "Distributed processing on huge datasets in Spark clusters. pandas on single machine hits memory wall.\n\n```python\ndf = spark.read.parquet(\"s3://bucket/events/\")\ndf.groupBy(\"user_id\").count()\n```"
    },
    {
      "question": "ETL vs ELT?",
      "explanation": "ETL transforms before load. ELT loads raw then transforms in warehouse (dbt, SQL)—common with Snowflake/BigQuery."
    },
    {
      "question": "Airflow / Dagster / Prefect?",
      "explanation": "Orchestrate scheduled pipelines with retries, sensors, lineage. Dagster/Prefect modern DX; Airflow widely adopted."
    },
    {
      "question": "dbt role?",
      "explanation": "Transform data in warehouse via versioned SQL models—tests, docs, incremental models."
    },
    {
      "question": "Idempotent pipelines?",
      "explanation": "Re-running same date partition yields same result. Use merge/upsert, partition keys, deterministic transforms."
    },
    {
      "question": "Data quality checks?",
      "explanation": "Great Expectations, dbt tests, custom asserts on row counts, null rates, schema. Fail pipeline on violation."
    },
    {
      "question": "Streaming vs batch?",
      "explanation": "Batch: hourly/daily jobs, simpler. Streaming: Kafka + Flink/Spark Structured Streaming for low latency."
    },
    {
      "question": "Python in notebooks vs scripts?",
      "explanation": "Notebooks for exploration; production jobs as tested modules with CLI entry points and scheduling."
    },
    {
      "question": "Memory-efficient iteration?",
      "explanation": "Read chunks with pandas chunksize, pyarrow record batches, or generators. Avoid loading 100GB into RAM.\n\n```python\nfor chunk in pd.read_csv(\"big.csv\", chunksize=50_000):\n    process(chunk)\n```"
    },
    {
      "question": "Warehouse loading pattern?",
      "explanation": "Stage files (S3/GCS) → COPY/LOAD into Snowflake/BQ/Redshift → dbt transform → expose marts to BI."
    }
  ]
};
