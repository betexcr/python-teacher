# Solution: Email Sender

## Approach

Build EmailMessage; connect SSL SMTP; login; send_message.

## Key concepts

- **EmailMessage**: Modern stdlib API for MIME emails.
- **SMTP_SSL**: Encrypted connection suitable for submission ports.

## Code highlights

- `with smtplib.SMTP_SSL(host, port) as smtp:` — **with** — Context manager — setup on enter, cleanup on exit even if an exception occurs. Compose EmailMessage headers and body; SMTP_SSL context login; send_message delivers.

## Solution code

```python
from email.message import EmailMessage
import smtplib

def send_message(
    host: str,
    port: int,
    user: str,
    password: str,
    to: str,
    subject: str,
    body: str,
) -> None:
    msg = EmailMessage()
    msg["From"] = user
    msg["To"] = to
    msg["Subject"] = subject
    msg.set_content(body)
    with smtplib.SMTP_SSL(host, port) as smtp:
        smtp.login(user, password)
        smtp.send_message(msg)
```

## Walkthrough

Compose EmailMessage headers and body; SMTP_SSL context login; send_message delivers.

## Common mistakes

- Plain SMTP on port 465
- Hardcoding secrets in code

## Stretch goals

- HTML multipart
- aiosmtplib async sender
