import type { SolutionHighlight } from '../../lib/solutionHighlights';

/** Per-problem tooltips for fenced python code in system-design markdown. */
const bySlug: Record<string, SolutionHighlight[]> = {
  'rate-limited-api': [
    {
      match: 'redis.pipeline()',
      label: 'Redis pipeline',
      tip: 'Batches INCR + EXPIRE in one round trip—atomic counter update per window.',
    },
    {
      match: 'status_code=429',
      label: '429 Too Many Requests',
      tip: 'Standard rate-limit response; include Retry-After so clients back off correctly.',
    },
    {
      match: 'Retry-After',
      label: 'Retry-After header',
      tip: 'Seconds until the window resets—clients and CDNs use this for backoff.',
    },
    {
      match: 'X-RateLimit-Remaining',
      label: 'quota headers',
      tip: 'Expose remaining quota on success—lets clients self-throttle before hitting 429.',
    },
  ],
  'url-shortener': [
    {
      match: 'secrets.choice',
      label: 'secure random codes',
      tip: 'Cryptographic randomness for short codes—avoid predictable sequences.',
    },
    {
      match: 'setex',
      label: 'Redis SETEX',
      tip: 'Cache-aside for hot redirect path—sub-millisecond reads at scale.',
    },
    {
      match: 'RedirectResponse',
      label: '302 redirect',
      tip: '302 allows updating destination later; 301 caches aggressively at browsers.',
    },
    {
      match: 'redis.incr',
      label: 'click counter',
      tip: 'Increment in Redis; flush to Postgres async—keeps redirect path fast.',
    },
  ],
  'task-queue': [
    {
      match: 'max_retries=3',
      label: 'max retries',
      tip: 'Cap retry attempts before dead-letter—prevents infinite poison-message loops.',
    },
    {
      match: 'autoretry_for',
      label: 'autoretry_for',
      tip: 'Celery retries only transient errors (e.g. ConnectionError)—not logic bugs.',
    },
    {
      match: 'job_timeout=300',
      label: 'job timeout',
      tip: 'RQ kills long-running jobs—chunk work instead of one giant task.',
    },
    {
      match: '.delay(',
      label: 'async enqueue',
      tip: 'Returns immediately with job_id—HTTP request does not wait for worker.',
    },
  ],
  'realtime-chat': [
    {
      match: 'WebSocketDisconnect',
      label: 'disconnect handling',
      tip: 'Clean up subscriptions and room membership—prevents ghost connections.',
    },
    {
      match: 'redis.incr',
      label: 'room sequence',
      tip: 'Atomic INCR assigns monotonic seq per room—clients detect gaps on reconnect.',
    },
    {
      match: 'redis.publish',
      label: 'Redis pub/sub',
      tip: 'Fan-out across WebSocket workers—any server can broadcast to all room subscribers.',
    },
    {
      match: 'verify_jwt',
      label: 'WS auth',
      tip: 'Validate JWT on handshake query param—never trust unauthenticated sockets.',
    },
  ],
  'auth-system': [
    {
      match: 'create_access_token',
      label: 'access JWT',
      tip: 'Short TTL (15m)—limits exposure if token leaks; refresh handles longevity.',
    },
    {
      match: 'HTTPBearer',
      label: 'Bearer auth',
      tip: 'FastAPI dependency extracts Authorization header for JWT verification.',
    },
    {
      match: 'require_permission',
      label: 'permission dependency',
      tip: 'Reusable FastAPI Depends—403 when authenticated but missing permission.',
    },
    {
      match: 'pwd_context.verify',
      label: 'password verify',
      tip: 'bcrypt/argon2 verify—never store or compare plaintext passwords.',
    },
    {
      match: 'family_id',
      label: 'refresh family',
      tip: 'Rotate refresh tokens; revoke entire family on reuse detection.',
    },
  ],
  'file-upload-s3': [
    {
      match: 'generate_presigned_post',
      label: 'presigned POST',
      tip: 'Client uploads directly to S3—API never proxies file bytes.',
    },
    {
      match: 'content-length-range',
      label: 'size policy',
      tip: 'S3 policy rejects oversized uploads before they complete.',
    },
    {
      match: 'scan_file.delay',
      label: 'async scan',
      tip: 'Virus scan runs in worker—upload API returns before scan finishes.',
    },
    {
      match: 'Depends(current_user)',
      label: 'owner scoping',
      tip: 'S3 key includes user id—prevents cross-user object access.',
    },
  ],
  'search-autocomplete': [
    {
      match: 'bool_prefix',
      label: 'bool_prefix query',
      tip: 'OpenSearch search_as_you_type—efficient prefix matching for typeahead.',
    },
    {
      match: 'setex(key, 60',
      label: 'suggest cache',
      tip: 'Cache hot queries 60s—repeat keystrokes after pause hit Redis not OpenSearch.',
    },
    {
      match: 'normalize(q)',
      label: 'query normalization',
      tip: 'Lowercase + trim before cache key—higher hit ratio for case variants.',
    },
    {
      match: 'min_length=2',
      label: 'min query length',
      tip: 'Skip API until 2+ chars—reduces noise and index load.',
    },
  ],
  'analytics-pipeline': [
    {
      match: 'status_code=202',
      label: '202 Accepted',
      tip: 'Ingest is async—client does not wait for warehouse write.',
    },
    {
      match: 'background_tasks.add_task',
      label: 'background publish',
      tip: 'FastAPI fires Kafka publish after response—low ingest latency.',
    },
    {
      match: 'uniqExact(user_id)',
      label: 'DAU rollup',
      tip: 'ClickHouse uniqExact in materialized view—pre-aggregated dashboard queries.',
    },
    {
      match: 'Field(max_length=100)',
      label: 'batch limit',
      tip: 'Cap events per request—prevents oversized payloads from stalling ingest.',
    },
  ],
  'multi-tenant-saas': [
    {
      match: 'SET LOCAL app.current_org_id',
      label: 'RLS session var',
      tip: 'Postgres row-level security filters every query by tenant automatically.',
    },
    {
      match: 'X-Org-Id',
      label: 'org header',
      tip: 'Explicit tenant context—must match JWT membership or return 403.',
    },
    {
      match: 'ContextVar',
      label: 'context var',
      tip: 'Thread-safe tenant id per async request—propagates through call stack.',
    },
    {
      match: 'ENABLE ROW LEVEL SECURITY',
      label: 'RLS policy',
      tip: 'Defense in depth—even a missing WHERE clause cannot leak other tenants.',
    },
  ],
  'notification-service': [
    {
      match: 'deliver_email.delay',
      label: 'channel workers',
      tip: 'Separate Celery tasks per channel—email backlog does not block push.',
    },
    {
      match: 'is_channel_enabled',
      label: 'preferences',
      tip: 'Respect user opt-out—transactional emails may bypass marketing blocks.',
    },
    {
      match: 'session.begin()',
      label: 'outbox transaction',
      tip: 'Notification + delivery rows in one txn—worker only processes committed rows.',
    },
    {
      match: 'redis.incr(f"unread:',
      label: 'unread cache',
      tip: 'Redis counter for badge—decrement on mark-read; invalidate on mismatch.',
    },
  ],
  'payment-webhooks': [
    {
      match: 'construct_event',
      label: 'signature verify',
      tip: 'Stripe HMAC verification—reject forged webhooks without valid signature.',
    },
    {
      match: 'is_event_processed',
      label: 'idempotency',
      tip: 'Stripe retries webhooks—same event_id must not double-provision subscription.',
    },
    {
      match: 'checkout.Session.create',
      label: 'server-side checkout',
      tip: 'Price IDs from config—never trust client-submitted amounts.',
    },
    {
      match: 'process_checkout_completed.delay',
      label: 'async provisioning',
      tip: 'Return 200 fast; heavy side effects (email, tenant setup) in worker.',
    },
  ],
  'caching-redis': [
    {
      match: 'orjson.dumps',
      label: 'orjson',
      tip: 'Fast JSON serialization for cache values—lower CPU than stdlib json.',
    },
    {
      match: 'nx=True, ex=10',
      label: 'stampede lock',
      tip: 'Only one worker repopulates expired hot key—others wait and retry.',
    },
    {
      match: 'cache_delete',
      label: 'invalidation',
      tip: 'Delete cache key on write—cache-aside requires explicit invalidation.',
    },
    {
      match: 'setex',
      label: 'TTL',
      tip: 'Per-entity TTL balances freshness vs hit ratio.',
    },
  ],
  'scheduled-jobs': [
    {
      match: 'crontab(',
      label: 'Celery Beat',
      tip: 'Cron schedule in code—single Beat leader with Redis lock avoids duplicate fires.',
    },
    {
      match: 'redis.lock',
      label: 'distributed lock',
      tip: 'Cluster-wide exclusivity—only one worker runs vacuum/cleanup at a time.',
    },
    {
      match: 'start_job_run',
      label: 'job audit',
      tip: 'Persist run history—alert if daily job has not succeeded in 25h.',
    },
    {
      match: 'AsyncIOScheduler',
      label: 'APScheduler',
      tip: 'Lightweight alternative to Celery Beat for simple in-process cron.',
    },
  ],
  'log-aggregation': [
    {
      match: 'structlog.contextvars',
      label: 'context binding',
      tip: 'trace_id and path auto-attach to every log line in the request.',
    },
    {
      match: 'JSONRenderer',
      label: 'JSON logs',
      tip: 'Structured stdout—Fluent Bit/OpenSearch parse fields without regex.',
    },
    {
      match: 'X-Trace-Id',
      label: 'trace propagation',
      tip: 'Return trace id in response—client can report it in support tickets.',
    },
    {
      match: 'trace_id_var',
      label: 'ContextVar trace',
      tip: 'Pass trace_id to Celery tasks for end-to-end correlation.',
    },
  ],
  'feature-flags': [
    {
      match: 'bucket(user_id, flag_key',
      label: 'sticky bucket',
      tip: 'SHA-256 hash gives deterministic rollout—same user always same variant.',
    },
    {
      match: 'force_off',
      label: 'kill switch',
      tip: 'Admin override disables flag instantly—overrides rollout percentage.',
    },
    {
      match: '@lru_cache',
      label: 'in-process cache',
      tip: 'Flag rules change rarely—cache in memory with TTL to cut DB reads.',
    },
    {
      match: 'allowlist',
      label: 'allowlist',
      tip: 'Force treatment for beta users before percentage rollout.',
    },
  ],
  'rag-qa-api': [
    {
      match: 'retrieve_chunks',
      label: 'retrieval',
      tip: 'Embed question, ANN search top-k chunks—grounding context for LLM.',
    },
    {
      match: 'EventSourceResponse',
      label: 'SSE stream',
      tip: 'Stream tokens to client—better UX than waiting for full completion.',
    },
    {
      match: 'build_prompt',
      label: 'prompt assembly',
      tip: 'Inject retrieved chunks with doc ids—enables citation in answer.',
    },
    {
      match: 'text-embedding-3-small',
      label: 'embedding model',
      tip: 'Batch embed on ingest; single embed per query at ask time.',
    },
  ],
  'llm-agent-tools': [
    {
      match: 'model_json_schema()',
      label: 'tool schema',
      tip: 'Pydantic generates JSON Schema for LLM function calling—validated args.',
    },
    {
      match: 'execute_tool',
      label: 'tool executor',
      tip: 'Allowlist dispatch—unknown tool names rejected; never eval raw LLM output.',
    },
    {
      match: 'max_steps: int = 10',
      label: 'iteration cap',
      tip: 'Prevent infinite tool loops—hard stop after N LLM rounds.',
    },
    {
      match: '"role": "tool"',
      label: 'tool result message',
      tip: 'OpenAI tool protocol—feed result back so LLM can plan next step.',
    },
  ],
  'vector-search': [
    {
      match: 'PointStruct',
      label: 'Qdrant point',
      tip: 'Vector + payload metadata—filter by tenant_id at query time.',
    },
    {
      match: 'query_filter',
      label: 'metadata filter',
      tip: 'Pre-filter by tenant before ANN—mandatory for multi-tenant isolation.',
    },
    {
      match: 'hnsw',
      label: 'HNSW index',
      tip: 'Approximate nearest neighbor—O(log n) search with tunable recall.',
    },
    {
      match: 'vector_cosine_ops',
      label: 'cosine distance',
      tip: 'Normalize embeddings for cosine similarity—standard for text vectors.',
    },
  ],
  'etl-pipeline': [
    {
      match: 'extract_orders(watermark',
      label: 'incremental extract',
      tip: 'Pull rows where updated_at > watermark—no full table scan each run.',
    },
    {
      match: 'unique(subset=["id"]',
      label: 'dedupe',
      tip: 'Polars dedupe on primary key—idempotent transform before load.',
    },
    {
      match: 'write_parquet',
      label: 'Parquet staging',
      tip: 'Columnar staging file—warehouse COPY is faster than row INSERT.',
    },
    {
      match: 'save_watermark',
      label: 'checkpoint',
      tip: 'Persist high-water mark after each batch—crash-safe resume.',
    },
  ],
  'observability-stack': [
    {
      match: 'Instrumentator',
      label: 'Prometheus metrics',
      tip: 'Auto-instruments HTTP latency histograms and request counts.',
    },
    {
      match: 'OTLPSpanExporter',
      label: 'OTLP export',
      tip: 'Send traces to collector—single egress for Tempo/Jaeger backends.',
    },
    {
      match: 'start_as_current_span',
      label: 'custom spans',
      tip: 'Wrap DB calls in spans—see where latency lives in the trace.',
    },
    {
      match: '/ready',
      label: 'readiness probe',
      tip: 'K8s removes pod from LB when DB/Redis unreachable—not just process up.',
    },
  ],
  'multi-region-deploy': [
    {
      match: 'is_write_primary',
      label: 'write routing',
      tip: 'Non-primary regions forward writes to primary—avoids split-brain.',
    },
    {
      match: 'X-Served-By-Region',
      label: 'region header',
      tip: 'Debug geo routing—confirm which region served the request.',
    },
    {
      match: 'proxy_post_to_primary',
      label: 'write proxy',
      tip: 'Internal API call to primary region—accept write latency for consistency.',
    },
    {
      match: 'publish_outbox',
      label: 'regional outbox',
      tip: 'Replicate events cross-region async—decouple write ack from fan-out.',
    },
  ],
};

function sortByMatchLength(highlights: SolutionHighlight[]): SolutionHighlight[] {
  return highlights.toSorted((a, b) => b.match.length - a.match.length);
}

export function getSystemDesignHighlights(slug: string): SolutionHighlight[] {
  const list = bySlug[slug];
  return list ? sortByMatchLength(list) : [];
}
