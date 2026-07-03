# Email Sender

**Difficulty:** medium  
**Topics:** email, smtplib

## Learning goals

- Build MIME messages
- Send via SMTP SSL

## Challenge

Implement `send_message(host, port, user, password, to, subject, body) -> None` using `smtplib.SMTP_SSL` and `EmailMessage`.

## Requirements

1. Use EmailMessage
2. Login with credentials
3. Set From/To/Subject

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/medium/23-email-sender/`. Reference write-ups in this repo live under `challenges/medium/23-email-sender/` (not loaded by the app).

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
    # TODO
    raise NotImplementedError
```

## Hints

1. msg = EmailMessage()
2. msg.set_content(body)
3. with smtplib.SMTP_SSL(host, port) as smtp

## Acceptance criteria

- [ ] **EmailMessage constructed**
  EmailMessage constructed: Use EmailMessage. Write a small script or pytest test that demonstrates this behavior matches Email Sender.

- [ ] **SMTP login called**
  SMTP login called. Write a small script or pytest test that demonstrates this behavior matches Email Sender.

- [ ] **Message sent to recipient**
  Message sent to recipient: Use EmailMessage. Write a small script or pytest test that demonstrates this behavior matches Email Sender.

## Resources

- [email – reference](https://docs.python.org/3/library/smtplib.html)
- [Python Tutorial](https://docs.python.org/3/tutorial/)
