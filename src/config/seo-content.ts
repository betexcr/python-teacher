import { GITHUB_REPO, SITE_NAME } from './brand';

export const SEO_STATS = {
  challenges: 61,
  flashcardDecks: 20,
  flashcards: 300,
  patterns: 16,
  systemDesign: 21,
  basicsTopics: 20,
} as const;

export const PORTFOLIO_SITES = [
  { name: 'PythonTeacher', url: 'https://pythonprep.vercel.app', current: true },
  { name: 'NodeTeacher', url: 'https://nodeprep.vercel.app', current: false },
  { name: 'ReactTeacher', url: 'https://reactteacher.vercel.app', current: false },
  { name: 'RustTeacher', url: 'https://rustprep.vercel.app', current: false },
] as const;

export const SITE_DESCRIPTION =
  'Free Python interview prep with coding challenges, flashcards, Python patterns, and backend system design walkthroughs.';

export const HOME_META = {
  title: `Python Interview Questions & Coding Challenges (Free) · ${SITE_NAME}`,
  description: `Practice ${SEO_STATS.challenges} Python interview challenges with solutions, ${SEO_STATS.flashcards}+ flashcards, ${SEO_STATS.patterns} patterns, and system design guides. No account. Progress saves in your browser.`,
  ogImageId: 'get-started',
} as const;

export const FAQ_ITEMS = [
  {
    question: 'Is PythonTeacher really free?',
    answer:
      'Yes. All challenges, flashcards, patterns, and system design guides are free with no account required. Progress saves in your browser via localStorage.',
  },
  {
    question: 'How do I prepare for a Python interview in 2 weeks?',
    answer:
      'Start with Python Basics, complete easy challenges daily, study 2–3 flashcard decks, and read one pattern plus one system design guide per week. Use the progress dashboard on Get Started to track completion.',
  },
  {
    question: 'What Python topics are asked in backend interviews?',
    answer:
      'Common topics include data structures, decorators, async/await, FastAPI or Flask, pytest, SQLAlchemy, typing, error handling, and system design for APIs, caching, and queues.',
  },
  {
    question: 'Do I need to install anything?',
    answer:
      'No for studying flashcards, patterns, and system design. For challenges, you can read requirements here and implement locally in your own editor with Python 3.12+.',
  },
  {
    question: 'How does progress tracking work?',
    answer:
      'Challenge acceptance checklists, flashcard deck completion, and read status for guides are stored in your browser. No server account is required.',
  },
  {
    question: 'Are Python coding challenges enough for interviews?',
    answer:
      'They help with implementation skills, but pair them with flashcards for theory, patterns for architecture idioms, and system design for scalability discussions.',
  },
  {
    question: 'What Python version should I use?',
    answer: 'Solutions target Python 3.12+ with type hints. Use the same version in interviews when possible.',
  },
  {
    question: 'How to explain the GIL in an interview?',
    answer:
      'The Global Interpreter Lock allows one thread to execute Python bytecode at a time in CPython. Use multiprocessing or async I/O for parallelism; release the GIL during C extensions and I/O waits.',
  },
  {
    question: 'Can I use ChatGPT to prepare ethically?',
    answer:
      'Use AI to explain concepts and review your solutions after attempting challenges yourself. Do not paste interview questions during live interviews.',
  },
  {
    question: 'How to contribute challenges?',
    answer: `Open a pull request on ${GITHUB_REPO} following the challenge source format in scripts/challenges/.`,
  },
] as const;

