# File Upload

**Difficulty:** medium  
**Topics:** fastapi, files

## Learning goals

- Accept multipart uploads
- Validate size and type

## Challenge

FastAPI endpoint `POST /upload` saving `UploadFile` to `./uploads/` allowing only `.txt` and max 1MB.

## Requirements

1. Reject non-txt extension
2. Reject files > 1MB
3. Return saved filename

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/medium/21-file-upload/`. Reference write-ups in this repo live under `challenges/medium/21-file-upload/` (not loaded by the app).

```python
from pathlib import Path
from fastapi import FastAPI, HTTPException, UploadFile

app = FastAPI()
UPLOAD_DIR = Path("uploads")
MAX_BYTES = 1_000_000

@app.post("/upload")
async def upload(file: UploadFile):
    # TODO
    ...
```

## Hints

1. if not file.filename.endswith(".txt")
2. contents = await file.read()
3. len(contents) > MAX_BYTES

## Acceptance criteria

- [ ] **Valid txt saved**
  Valid txt saved. Start uvicorn, open /docs or curl the endpoint, and verify status code plus JSON shape.

- [ ] **Big file 413**
  Big file 413. Start uvicorn, open /docs or curl the endpoint, and verify status code plus JSON shape.

- [ ] **Wrong extension 400**
  Wrong extension 400. Start uvicorn, open /docs or curl the endpoint, and verify status code plus JSON shape.

## Resources

- [FastAPI documentation](https://fastapi.tiangolo.com/)
- [files – reference](https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files)
