# Solution: Timer Controls

## Approach

Track base elapsed + segment start time; reducer for actions.

## Key concepts

- **Drift-free timer**: Compute elapsed from Date.now() deltas, not tick count.

## Code highlights

- `useEffect(() => {
    if (!state.running) return;
    const id = setInterval(() => force(), 50);
    return () => clearInterval(id);
  }, [state.running])` — **useEffect** — Runs after render to Pause commits segment duration to elapsed; display derives live total while running.. The returned cleanup function runs on unmount or before the next run.
- `const [state, dispatch] = useReducer(` — **useReducer** — `state` is updated by dispatching actions instead of many separate setters. Pause commits segment duration to elapsed; display derives live total while running.
- `.map((l, i) => <li key={i}>{format(l)` — **.map()** — Turns each item in your data into a JSX row. Pause commits segment duration to elapsed; display derives live total while running.
- `disabled={!state.running}` — **disabled** — Disabled when !state.running — UI follows state instead of manual DOM tweaks. Pause commits segment duration to elapsed; display derives live total while running.
- `key={i}` — **key** — Helps React track each list row — use a stable id (i), not the array index, when items can reorder.

## Solution code

```tsx
import { useEffect, useReducer, useRef } from 'react';

type State = { running: boolean; elapsed: number; laps: number[]; startedAt: number | null };

type Action =
  | { type: 'START' }
  | { type: 'PAUSE' }
  | { type: 'RESET' }
  | { type: 'LAP' }
  | { type: 'TICK'; now: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'START':
      return { ...state, running: true, startedAt: action.now ?? Date.now() };
    case 'PAUSE': {
      if (!state.running || state.startedAt === null) return state;
      const add = Date.now() - state.startedAt;
      return { ...state, running: false, elapsed: state.elapsed + add, startedAt: null };
    }
    case 'RESET':
      return { running: false, elapsed: 0, laps: [], startedAt: null };
    case 'LAP':
      return { ...state, laps: [...state.laps, state.elapsed + (state.startedAt ? Date.now() - state.startedAt : 0)] };
    default:
      return state;
  }
}

function format(ms: number) {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const cs = Math.floor((ms % 1000) / 10);
  return `${String(m).padStart(2,'0')}:${String(s % 60).padStart(2,'0')}.${String(cs).padStart(2,'0')}`;
}

export function TimerControls() {
  const [state, dispatch] = useReducer(reducer, { running: false, elapsed: 0, laps: [], startedAt: null });
  const [, force] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    if (!state.running) return;
    const id = setInterval(() => force(), 50);
    return () => clearInterval(id);
  }, [state.running]);

  const current =
    state.elapsed + (state.running && state.startedAt ? Date.now() - state.startedAt : 0);

  return (
    <div>
      <p>{format(current)}</p>
      {!state.running ? (
        <button onClick={() => dispatch({ type: 'START' })}>Start</button>
      ) : (
        <button onClick={() => dispatch({ type: 'PAUSE' })}>Pause</button>
      )}
      <button onClick={() => dispatch({ type: 'LAP' })} disabled={!state.running}>Lap</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
      <ol>{state.laps.map((l, i) => <li key={i}>{format(l)}</li>)}</ol>
    </div>
  );
}
```

## Walkthrough

Pause commits segment duration to elapsed; display derives live total while running.

## Common mistakes

- Leaving setInterval running while paused
- Using only tick count for elapsed

## Stretch goals

- Countdown mode
- Web Worker timer
