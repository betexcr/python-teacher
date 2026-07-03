import type { SystemDesignProblem } from './types';
import rateLimitedApi from './content/rate-limited-api.md?raw';
import urlShortener from './content/url-shortener.md?raw';
import taskQueue from './content/task-queue.md?raw';
import realtimeChat from './content/realtime-chat.md?raw';
import authSystem from './content/auth-system.md?raw';
import fileUploadS3 from './content/file-upload-s3.md?raw';
import searchAutocomplete from './content/search-autocomplete.md?raw';
import analyticsPipeline from './content/analytics-pipeline.md?raw';
import multiTenantSaas from './content/multi-tenant-saas.md?raw';
import notificationService from './content/notification-service.md?raw';
import paymentWebhooks from './content/payment-webhooks.md?raw';
import cachingRedis from './content/caching-redis.md?raw';
import scheduledJobs from './content/scheduled-jobs.md?raw';
import logAggregation from './content/log-aggregation.md?raw';
import featureFlags from './content/feature-flags.md?raw';
import ragQaApi from './content/rag-qa-api.md?raw';
import llmAgentTools from './content/llm-agent-tools.md?raw';
import vectorSearch from './content/vector-search.md?raw';
import etlPipeline from './content/etl-pipeline.md?raw';
import observabilityStack from './content/observability-stack.md?raw';
import multiRegionDeploy from './content/multi-region-deploy.md?raw';

export const systemDesignProblems: SystemDesignProblem[] = [
  {
    slug: 'rate-limited-api',
    title: 'Rate-Limited API',
    subtitle: 'FastAPI middleware, Redis counters, tiered quotas',
    pageTitle: 'Rate-Limited API (FastAPI)',
    content: rateLimitedApi,
  },
  {
    slug: 'url-shortener',
    title: 'URL Shortener',
    subtitle: 'Base62 codes, Redis cache-aside, click tracking',
    pageTitle: 'URL Shortener Service',
    content: urlShortener,
  },
  {
    slug: 'task-queue',
    title: 'Task Queue',
    subtitle: 'Celery/RQ workers, retries, dead-letter queues',
    pageTitle: 'Background Task Queue (Celery / RQ)',
    content: taskQueue,
  },
  {
    slug: 'realtime-chat',
    title: 'Real-Time Chat',
    subtitle: 'WebSockets, Redis pub/sub, room sequencing',
    pageTitle: 'Real-Time Chat (WebSockets)',
    content: realtimeChat,
  },
  {
    slug: 'auth-system',
    title: 'Auth System',
    subtitle: 'JWT access tokens, refresh rotation, RBAC',
    pageTitle: 'Authentication System (JWT + Refresh)',
    content: authSystem,
  },
  {
    slug: 'file-upload-s3',
    title: 'File Upload (S3)',
    subtitle: 'Presigned POST, async virus scan, metadata tracking',
    pageTitle: 'File Upload Pipeline (S3)',
    content: fileUploadS3,
  },
  {
    slug: 'search-autocomplete',
    title: 'Search Autocomplete',
    subtitle: 'OpenSearch typeahead, Redis cache, ranking',
    pageTitle: 'Search Autocomplete API',
    content: searchAutocomplete,
  },
  {
    slug: 'analytics-pipeline',
    title: 'Analytics Pipeline',
    subtitle: 'Kafka ingest, ClickHouse rollups, event schemas',
    pageTitle: 'Analytics Event Pipeline',
    content: analyticsPipeline,
  },
  {
    slug: 'multi-tenant-saas',
    title: 'Multi-Tenant SaaS',
    subtitle: 'Row-level security, org scoping, tenant isolation',
    pageTitle: 'Multi-Tenant SaaS Backend',
    content: multiTenantSaas,
  },
  {
    slug: 'notification-service',
    title: 'Notification Service',
    subtitle: 'Email, push, SMS, in-app inbox, outbox pattern',
    pageTitle: 'Notification Delivery Service',
    content: notificationService,
  },
  {
    slug: 'payment-webhooks',
    title: 'Payment Webhooks',
    subtitle: 'Stripe checkout, signature verify, idempotency',
    pageTitle: 'Payment Webhooks (Stripe)',
    content: paymentWebhooks,
  },
  {
    slug: 'caching-redis',
    title: 'Caching (Redis)',
    subtitle: 'Cache-aside, TTL policies, stampede protection',
    pageTitle: 'Redis Caching Layer',
    content: cachingRedis,
  },
  {
    slug: 'scheduled-jobs',
    title: 'Scheduled Jobs',
    subtitle: 'Celery Beat, cron, distributed locks',
    pageTitle: 'Scheduled Background Jobs',
    content: scheduledJobs,
  },
  {
    slug: 'log-aggregation',
    title: 'Log Aggregation',
    subtitle: 'structlog JSON, trace correlation, OpenSearch',
    pageTitle: 'Centralized Log Aggregation',
    content: logAggregation,
  },
  {
    slug: 'feature-flags',
    title: 'Feature Flags',
    subtitle: 'Sticky bucketing, rollout percentages, kill switch',
    pageTitle: 'Feature Flags & A/B Testing',
    content: featureFlags,
  },
  {
    slug: 'rag-qa-api',
    title: 'RAG Q&A API',
    subtitle: 'Chunk retrieval, embeddings, streamed LLM answers',
    pageTitle: 'RAG Question-Answering API',
    content: ragQaApi,
  },
  {
    slug: 'llm-agent-tools',
    title: 'LLM Agent Tools',
    subtitle: 'Function calling loop, tool validation, audit trail',
    pageTitle: 'LLM Agent with Tool Use',
    content: llmAgentTools,
  },
  {
    slug: 'vector-search',
    title: 'Vector Search',
    subtitle: 'HNSW indexes, metadata filters, hybrid retrieval',
    pageTitle: 'Vector Similarity Search',
    content: vectorSearch,
  },
  {
    slug: 'etl-pipeline',
    title: 'ETL Pipeline',
    subtitle: 'Incremental extract, Polars transform, warehouse load',
    pageTitle: 'ETL Data Pipeline',
    content: etlPipeline,
  },
  {
    slug: 'observability-stack',
    title: 'Observability Stack',
    subtitle: 'Prometheus metrics, OpenTelemetry traces, SLO alerts',
    pageTitle: 'Production Observability Stack',
    content: observabilityStack,
  },
  {
    slug: 'multi-region-deploy',
    title: 'Multi-Region Deploy',
    subtitle: 'Geo routing, read replicas, failover, data residency',
    pageTitle: 'Multi-Region Deployment',
    content: multiRegionDeploy,
  },
];

export function getProblemBySlug(slug: string): SystemDesignProblem | undefined {
  return systemDesignProblems.find((p) => p.slug === slug);
}
