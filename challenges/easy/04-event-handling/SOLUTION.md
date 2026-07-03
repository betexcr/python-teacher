# Solution: Event Handling

## Approach

Central string state; handlers call setDisplay with concatenation or slice.

## Key concepts

- **SyntheticEvent**: Cross-browser normalized event; pool is no longer reused in React 17+.
- **Handler factories**: onClick={() => append("7")} avoids inline bugs with stale closures for simple cases.

## Code highlights

- `const [display, setDisplay] = useState('')` — **display state** — `display` is the value the UI shows. It starts at ''. `setDisplay` updates it when the user interacts. Each button triggers a small state transition. type="button" avoids accidental form submission.
- `onClick={() => append(k)}` — **onClick** — Runs when the user clicks this button. Each button triggers a small state transition.
- `onClick={backspace}` — **onClick** — Runs when the user clicks this button. Each button triggers a small state transition.
- `onClick={clear}` — **onClick** — Runs when the user clicks this button. Each button triggers a small state transition.
- `key={k}` — **key** — Helps React track each list row — use a stable id (k), not the array index, when items can reorder.

## Solution code

```tsx
import { useState } from 'react';

export function Keypad() {
  const [display, setDisplay] = useState('');

  const append = (d: string) => setDisplay((s) => s + d);
  const clear = () => setDisplay('');
  const backspace = () => setDisplay((s) => s.slice(0, -1));

  const keys = ['1','2','3','4','5','6','7','8','9','0'];

  return (
    <div>
      <output>{display || '0'}</output>
      <div role="group" aria-label="keypad">
        {keys.map((k) => (
          <button key={k} type="button" onClick={() => append(k)}>{k}</button>
        ))}
        <button type="button" onClick={backspace}>⌫</button>
        <button type="button" onClick={clear}>Clear</button>
      </div>
    </div>
  );
}
```

## Walkthrough

Each button triggers a small state transition. type="button" avoids accidental form submission.

## Common mistakes

- Using onClick={append("1")} which invokes immediately
- Mutating display string in place

## Stretch goals

- Add keyboard listeners with useEffect
- Limit max length
