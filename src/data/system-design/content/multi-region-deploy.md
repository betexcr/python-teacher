# Multi-Region Deployment

## Requirements

Deploy a Python API globally with low latency and disaster recovery:

- **Regions:** Active-active or active-passive (primary + DR)
- **Data:** User data residency (EU vs US); replication lag acceptable bounds
- **Routing:** Geo-DNS or anycast sends users to nearest healthy region
- **Failover:** Automatic health-check based traffic shift; RPO/RTO targets
- **Consistency:** Write routing strategy—single primary vs conflict resolution

## API Design

Same API contract in every region; differences are infrastructure:

| Concern | Pattern |
|---------|---------|
| Reads | Local region replica |
| Writes | Primary region only OR CRDT/conflict merge |
| Sessions | JWT stateless or Redis with cross-region replication |
| Files | S3 cross-region replication (CRR) |

Global load balancer health checks `GET /health` every 10s per region.

```text
User ──► Geo DNS (Route53 latency) ──► Regional ALB ──► FastAPI pods
                                              │
                    Primary Postgres ◄── logical replication ──► Read replica (EU)
                    Redis Global Datastore / regional caches
```

## Data Model

**User residency:**

```sql
ALTER TABLE users ADD COLUMN home_region TEXT NOT NULL DEFAULT 'us-east-1';
```

Route writes for EU users to `eu-west-1` primary if using data residency; otherwise single write primary with global replicas.

**Global ID generation:** UUIDv7 or Snowflake with region prefix avoids collision without coordination.

**Outbox for cross-region events:**

```sql
CREATE TABLE regional_outbox (
  id         UUID PRIMARY KEY,
  region     TEXT NOT NULL,
  event_type TEXT NOT NULL,
  payload    JSONB NOT NULL,
  published  BOOLEAN DEFAULT false
);
```

## Scaling

- **Stateless API** scales horizontally per region—no sticky sessions required with JWT
- **Read replicas** in each region; writes forwarded to primary (latency tradeoff) or use CockroachDB/Spanner for multi-primary
- **Cache** is regional—accept brief inconsistency or use Redis Global Datastore
- **Background jobs** run in primary region only to avoid duplicate side effects
- **Chaos testing**—game days for regional failover

## Python Stack

| Layer | Choice |
|-------|--------|
| Compute | Kubernetes (EKS/GKE) per region |
| DB | Postgres logical replication or CockroachDB |
| Routing | AWS Route53 latency records / Cloudflare Load Balancing |
| Config | Region in env (`AWS_REGION`) via Pydantic settings |
| Deployment | Terraform + CI matrix deploy |

```python
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    region: str = "us-east-1"
    is_write_primary: bool = False
    primary_db_url: str
    local_replica_url: str

settings = Settings()

def get_db_url(for_write: bool = False) -> str:
    if for_write and not settings.is_write_primary:
        return settings.primary_db_url  # forward write to primary region
    return settings.local_replica_url if not for_write else settings.primary_db_url

@app.middleware("http")
async def region_header(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Served-By-Region"] = settings.region
    return response

async def create_order(order: OrderCreate, user=Depends(current_user)):
    if not settings.is_write_primary:
        # proxy write to primary region internal API
        return await proxy_post_to_primary("/orders", order.model_dump())
    async with get_write_session() as session:
        db_order = Order(**order.model_dump(), user_id=user.id)
        session.add(db_order)
        await session.commit()
        await publish_outbox("order.created", db_order.id)
        return db_order
```

**Interview tip:** CAP theorem—multi-region active-active sacrifices strong consistency unless using consensus DB. Clarify RPO (max data loss) and RTO (max downtime). Most SaaS starts active-passive with read replicas per region.
