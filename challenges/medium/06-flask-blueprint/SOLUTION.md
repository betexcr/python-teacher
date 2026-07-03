# Solution: Flask Blueprint

## Approach

Define blueprint routes; app factory registers with prefix.

## Key concepts

- **Blueprint**: Modular route group you mount on an app.
- **app factory**: create_app() pattern enables testing and config.

## Code highlights

- `return jsonify([{"id": 1, "name": "Ada"}])` — **return** — Returns the computed result to the caller. Blueprint holds users route; create_app registers it under /api so path is /api/users.
- `def create_app() -> Flask:` — **type hints** — Return and parameter types document the contract and enable static checking.
- `return app` — **return** — Returns the computed result to the caller. Blueprint holds users route; create_app registers it under /api so path is /api/users.

## Solution code

```python
from flask import Blueprint, Flask, jsonify

users_bp = Blueprint("users", __name__)

@users_bp.get("/users")
def list_users():
    return jsonify([{"id": 1, "name": "Ada"}])

def create_app() -> Flask:
    app = Flask(__name__)
    app.register_blueprint(users_bp, url_prefix="/api")
    return app
```

## Walkthrough

Blueprint holds users route; create_app registers it under /api so path is /api/users.

## Common mistakes

- Registering without url_prefix
- Returning dict without jsonify in older Flask

## Stretch goals

- Add POST /users
- Separate admin blueprint
