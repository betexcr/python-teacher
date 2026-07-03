# Solution: Dynamic Form Fields

## Approach

Array of field definitions drives render and validation.

## Key concepts

- **Field array**: Common pattern for repeatable form sections.

## Code highlights

- `<select value={row.type} onChange={(e) => update(row.id, { type: e.target.value as Row['type'] })}>` — **controlled input** — Input text is owned by React state — value plus onChange keep the field in sync. rows array is source of truth; render switches on row.type; validation builds error map.
- `const [rows, setRows] = useState<Row[]>([{ id: crypto.randomUUID()` — **rows state** — `rows` is the value the UI shows. It starts at [{ id: crypto.randomUUID(. `setRows` updates it when the user interacts. rows array is source of truth; render switches on row.type; validation builds error map.
- `{errors[row.id] && <span role="alert">{errors[row.id]}</span>}` — **&& render** — Only renders the element when the left side is true.
- `[...r, { id: crypto.randomUUID(), type: 'text', label: '' }]` — **spread copy** — Copies the old collection then changes it — React sees a new reference and re-renders.
- `.map((x) => (x.id === id ? { ...x, ...patch } : x)` — **.map()** — Turns each item in your data into a JSX row. rows array is source of truth; render switches on row.type; validation builds error map.
- `onClick={() => remove(row.id)}` — **onClick** — Runs when the user clicks this button. rows array is source of truth; render switches on row.type; validation builds error map.
- `onClick={addRow}` — **onClick** — Runs when the user clicks this button. rows array is source of truth; render switches on row.type; validation builds error map.
- `key={row.id}` — **key** — Helps React track each list row — use a stable id (row.id), not the array index, when items can reorder.
- `role="alert"` — **role="alert"** — Marks an error message so screen readers treat it as urgent.

## Solution code

```tsx
import { useState, FormEvent } from 'react';

type Row = { id: string; type: 'text' | 'number' | 'select'; label: string; options?: string };

export function DynamicFormBuilder() {
  const [rows, setRows] = useState<Row[]>([{ id: crypto.randomUUID(), type: 'text', label: '' }]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addRow = () => setRows((r) => [...r, { id: crypto.randomUUID(), type: 'text', label: '' }]);
  const remove = (id: string) => setRows((r) => r.filter((x) => x.id !== id));
  const update = (id: string, patch: Partial<Row>) =>
    setRows((r) => r.map((x) => (x.id === id ? { ...x, ...patch } : x)));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    rows.forEach((row) => {
      if (!row.label.trim()) next[row.id] = 'Label required';
      if (row.type === 'select' && !row.options?.trim()) next[row.id] = 'Options required';
    });
    setErrors(next);
    if (Object.keys(next).length) return;
    console.log(JSON.stringify(rows, null, 2));
  };

  return (
    <form onSubmit={onSubmit}>
      {rows.map((row) => (
        <div key={row.id}>
          <select value={row.type} onChange={(e) => update(row.id, { type: e.target.value as Row['type'] })}>
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="select">Select</option>
          </select>
          <input value={row.label} onChange={(e) => update(row.id, { label: e.target.value })} placeholder="Label" />
          {row.type === 'select' && (
            <input value={row.options ?? ''} onChange={(e) => update(row.id, { options: e.target.value })} placeholder="a,b,c" />
          )}
          {errors[row.id] && <span role="alert">{errors[row.id]}</span>}
          <button type="button" onClick={() => remove(row.id)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={addRow}>Add field</button>
      <button type="submit">Export JSON</button>
    </form>
  );
}
```

## Walkthrough

rows array is source of truth; render switches on row.type; validation builds error map.

## Common mistakes

- Index keys on dynamic rows
- Storing DOM refs per row unnecessarily

## Stretch goals

- Drag reorder
- JSON Schema export
