# OpenAI Structured Output

**Difficulty:** hard  
**Topics:** openai, pydantic

## Learning goals

- Request JSON schema responses
- Parse into Pydantic models

## Challenge

Use OpenAI chat completions with `response_format` JSON schema to extract `Invoice` model fields from raw text via `parse_invoice(text) -> Invoice`.

## Requirements

1. Pydantic Invoice model
2. response_format json_schema
3. Handle API errors gracefully

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/hard/05-openai-structured-output/`. Reference write-ups in this repo live under `challenges/hard/05-openai-structured-output/` (not loaded by the app).

```python
from openai import OpenAI
from pydantic import BaseModel

class Invoice(BaseModel):
    vendor: str
    total: float
    currency: str = "USD"

client = OpenAI()

def parse_invoice(text: str) -> Invoice:
    # TODO
    raise NotImplementedError
```

## Hints

1. client.beta.chat.completions.parse
2. response_format=Invoice
3. or json_schema in response_format

## Acceptance criteria

- [ ] **Returns Invoice instance**
  Returns Invoice instance. Mock the API client in tests or use a test key; assert the parsed model fields.

- [ ] **Invalid response raises**
  Invalid response raises. Mock the API client in tests or use a test key; assert the parsed model fields.

- [ ] **Currency default USD**
  Currency default USD. Mock the API client in tests or use a test key; assert the parsed model fields.

## Resources

- [OpenAI structured outputs](https://platform.openai.com/docs/guides/structured-outputs)
- [Pydantic documentation](https://docs.pydantic.dev/latest/)
