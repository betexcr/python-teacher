/** Build challenge-specific code highlight tooltips from Python solution source data. */

function pickWalkthrough(walkthrough, keywords) {
  if (!walkthrough) return '';
  const parts = walkthrough.split(/(?<=[.!?])\s+/);
  const re = new RegExp(keywords, 'i');
  const hit = parts.find((p) => re.test(p));
  return hit ? hit.trim() : walkthrough.trim();
}

function conceptMap(concepts) {
  return Object.fromEntries(concepts.map((c) => [c.term.toLowerCase(), c.detail]));
}

function findInCode(code, snippet) {
  return snippet && code.includes(snippet);
}

/**
 * @param {import('./helpers.mjs').ChallengeDef} c
 * @returns {{ match: string; label: string; tip: string }[]}
 */
export function buildCodeHighlights(c) {
  const code = c.solution;
  const concepts = conceptMap(c.concepts);
  const highlights = [];
  const seen = new Set();

  const add = (match, label, tip) => {
    const m = match?.trim();
    if (!m || m.length < 2 || !findInCode(code, m) || seen.has(m)) return;
    seen.add(m);
    highlights.push({
      match: m,
      label: label.trim(),
      tip: tip.trim().replace(/\s+/g, ' '),
    });
  };

  // @dataclass
  for (const m of code.matchAll(/@dataclass(?:\([^)]*\))?\s*\nclass\s+(\w+)/g)) {
    add(
      m[0],
      `dataclass ${m[1]}`,
      `\`${m[1]}\` is a dataclass — boilerplate __init__, __repr__, and comparisons are generated. ${concepts['dataclass'] || pickWalkthrough(c.walkthrough, 'dataclass|frozen|field')}`,
    );
  }

  // @decorator definitions
  for (const m of code.matchAll(/def\s+(\w+)\s*\([^)]*\)\s*->\s*[^:]+:\s*\n\s+@functools\.wraps/g)) {
    add(
      `@functools.wraps`,
      'functools.wraps',
      `Preserves the wrapped function's __name__ and __doc__ on the decorator wrapper. ${concepts['wraps'] || pickWalkthrough(c.walkthrough, 'wraps|metadata|decorator')}`,
    );
  }

  for (const m of code.matchAll(/def\s+(\w+)\s*\([^)]*\)\s*->\s*[^:]+:\s*\n(?:\s+"""[\s\S]*?"""\s*\n)?\s+@/g)) {
  }

  for (const m of code.matchAll(/def\s+(timed|retry|cache\w*|rate_limit\w*)\s*\(/g)) {
    add(
      `def ${m[1]}(`,
      `decorator ${m[1]}`,
      `Decorator factory wrapping callables. ${pickWalkthrough(c.walkthrough, 'decorator|wrap|retry|cache|timing')}`,
    );
  }

  // async def / await
  for (const m of code.matchAll(/async def\s+(\w+)\s*\([^)]*\)/g)) {
    add(
      m[0],
      `async ${m[1]}`,
      `\`${m[1]}\` is a coroutine — call it with await or asyncio.run. ${concepts['asyncio'] || pickWalkthrough(c.walkthrough, 'async|await|concurrent')}`,
    );
  }
  if (code.includes('await ')) {
    const awaitLine = code.match(/^\s*await\s+.+$/m);
    if (awaitLine) {
      add(
        awaitLine[0].trim(),
        'await',
        `Suspends until the coroutine or future completes. ${pickWalkthrough(c.walkthrough, 'await|gather|fetch')}`,
      );
    }
  }
  if (code.includes('asyncio.gather')) {
    add(
      'asyncio.gather',
      'asyncio.gather',
      `Runs multiple coroutines concurrently and collects results. ${pickWalkthrough(c.walkthrough, 'gather|concurrent|parallel')}`,
    );
  }

  // with statements
  for (const m of code.matchAll(/with\s+([^:]+):/g)) {
    const expr = m[1].trim();
    if (expr.length > 60) continue;
    add(
      `with ${expr}:`,
      'with',
      `Context manager — setup on enter, cleanup on exit even if an exception occurs. ${concepts['context manager'] || pickWalkthrough(c.walkthrough, 'context|timer|session|open')}`,
    );
    break;
  }

  // yield / generators
  if (code.includes('yield ')) {
    const yieldLine = code.match(/^\s*yield\s+.+$/m);
    if (yieldLine) {
      add(
        yieldLine[0].trim(),
        'yield',
        `Produces the next value lazily without building the whole sequence in memory. ${concepts['generator'] || pickWalkthrough(c.walkthrough, 'yield|generator|pipeline')}`,
      );
    }
  }

  // @pytest fixtures / parametrize
  if (code.includes('@pytest.fixture')) {
    add(
      '@pytest.fixture',
      'pytest.fixture',
      `Injects shared setup into tests — run once per test or session depending on scope. ${pickWalkthrough(c.walkthrough, 'fixture|setup|mock')}`,
    );
  }
  if (code.includes('@pytest.mark.parametrize')) {
    add(
      '@pytest.mark.parametrize',
      'parametrize',
      `Runs the same test function with multiple input tuples. ${pickWalkthrough(c.walkthrough, 'parametrize|cases|edge')}`,
    );
  }

  // FastAPI route decorators
  for (const m of code.matchAll(/@(?:app|router)\.(get|post|put|delete|patch)\([^)]+\)/g)) {
    add(
      m[0],
      `${m[1].toUpperCase()} route`,
      `Registers an HTTP ${m[1].toUpperCase()} handler on the FastAPI app or blueprint router. ${pickWalkthrough(c.walkthrough, 'route|endpoint|api')}`,
    );
  }

  // Pydantic BaseModel
  if (code.includes('BaseModel')) {
    const m = code.match(/class\s+(\w+)\s*\(\s*BaseModel\s*\)/);
    if (m) {
      add(
        m[0],
        `Pydantic ${m[1]}`,
        `Validates and parses incoming data into typed Python objects. ${concepts['pydantic'] || pickWalkthrough(c.walkthrough, 'validate|model|schema')}`,
      );
    }
  }

  // SQLAlchemy patterns
  if (code.includes('DeclarativeBase') || code.includes('declarative_base')) {
    add(
      code.includes('DeclarativeBase') ? 'DeclarativeBase' : 'declarative_base',
      'ORM base',
      `Base class for SQLAlchemy mapped models. ${pickWalkthrough(c.walkthrough, 'model|table|orm')}`,
    );
  }

  // requests / aiohttp
  if (code.includes('requests.get') || code.includes('requests.Session')) {
    const call = code.match(/requests\.(?:get|Session)[^;\n]*/)?.[0];
    if (call) add(call, 'requests', `HTTP client call. ${pickWalkthrough(c.walkthrough, 'fetch|get|api|json')}`);
  }
  if (code.includes('aiohttp')) {
    add('aiohttp', 'aiohttp', `Async HTTP client for non-blocking I/O. ${pickWalkthrough(c.walkthrough, 'aiohttp|async|client')}`);
  }

  // raise_for_status
  if (code.includes('raise_for_status')) {
    add('raise_for_status()', 'raise_for_status', 'Turns 4xx/5xx HTTP responses into exceptions instead of silent failures.');
  }

  // pathlib
  if (code.includes('Path(')) {
    const m = code.match(/Path\([^)]+\)/);
    if (m) add(m[0], 'Path', `Object-oriented filesystem path. ${pickWalkthrough(c.walkthrough, 'path|file|read')}`);
  }

  // Enum
  if (code.includes('class ') && code.includes('Enum')) {
    const m = code.match(/class\s+(\w+)\s*\([^)]*Enum[^)]*\)/);
    if (m) add(m[0], `Enum ${m[1]}`, `Named constants instead of magic strings. ${pickWalkthrough(c.walkthrough, 'enum|status|constant')}`);
  }

  // logging
  if (code.includes('logging.getLogger') || code.includes('logging.basicConfig')) {
    const line = code.match(/logging\.(?:getLogger|basicConfig)[^;\n]*/)?.[0];
    if (line) add(line, 'logging', `Structured application logging. ${pickWalkthrough(c.walkthrough, 'log|level|logger')}`);
  }

  // Typer / argparse
  if (code.includes('typer.Typer') || code.includes('@app.command')) {
    add(code.includes('typer.Typer') ? 'typer.Typer()' : '@app.command', 'Typer CLI', `CLI command definition with type hints. ${pickWalkthrough(c.walkthrough, 'cli|command|typer')}`);
  }

  // Celery
  if (code.includes('@celery') || code.includes('@app.task')) {
    add(code.includes('@app.task') ? '@app.task' : '@celery', 'Celery task', `Background job executed by a worker process. ${pickWalkthrough(c.walkthrough, 'task|worker|queue')}`);
  }

  // Line-by-line patterns
  for (const line of code.split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#') || t.startsWith('import ') || t.startsWith('from ')) continue;

    if (t.startsWith('raise ValueError') || t.startsWith('raise RuntimeError')) {
      add(
        t.length > 90 ? t.slice(0, 87) + '...' : t,
        'raise',
        `Fail fast with a clear error when input or state is invalid. ${pickWalkthrough(c.walkthrough, 'raise|invalid|error')}`,
      );
    }

    if (t.includes('->') && t.startsWith('def ')) {
      const sig = t.length > 100 ? t.slice(0, 97) + '...' : t;
      add(sig, 'type hints', `Return and parameter types document the contract and enable static checking.`);
    }

    if (t.includes('if __name__') && t.includes('__main__')) {
      add(t, '__main__', 'Entry point when the file is run directly — keeps import side effects out of library use.');
    }

    if (t.includes('for ') && t.includes(' in ') && (t.includes('range(') || t.includes('enumerate('))) {
      const short = t.length > 90 ? t.slice(0, 87) + '...' : t;
      add(short, 'for loop', `Iterates over a sequence. ${pickWalkthrough(c.walkthrough, 'loop|iterate|range')}`);
    }

    if (t.includes('return ')) {
      const ret = t.match(/return\s+.+/)?.[0];
      if (ret && ret.length < 80 && !seen.has(ret)) {
        add(ret, 'return', `Returns the computed result to the caller. ${pickWalkthrough(c.walkthrough, 'return|result|output')}`);
      }
    }

    if (t.includes('@property')) {
      add('@property', 'property', `Computed attribute accessed like a field but backed by a method. ${pickWalkthrough(c.walkthrough, 'property|balance|read')}`);
    }

    if (t.includes('Depends(')) {
      add('Depends(', 'Depends', 'FastAPI dependency injection — shared auth, DB sessions, and settings per request.');
    }
  }

  // Concept-driven extras
  for (const { term, detail } of c.concepts) {
    const lower = term.toLowerCase();
    if (lower.includes('repository') && code.includes('Repository')) {
      add('Repository', 'repository', `${detail}`);
    }
    if (lower.includes('event') && code.includes('Event')) {
      add('Event', 'domain event', `${detail}`);
    }
  }

  return highlights.sort((a, b) => b.match.length - a.match.length);
}

export function formatCodeHighlightsSection(highlights) {
  if (!highlights.length) return '';
  const lines = highlights.map(
    (h) => `- \`${h.match.replace(/`/g, '\\`')}\` — **${h.label}** — ${h.tip}`,
  );
  return `## Code highlights\n\n${lines.join('\n')}\n`;
}
