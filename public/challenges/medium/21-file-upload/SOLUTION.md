# Solution: File Upload

## Approach

Check extension, read bytes with limit, write to uploads dir.

## Key concepts

- **UploadFile**: Starlette wrapper streaming multipart file data.
- **validation first**: Check metadata before writing disk.

## Code highlights

- `async def upload(file: UploadFile)` — **async upload** — `upload` is a coroutine — call it with await or asyncio.run. Validate extension, read content, enforce size cap, mkdir uploads, write sanitized filename.
- `return {"filename": dest.name}` — **return** — Returns the computed result to the caller. Validate extension, read content, enforce size cap, mkdir uploads, write sanitized filename.
- `@app.post("/upload")` — **POST route** — Registers an HTTP POST handler on the FastAPI app or blueprint router. Validate extension, read content, enforce size cap, mkdir uploads, write sanitized filename.
- `Path("uploads")` — **Path** — Object-oriented filesystem path. Validate extension, read content, enforce size cap, mkdir uploads, write sanitized filename.

## Solution code

```python
from pathlib import Path
from fastapi import FastAPI, HTTPException, UploadFile

app = FastAPI()
UPLOAD_DIR = Path("uploads")
MAX_BYTES = 1_000_000

@app.post("/upload")
async def upload(file: UploadFile):
    if not file.filename or not file.filename.endswith(".txt"):
        raise HTTPException(status_code=400, detail="txt only")
    data = await file.read()
    if len(data) > MAX_BYTES:
        raise HTTPException(status_code=413, detail="too large")
    UPLOAD_DIR.mkdir(exist_ok=True)
    dest = UPLOAD_DIR / Path(file.filename).name
    dest.write_bytes(data)
    return {"filename": dest.name}
```

## Walkthrough

Validate extension, read content, enforce size cap, mkdir uploads, write sanitized filename.

## Common mistakes

- Trusting client mime type
- Path traversal via filename

## Stretch goals

- Streaming write without full read
- Virus scan hook