export type BlogArticle = {
  slug: string;
  pillar: string;
  title: string;
  description: string;
  body: string;
};

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: 'complete-python-interview-guide-2026',
    pillar: 'Interview Guides',
    title: 'Complete Python Interview Guide (2026)',
    description: 'A structured roadmap for Python backend and full-stack interviews.',
    body: `Python interviews in 2026 still test fundamentals, practical API skills, and system thinking. Use this guide with PythonTeacher's challenges, flashcards, and system design walkthroughs.

## Week 1: Foundations
Review Python Basics on PythonTeacher, then complete 5 easy challenges. Study the fundamentals and typing flashcard decks.

## Week 2: Web & testing
Read the FastAPI and pytest decks. Complete medium challenges on decorators and pydantic. Skim the clean architecture pattern guide.

## Week 3: System design
Work through URL shortener, rate-limited API, and caching guides. Practice explaining trade-offs aloud.

## Week 4: Mock interviews
Mix very-hard challenges with flashcard review. Record yourself answering "tell me about a Python project."

## What interviewers expect
Clear type hints, idiomatic Python, tests, error handling, and honest trade-off discussion beat memorized buzzwords.`,
  },
  {
    slug: 'backend-system-design-python-interview',
    pillar: 'System Design',
    title: 'Backend System Design for Python Interviews',
    description: 'How to approach scalable backend design discussions with Python examples.',
    body: `Backend system design interviews ask you to design APIs, data flows, and reliability—not just draw boxes.

## Start with requirements
Clarify read/write ratio, latency targets, consistency needs, and scale (QPS, storage).

## Python-specific angles
Discuss FastAPI/Flask service layout, async vs sync workers, Celery for background jobs, Redis caching, and Postgres with read replicas.

## Patterns to cite
Repository pattern, dependency injection, structured logging, and idempotent webhooks appear in PythonTeacher patterns and medium challenges.

## Practice on PythonTeacher
Study rate-limited API, task queue, RAG Q&A API, and auth system guides. Link each component to a Python library you have used.`,
  },
  {
    slug: 'python-patterns-interview-deep-dive',
    pillar: 'Patterns',
    title: 'Python Patterns Interview Deep Dive',
    description: 'Decorators, dataclasses, async, and clean architecture for interviews.',
    body: `Interviewers use patterns questions to see if you write maintainable production Python.

## High-yield patterns
- Decorators for cross-cutting concerns
- Context managers for resources
- Dataclasses and pydantic for models
- Async gather for concurrent I/O
- Repository pattern for data access

## How to answer
Give a one-sentence definition, a when-to-use rule, and a 5-line code sketch. PythonTeacher pattern guides include copyable examples.

## Connect to challenges
Medium challenges on decorators, pydantic settings, and dependency injection reinforce these patterns hands-on.`,
  },
  {
    slug: 'python-interview-questions-2026',
    pillar: 'Interview Questions',
    title: 'Python Interview Questions for 2026',
    description: 'Frequently asked Python interview topics with study links.',
    body: `Focus on lists, dicts, comprehensions, decorators, generators, async, testing, and web frameworks. Use flashcard decks tagged fundamentals, typing, async, pytest, and FastAPI on PythonTeacher.`,
  },
  {
    slug: 'python-data-structures-interview',
    pillar: 'Interview Questions',
    title: 'Python Data Structures Interview Questions',
    description: 'Lists, dicts, sets, and when to use each in interviews.',
    body: `Know time complexity for list vs dict lookups, when to use sets for deduplication, and how defaultdict and Counter simplify counting problems. Practice with easy challenges on string parsing and file counters.`,
  },
  {
    slug: 'python-decorators-interview',
    pillar: 'Interview Questions',
    title: 'How to Explain Python Decorators in an Interview',
    description: 'A clear explanation template for decorator questions.',
    body: `A decorator wraps a function to add behavior without changing its signature. Mention functools.wraps, parameterized decorators, and real uses: timing, auth, retry, and caching. Study the decorators pattern guide and medium decorator-timing challenge.`,
  },
  {
    slug: 'fastapi-vs-flask-interview',
    pillar: 'Comparisons',
    title: 'FastAPI vs Flask: Interview Comparison',
    description: 'When to recommend each framework in system design discussions.',
    body: `Flask is minimal and flexible; FastAPI adds automatic OpenAPI, pydantic validation, and async support. For new APIs with typed contracts, prefer FastAPI. For simple services or legacy apps, Flask remains valid.`,
  },
  {
    slug: 'pytest-fixtures-interview-guide',
    pillar: 'Interview Questions',
    title: 'pytest Fixtures Interview Guide',
    description: 'Explain fixtures, scopes, and mocking with pytest.',
    body: `Fixtures provide setup/teardown and dependency injection for tests. Discuss function vs module scope, conftest.py, and monkeypatch for mocking. Complete the pytest basics easy challenge and pytest fixtures medium challenge.`,
  },
  {
    slug: 'python-asyncio-interview-questions',
    pillar: 'Interview Questions',
    title: 'Python asyncio Interview Questions',
    description: 'Event loop, tasks, gather, and async pitfalls.',
    body: `Explain async/await, when asyncio helps (I/O bound), and why CPU work still needs multiprocessing. Study the async flashcard deck and async-gather medium challenge.`,
  },
  {
    slug: 'python-typing-mypy-interview',
    pillar: 'Interview Questions',
    title: 'Python Typing and mypy for Interviews',
    description: 'Type hints, Optional, generics, and static checking.',
    body: `Type hints document contracts and catch bugs early with mypy. Discuss TypedDict, Protocol, and gradual typing in brownfield code. Review the typing flashcard deck.`,
  },
  {
    slug: 'two-week-python-interview-study-plan',
    pillar: 'Study Plans',
    title: '2-Week Python Interview Study Plan',
    description: 'A day-by-day plan using PythonTeacher resources.',
    body: `Days 1–3: Python Basics + 3 easy challenges/day. Days 4–7: two flashcard decks + patterns. Days 8–10: medium challenges. Days 11–12: system design guides. Days 13–14: mock interviews and review weak flashcards.`,
  },
  {
    slug: 'best-free-python-interview-prep',
    pillar: 'Comparisons',
    title: 'Best Free Python Interview Prep Resources',
    description: 'How PythonTeacher compares to other free options.',
    body: `PythonTeacher combines challenges with acceptance criteria, spaced flashcards, patterns, and system design in one free site. Pair it with official Python docs and your own project portfolio.`,
  },
  {
    slug: 'python-system-design-without-faang-scale',
    pillar: 'System Design',
    title: 'Python System Design Without FAANG Scale',
    description: 'Realistic system design for mid-size companies.',
    body: `You do not need billion-user scale. Focus on clear API design, Postgres schema, Redis cache, background workers, observability, and deployment. PythonTeacher system design guides use realistic QPS examples.`,
  },
];

