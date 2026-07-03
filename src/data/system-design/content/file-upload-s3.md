# File Upload to S3

## Requirements

Allow users to upload large files (images, PDFs) without proxying bytes through your API:

- **Direct upload:** Client uploads to S3 via presigned POST/PUT
- **Metadata:** Track filename, size, MIME, owner, scan status in Postgres
- **Validation:** Max size, allowed MIME types, virus scan before marking `ready`
- **Progress:** Client reports progress via XHR/fetch to S3; server only orchestrates
- **Security:** Short-lived presigned URLs; never expose bucket credentials

## API Design

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/uploads/init` | POST | `{ "filename", "content_type", "size" }` → presigned fields + `upload_id` |
| `/uploads/{id}/complete` | POST | Trigger virus scan job after S3 confirms object |
| `/uploads/{id}` | GET | `{ "status": "pending|scanning|ready|rejected", "url" }` |

```text
Client ──► POST /uploads/init ──► presigned POST URL
Client ──► multipart POST directly to S3
Client ──► POST /uploads/{id}/complete
Worker ──► scan S3 object ──► update status ready|rejected
```

## Data Model

```sql
CREATE TABLE uploads (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id      UUID NOT NULL,
  s3_key        TEXT NOT NULL,
  filename      TEXT NOT NULL,
  content_type  TEXT NOT NULL,
  size_bytes    BIGINT NOT NULL,
  status        TEXT DEFAULT 'pending',
  created_at    TIMESTAMPTZ DEFAULT now()
);
```

S3 key pattern: `uploads/{owner_id}/{upload_id}/{sanitized_filename}`. Enable SSE-S3 or SSE-KMS encryption at rest.

## Scaling

- **No API bandwidth bottleneck**—files flow client → S3 directly
- **Multipart upload** for files > 100 MB (S3 API); presigned URLs per part
- **Async scanning** via Celery/RQ—ClamAV Lambda or dedicated worker
- **CDN signed URLs** for downloads after `ready` status
- Lifecycle policy: delete `rejected` or abandoned `pending` uploads after 24h

## Python Stack

| Layer | Choice |
|-------|--------|
| Storage | AWS S3 (`boto3`) |
| API | FastAPI |
| Scan queue | Celery + ClamAV |
| ORM | SQLAlchemy |

```python
import boto3
from botocore.config import Config
from datetime import datetime, timedelta, timezone
from uuid import uuid4
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()
s3 = boto3.client("s3", config=Config(signature_version="s3v4"))
BUCKET = "my-app-uploads"

class InitUploadRequest(BaseModel):
    filename: str
    content_type: str
    size: int

@app.post("/uploads/init")
async def init_upload(body: InitUploadRequest, user=Depends(current_user)):
    if body.size > 50 * 1024 * 1024:
        raise HTTPException(400, "File too large")
    upload_id = uuid4()
    key = f"uploads/{user.id}/{upload_id}/{body.filename}"

    presigned = s3.generate_presigned_post(
        Bucket=BUCKET,
        Key=key,
        Fields={"Content-Type": body.content_type},
        Conditions=[
            {"Content-Type": body.content_type},
            ["content-length-range", 1, body.size],
        ],
        ExpiresIn=3600,
    )
    await save_upload_record(upload_id, user.id, key, body)
    return {"upload_id": str(upload_id), "presigned": presigned}

@app.post("/uploads/{upload_id}/complete")
async def complete_upload(upload_id: str, user=Depends(current_user)):
    upload = await get_upload(upload_id, user.id)
    scan_file.delay(upload.s3_key, str(upload_id))
    await update_status(upload_id, "scanning")
    return {"status": "scanning"}
```

**Interview tip:** Explain why presigned POST (policy document) vs presigned PUT. Mention Content-Type enforcement in policy to block executable uploads disguised as images.
