# Real-Time Chat (WebSockets)

## Requirements

Build a multi-room chat backend supporting thousands of concurrent connections:

- **Rooms:** Join/leave channels; broadcast messages to room members only
- **Message ordering:** Per-room sequence numbers; clients reconcile gaps
- **Presence:** Online/offline, typing indicators (ephemeral, not persisted)
- **History:** Paginated REST fetch for messages before live stream
- **Scale:** Horizontal WebSocket servers with shared pub/sub backbone

## API Design

**REST (history & auth):**

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/rooms/{id}/messages` | GET | `?before=seq&limit=50` cursor pagination |
| `/rooms/{id}/messages` | POST | Send message (fallback when WS down) |
| `/rooms` | GET | List user's rooms |

**WebSocket:** `wss://api.example/ws?token=<jwt>`

Client → server frames:

```json
{ "type": "join", "room_id": "general" }
{ "type": "message", "room_id": "general", "body": "hello", "client_id": "uuid" }
{ "type": "typing", "room_id": "general" }
```

Server → client:

```json
{ "type": "message", "seq": 1042, "room_id": "general", "user_id": "...", "body": "hello", "client_id": "uuid" }
{ "type": "ack", "client_id": "uuid", "seq": 1042 }
```

## Data Model

```sql
CREATE TABLE messages (
  id         BIGSERIAL PRIMARY KEY,
  room_id    UUID NOT NULL,
  user_id    UUID NOT NULL,
  body       TEXT NOT NULL,
  seq        BIGINT NOT NULL,
  client_id  UUID,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (room_id, seq)
);

CREATE INDEX idx_messages_room_seq ON messages(room_id, seq DESC);
```

Redis pub/sub channel: `room:{room_id}` for cross-server fan-out. Redis `INCR room:{id}:seq` assigns monotonic sequence atomically.

## Scaling

- **Sticky sessions optional** if using Redis pub/sub—any worker can receive WS and publish
- **Connection limits:** ~10k–50k connections per worker depending on memory; scale out workers
- **Backpressure:** Drop typing events under load; rate-limit messages per user
- **History:** Hot recent messages in Redis list; cold storage in Postgres
- **Reconnect:** Client sends `last_seq`; server replays missed messages from DB

## Python Stack

| Layer | Choice |
|-------|--------|
| Framework | FastAPI + `websockets` or `python-socketio` |
| Pub/sub | Redis |
| Auth | JWT validated on WS handshake |
| ORM | SQLAlchemy async |

```python
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Query
from redis.asyncio import Redis
import json

app = FastAPI()
redis = Redis.from_url("redis://localhost:6379/0")

class ConnectionManager:
    def __init__(self):
        self.active: dict[str, set[WebSocket]] = {}

    async def connect(self, room_id: str, ws: WebSocket):
        await ws.accept()
        self.active.setdefault(room_id, set()).add(ws)

    async def broadcast(self, room_id: str, payload: dict):
        for ws in list(self.active.get(room_id, [])):
            await ws.send_json(payload)

manager = ConnectionManager()

@app.websocket("/ws")
async def websocket_endpoint(ws: WebSocket, token: str = Query(...)):
    user = verify_jwt(token)  # raises on invalid
    room_id = "general"
    await manager.connect(room_id, ws)
    pubsub = redis.pubsub()
    await pubsub.subscribe(f"room:{room_id}")
    try:
        async for raw in pubsub.listen():
            if raw["type"] == "message":
                await ws.send_text(raw["data"].decode())
        while True:
            data = await ws.receive_json()
            if data["type"] == "message":
                seq = await redis.incr(f"room:{room_id}:seq")
                event = {"type": "message", "seq": seq, "user_id": user.id, "body": data["body"]}
                await save_message(room_id, user.id, data["body"], seq)
                await redis.publish(f"room:{room_id}", json.dumps(event))
    except WebSocketDisconnect:
        manager.active[room_id].discard(ws)
```

**Interview tip:** Explain why HTTP polling fails at scale (latency, overhead). Mention heartbeats (`ping`/`pong`) and idle timeouts. For very large rooms, consider fan-out via dedicated message service rather than O(n) broadcast per server.
