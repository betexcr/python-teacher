import type { FlashcardDeck } from './types';

export const flaskDeck: FlashcardDeck = {
  "id": "flask",
  "slug": "flask",
  "title": "Flask",
  "cards": [
    {
      "question": "Flask app structure?",
      "explanation": "Application factory pattern scales better than single global app—create_app(config) registers blueprints and extensions.\n\n```python\ndef create_app():\n    app = Flask(__name__)\n    app.register_blueprint(api_bp)\n    return app\n```"
    },
    {
      "question": "Routing and methods?",
      "explanation": "@app.route(\"/items\", methods=[\"GET\", \"POST\"]) or @app.get/@app.post (Flask 2+).\n\n```python\n@app.post(\"/items\")\ndef create_item():\n    data = request.get_json()\n    ...\n```"
    },
    {
      "question": "request and json?",
      "explanation": "request.args query dict, request.form, request.get_json(silent=True). Validate input—Flask does not auto-validate like Pydantic."
    },
    {
      "question": "Blueprints?",
      "explanation": "Modular routes + templates + static files. url_prefix groups API versions or features.\n\n```python\nbp = Blueprint(\"api\", __name__, url_prefix=\"/api\")\n\n@bp.get(\"/users\")\ndef users(): ...\n```"
    },
    {
      "question": "Flask-SQLAlchemy pattern?",
      "explanation": "db = SQLAlchemy(); db.init_app(app). Models inherit db.Model; sessions scoped per request via teardown."
    },
    {
      "question": "Jinja2 templates?",
      "explanation": "render_template(\"page.html\", user=user). Auto-escaping for HTML; use Markup carefully. extends/include for layout."
    },
    {
      "question": "Sessions and cookies?",
      "explanation": "session dict signed with SECRET_KEY— not encrypted. Do not store secrets in session; set SECURE, HTTPONLY, SAMESITE on cookies."
    },
    {
      "question": "Flask vs FastAPI?",
      "explanation": "Flask: mature sync WSGI ecosystem, extensions for everything. FastAPI: async-first, OpenAPI, Pydantic validation. Choose based on team and I/O model."
    },
    {
      "question": "Error handlers?",
      "explanation": "@app.errorhandler(404) def not_found(e): return jsonify(...), 404. Consistent JSON errors for APIs."
    },
    {
      "question": "before_request / after_request?",
      "explanation": "Hooks for auth, logging, CORS headers, DB session per request.\n\n```python\n@app.before_request\ndef load_user():\n    g.user = current_user()\n```"
    },
    {
      "question": "g object?",
      "explanation": "Request-local storage during one request—attach user, db connection, trace id."
    },
    {
      "question": "Testing Flask?",
      "explanation": "app.test_client() with context. pytest fixtures for app and client; TRANSACTION rollback pattern for DB tests.\n\n```python\ndef test_index(client):\n    resp = client.get(\"/\")\n    assert resp.status_code == 200\n```"
    },
    {
      "question": "Production WSGI server?",
      "explanation": "Never use app.run() in production. gunicorn, waitress, uWSGI behind reverse proxy with TLS termination."
    },
    {
      "question": "Flask-Login overview?",
      "explanation": "current_user, login_user, login_required decorator—session-based auth common in server-rendered apps."
    },
    {
      "question": "Configuration pattern?",
      "explanation": "app.config.from_object(Config) or from_envvar. Separate Dev/Prod configs; never commit secrets."
    }
  ]
};
