/**
 * Curated docs per Python challenge (2-4 links). Keys: {difficulty}/{slug}
 */

/** @type {Record<string, { title: string; url: string }[]>} */
const CHALLENGE_RESOURCES = {
  'easy/01-fizzbuzz': [
    { title: 'Control flow – Python tutorial', url: 'https://docs.python.org/3/tutorial/controlflow.html' },
    { title: 'for statements – Python tutorial', url: 'https://docs.python.org/3/tutorial/controlflow.html#for-statements' },
  ],
  'easy/02-string-parsing': [
    { title: 'str – Python docs', url: 'https://docs.python.org/3/library/stdtypes.html#text-sequence-type-str' },
    { title: 'parsing – reference', url: 'https://docs.python.org/3/library/stdtypes.html#str.split' },
  ],
  'easy/03-file-counter': [
    { title: 'files – reference', url: 'https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files' },
    { title: 'io – reference', url: 'https://docs.python.org/3/library/io.html' },
  ],
  'easy/04-json-reader': [
    { title: 'json – reference', url: 'https://docs.python.org/3/library/json.html' },
    { title: 'files – reference', url: 'https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files' },
  ],
  'easy/05-cli-args': [
    { title: 'argparse – Python docs', url: 'https://docs.python.org/3/library/argparse.html' },
    { title: 'Python Tutorial', url: 'https://docs.python.org/3/tutorial/' },
  ],
  'easy/06-simple-class': [
    { title: 'classes – reference', url: 'https://docs.python.org/3/tutorial/classes.html' },
    { title: 'encapsulation – reference', url: 'https://docs.python.org/3/tutorial/classes.html#private-variables' },
  ],
  'easy/07-list-dict-operations': [
    { title: 'lists – reference', url: 'https://docs.python.org/3/tutorial/datastructures.html' },
    { title: 'dicts – reference', url: 'https://docs.python.org/3/tutorial/datastructures.html#dictionaries' },
    { title: 'comprehensions – reference', url: 'https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions' },
  ],
  'easy/08-pathlib-walk': [
    { title: 'pathlib – Python docs', url: 'https://docs.python.org/3/library/pathlib.html' },
    { title: 'Python Tutorial', url: 'https://docs.python.org/3/tutorial/' },
  ],
  'easy/09-env-vars': [
    { title: 'os.environ – reference', url: 'https://docs.python.org/3/library/os.html#os.environ' },
    { title: 'config – reference', url: 'https://docs.python.org/3/library/configparser.html' },
  ],
  'easy/10-pytest-basics': [
    { title: 'pytest documentation', url: 'https://docs.pytest.org/en/stable/' },
    { title: 'testing – reference', url: 'https://docs.python.org/3/library/unittest.html' },
  ],
  'easy/11-csv-parse': [
    { title: 'csv – reference', url: 'https://docs.python.org/3/library/csv.html' },
    { title: 'Python Tutorial', url: 'https://docs.python.org/3/tutorial/' },
  ],
  'easy/12-requests-get': [
    { title: 'Requests documentation', url: 'https://requests.readthedocs.io/en/latest/' },
    { title: 'http – reference', url: 'https://docs.python.org/3/library/http.client.html' },
  ],
  'easy/13-dataclass': [
    { title: 'dataclasses – Python docs', url: 'https://docs.python.org/3/library/dataclasses.html' },
    { title: 'Python Tutorial', url: 'https://docs.python.org/3/tutorial/' },
  ],
  'easy/14-enum': [
    { title: 'enum – reference', url: 'https://docs.python.org/3/library/enum.html' },
    { title: 'Python Tutorial', url: 'https://docs.python.org/3/tutorial/' },
  ],
  'easy/15-logging': [
    { title: 'logging – reference', url: 'https://docs.python.org/3/library/logging.html' },
    { title: 'Python Tutorial', url: 'https://docs.python.org/3/tutorial/' },
  ],
  'easy/16-config-file': [
    { title: 'tomllib – reference', url: 'https://docs.python.org/3/library/tomllib.html' },
    { title: 'config – reference', url: 'https://docs.python.org/3/library/configparser.html' },
  ],
  'easy/17-unit-converter': [
    { title: 'functions – reference', url: 'https://docs.python.org/3/tutorial/controlflow.html#defining-functions' },
    { title: 'mapping – reference', url: 'https://docs.python.org/3/library/stdtypes.html#mapping-types-dict' },
  ],
  'easy/18-password-validator': [
    { title: 'validation – reference', url: 'https://docs.python.org/3/library/exceptions.html' },
    { title: 'str – Python docs', url: 'https://docs.python.org/3/library/stdtypes.html#text-sequence-type-str' },
  ],
  'easy/19-text-search': [
    { title: 'files – reference', url: 'https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files' },
    { title: 'search – reference', url: 'https://docs.python.org/3/library/re.html' },
  ],
  'easy/20-api-client': [
    { title: 'Requests documentation', url: 'https://requests.readthedocs.io/en/latest/' },
    { title: 'api-design – reference', url: 'https://requests.readthedocs.io/en/latest/user/advanced/' },
  ],
  'medium/01-decorator-timing': [
    { title: 'decorators – reference', url: 'https://docs.python.org/3/glossary.html#term-decorator' },
    { title: 'functools – reference', url: 'https://docs.python.org/3/library/functools.html' },
  ],
  'medium/02-context-manager': [
    { title: 'contextlib – reference', url: 'https://docs.python.org/3/library/contextlib.html' },
    { title: 'context-managers – reference', url: 'https://docs.python.org/3/reference/datamodel.html#context-managers' },
  ],
  'medium/03-generator-pipeline': [
    { title: 'generators – reference', url: 'https://docs.python.org/3/howto/functional.html#generators' },
    { title: 'Python Tutorial', url: 'https://docs.python.org/3/tutorial/' },
  ],
  'medium/04-dataclass-validation': [
    { title: 'dataclasses – Python docs', url: 'https://docs.python.org/3/library/dataclasses.html' },
    { title: 'validation – reference', url: 'https://docs.python.org/3/library/exceptions.html' },
  ],
  'medium/05-pytest-fixtures-mocks': [
    { title: 'pytest documentation', url: 'https://docs.pytest.org/en/stable/' },
    { title: 'Python Tutorial', url: 'https://docs.python.org/3/tutorial/' },
  ],
  'medium/06-flask-blueprint': [
    { title: 'Flask documentation', url: 'https://flask.palletsprojects.com/' },
    { title: 'Python Tutorial', url: 'https://docs.python.org/3/tutorial/' },
  ],
  'medium/07-fastapi-crud': [
    { title: 'FastAPI documentation', url: 'https://fastapi.tiangolo.com/' },
    { title: 'Python Tutorial', url: 'https://docs.python.org/3/tutorial/' },
  ],
  'medium/08-pydantic-models': [
    { title: 'Pydantic documentation', url: 'https://docs.pydantic.dev/latest/' },
    { title: 'validation – reference', url: 'https://docs.python.org/3/library/exceptions.html' },
  ],
  'medium/09-sqlalchemy-models': [
    { title: 'SQLAlchemy 2.0 docs', url: 'https://docs.sqlalchemy.org/en/20/' },
    { title: 'Python Tutorial', url: 'https://docs.python.org/3/tutorial/' },
  ],
  'medium/10-async-gather': [
    { title: 'asyncio – reference', url: 'https://docs.python.org/3/library/asyncio.html' },
    { title: 'Python Tutorial', url: 'https://docs.python.org/3/tutorial/' },
  ],
  'medium/11-aiohttp-client': [
    { title: 'aiohttp – reference', url: 'https://docs.aiohttp.org/en/stable/' },
    { title: 'Python Tutorial', url: 'https://docs.python.org/3/tutorial/' },
  ],
  'medium/12-retry-decorator': [
    { title: 'decorators – reference', url: 'https://docs.python.org/3/glossary.html#term-decorator' },
    { title: 'Python Tutorial', url: 'https://docs.python.org/3/tutorial/' },
  ],
  'medium/13-caching-decorator': [
    { title: 'functools – reference', url: 'https://docs.python.org/3/library/functools.html' },
    { title: 'Python Tutorial', url: 'https://docs.python.org/3/tutorial/' },
  ],
  'medium/14-typer-cli': [
    { title: 'typer – reference', url: 'https://typer.tiangolo.com/' },
    { title: 'cli – reference', url: 'https://docs.python.org/3/library/argparse.html' },
  ],
  'medium/15-structured-logging': [
    { title: 'logging – reference', url: 'https://docs.python.org/3/library/logging.html' },
    { title: 'json – reference', url: 'https://docs.python.org/3/library/json.html' },
  ],
  'medium/16-pydantic-settings': [
    { title: 'pydantic-settings – reference', url: 'https://docs.pydantic.dev/latest/concepts/pydantic_settings/' },
    { title: 'config – reference', url: 'https://docs.python.org/3/library/configparser.html' },
  ],
  'medium/17-repository-pattern': [
    { title: 'Python Tutorial', url: 'https://docs.python.org/3/tutorial/' },
    { title: 'Python standard library', url: 'https://docs.python.org/3/library/' },
  ],
  'medium/18-service-layer': [
    { title: 'Python Tutorial', url: 'https://docs.python.org/3/tutorial/' },
    { title: 'Python standard library', url: 'https://docs.python.org/3/library/' },
  ],
  'medium/19-webhook-handler': [
    { title: 'FastAPI documentation', url: 'https://fastapi.tiangolo.com/' },
    { title: 'webhooks – reference', url: 'https://fastapi.tiangolo.com/advanced/events/' },
  ],
  'medium/20-pagination': [
    { title: 'pagination – reference', url: 'https://fastapi.tiangolo.com/tutorial/query-params/' },
    { title: 'FastAPI documentation', url: 'https://fastapi.tiangolo.com/' },
  ],
  'medium/21-file-upload': [
    { title: 'FastAPI documentation', url: 'https://fastapi.tiangolo.com/' },
    { title: 'files – reference', url: 'https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files' },
  ],
  'medium/22-background-task': [
    { title: 'FastAPI documentation', url: 'https://fastapi.tiangolo.com/' },
    { title: 'background-tasks – reference', url: 'https://fastapi.tiangolo.com/tutorial/background-tasks/' },
  ],
  'medium/23-email-sender': [
    { title: 'email – reference', url: 'https://docs.python.org/3/library/smtplib.html' },
    { title: 'Python Tutorial', url: 'https://docs.python.org/3/tutorial/' },
  ],
  'medium/24-rate-limiter': [
    { title: 'rate-limiting – reference', url: 'https://slowapi.readthedocs.io/en/latest/' },
    { title: 'decorators – reference', url: 'https://docs.python.org/3/glossary.html#term-decorator' },
  ],
  'medium/25-schema-validation': [
    { title: 'validation – reference', url: 'https://docs.python.org/3/library/exceptions.html' },
    { title: 'Python Tutorial', url: 'https://docs.python.org/3/tutorial/' },
  ],
  'medium/26-test-coverage': [
    { title: 'pytest documentation', url: 'https://docs.pytest.org/en/stable/' },
    { title: 'coverage – reference', url: 'https://coverage.readthedocs.io/en/latest/' },
  ],
  'medium/27-docker-compose': [
    { title: 'Docker Get Started', url: 'https://docs.docker.com/get-started/' },
    { title: 'docker-compose – reference', url: 'https://docs.docker.com/compose/' },
  ],
  'medium/28-dependency-injection': [
    { title: 'dependency-injection – reference', url: 'https://fastapi.tiangolo.com/tutorial/dependencies/' },
    { title: 'FastAPI documentation', url: 'https://fastapi.tiangolo.com/' },
  ],
  'hard/01-fastapi-auth': [
    { title: 'FastAPI documentation', url: 'https://fastapi.tiangolo.com/' },
    { title: 'jwt – reference', url: 'https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/' },
    { title: 'auth – reference', url: 'https://fastapi.tiangolo.com/tutorial/security/' },
  ],
  'hard/02-async-db-pool': [
    { title: 'asyncpg – reference', url: 'https://magicstack.github.io/asyncpg/current/' },
    { title: 'SQLAlchemy 2.0 docs', url: 'https://docs.sqlalchemy.org/en/20/' },
  ],
  'hard/03-celery-tasks': [
    { title: 'Celery documentation', url: 'https://docs.celeryq.dev/en/stable/' },
    { title: 'Python Tutorial', url: 'https://docs.python.org/3/tutorial/' },
  ],
  'hard/04-rag-ingestion': [
    { title: 'rag – reference', url: 'https://python.langchain.com/docs/concepts/rag/' },
    { title: 'Python Tutorial', url: 'https://docs.python.org/3/tutorial/' },
  ],
  'hard/05-openai-structured-output': [
    { title: 'OpenAI structured outputs', url: 'https://platform.openai.com/docs/guides/structured-outputs' },
    { title: 'Pydantic documentation', url: 'https://docs.pydantic.dev/latest/' },
  ],
  'hard/06-multi-agent-orchestrator': [
    { title: 'agents – reference', url: 'https://platform.openai.com/docs/guides/agents' },
    { title: 'Python Tutorial', url: 'https://docs.python.org/3/tutorial/' },
  ],
  'hard/07-performance-profiling': [
    { title: 'profiling – reference', url: 'https://docs.python.org/3/library/profile.html' },
    { title: 'Python Tutorial', url: 'https://docs.python.org/3/tutorial/' },
  ],
  'hard/08-production-dockerfile': [
    { title: 'Docker Get Started', url: 'https://docs.docker.com/get-started/' },
    { title: 'Python Tutorial', url: 'https://docs.python.org/3/tutorial/' },
  ],
  'very-hard/01-mcp-server': [
    { title: 'Model Context Protocol', url: 'https://modelcontextprotocol.io/' },
    { title: 'Python Tutorial', url: 'https://docs.python.org/3/tutorial/' },
  ],
  'very-hard/02-production-rag': [
    { title: 'rag – reference', url: 'https://python.langchain.com/docs/concepts/rag/' },
    { title: 'Python Tutorial', url: 'https://docs.python.org/3/tutorial/' },
  ],
  'very-hard/03-event-sourced-domain': [
    { title: 'event-sourcing – reference', url: 'https://martinfowler.com/eaaDev/EventSourcing.html' },
    { title: 'Python Tutorial', url: 'https://docs.python.org/3/tutorial/' },
  ],
  'very-hard/04-distributed-task-scheduler': [
    { title: 'Python Tutorial', url: 'https://docs.python.org/3/tutorial/' },
    { title: 'Python standard library', url: 'https://docs.python.org/3/library/' },
  ],
  'very-hard/05-llm-agent-memory': [
    { title: 'agents – reference', url: 'https://platform.openai.com/docs/guides/agents' },
    { title: 'memory – reference', url: 'https://python.langchain.com/docs/concepts/memory/' },
  ]
};

export function getChallengeResources(difficulty, slug, topics) {
  const key = `${difficulty}/${slug}`;
  if (CHALLENGE_RESOURCES[key]) return CHALLENGE_RESOURCES[key];
  const seen = new Set();
  const fromTopics = [];
  for (const topic of topics) {
    const url = TOPIC_LEARN_URLS[topic];
    if (!url || seen.has(url)) continue;
    seen.add(url);
    fromTopics.push({ title: `${topic} – Python docs`, url });
    if (fromTopics.length >= 3) break;
  }
  if (fromTopics.length) return fromTopics;
  return [
    { title: 'Python Tutorial', url: 'https://docs.python.org/3/tutorial/' },
    { title: 'Python docs', url: 'https://docs.python.org/3/' },
  ];
}
