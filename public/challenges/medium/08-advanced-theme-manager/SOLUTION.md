# Solution: Advanced Theme Manager

## Approach

Draft/applied split prevents half-finished theme leaking globally.

## Key concepts

- **Design tokens**: Map presets to CSS custom properties.

## Code highlights

- `<select value={draft} onChange={(e) => setDraft(e.target.value)}>` — **controlled input** — Input text is owned by React state — value plus onChange keep the field in sync. Select updates draft only; Apply writes CSS variables globally.
- `.map((p) => <option key={p} value={p}>{p}</option>)` — **.map()** — Turns each item in your data into a JSX row. Select updates draft only; Apply writes CSS variables globally.
- `const [applied, setApplied] = useState('ocean')` — **applied state** — `applied` is the value the UI shows. It starts at 'ocean'. `setApplied` updates it when the user interacts. Select updates draft only; Apply writes CSS variables globally.
- `const [draft, setDraft] = useState(applied)` — **draft state** — `draft` is the value the UI shows. It starts at applied. `setDraft` updates it when the user interacts. Select updates draft only; Apply writes CSS variables globally.
- `onClick={commit}` — **onClick** — Runs when the user clicks this button. Select updates draft only; Apply writes CSS variables globally.
- `key={p}` — **key** — Helps React track each list row — use a stable id (p), not the array index, when items can reorder.

## Solution code

```tsx
import { useState } from 'react';

const presets: Record<string, Record<string, string>> = {
  ocean: { '--bg': '#e0f7fa', '--text': '#006064' },
  forest: { '--bg': '#e8f5e9', '--text': '#1b5e20' },
  midnight: { '--bg': '#121212', '--text': '#e0e0e0' },
};

function applyVars(vars: Record<string, string>) {
  Object.entries(vars).forEach(([k, v]) => document.documentElement.style.setProperty(k, v));
}

export function AdvancedThemeManager() {
  const [applied, setApplied] = useState('ocean');
  const [draft, setDraft] = useState(applied);

  const preview = presets[draft];
  const commit = () => {
    applyVars(presets[draft]);
    setApplied(draft);
  };

  return (
    <div>
      <select value={draft} onChange={(e) => setDraft(e.target.value)}>
        {Object.keys(presets).map((p) => <option key={p} value={p}>{p}</option>)}
      </select>
      <div style={preview as React.CSSProperties} className="preview">Preview</div>
      <button onClick={commit}>Apply</button>
      <button onClick={() => { setDraft('ocean'); applyVars(presets.ocean); setApplied('ocean'); }}>Reset</button>
    </div>
  );
}
```

## Walkthrough

Select updates draft only; Apply writes CSS variables globally.

## Common mistakes

- Applying on every select change without user confirm
- Hardcoding colors in components

## Stretch goals

- Import/export JSON theme
- Contrast checker
