import { readFileSync, readdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import challengeIndex from '../src/data/challenges-index.json' with { type: 'json' };

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const DIFFICULTY_LABELS = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
  'very-hard': 'Very Hard',
};

const DIFFICULTY_ACCENTS = {
  easy: { accent: '#34d399', accent2: '#5b9fd4' },
  medium: { accent: '#47bfff', accent2: '#5b9fd4' },
  hard: { accent: '#f59e0b', accent2: '#863bff' },
  'very-hard': { accent: '#f43f5e', accent2: '#863bff' },
};

const FLASHCARD_ACCENTS = [
  { accent: '#34d399', accent2: '#5b9fd4' },
  { accent: '#a78bfa', accent2: '#863bff' },
  { accent: '#47bfff', accent2: '#5b9fd4' },
  { accent: '#2dd4bf', accent2: '#34d399' },
  { accent: '#f472b6', accent2: '#863bff' },
];

const SYSTEM_DESIGN_ACCENTS = [
  { accent: '#f59e0b', accent2: '#863bff' },
  { accent: '#fb923c', accent2: '#f59e0b' },
  { accent: '#a78bfa', accent2: '#863bff' },
  { accent: '#47bfff', accent2: '#5b9fd4' },
];

const PYTHON_PATTERNS_ACCENTS = [
  { accent: '#ffd43b', accent2: '#3776ab' },
  { accent: '#3b9f7a', accent2: '#3776ab' },
  { accent: '#47bfff', accent2: '#3776ab' },
  { accent: '#34d399', accent2: '#3b9f7a' },
];

const systemDesignProblems = [
  { slug: 'rate-limited-api', title: 'Rate-Limited API', subtitle: 'FastAPI middleware, Redis counters' },
  { slug: 'url-shortener', title: 'URL Shortener', subtitle: 'Base62 codes, cache-aside' },
  { slug: 'task-queue', title: 'Task Queue', subtitle: 'Celery/RQ workers, retries' },
  { slug: 'realtime-chat', title: 'Real-Time Chat', subtitle: 'WebSockets, Redis pub/sub' },
  { slug: 'auth-system', title: 'Auth System', subtitle: 'JWT + refresh tokens' },
  { slug: 'file-upload-s3', title: 'File Upload (S3)', subtitle: 'Presigned URLs, multipart' },
  { slug: 'search-autocomplete', title: 'Search Autocomplete', subtitle: 'Debounced API, caching' },
  { slug: 'analytics-pipeline', title: 'Analytics Pipeline', subtitle: 'Event ingestion, aggregation' },
  { slug: 'multi-tenant-saas', title: 'Multi-Tenant SaaS', subtitle: 'Org scoping, row-level security' },
  { slug: 'notification-service', title: 'Notification Service', subtitle: 'Push, email, in-app inbox' },
  { slug: 'payment-webhooks', title: 'Payment Webhooks', subtitle: 'Idempotency, signature verify' },
  { slug: 'caching-redis', title: 'Caching (Redis)', subtitle: 'Cache-aside, TTL, invalidation' },
  { slug: 'scheduled-jobs', title: 'Scheduled Jobs', subtitle: 'Cron, APScheduler, Celery beat' },
  { slug: 'log-aggregation', title: 'Log Aggregation', subtitle: 'Structured logs, correlation IDs' },
  { slug: 'feature-flags', title: 'Feature Flags', subtitle: 'Rollouts, A/B bucketing' },
  { slug: 'rag-qa-api', title: 'RAG Q&A API', subtitle: 'Embeddings, chunking, retrieval' },
  { slug: 'llm-agent-tools', title: 'LLM Agent with Tools', subtitle: 'Tool use, orchestration' },
  { slug: 'vector-search', title: 'Vector Search', subtitle: 'pgvector, similarity search' },
  { slug: 'etl-pipeline', title: 'ETL Pipeline', subtitle: 'Batch ingest, transforms' },
  { slug: 'observability-stack', title: 'Observability Stack', subtitle: 'Metrics, traces, alerts' },
  { slug: 'multi-region-deploy', title: 'Multi-Region Deploy', subtitle: 'Active-passive, failover' },
];