export const COMPARE_PAGES: Record<
  string,
  { title: string; description: string; body: string }
> = {
  'pythonprep-vs-realpython': {
    title: 'PythonTeacher vs Real Python',
    description: 'Interview prep vs in-depth Python tutorials.',
    body: `Real Python excels at long-form tutorials and courses. PythonTeacher focuses on interview practice: challenges with acceptance criteria, flashcards, and system design walkthroughs. Use both: Real Python to learn, PythonTeacher to drill interview skills.`,
  },
  'pythonprep-vs-exercism': {
    title: 'PythonTeacher vs Exercism',
    description: 'Comparing practice platforms for Python interviews.',
    body: `Exercism offers mentored exercises across languages. PythonTeacher is Python-only with interview-specific flashcards, backend patterns, and system design—optimized for job prep rather than language discovery.`,
  },
  'free-python-interview-prep-resources': {
    title: 'Free Python Interview Prep Resources Compared',
    description: 'A roundup of free tools including PythonTeacher.',
    body: `Combine PythonTeacher challenges and flashcards with official Python documentation, pytest docs, and FastAPI tutorials. Avoid paid bootcamp pressure until you exhaust free structured practice.`,
  },
};

export function getBlogArticle(slug: string) {
  return BLOG_ARTICLES.find((a) => a.slug === slug);
}
