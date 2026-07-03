import type { PythonPattern } from './types';
import comprehensions from './content/comprehensions.md?raw';
import contextManagers from './content/context-managers.md?raw';
import decorators from './content/decorators.md?raw';
import generators from './content/generators.md?raw';
import dataclasses from './content/dataclasses.md?raw';
import protocols from './content/protocols.md?raw';
import dependencyInjection from './content/dependency-injection.md?raw';
import repositoryPattern from './content/repository-pattern.md?raw';
import factoryPattern from './content/factory-pattern.md?raw';
import strategyPattern from './content/strategy-pattern.md?raw';
import errorHandling from './content/error-handling.md?raw';
import loggingPatterns from './content/logging-patterns.md?raw';
import configuration from './content/configuration.md?raw';
import cliDesign from './content/cli-design.md?raw';
import asyncPatterns from './content/async-patterns.md?raw';
import cleanArchitecture from './content/clean-architecture.md?raw';

export const pythonPatterns: PythonPattern[] = [
  {
    slug: 'comprehensions',
    title: 'Comprehensions',
    subtitle: 'Concise list, dict, and set builders',
    pageTitle: 'List & Dict Comprehensions',
    content: comprehensions,
  },
  {
    slug: 'context-managers',
    title: 'Context Managers',
    subtitle: 'with statements and resource cleanup',
    pageTitle: 'Context Managers Pattern',
    content: contextManagers,
  },
  {
    slug: 'decorators',
    title: 'Decorators',
    subtitle: 'Wrap functions without changing call sites',
    pageTitle: 'Decorators Pattern',
    content: decorators,
  },
  {
    slug: 'generators',
    title: 'Generators & Iterators',
    subtitle: 'Lazy sequences and memory efficiency',
    pageTitle: 'Generators & Iterators',
    content: generators,
  },
  {
    slug: 'dataclasses',
    title: 'Dataclasses',
    subtitle: 'Structured data with less boilerplate',
    pageTitle: 'Dataclasses Pattern',
    content: dataclasses,
  },
  {
    slug: 'protocols',
    title: 'Protocols',
    subtitle: 'Structural typing with typing.Protocol',
    pageTitle: 'Protocols & Structural Typing',
    content: protocols,
  },
  {
    slug: 'dependency-injection',
    title: 'Dependency Injection',
    subtitle: 'Inject collaborators instead of hard-coding them',
    pageTitle: 'Dependency Injection Pattern',
    content: dependencyInjection,
  },
  {
    slug: 'repository-pattern',
    title: 'Repository Pattern',
    subtitle: 'Abstract persistence behind a clean API',
    pageTitle: 'Repository Pattern',
    content: repositoryPattern,
  },
  {
    slug: 'factory-pattern',
    title: 'Factory Pattern',
    subtitle: 'Centralize object construction',
    pageTitle: 'Factory Pattern',
    content: factoryPattern,
  },
  {
    slug: 'strategy-pattern',
    title: 'Strategy Pattern',
    subtitle: 'Swap algorithms at runtime',
    pageTitle: 'Strategy Pattern',
    content: strategyPattern,
  },
  {
    slug: 'error-handling',
    title: 'Error Handling',
    subtitle: 'Exceptions, chaining, and custom types',
    pageTitle: 'Error Handling Patterns',
    content: errorHandling,
  },
  {
    slug: 'logging-patterns',
    title: 'Logging Patterns',
    subtitle: 'Structured logs and context',
    pageTitle: 'Logging Patterns',
    content: loggingPatterns,
  },
  {
    slug: 'configuration',
    title: 'Configuration',
    subtitle: 'Typed settings with pydantic-settings',
    pageTitle: 'Configuration with pydantic-settings',
    content: configuration,
  },
  {
    slug: 'cli-design',
    title: 'CLI Design',
    subtitle: 'User-friendly command-line tools',
    pageTitle: 'CLI Design with Typer & Click',
    content: cliDesign,
  },
  {
    slug: 'async-patterns',
    title: 'Async Patterns',
    subtitle: 'asyncio, tasks, and concurrency',
    pageTitle: 'Async Patterns',
    content: asyncPatterns,
  },
  {
    slug: 'clean-architecture',
    title: 'Clean Architecture',
    subtitle: 'Layers, boundaries, and testability',
    pageTitle: 'Clean Architecture in Python',
    content: cleanArchitecture,
  },
];

export function getPatternBySlug(slug: string): PythonPattern | undefined {
  return pythonPatterns.find((p) => p.slug === slug);
}
