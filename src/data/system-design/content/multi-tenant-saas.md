# Multi-Tenant SaaS

## Requirements

Single deployment serving many organizations (tenants) with strict isolation:

- **Tenant context:** Every request scoped to `org_id` from JWT or subdomain
- **Data isolation:** Row-level security (RLS) or schema-per-tenant strategy
- **Billing:** Per-tenant plans, usage metering, feature gates
- **Onboarding:** Self-serve org creation, invite flows, role assignment
- **Scale:** 10k tenants, noisy-neighbor protection on shared infra

## API Design

All tenant-scoped routes require `X-Org-Id` header (must match JWT membership):

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/orgs` | POST | Create organization |
| `/orgs/{id}/members` | GET/POST | Invite, list members |
| `/projects` | GET | List projects for current org |
| `/projects` | POST | Create project (admin role) |

Middleware rejects cross-tenant access with `403` even if resource ID is guessed.

```text
Request ──► JWT verify ──► resolve org_id ──► RLS session var ──► handler
```

## Data Model

**Shared schema + RLS (recommended default):**

```sql
CREATE TABLE organizations (
  id   UUID PRIMARY KEY,
  name TEXT NOT NULL,
  plan TEXT DEFAULT 'free'
);

CREATE TABLE projects (
  id     UUID PRIMARY KEY,
  org_id UUID NOT NULL REFERENCES organizations(id),
  name   TEXT NOT NULL
);

CREATE INDEX idx_projects_org ON projects(org_id);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON projects
  USING (org_id = current_setting('app.current_org_id')::uuid);
```

Membership:

```sql
CREATE TABLE org_members (
  org_id  UUID REFERENCES organizations(id),
  user_id UUID REFERENCES users(id),
  role    TEXT NOT NULL,
  PRIMARY KEY (org_id, user_id)
);
```

## Scaling

- **Connection pooling** (PgBouncer)—set `app.current_org_id` per transaction
- **Cache keys** always prefixed: `org:{org_id}:projects`
- **Rate limits per tenant** to prevent one customer saturating shared API
- **Schema-per-tenant** only for enterprise isolation requirements (ops cost grows)
- **Read replicas** with same RLS policies

## Python Stack

| Layer | Choice |
|-------|--------|
| Framework | FastAPI |
| ORM | SQLAlchemy 2 + asyncpg |
| RLS | `SET LOCAL app.current_org_id` per request |
| Billing | Stripe Customer per org |

```python
from contextvars import ContextVar
from fastapi import Depends, HTTPException, Header
from sqlalchemy.ext.asyncio import AsyncSession

current_org_id: ContextVar[str | None] = ContextVar("current_org_id", default=None)

async def tenant_middleware(request: Request, call_next):
    org_id = request.headers.get("X-Org-Id")
    if org_id:
        current_org_id.set(org_id)
    response = await call_next(request)
    return response

async def set_tenant_rls(session: AsyncSession, org_id: str):
    await session.execute(text("SET LOCAL app.current_org_id = :org_id"), {"org_id": org_id})

async def require_org_member(
    x_org_id: str = Header(..., alias="X-Org-Id"),
    user=Depends(current_user),
    session: AsyncSession = Depends(get_session),
):
    member = await session.scalar(
        select(OrgMember).where(OrgMember.org_id == x_org_id, OrgMember.user_id == user.id)
    )
    if not member:
        raise HTTPException(403, "Not a member of this organization")
    await set_tenant_rls(session, x_org_id)
    return x_org_id

@app.get("/projects")
async def list_projects(org_id: str = Depends(require_org_member), session: AsyncSession = Depends(get_session)):
    result = await session.scalars(select(Project).order_by(Project.name))
    return {"projects": result.all()}
```

**Interview tip:** Compare RLS vs application-level filters vs separate databases. RLS is defense-in-depth—app bug can't leak another tenant if policy is correct.
