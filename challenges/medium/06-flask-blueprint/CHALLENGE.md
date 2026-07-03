# Flask Blueprint

**Difficulty:** medium  
**Topics:** flask, blueprints

## Learning goals

- Organize routes in blueprints
- Register on app factory

## Challenge

Create `users_bp` blueprint with `GET /users` returning JSON list and register it on a Flask app at `/api` prefix.

## Requirements

1. Blueprint named users
2. Route returns JSON
3. url_prefix /api

## Starter hint

Implement in **your own** Python project (venv + pytest) or a sandbox—e.g. `practice/medium/06-flask-blueprint/`. Reference write-ups in this repo live under `challenges/medium/06-flask-blueprint/` (not loaded by the app).

```python
from flask import Blueprint, Flask, jsonify

users_bp = Blueprint("users", __name__)

# TODO: route and create_app()
```

## Hints

1. @users_bp.get("/users")
2. app.register_blueprint(users_bp, url_prefix="/api")
3. return jsonify([...])

## Acceptance criteria

- [ ] **GET /api/users works**
  GET /api/users works. Run the dev server and hit the blueprint route with curl or httpie.

- [ ] **JSON response**
  JSON response: Route returns JSON. Run the dev server and hit the blueprint route with curl or httpie.

- [ ] **Blueprint registered**
  Blueprint registered: Blueprint named users. Run the dev server and hit the blueprint route with curl or httpie.

## Resources

- [Flask documentation](https://flask.palletsprojects.com/)
- [Python Tutorial](https://docs.python.org/3/tutorial/)