const pythonPatterns = [
  { slug: 'comprehensions', title: 'Comprehensions', subtitle: 'List, dict, set builders' },
  { slug: 'context-managers', title: 'Context Managers', subtitle: 'with and resource cleanup' },
  { slug: 'decorators', title: 'Decorators', subtitle: 'Wrap functions cleanly' },
  { slug: 'generators', title: 'Generators', subtitle: 'Lazy sequences' },
  { slug: 'dataclasses', title: 'Dataclasses', subtitle: 'Structured data objects' },
  { slug: 'protocols', title: 'Protocols', subtitle: 'Structural typing' },
  { slug: 'dependency-injection', title: 'Dependency Injection', subtitle: 'Testable services' },
  { slug: 'repository-pattern', title: 'Repository Pattern', subtitle: 'Data access abstraction' },
  { slug: 'factory-pattern', title: 'Factory Pattern', subtitle: 'Object creation' },
  { slug: 'strategy-pattern', title: 'Strategy Pattern', subtitle: 'Pluggable algorithms' },
  { slug: 'error-handling', title: 'Error Handling', subtitle: 'Exceptions and results' },
  { slug: 'logging-patterns', title: 'Logging', subtitle: 'Structured observability' },
  { slug: 'configuration', title: 'Configuration', subtitle: 'pydantic-settings' },
  { slug: 'cli-design', title: 'CLI Design', subtitle: 'Typer and Click' },
  { slug: 'async-patterns', title: 'Async Patterns', subtitle: 'asyncio best practices' },
  { slug: 'clean-architecture', title: 'Clean Architecture', subtitle: 'Layered design' },
];

