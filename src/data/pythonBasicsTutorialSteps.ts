import { PYTHON_BASICS_TOPIC_COUNT } from './pythonBasicsTopics';

export type TutorialFocus = 'welcome' | 'topic' | 'prose' | 'code' | 'legend' | 'finish';

export type PythonBasicsTutorialStep = {
  id: string;
  focus: TutorialFocus;
  topicIndex?: number;
  proseIndex?: number;
  title: string;
  body: string;
  tip?: string;
  codeHighlights?: string[];
};

export function tutorialTargetId(step: PythonBasicsTutorialStep): string {
  switch (step.focus) {
    case 'welcome':
      return 'python-basics-welcome';
    case 'finish':
      return 'python-basics-finish';
    case 'topic':
      return `python-basics-topic-${step.topicIndex}`;
    case 'prose':
      return `python-basics-topic-${step.topicIndex}-prose-${step.proseIndex ?? 0}`;
    case 'code':
      return `python-basics-topic-${step.topicIndex}-code`;
    case 'legend':
      return `python-basics-topic-${step.topicIndex}-legend`;
    default:
      return 'python-basics-welcome';
  }
}

/** Beginner-friendly guided tour — core Python first, then ecosystem topics. */
export const pythonBasicsTutorialSteps: PythonBasicsTutorialStep[] = [
  {
    id: 'welcome',
    focus: 'welcome',
    title: 'Welcome — zero Python assumed',
    body: 'We start with running Python, variables, types, loops, collections, functions, venv, files, and exceptions. Use Next to continue.',
    tip: 'Green words on the page are Python ecosystem terms. Hover them for short definitions.',
  },
  // 0 Running Python
  {
    id: 'run-intro',
    focus: 'topic',
    topicIndex: 0,
    title: '1. Running Python',
    body: 'Run `.py` files with `python script.py` or try lines in the REPL. `print()` shows output.',
  },
  {
    id: 'run-code',
    focus: 'code',
    topicIndex: 0,
    title: 'print and REPL',
    body: 'Save a file, run it from the terminal, or type expressions directly in the interactive shell.',
    codeHighlights: ['print', 'python hello.py'],
  },
  // 1 Variables
  {
    id: 'var-intro',
    focus: 'topic',
    topicIndex: 1,
    title: '2. Variables',
    body: 'Names point to values. Use `snake_case` for variables; `UPPER_SNAKE` for constants by convention.',
  },
  {
    id: 'var-code',
    focus: 'code',
    topicIndex: 1,
    title: 'Assignment',
    body: '`name = "Ada"` then `name = "Alan"` reassigns the same name to a new value.',
    codeHighlights: ['name =', 'MAX_RETRIES'],
  },
  // 2 Types
  {
    id: 'type-intro',
    focus: 'topic',
    topicIndex: 2,
    title: '3. Types',
    body: 'int, float, str, bool, list, dict — Python picks the type from the value. `type()` and `isinstance()` help while learning.',
  },
  {
    id: 'type-code',
    focus: 'code',
    topicIndex: 2,
    title: 'type and isinstance',
    body: 'Every literal has a class. `isinstance("hi", str)` is the reliable check.',
    codeHighlights: ['type(', 'isinstance'],
  },
  // 3 Numbers & strings
  {
    id: 'str-intro',
    focus: 'topic',
    topicIndex: 3,
    title: '4. Numbers, strings & f-strings',
    body: 'Math operators work as expected. F-strings embed expressions: `f"Hello, {name}!"`.',
  },
  {
    id: 'str-code',
    focus: 'code',
    topicIndex: 3,
    title: 'f"..."',
    body: 'Prefer f-strings over concatenation for readable dynamic text.',
    codeHighlights: ['f"', 'total ='],
  },
  // 4 Booleans
  {
    id: 'bool-intro',
    focus: 'topic',
    topicIndex: 4,
    title: '5. Booleans & truthiness',
    body: '`True` and `False` are capitalized. Empty strings and lists are falsy; non-empty values are truthy in `if`.',
  },
  {
    id: 'bool-code',
    focus: 'code',
    topicIndex: 4,
    title: 'Comparisons and if',
    body: 'Use `==` for equality. `if name:` runs when name is truthy (non-empty).',
    codeHighlights: ['>=', '==', 'if name', 'if not'],
  },
  // 5 if/elif/else
  {
    id: 'if-intro',
    focus: 'topic',
    topicIndex: 5,
    title: '6. if / elif / else',
    body: 'Indentation defines blocks — no braces. Colons after `if`, `elif`, and `else`.',
  },
  {
    id: 'if-code',
    focus: 'code',
    topicIndex: 5,
    title: 'Branching',
    body: 'Read top to bottom; only one branch runs. Combine checks with `and` / `or`.',
    codeHighlights: ['if ', 'elif ', 'else:'],
  },
  // 6 for loops
  {
    id: 'for-intro',
    focus: 'topic',
    topicIndex: 6,
    title: '7. for loops',
    body: '`for item in sequence:` visits each element. `range(3)` gives 0, 1, 2.',
  },
  {
    id: 'for-code',
    focus: 'code',
    topicIndex: 6,
    title: 'for and enumerate',
    body: 'Loop lists directly or use `enumerate` when you need index and value.',
    codeHighlights: ['for ', 'range', 'enumerate'],
  },
  // 7 while loops
  {
    id: 'while-intro',
    focus: 'topic',
    topicIndex: 7,
    title: '8. while loops',
    body: 'Repeat until the condition is false. Use `break` to exit, `continue` to skip an iteration.',
  },
  {
    id: 'while-code',
    focus: 'code',
    topicIndex: 7,
    title: 'while and break',
    body: 'Make sure something inside the loop eventually stops it — here `n += 1`.',
    codeHighlights: ['while ', 'break', 'n += 1'],
  },
  // 8 Lists
  {
    id: 'list-intro',
    focus: 'topic',
    topicIndex: 8,
    title: '9. Lists & comprehensions',
    body: 'Ordered mutable sequences. List comprehensions build new lists in one expression.',
  },
  {
    id: 'list-code',
    focus: 'code',
    topicIndex: 8,
    title: 'Comprehensions',
    body: '`[n * 2 for n in nums]` is a list comprehension — compact and readable.',
    codeHighlights: ['for n in', 'append', '[n * 2'],
    tip: 'Keep comprehensions short; a plain for loop is fine when logic gets heavy.',
  },
  // 9 Dicts & sets
  {
    id: 'dict-intro',
    focus: 'topic',
    topicIndex: 9,
    title: '10. Dicts & sets',
    body: 'Dicts map keys to values; sets hold unique items. `.items()` loops key-value pairs.',
  },
  {
    id: 'dict-code',
    focus: 'code',
    topicIndex: 9,
    title: 'dict and set',
    body: 'Use `.get(key, default)` for safe lookups. Set comprehensions dedupe.',
    codeHighlights: ['{', '.get', '.items()'],
  },
  // 10 Functions
  {
    id: 'fn-intro',
    focus: 'topic',
    topicIndex: 10,
    title: '11. Functions',
    body: '`def` defines reusable blocks. Default args, `*args`, and `**kwargs` cover flexible call sites.',
  },
  {
    id: 'fn-code',
    focus: 'code',
    topicIndex: 10,
    title: 'def and lambda',
    body: 'Return sends a value back. `lambda` is a one-line anonymous function.',
    codeHighlights: ['def ', 'return', 'lambda'],
  },
  // 11 Modules
  {
    id: 'mod-intro',
    focus: 'topic',
    topicIndex: 11,
    title: '12. Modules & imports',
    body: 'Split code across files. The standard library ships with Python — json, pathlib, and more.',
  },
  {
    id: 'mod-code',
    focus: 'code',
    topicIndex: 11,
    title: 'import / from',
    body: '`import math` vs `from pathlib import Path` — both load reusable code.',
    codeHighlights: ['import ', 'from '],
  },
  // 12 venv
  {
    id: 'venv-intro',
    focus: 'topic',
    topicIndex: 12,
    title: '13. Virtual environments',
    body: 'Isolate project dependencies with venv. Activate before `pip install`.',
  },
  {
    id: 'venv-code',
    focus: 'code',
    topicIndex: 12,
    title: 'python -m venv',
    body: 'Create `.venv`, activate it, install packages, freeze to requirements.txt.',
    codeHighlights: ['venv', 'pip install', 'requirements.txt'],
    tip: 'Add `.venv/` to `.gitignore` — commit requirements.txt instead.',
  },
  // 13 Files
  {
    id: 'file-intro',
    focus: 'topic',
    topicIndex: 13,
    title: '14. Files & pathlib',
    body: 'pathlib.Path is the modern path API. `with open(...) as f:` auto-closes files.',
  },
  {
    id: 'file-code',
    focus: 'code',
    topicIndex: 13,
    title: 'Path and with',
    body: 'Join paths with `/`, read and write text, check `.exists()`.',
    codeHighlights: ['Path', 'read_text', 'with open'],
  },
  // 14 Exceptions
  {
    id: 'exc-intro',
    focus: 'topic',
    topicIndex: 14,
    title: '15. Exceptions',
    body: 'try/except handles errors gracefully. raise signals invalid input to callers.',
  },
  {
    id: 'exc-code',
    focus: 'code',
    topicIndex: 14,
    title: 'try / except / raise',
    body: 'Catch specific exceptions. finally runs either way.',
    codeHighlights: ['try:', 'except', 'raise'],
  },
  {
    id: 'finish',
    focus: 'finish',
    title: 'You toured all Python Basics!',
    body: `You covered all ${PYTHON_BASICS_TOPIC_COUNT} core topics from running Python through exceptions. Re-read any section, then try the easy challenges.`,
    tip: 'Hover green highlights on the page for Python term definitions.',
  },
];
