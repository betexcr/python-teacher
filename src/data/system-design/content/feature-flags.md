# Feature Flags

## Requirements

Toggle features and run experiments without redeploying:

- **Flags:** Boolean gates and multivariate variants (A/B/C)
- **Targeting:** By user_id, org plan, percentage rollout, allowlist
- **Consistency:** Same user always sees same variant (sticky bucketing)
- **Kill switch:** Instantly disable broken features globally
- **Latency:** Flag evaluation < 1ms; cache with short TTL

## API Design

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/flags/evaluate` | POST | `{ "flag_keys": ["new_checkout"], "context": { "user_id", "org_id" } }` |
| `/admin/flags` | GET/POST | CRUD flags (internal) |
| `/admin/flags/{key}/rollout` | PATCH | Change percentage or rules |

Bootstrap: embed default flags in app config; refresh from API every 60s or via SSE on change.

```text
Request ──► evaluate flags (cached rules) ──► deterministic hash(user_id, flag_key) ──► variant
Exposure event ──► analytics pipeline (once per session)
```

## Data Model

```sql
CREATE TABLE feature_flags (
  key         TEXT PRIMARY KEY,
  enabled     BOOLEAN DEFAULT false,
  description TEXT,
  variants    JSONB DEFAULT '["control", "treatment"]',
  default_variant TEXT DEFAULT 'control',
  rollout_pct INT DEFAULT 0,
  allowlist   UUID[] DEFAULT '{}',
  force_off   BOOLEAN DEFAULT false,
  updated_at  TIMESTAMPTZ DEFAULT now()
);
```

Redis cache: `flag:{key}` → JSON rule blob, invalidate on admin update via pub/sub.

## Scaling

- **In-memory cache** per worker with 30–60s TTL—flags change rarely
- **Precompute** flags at login, return in JWT or session bootstrap payload
- **Edge evaluation** for static flags (CDN worker) when no PII context needed
- **Audit log** all admin flag changes
- Avoid N+1: batch evaluate endpoint returns all active flags in one call

## Python Stack

| Layer | Choice |
|-------|--------|
| API | FastAPI |
| Storage | Postgres + Redis cache |
| Hashing | `hashlib.sha256` for stable buckets |
| SDK | Internal module or LaunchDarkly/Unleash client |

```python
import hashlib
from functools import lru_cache
from pydantic import BaseModel

class FlagContext(BaseModel):
    user_id: str | None = None
    org_id: str | None = None
    plan: str = "free"

def bucket(user_id: str, flag_key: str, percent: int) -> bool:
    digest = hashlib.sha256(f"{flag_key}:{user_id}".encode()).hexdigest()
    return (int(digest[:8], 16) % 100) < percent

@lru_cache(maxsize=256)
def get_flag_rules(key: str) -> dict:
    # load from Redis/Postgres
    return fetch_flag(key)

def evaluate_flag(key: str, ctx: FlagContext) -> str:
    rules = get_flag_rules(key)
    if rules.get("force_off") or not rules.get("enabled"):
        return rules["default_variant"]
    if ctx.user_id and ctx.user_id in rules.get("allowlist", []):
        return rules["variants"][-1]  # treatment for allowlist
    if ctx.user_id and bucket(ctx.user_id, key, rules.get("rollout_pct", 0)):
        return rules["variants"][-1]
    return rules["default_variant"]

@app.post("/flags/evaluate")
async def evaluate(body: EvaluateRequest):
    results = {key: evaluate_flag(key, body.context) for key in body.flag_keys}
    return {"flags": results}
```

**Interview tip:** Deterministic hashing beats random per request—required for valid A/B analysis. Mention exposure logging vs assignment logging. `force_off` kill switch overrides all rules.