function loadFlashcardDecks() {
  const dir = join(root, 'src/data/flashcards');
  return readdirSync(dir)
    .filter((f) => f.endsWith('.ts') && f !== 'types.ts' && f !== 'index.ts')
    .map((file) => {
      const content = readFileSync(join(dir, file), 'utf8');
      const slug = content.match(/"slug":\s*"([^"]+)"/)?.[1];
      const title = content.match(/"title":\s*"([^"]+)"/)?.[1];
      const cardCount = (content.match(/"question":/g) ?? []).length;
      if (!slug || !title) throw new Error(`Could not parse flashcard deck: ${file}`);
      return { slug, title, cardCount };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

/** @typedef {{ id: string; badge: string; title: string; subtitle: string; accent: string; accent2: string; icon: string; pathname?: string; pageTitle?: string; pageDescription?: string }} OgEntry */

/** @returns {{ images: OgEntry[]; routes: Record<string, { title: string; description: string; ogImageId: string }> }} */
export function buildOgSources() {
  /** @type {OgEntry[]} */
  const images = [];
  /** @type {Record<string, { title: string; description: string; ogImageId: string }>} */
  const routes = {};

  const baseImages = [
    {
      id: 'default',
      badge: 'Interview prep',
      title: 'PythonTeacher',
      subtitle: 'Challenges, flashcards & system design for Python interviews',
      accent: '#ffd43b',
      accent2: '#3776ab',
      icon: '🐍',
    },
    {
      id: 'get-started',
      badge: 'Get started',
      title: 'Start here',
      subtitle: 'Setup, study paths, and how to use PythonTeacher',
      accent: '#ffd43b',
      accent2: '#3776ab',
      icon: '✦',
      pathname: '/get-started',
      pageTitle: 'Get Started · PythonTeacher',
      pageDescription: 'Setup, study paths, and how to get the most from PythonTeacher.',
    },
    {
      id: 'python-basics',
      badge: 'For starters',
      title: 'Python Basics',
      subtitle: 'From zero: types, if, loops, functions — then challenges',
      accent: '#ffd43b',
      accent2: '#3b9f7a',
      icon: '{ }',
      pathname: '/python-basics',
      pageTitle: 'Python Basics · PythonTeacher',
      pageDescription:
        'Python from zero: types, control flow, functions, modules, venv, files, and exceptions.',
    },
    {
      id: 'challenges',
      badge: 'Python challenges',
      title: 'Code challenges',
      subtitle: 'Hands-on exercises from easy to very hard',
      accent: '#47bfff',
      accent2: '#3776ab',
      icon: '</>',
      pathname: '/challenges',
      pageTitle: 'Python Challenges · PythonTeacher',
      pageDescription:
        'Hands-on Python coding challenges from easy to very hard with acceptance criteria.',
    },
    {
      id: 'flashcards',
      badge: 'Flashcards',
      title: 'Quick review',
      subtitle: '300 cards across FastAPI, pytest, RAG & more',
      accent: '#34d399',
      accent2: '#3776ab',
      icon: '▤',
      pathname: '/flashcards',
      pageTitle: 'Flashcards · PythonTeacher',
      pageDescription: 'Quick-review flashcards for FastAPI, pytest, asyncio, RAG, MCP, and more.',
    },
    {
      id: 'python-patterns',
      badge: 'Python patterns',
      title: 'Patterns',
      subtitle: 'Decorators, dataclasses, async, clean architecture & more',
      accent: '#3b9f7a',
      accent2: '#3776ab',
      icon: '◈',
      pathname: '/python-patterns',
      pageTitle: 'Python Patterns · PythonTeacher',
      pageDescription:
        'Python idioms and design patterns with examples for interviews and production code.',
    },
    {
      id: 'system-design',
      badge: 'System design',
      title: 'Architecture',
      subtitle: 'Backend system design walkthroughs for interviews',
      accent: '#f59e0b',
      accent2: '#3776ab',
      icon: '⎇',
      pathname: '/system-design',
      pageTitle: 'System Design · PythonTeacher',
      pageDescription: 'Backend system design problems and interview walkthroughs with Python.',
    },
  ];

  for (const img of baseImages) {
    images.push(img);
    if (img.pathname) {
      routes[img.pathname] = {
        title: img.pageTitle,
        description: img.pageDescription,
        ogImageId: img.id,
      };
    }
  }

  const decks = loadFlashcardDecks();
  decks.forEach((deck, i) => {
    const colors = FLASHCARD_ACCENTS[i % FLASHCARD_ACCENTS.length];
    const id = `flashcards/${deck.slug}`;
    const pathname = `/flashcards/${deck.slug}`;
    images.push({
      id,
      badge: 'Flashcards',
      title: deck.title,
      subtitle: `${deck.cardCount} interview flashcards`,
      icon: '▤',
      ...colors,
      pathname,
      pageTitle: `${deck.title} · Flashcards`,
      pageDescription: `Study ${deck.cardCount} flashcards on ${deck.title} for Python interviews.`,
    });
    routes[pathname] = {
      title: `${deck.title} · Flashcards`,
      description: `Study ${deck.cardCount} flashcards on ${deck.title} for Python interviews.`,
      ogImageId: id,
    };
  });

  for (const [difficulty, challenges] of Object.entries(challengeIndex)) {
    const label = DIFFICULTY_LABELS[difficulty];
    const colors = DIFFICULTY_ACCENTS[difficulty];
    const sectionId = `challenges/${difficulty}`;
    const sectionPath = `/challenges/${difficulty}`;
    images.push({
      id: sectionId,
      badge: label,
      title: `${label} challenges`,
      subtitle: `${challenges.length} hands-on Python exercises`,
      icon: '</>',
      ...colors,
      pathname: sectionPath,
      pageTitle: `${label} Challenges · PythonTeacher`,
      pageDescription: `${challenges.length} ${label.toLowerCase()} Python coding challenges with acceptance criteria and solutions.`,
    });
    routes[sectionPath] = {
      title: `${label} Challenges · PythonTeacher`,
      description: `${challenges.length} ${label.toLowerCase()} Python coding challenges with acceptance criteria and solutions.`,
      ogImageId: sectionId,
    };

    for (const challenge of challenges) {
      const id = `challenges/${difficulty}/${challenge.slug}`;
      const pathname = `/challenges/${difficulty}/${challenge.slug}`;
      images.push({
        id,
        badge: `${label} challenge`,
        title: challenge.title,
        subtitle: `${challenge.acceptance.length} acceptance criteria`,
        icon: '</>',
        ...colors,
        pathname,
        pageTitle: `${challenge.title} · ${label}`,
        pageDescription: `${label} Python challenge: ${challenge.title}. Practice with acceptance criteria and a solution walkthrough.`,
      });
      routes[pathname] = {
        title: `${challenge.title} · ${label}`,
        description: `${label} Python challenge: ${challenge.title}. Practice with acceptance criteria and a solution walkthrough.`,
        ogImageId: id,
      };
    }
  }

  systemDesignProblems.forEach((problem, i) => {
    const colors = SYSTEM_DESIGN_ACCENTS[i % SYSTEM_DESIGN_ACCENTS.length];
    const id = `system-design/${problem.slug}`;
    const pathname = `/system-design/${problem.slug}`;
    images.push({
      id,
      badge: 'System design',
      title: problem.title,
      subtitle: problem.subtitle,
      icon: '⎇',
      ...colors,
      pathname,
      pageTitle: `${problem.title} · System Design`,
      pageDescription: `Backend system design: ${problem.subtitle}. Interview walkthrough on PythonTeacher.`,
    });
    routes[pathname] = {
      title: `${problem.title} · System Design`,
      description: `Backend system design: ${problem.subtitle}. Interview walkthrough on PythonTeacher.`,
      ogImageId: id,
    };
  });

  pythonPatterns.forEach((pattern, i) => {
    const colors = PYTHON_PATTERNS_ACCENTS[i % PYTHON_PATTERNS_ACCENTS.length];
    const id = `python-patterns/${pattern.slug}`;
    const pathname = `/python-patterns/${pattern.slug}`;
    images.push({
      id,
      badge: 'Python patterns',
      title: pattern.title,
      subtitle: pattern.subtitle,
      icon: '◈',
      ...colors,
      pathname,
      pageTitle: `${pattern.title} · Python Patterns`,
      pageDescription: `Python pattern guide: ${pattern.subtitle}. Examples and tradeoffs on PythonTeacher.`,
    });
    routes[pathname] = {
      title: `${pattern.title} · Python Patterns`,
      description: `Python pattern guide: ${pattern.subtitle}. Examples and tradeoffs on PythonTeacher.`,
      ogImageId: id,
    };
  });

  return { images, routes };
}
