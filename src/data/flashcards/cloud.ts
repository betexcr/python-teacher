import type { FlashcardDeck } from './types';

export const cloudDeck: FlashcardDeck = {
  "id": "cloud",
  "slug": "cloud",
  "title": "Cloud & Python",
  "cards": [
    {
      "question": "AWS Lambda with Python?",
      "explanation": "Handler function(event, context). Cold starts, package size limits, stateless. Use layers for deps; avoid fat imports at module level.\n\n```python\ndef handler(event, context):\n    return {\"statusCode\": 200, \"body\": \"ok\"}\n```"
    },
    {
      "question": "S3 with boto3?",
      "explanation": "upload_file, download_file, list_objects_v2. IAM least privilege; presigned URLs for client uploads.\n\n```python\nimport boto3\n\ns3 = boto3.client(\"s3\")\ns3.upload_file(\"local.txt\", \"bucket\", \"key.txt\")\n```"
    },
    {
      "question": "SQS / SNS patterns?",
      "explanation": "Decouple services: SNS fan-out, SQS queue workers (Celery, Lambda pollers). Idempotent consumers handle at-least-once delivery."
    },
    {
      "question": "GCP Cloud Functions / Cloud Run?",
      "explanation": "Cloud Run: containerized HTTP services, scale to zero. Cloud Functions: event-triggered snippets. Both support Python runtimes."
    },
    {
      "question": "Azure Functions Python?",
      "explanation": "Similar serverless model; binding triggers (HTTP, queue, timer). Use Application Insights for monitoring."
    },
    {
      "question": "Object storage vs block storage?",
      "explanation": "S3/GCS for blobs, backups, static assets. EBS/Persistent disks for DB volumes. Choose by access pattern and durability needs."
    },
    {
      "question": "IAM roles for services?",
      "explanation": "Instance/task roles grant AWS permissions without static keys on disk—prefer over access keys in env."
    },
    {
      "question": "Secrets in cloud?",
      "explanation": "AWS Secrets Manager, GCP Secret Manager, Azure Key Vault. Rotate and audit access; cache briefly in app memory if needed."
    },
    {
      "question": "Infrastructure as Code?",
      "explanation": "Terraform/CDK define resources in code. Separate state per env; review plans in CI before apply."
    },
    {
      "question": "Managed Postgres (RDS/Cloud SQL)?",
      "explanation": "Automated backups, patching, read replicas. Connect via private VPC; use connection pooling (PgBouncer) in app tier."
    },
    {
      "question": "Serverless vs containers?",
      "explanation": "Serverless: ops-light, pay per invoke, cold starts. Containers/K8s: control, long-running workers, predictable performance."
    },
    {
      "question": "CDN for Python APIs?",
      "explanation": "Cache GET at edge when responses are public and cacheable. Dynamic authenticated APIs usually bypass CDN cache."
    },
    {
      "question": "CloudWatch / logging?",
      "explanation": "Ship structured logs and custom metrics. Alarms on error rate, latency p99, queue depth."
    },
    {
      "question": "Multi-region considerations?",
      "explanation": "Data residency, replication lag, failover DNS. Stateless app tiers easier than single-primary DB failover."
    },
    {
      "question": "Cost optimization?",
      "explanation": "Right-size instances, reserved capacity, S3 lifecycle policies, delete idle resources, profile expensive API calls."
    }
  ]
};
