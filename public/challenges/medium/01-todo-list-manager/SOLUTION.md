# Solution: Todo List Manager

## Approach

Array state + filter enum; derived visible todos.

## Key concepts

- **Derived UI lists**: Do not store filtered array—compute from todos + filter.

## Code highlights

- `onClick={() => setTodos((xs) => xs.filter((x) => x.id !== t.id))}` — **click handler** — Updates state (). useMemo avoids refiltering unnecessarily; CRUD uses immutable array ops.
- `onClick={() => setTodos((xs) => xs.filter((x) => !x.done))}` — **click handler** — Updates state (). useMemo avoids refiltering unnecessarily; CRUD uses immutable array ops.
- `[...xs, { id: crypto.randomUUID(), text: t, done: false }]` — **spread copy** — Copies the old collection then changes it — React sees a new reference and re-renders.
- `.map((x) => x.id === t.id ? { ...x, done: !x.done } : x)` — **.map()** — Turns each item in your data into a JSX row. useMemo avoids refiltering unnecessarily; CRUD uses immutable array ops.
- `const [filter, setFilter] = useState<Filter>('all')` — **filter state** — `filter` is the value the UI shows. It starts at 'all'. `setFilter` updates it when the user interacts. useMemo avoids refiltering unnecessarily; CRUD uses immutable array ops.
- `const [todos, setTodos] = useState<Todo[]>([])` — **todos state** — `todos` is the value the UI shows. It starts at []. `setTodos` updates it when the user interacts. useMemo avoids refiltering unnecessarily; CRUD uses immutable array ops.
- `const [text, setText] = useState('')` — **text state** — `text` is the value the UI shows. It starts at ''. `setText` updates it when the user interacts. useMemo avoids refiltering unnecessarily; CRUD uses immutable array ops.
- `onClick={() => setFilter(f)}` — **click handler** — Updates state (). useMemo avoids refiltering unnecessarily; CRUD uses immutable array ops.
- `onClick={add}` — **onClick** — Runs when the user clicks this button. useMemo avoids refiltering unnecessarily; CRUD uses immutable array ops.
- `key={t.id}` — **key** — Helps React track each list row — use a stable id (t.id), not the array index, when items can reorder.
- `key={f}` — **key** — Helps React track each list row — use a stable id (f), not the array index, when items can reorder.

## Solution code

```tsx
import { useMemo, useState } from 'react';

type Todo = { id: string; text: string; done: boolean };
type Filter = 'all' | 'active' | 'completed';

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  const add = () => {
    const t = text.trim();
    if (!t) return;
    setTodos((xs) => [...xs, { id: crypto.randomUUID(), text: t, done: false }]);
    setText('');
  };

  const visible = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.done);
    if (filter === 'completed') return todos.filter((t) => t.done);
    return todos;
  }, [todos, filter]);

  const remaining = todos.filter((t) => !t.done).length;

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && add()} />
      <button onClick={add}>Add</button>
      <ul>
        {visible.map((t) => (
          <li key={t.id}>
            <input type="checkbox" checked={t.done} onChange={() => setTodos((xs) => xs.map((x) => x.id === t.id ? { ...x, done: !x.done } : x))} />
            {t.text}
            <button onClick={() => setTodos((xs) => xs.filter((x) => x.id !== t.id))}>×</button>
          </li>
        ))}
      </ul>
      <footer>{remaining} left</footer>
      {(['all','active','completed'] as Filter[]).map((f) => (
        <button key={f} aria-pressed={filter === f} onClick={() => setFilter(f)}>{f}</button>
      ))}
      <button onClick={() => setTodos((xs) => xs.filter((x) => !x.done))}>Clear completed</button>
    </div>
  );
}
```

## Walkthrough

useMemo avoids refiltering unnecessarily; CRUD uses immutable array ops.

## Common mistakes

- Storing filtered todos in state
- Index keys

## Stretch goals

- localStorage sync
- Drag reorder
