# Solution: State History Manager

## Approach

Classic past/present/future model with reducer.

## Key concepts

- **Undo stack**: Present is current; past is stack of snapshots.

## Code highlights

- `const [state, dispatch] = useReducer(` — **useReducer** — `state` is updated by dispatching actions instead of many separate setters. SET pushes present to past and clears future. UNDO/REDO shift stacks.
- `.map((s) => <li key={s}>{s}</li>)` — **.map()** — Turns each item in your data into a JSX row. SET pushes present to past and clears future. UNDO/REDO shift stacks.
- `disabled={!state.future.length}` — **disabled** — Disabled when !state.future.length — UI follows state instead of manual DOM tweaks. SET pushes present to past and clears future. UNDO/REDO shift stacks.
- `disabled={!state.past.length}` — **disabled** — Disabled when !state.past.length — UI follows state instead of manual DOM tweaks. SET pushes present to past and clears future. UNDO/REDO shift stacks.
- `onClick={addShape}` — **onClick** — Runs when the user clicks this button. SET pushes present to past and clears future. UNDO/REDO shift stacks.
- `key={s}` — **key** — Helps React track each list row — use a stable id (s), not the array index, when items can reorder.

## Solution code

```tsx
import { useReducer } from 'react';

type History<T> = { past: T[]; present: T; future: T[] };

type Action<T> =
  | { type: 'SET'; payload: T }
  | { type: 'UNDO' }
  | { type: 'REDO' };

function historyReducer<T>(state: History<T>, action: Action<T>): History<T> {
  switch (action.type) {
    case 'SET':
      return {
        past: [...state.past, state.present],
        present: action.payload,
        future: [],
      };
    case 'UNDO':
      if (!state.past.length) return state;
      return {
        past: state.past.slice(0, -1),
        present: state.past[state.past.length - 1],
        future: [state.present, ...state.future],
      };
    case 'REDO':
      if (!state.future.length) return state;
      return {
        past: [...state.past, state.present],
        present: state.future[0],
        future: state.future.slice(1),
      };
    default:
      return state;
  }
}

export function HistoryEditor() {
  const [state, dispatch] = useReducer(historyReducer<string[]>, {
    past: [],
    present: [],
    future: [],
  });

  const addShape = () =>
    dispatch({ type: 'SET', payload: [...state.present, 'shape-' + Date.now()] });

  return (
    <div>
      <button onClick={addShape}>Add</button>
      <button onClick={() => dispatch({ type: 'UNDO' })} disabled={!state.past.length}>Undo</button>
      <button onClick={() => dispatch({ type: 'REDO' })} disabled={!state.future.length}>Redo</button>
      <ul>{state.present.map((s) => <li key={s}>{s}</li>)}</ul>
    </div>
  );
}
```

## Walkthrough

SET pushes present to past and clears future. UNDO/REDO shift stacks.

## Common mistakes

- Mutating past array
- Forgetting to clear future on new edit

## Stretch goals

- Limit history depth
- Command pattern with inverse ops
