/**
 * Beginner-friendly acceptance criteria per Python challenge.
 * Keys: {difficulty}/{slug}
 */

const a = (summary, detail) => ({ summary, detail });

/** @type {Record<string, { summary: string; detail: string }[]>} */
const CHALLENGE_ACCEPTANCE = {
  'easy/01-fizzbuzz': [
    a(
      'Correct FizzBuzz at 15',
      'Correct FizzBuzz at 15. Write a small script or pytest test that demonstrates this behavior matches FizzBuzz.'
    ),
    a(
      'Plain numbers as strings',
      'Plain numbers as strings. Write a small script or pytest test that demonstrates this behavior matches FizzBuzz.'
    ),
    a(
      'Length equals n',
      'Length equals n. Write a small script or pytest test that demonstrates this behavior matches FizzBuzz.'
    ),
  ],
  'easy/02-string-parsing': [
    a(
      'Valid line parses',
      'Valid line parses: Invalid format raises ValueError. Write a small script or pytest test that demonstrates this behavior matches Log Line Parser.'
    ),
    a(
      'Whitespace trimmed',
      'Whitespace trimmed. Write a small script or pytest test that demonstrates this behavior matches Log Line Parser.'
    ),
    a(
      'Bad line raises',
      'Bad line raises. Write a small script or pytest test that demonstrates this behavior matches Log Line Parser.'
    ),
  ],
  'easy/03-file-counter': [
    a(
      'Counts non-empty lines',
      'Counts non-empty lines. Write a small script or pytest test that demonstrates this behavior matches File Line Counter.'
    ),
    a(
      'Empty file returns 0',
      'Empty file returns 0. Write a small script or pytest test that demonstrates this behavior matches File Line Counter.'
    ),
    a(
      'Missing file raises',
      'Missing file raises: Raise FileNotFoundError if missing. Write a small script or pytest test that demonstrates this behavior matches File Line Counter.'
    ),
  ],
  'easy/04-json-reader': [
    a(
      'Valid JSON loads',
      'Valid JSON loads. Write a small script or pytest test that demonstrates this behavior matches JSON Config Reader.'
    ),
    a(
      'Missing key fails',
      'Missing key fails: Missing keys or wrong types raise ValueError. Write a small script or pytest test that demonstrates this behavior matches JSON Config Reader.'
    ),
    a(
      'Non-object root fails',
      'Non-object root fails. Write a small script or pytest test that demonstrates this behavior matches JSON Config Reader.'
    ),
  ],
  'easy/05-cli-args': [
    a(
      'Default greeting works',
      'Default greeting works: Default name is world. Write a small script or pytest test that demonstrates this behavior matches CLI Greeting.'
    ),
    a(
      'Name flag works',
      'Name flag works: Default name is world. Write a small script or pytest test that demonstrates this behavior matches CLI Greeting.'
    ),
    a(
      'Shout flag uppercases',
      'Shout flag uppercases: --shout uppercases output. Write a small script or pytest test that demonstrates this behavior matches CLI Greeting.'
    ),
  ],
  'easy/06-simple-class': [
    a(
      'Deposit increases balance',
      'Deposit increases balance: deposit adds positive amounts only. Write a small script or pytest test that demonstrates this behavior matches Bank Account Class.'
    ),
    a(
      'Withdraw decreases',
      'Withdraw decreases: withdraw raises ValueError if insufficient funds. Write a small script or pytest test that demonstrates this behavior matches Bank Account Class.'
    ),
    a(
      'Overdraft blocked',
      'Overdraft blocked. Write a small script or pytest test that demonstrates this behavior matches Bank Account Class.'
    ),
  ],
  'easy/07-list-dict-operations': [
    a(
      'Merges duplicate SKUs',
      'Merges duplicate SKUs. Write a small script or pytest test that demonstrates this behavior matches Inventory Totals.'
    ),
    a(
      'Totals correct',
      'Totals correct. Write a small script or pytest test that demonstrates this behavior matches Inventory Totals.'
    ),
    a(
      'Empty list ok',
      'Empty list ok: Empty input returns zeros. Write a small script or pytest test that demonstrates this behavior matches Inventory Totals.'
    ),
  ],
  'easy/08-pathlib-walk': [
    a(
      'Finds nested .py files',
      'Finds nested .py files. Write a small script or pytest test that demonstrates this behavior matches Find Python Files.'
    ),
    a(
      'Skips __pycache__',
      'Skips __pycache__. Write a small script or pytest test that demonstrates this behavior matches Find Python Files.'
    ),
    a(
      'Sorted output',
      'Sorted output: Sorted ascending. Write a small script or pytest test that demonstrates this behavior matches Find Python Files.'
    ),
  ],
  'easy/09-env-vars': [
    a(
      'Default APP_ENV',
      'Default APP_ENV: APP_ENV defaults to dev. Write a small script or pytest test that demonstrates this behavior matches Environment Config.'
    ),
    a(
      'Missing DB URL fails',
      'Missing DB URL fails. Write a small script or pytest test that demonstrates this behavior matches Environment Config.'
    ),
    a(
      'Returns Settings',
      'Returns Settings. Write a small script or pytest test that demonstrates this behavior matches Environment Config.'
    ),
  ],
  'easy/10-pytest-basics': [
    a(
      'Conversion correct',
      'Conversion correct. Run pytest in the project folder and confirm all parametrized cases pass.'
    ),
    a(
      'Parametrize used',
      'Parametrize used: At least 3 parametrize cases including 0 and 100. Run pytest in the project folder and confirm all parametrized cases pass.'
    ),
    a(
      'Edge cases covered',
      'Edge cases covered. Run pytest in the project folder and confirm all parametrized cases pass.'
    ),
  ],
  'easy/11-csv-parse': [
    a(
      'Revenue correct',
      'Revenue correct. Write a small script or pytest test that demonstrates this behavior matches CSV Sales Report.'
    ),
    a(
      'Blank rows ignored',
      'Blank rows ignored: Skip blank rows. Write a small script or pytest test that demonstrates this behavior matches CSV Sales Report.'
    ),
    a(
      'Headers required',
      'Headers required. Write a small script or pytest test that demonstrates this behavior matches CSV Sales Report.'
    ),
  ],
  'easy/12-requests-get': [
    a(
      '200 returns JSON',
      '200 returns JSON. Write a small script or pytest test that demonstrates this behavior matches HTTP GET JSON.'
    ),
    a(
      '404 raises',
      '404 raises. Write a small script or pytest test that demonstrates this behavior matches HTTP GET JSON.'
    ),
    a(
      'Timeout configured',
      'Timeout configured: Use requests.get with timeout. Write a small script or pytest test that demonstrates this behavior matches HTTP GET JSON.'
    ),
  ],
  'easy/13-dataclass': [
    a(
      'Frozen instance',
      'Frozen instance: frozen=True. Write a small script or pytest test that demonstrates this behavior matches User Profile Dataclass.'
    ),
    a(
      'Invalid email fails',
      'Invalid email fails. Write a small script or pytest test that demonstrates this behavior matches User Profile Dataclass.'
    ),
    a(
      'to_dict works',
      'to_dict works: to_dict returns plain dict. Write a small script or pytest test that demonstrates this behavior matches User Profile Dataclass.'
    ),
  ],
  'easy/14-enum': [
    a(
      'Enum members exist',
      'Enum members exist. Write a small script or pytest test that demonstrates this behavior matches Order Status Enum.'
    ),
    a(
      'Case insensitive parse',
      'Case insensitive parse: parse_status case-insensitive. Write a small script or pytest test that demonstrates this behavior matches Order Status Enum.'
    ),
    a(
      'Invalid raises',
      'Invalid raises. Write a small script or pytest test that demonstrates this behavior matches Order Status Enum.'
    ),
  ],
  'easy/15-logging': [
    a(
      'Logger returned',
      'Logger returned: Returns logging.getLogger("app"). Write a small script or pytest test that demonstrates this behavior matches Module Logger Setup.'
    ),
    a(
      'Level respected',
      'Level respected: Format includes level and message. Write a small script or pytest test that demonstrates this behavior matches Module Logger Setup.'
    ),
    a(
      'Format readable',
      'Format readable: Format includes level and message. Write a small script or pytest test that demonstrates this behavior matches Module Logger Setup.'
    ),
  ],
  'easy/16-config-file': [
    a(
      'Defaults apply',
      'Defaults apply: Missing tool.app uses defaults. Write a small script or pytest test that demonstrates this behavior matches TOML App Config.'
    ),
    a(
      'Overrides merge',
      'Overrides merge. Write a small script or pytest test that demonstrates this behavior matches TOML App Config.'
    ),
    a(
      'port is int',
      'port is int: port coerced to int. Write a small script or pytest test that demonstrates this behavior matches TOML App Config.'
    ),
  ],
  'easy/17-unit-converter': [
    a(
      'km to m works',
      'km to m works: Support m, cm, km. Write a small script or pytest test that demonstrates this behavior matches Unit Converter.'
    ),
    a(
      'cm to km works',
      'cm to km works: Support m, cm, km. Write a small script or pytest test that demonstrates this behavior matches Unit Converter.'
    ),
    a(
      'Bad unit raises',
      'Bad unit raises. Write a small script or pytest test that demonstrates this behavior matches Unit Converter.'
    ),
  ],
  'easy/18-password-validator': [
    a(
      'Strong password passes',
      'Strong password passes. Write a small script or pytest test that demonstrates this behavior matches Password Validator.'
    ),
    a(
      'Weak lists errors',
      'Weak lists errors. Write a small script or pytest test that demonstrates this behavior matches Password Validator.'
    ),
    a(
      'Multiple errors at once',
      'Multiple errors at once. Write a small script or pytest test that demonstrates this behavior matches Password Validator.'
    ),
  ],
  'easy/19-text-search': [
    a(
      'Correct line numbers',
      'Correct line numbers. Write a small script or pytest test that demonstrates this behavior matches Grep Lite.'
    ),
    a(
      'Multiple matches returned',
      'Multiple matches returned. Write a small script or pytest test that demonstrates this behavior matches Grep Lite.'
    ),
    a(
      'Missing file raises',
      'Missing file raises. Write a small script or pytest test that demonstrates this behavior matches Grep Lite.'
    ),
  ],
  'easy/20-api-client': [
    a(
      'GET correct path',
      'GET correct path: GET /users/{id} relative to base. Write a small script or pytest test that demonstrates this behavior matches REST API Client.'
    ),
    a(
      'Session reused',
      'Session reused: Session created in __init__. Write a small script or pytest test that demonstrates this behavior matches REST API Client.'
    ),
    a(
      'HTTP errors propagate',
      'HTTP errors propagate. Write a small script or pytest test that demonstrates this behavior matches REST API Client.'
    ),
  ],
  'medium/01-decorator-timing': [
    a(
      'Prints elapsed time',
      'Prints elapsed time. Write a small script or pytest test that demonstrates this behavior matches Timing Decorator.'
    ),
    a(
      'Returns func result',
      'Returns func result. Write a small script or pytest test that demonstrates this behavior matches Timing Decorator.'
    ),
    a(
      'Wrapped __name__ matches original',
      'Wrapped __name__ matches original. Write a small script or pytest test that demonstrates this behavior matches Timing Decorator.'
    ),
  ],
  'medium/02-context-manager': [
    a(
      'Prints label and duration',
      'Prints label and duration. Write a small script or pytest test that demonstrates this behavior matches Timer Context Manager.'
    ),
    a(
      'Works with with statement',
      'Works with with statement. Write a small script or pytest test that demonstrates this behavior matches Timer Context Manager.'
    ),
    a(
      'Exception still raises',
      'Exception still raises: Do not swallow exceptions. Write a small script or pytest test that demonstrates this behavior matches Timer Context Manager.'
    ),
  ],
  'medium/03-generator-pipeline': [
    a(
      'Comments skipped',
      'Comments skipped. Write a small script or pytest test that demonstrates this behavior matches Generator Pipeline.'
    ),
    a(
      'Lazy iteration',
      'Lazy iteration. Write a small script or pytest test that demonstrates this behavior matches Generator Pipeline.'
    ),
    a(
      'CSV split correct',
      'CSV split correct. Write a small script or pytest test that demonstrates this behavior matches Generator Pipeline.'
    ),
  ],
  'medium/04-dataclass-validation': [
    a(
      'Valid user constructs',
      'Valid user constructs: Invalid email raises ValueError. Write a small script or pytest test that demonstrates this behavior matches Validated Dataclass.'
    ),
    a(
      'Bad email fails',
      'Bad email fails. Write a small script or pytest test that demonstrates this behavior matches Validated Dataclass.'
    ),
    a(
      'Bad age fails',
      'Bad age fails. Write a small script or pytest test that demonstrates this behavior matches Validated Dataclass.'
    ),
  ],
  'medium/05-pytest-fixtures-mocks': [
    a(
      'Test passes offline',
      'Test passes offline. Run pytest in the project folder and confirm all parametrized cases pass.'
    ),
    a(
      'Mock called once',
      'Mock called once: Mock returns 200. Run pytest in the project folder and confirm all parametrized cases pass.'
    ),
    a(
      'Fixture reused',
      'Fixture reused: Fixture provides base URL. Run pytest in the project folder and confirm all parametrized cases pass.'
    ),
  ],
  'medium/06-flask-blueprint': [
    a(
      'GET /api/users works',
      'GET /api/users works. Run the dev server and hit the blueprint route with curl or httpie.'
    ),
    a(
      'JSON response',
      'JSON response: Route returns JSON. Run the dev server and hit the blueprint route with curl or httpie.'
    ),
    a(
      'Blueprint registered',
      'Blueprint registered: Blueprint named users. Run the dev server and hit the blueprint route with curl or httpie.'
    ),
  ],
  'medium/07-fastapi-crud': [
    a(
      'POST returns id',
      'POST returns id: POST creates with auto id. Start uvicorn, open /docs or curl the endpoint, and verify status code plus JSON shape.'
    ),
    a(
      'GET by id works',
      'GET by id works: GET 404 when missing. Start uvicorn, open /docs or curl the endpoint, and verify status code plus JSON shape.'
    ),
    a(
      'DELETE 404 when gone',
      'DELETE 404 when gone: DELETE removes item. Start uvicorn, open /docs or curl the endpoint, and verify status code plus JSON shape.'
    ),
  ],
  'medium/08-pydantic-models': [
    a(
      'Valid JSON parses',
      'Valid JSON parses. Write a small script or pytest test that demonstrates this behavior matches Pydantic Models.'
    ),
    a(
      'Bad price fails',
      'Bad price fails. Write a small script or pytest test that demonstrates this behavior matches Pydantic Models.'
    ),
    a(
      'Defaults applied',
      'Defaults applied. Write a small script or pytest test that demonstrates this behavior matches Pydantic Models.'
    ),
  ],
  'medium/09-sqlalchemy-models': [
    a(
      'Table created',
      'Table created. Use an in-memory SQLite engine in tests to verify ORM queries without Postgres.'
    ),
    a(
      'Book persisted',
      'Book persisted. Use an in-memory SQLite engine in tests to verify ORM queries without Postgres.'
    ),
    a(
      'Fields stored correctly',
      'Fields stored correctly. Use an in-memory SQLite engine in tests to verify ORM queries without Postgres.'
    ),
  ],
  'medium/10-async-gather': [
    a(
      'All URLs fetched',
      'All URLs fetched. Run with asyncio.run() or pytest-asyncio and confirm concurrent tasks complete.'
    ),
    a(
      'Order matches input',
      'Order matches input: Preserve input order. Run with asyncio.run() or pytest-asyncio and confirm concurrent tasks complete.'
    ),
    a(
      'Session closed properly',
      'Session closed properly: Use ClientSession context manager. Run with asyncio.run() or pytest-asyncio and confirm concurrent tasks complete.'
    ),
  ],
  'medium/11-aiohttp-client': [
    a(
      'JSON dict returned',
      'JSON dict returned. Use pytest-aiohttp or asyncio.run with a mock server to avoid flaky network calls.'
    ),
    a(
      'HTTP errors raise',
      'HTTP errors raise. Use pytest-aiohttp or asyncio.run with a mock server to avoid flaky network calls.'
    ),
    a(
      'Base URL joined correctly',
      'Base URL joined correctly. Use pytest-aiohttp or asyncio.run with a mock server to avoid flaky network calls.'
    ),
  ],
  'medium/12-retry-decorator': [
    a(
      'Succeeds when later attempt works',
      'Succeeds when later attempt works. Write a small script or pytest test that demonstrates this behavior matches Retry Decorator.'
    ),
    a(
      'Raises after max failures',
      'Raises after max failures. Write a small script or pytest test that demonstrates this behavior matches Retry Decorator.'
    ),
    a(
      'Backoff increases',
      'Backoff increases. Write a small script or pytest test that demonstrates this behavior matches Retry Decorator.'
    ),
  ],
  'medium/13-caching-decorator': [
    a(
      'Second call skips work',
      'Second call skips work. Write a small script or pytest test that demonstrates this behavior matches Caching Decorator.'
    ),
    a(
      'Different args recompute',
      'Different args recompute: Separate calls for different args. Write a small script or pytest test that demonstrates this behavior matches Caching Decorator.'
    ),
    a(
      'Metadata preserved',
      'Metadata preserved. Write a small script or pytest test that demonstrates this behavior matches Caching Decorator.'
    ),
  ],
  'medium/14-typer-cli': [
    a(
      'Default greeting works',
      'Default greeting works. Write a small script or pytest test that demonstrates this behavior matches Typer CLI.'
    ),
    a(
      '--loud uppercases',
      '--loud uppercases: Boolean flag --loud. Write a small script or pytest test that demonstrates this behavior matches Typer CLI.'
    ),
    a(
      'Help text generated',
      'Help text generated. Write a small script or pytest test that demonstrates this behavior matches Typer CLI.'
    ),
  ],
  'medium/15-structured-logging': [
    a(
      'Valid JSON output',
      'Valid JSON output. Write a small script or pytest test that demonstrates this behavior matches Structured Logging.'
    ),
    a(
      'Extra fields appear',
      'Extra fields appear: extra fields merged. Write a small script or pytest test that demonstrates this behavior matches Structured Logging.'
    ),
    a(
      'Timestamp optional in extra',
      'Timestamp optional in extra. Write a small script or pytest test that demonstrates this behavior matches Structured Logging.'
    ),
  ],
  'medium/16-pydantic-settings': [
    a(
      'Missing DB URL fails',
      'Missing DB URL fails. Write a small script or pytest test that demonstrates this behavior matches Pydantic Settings.'
    ),
    a(
      'Defaults apply',
      'Defaults apply. Write a small script or pytest test that demonstrates this behavior matches Pydantic Settings.'
    ),
    a(
      'Env overrides work',
      'Env overrides work: model_config env prefix APP_ optional. Write a small script or pytest test that demonstrates this behavior matches Pydantic Settings.'
    ),
  ],
  'medium/17-repository-pattern': [
    a(
      'Save then get works',
      'Save then get works: CRUD get/save. Write a small script or pytest test that demonstrates this behavior matches Repository Pattern.'
    ),
    a(
      'Missing id returns None',
      'Missing id returns None. Write a small script or pytest test that demonstrates this behavior matches Repository Pattern.'
    ),
    a(
      'Protocol typed',
      'Protocol typed: Protocol or ABC. Write a small script or pytest test that demonstrates this behavior matches Repository Pattern.'
    ),
  ],
  'medium/18-service-layer': [
    a(
      'Valid registration works',
      'Valid registration works. Write a small script or pytest test that demonstrates this behavior matches Service Layer.'
    ),
    a(
      'Bad email fails',
      'Bad email fails. Write a small script or pytest test that demonstrates this behavior matches Service Layer.'
    ),
    a(
      'Duplicate rejected',
      'Duplicate rejected: Duplicate email raises ValueError. Write a small script or pytest test that demonstrates this behavior matches Service Layer.'
    ),
  ],
  'medium/19-webhook-handler': [
    a(
      'Valid signature accepted',
      'Valid signature accepted. Start uvicorn, open /docs or curl the endpoint, and verify status code plus JSON shape.'
    ),
    a(
      'Tampered body rejected',
      'Tampered body rejected. Start uvicorn, open /docs or curl the endpoint, and verify status code plus JSON shape.'
    ),
    a(
      'Returns 200 on success',
      'Returns 200 on success. Start uvicorn, open /docs or curl the endpoint, and verify status code plus JSON shape.'
    ),
  ],
  'medium/20-pagination': [
    a(
      'Correct slice returned',
      'Correct slice returned. Start uvicorn, open /docs or curl the endpoint, and verify status code plus JSON shape.'
    ),
    a(
      'Metadata accurate',
      'Metadata accurate. Start uvicorn, open /docs or curl the endpoint, and verify status code plus JSON shape.'
    ),
    a(
      'Invalid page_size rejected',
      'Invalid page_size rejected. Start uvicorn, open /docs or curl the endpoint, and verify status code plus JSON shape.'
    ),
  ],
  'medium/21-file-upload': [
    a(
      'Valid txt saved',
      'Valid txt saved. Start uvicorn, open /docs or curl the endpoint, and verify status code plus JSON shape.'
    ),
    a(
      'Big file 413',
      'Big file 413. Start uvicorn, open /docs or curl the endpoint, and verify status code plus JSON shape.'
    ),
    a(
      'Wrong extension 400',
      'Wrong extension 400. Start uvicorn, open /docs or curl the endpoint, and verify status code plus JSON shape.'
    ),
  ],
  'medium/22-background-task': [
    a(
      'Response before task completes',
      'Response before task completes. Start uvicorn, open /docs or curl the endpoint, and verify status code plus JSON shape.'
    ),
    a(
      'Task receives email',
      'Task receives email: Background task called. Start uvicorn, open /docs or curl the endpoint, and verify status code plus JSON shape.'
    ),
    a(
      'No blocking sleep in route',
      'No blocking sleep in route. Start uvicorn, open /docs or curl the endpoint, and verify status code plus JSON shape.'
    ),
  ],
  'medium/23-email-sender': [
    a(
      'EmailMessage constructed',
      'EmailMessage constructed: Use EmailMessage. Write a small script or pytest test that demonstrates this behavior matches Email Sender.'
    ),
    a(
      'SMTP login called',
      'SMTP login called. Write a small script or pytest test that demonstrates this behavior matches Email Sender.'
    ),
    a(
      'Message sent to recipient',
      'Message sent to recipient: Use EmailMessage. Write a small script or pytest test that demonstrates this behavior matches Email Sender.'
    ),
  ],
  'medium/24-rate-limiter': [
    a(
      'Allows burst under limit',
      'Allows burst under limit. Write a small script or pytest test that demonstrates this behavior matches Rate Limiter.'
    ),
    a(
      'Blocks excess calls',
      'Blocks excess calls. Write a small script or pytest test that demonstrates this behavior matches Rate Limiter.'
    ),
    a(
      'Window rolls forward',
      'Window rolls forward. Write a small script or pytest test that demonstrates this behavior matches Rate Limiter.'
    ),
  ],
  'medium/25-schema-validation': [
    a(
      'Valid data passes',
      'Valid data passes: Use jsonschema.validate. Write a small script or pytest test that demonstrates this behavior matches JSON Schema Validation.'
    ),
    a(
      'Invalid type fails',
      'Invalid type fails. Write a small script or pytest test that demonstrates this behavior matches JSON Schema Validation.'
    ),
    a(
      'Missing required fails',
      'Missing required fails. Write a small script or pytest test that demonstrates this behavior matches JSON Schema Validation.'
    ),
  ],
  'medium/26-test-coverage': [
    a(
      'All lines covered',
      'All lines covered: Tests for all branches. Run pytest in the project folder and confirm all parametrized cases pass.'
    ),
    a(
      'Bad range raises tested',
      'Bad range raises tested. Run pytest in the project folder and confirm all parametrized cases pass.'
    ),
    a(
      'Coverage report generated',
      'Coverage report generated. Run pytest in the project folder and confirm all parametrized cases pass.'
    ),
  ],
  'medium/27-docker-compose': [
    a(
      'Stack starts with compose up',
      'Stack starts with compose up. Run docker compose config or docker build to validate the file parses and builds.'
    ),
    a(
      'Web connects to db host',
      'Web connects to db host: web depends_on db. Run docker compose config or docker build to validate the file parses and builds.'
    ),
    a(
      'Port 8000 exposed',
      'Port 8000 exposed. Run docker compose config or docker build to validate the file parses and builds.'
    ),
  ],
  'medium/28-dependency-injection': [
    a(
      'Health returns connected',
      'Health returns connected. Start uvicorn, open /docs or curl the endpoint, and verify status code plus JSON shape.'
    ),
    a(
      'Dependency injected',
      'Dependency injected. Start uvicorn, open /docs or curl the endpoint, and verify status code plus JSON shape.'
    ),
    a(
      'Override works in test',
      'Override works in test: Test override get_db. Start uvicorn, open /docs or curl the endpoint, and verify status code plus JSON shape.'
    ),
  ],
  'hard/01-fastapi-auth': [
    a(
      'Login returns token',
      'Login returns token. Start uvicorn, open /docs or curl the endpoint, and verify status code plus JSON shape.'
    ),
    a(
      'Protected route needs token',
      'Protected route needs token. Start uvicorn, open /docs or curl the endpoint, and verify status code plus JSON shape.'
    ),
    a(
      'Expired token rejected',
      'Expired token rejected. Start uvicorn, open /docs or curl the endpoint, and verify status code plus JSON shape.'
    ),
  ],
  'hard/02-async-db-pool': [
    a(
      'Returns user dict',
      'Returns user dict. Use an in-memory SQLite engine in tests to verify ORM queries without Postgres.'
    ),
    a(
      'Missing id returns None',
      'Missing id returns None. Use an in-memory SQLite engine in tests to verify ORM queries without Postgres.'
    ),
    a(
      'Async session used',
      'Async session used: asyncpg driver URL. Use an in-memory SQLite engine in tests to verify ORM queries without Postgres.'
    ),
  ],
  'hard/03-celery-tasks': [
    a(
      'add returns sum',
      'add returns sum. Start a worker, enqueue a task, and confirm the result backend stores the outcome.'
    ),
    a(
      'Email task retries',
      'Email task retries. Start a worker, enqueue a task, and confirm the result backend stores the outcome.'
    ),
    a(
      'Broker URL configurable',
      'Broker URL configurable: Redis broker URL from env. Start a worker, enqueue a task, and confirm the result backend stores the outcome.'
    ),
  ],
  'hard/04-rag-ingestion': [
    a(
      'Chunks overlap correctly',
      'Chunks overlap correctly: Overlapping chunks. Write a small script or pytest test that demonstrates this behavior matches RAG Document Ingestion.'
    ),
    a(
      'Top-k by similarity',
      'Top-k by similarity: Cosine similarity top-k. Write a small script or pytest test that demonstrates this behavior matches RAG Document Ingestion.'
    ),
    a(
      'Dimension mismatch raises',
      'Dimension mismatch raises. Write a small script or pytest test that demonstrates this behavior matches RAG Document Ingestion.'
    ),
  ],
  'hard/05-openai-structured-output': [
    a(
      'Returns Invoice instance',
      'Returns Invoice instance. Mock the API client in tests or use a test key; assert the parsed model fields.'
    ),
    a(
      'Invalid response raises',
      'Invalid response raises. Mock the API client in tests or use a test key; assert the parsed model fields.'
    ),
    a(
      'Currency default USD',
      'Currency default USD. Mock the API client in tests or use a test key; assert the parsed model fields.'
    ),
  ],
  'hard/06-multi-agent-orchestrator': [
    a(
      'Correct agent selected',
      'Correct agent selected. Write a small script or pytest test that demonstrates this behavior matches Multi-Agent Orchestrator.'
    ),
    a(
      'Unknown task fails',
      'Unknown task fails. Write a small script or pytest test that demonstrates this behavior matches Multi-Agent Orchestrator.'
    ),
    a(
      'Result includes agent name',
      'Result includes agent name. Write a small script or pytest test that demonstrates this behavior matches Multi-Agent Orchestrator.'
    ),
  ],
  'hard/07-performance-profiling': [
    a(
      'Returns up to 5 entries',
      'Returns up to 5 entries. Write a small script or pytest test that demonstrates this behavior matches Performance Profiling.'
    ),
    a(
      'Sorted by cumtime',
      'Sorted by cumtime. Write a small script or pytest test that demonstrates this behavior matches Performance Profiling.'
    ),
    a(
      'Includes function names',
      'Includes function names. Write a small script or pytest test that demonstrates this behavior matches Performance Profiling.'
    ),
  ],
  'hard/08-production-dockerfile': [
    a(
      'Image builds successfully',
      'Image builds successfully. Run docker compose config or docker build to validate the file parses and builds.'
    ),
    a(
      'Runs uvicorn on 8000',
      'Runs uvicorn on 8000. Run docker compose config or docker build to validate the file parses and builds.'
    ),
    a(
      'Non-root user configured',
      'Non-root user configured: Non-root USER. Run docker compose config or docker build to validate the file parses and builds.'
    ),
  ],
  'very-hard/01-mcp-server': [
    a(
      'Lists echo tool',
      'Lists echo tool. Connect with an MCP inspector or client SDK and list tools/resources.'
    ),
    a(
      'call_tool echo works',
      'call_tool echo works. Connect with an MCP inspector or client SDK and list tools/resources.'
    ),
    a(
      'Runs on stdio transport',
      'Runs on stdio transport. Connect with an MCP inspector or client SDK and list tools/resources.'
    ),
  ],
  'very-hard/02-production-rag': [
    a(
      'Ingest returns chunk count',
      'Ingest returns chunk count. Write a small script or pytest test that demonstrates this behavior matches Production RAG Pipeline.'
    ),
    a(
      'Query returns citations',
      'Query returns citations. Write a small script or pytest test that demonstrates this behavior matches Production RAG Pipeline.'
    ),
    a(
      'Embedder invoked',
      'Embedder invoked: Pluggable embedder. Write a small script or pytest test that demonstrates this behavior matches Production RAG Pipeline.'
    ),
  ],
  'very-hard/03-event-sourced-domain': [
    a(
      'Events recorded',
      'Events recorded. Write a small script or pytest test that demonstrates this behavior matches Event-Sourced Domain.'
    ),
    a(
      'Balance correct after replay',
      'Balance correct after replay. Write a small script or pytest test that demonstrates this behavior matches Event-Sourced Domain.'
    ),
    a(
      'Overdraft blocked',
      'Overdraft blocked. Write a small script or pytest test that demonstrates this behavior matches Event-Sourced Domain.'
    ),
  ],
  'very-hard/04-distributed-task-scheduler': [
    a(
      'Future tasks not polled',
      'Future tasks not polled. Write a small script or pytest test that demonstrates this behavior matches Distributed Task Scheduler.'
    ),
    a(
      'Due tasks returned',
      'Due tasks returned: Worker fetches due items. Write a small script or pytest test that demonstrates this behavior matches Distributed Task Scheduler.'
    ),
    a(
      'Duplicate task_id skipped',
      'Duplicate task_id skipped. Write a small script or pytest test that demonstrates this behavior matches Distributed Task Scheduler.'
    ),
  ],
  'very-hard/05-llm-agent-memory': [
    a(
      'Messages stored',
      'Messages stored. Write a small script or pytest test that demonstrates this behavior matches LLM Agent Memory.'
    ),
    a(
      'Summary created when over budget',
      'Summary created when over budget. Write a small script or pytest test that demonstrates this behavior matches LLM Agent Memory.'
    ),
    a(
      'Context includes recent turns',
      'Context includes recent turns: context_for_query returns str. Write a small script or pytest test that demonstrates this behavior matches LLM Agent Memory.'
    ),
  ]
};

export function getAcceptanceCriteria(difficulty, slug) {
  return CHALLENGE_ACCEPTANCE[`${difficulty}/${slug}`];
}
