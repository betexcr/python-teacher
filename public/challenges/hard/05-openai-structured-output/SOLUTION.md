# Solution: OpenAI Structured Output

## Approach

Use structured outputs API binding Pydantic model to parsed completion.

## Key concepts

- **structured outputs**: Model constrained to valid JSON matching schema.
- **Pydantic parsing**: Validates LLM JSON before app uses it.

## Code highlights

- `raise ValueError("failed to parse invoice")` — **raise** — Fail fast with a clear error when input or state is invalid. Chat completions.parse binds Invoice schema; parsed attribute gives validated model instance.
- `def parse_invoice(text: str) -> Invoice:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `class Invoice(BaseModel)` — **Pydantic Invoice** — Validates and parses incoming data into typed Python objects. Chat completions.parse binds Invoice schema; parsed attribute gives validated model instance.
- `return message.parsed` — **return** — Returns the computed result to the caller. Chat completions.parse binds Invoice schema; parsed attribute gives validated model instance.

## Solution code

```python
from openai import OpenAI
from pydantic import BaseModel

class Invoice(BaseModel):
    vendor: str
    total: float
    currency: str = "USD"

client = OpenAI()

def parse_invoice(text: str) -> Invoice:
    completion = client.beta.chat.completions.parse(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Extract invoice fields."},
            {"role": "user", "content": text},
        ],
        response_format=Invoice,
    )
    message = completion.choices[0].message
    if message.parsed is None:
        raise ValueError("failed to parse invoice")
    return message.parsed
```

## Walkthrough

Chat completions.parse binds Invoice schema; parsed attribute gives validated model instance.

## Common mistakes

- Trusting free-form JSON
- No guard when parsed is None

## Stretch goals

- Fallback regex parser
- Batch extraction pipeline
