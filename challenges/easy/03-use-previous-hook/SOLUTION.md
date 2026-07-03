# Solution: usePrevious Hook

## Approach

During render, read ref.current (old value). After commit, useEffect writes the latest value into the ref.

## Key concepts

- **useRef**: Mutable box whose .current survives re-renders.
- **useEffect timing**: Effects run after render, perfect for "commit previous value".

## Code highlights

- `useEffect(() => {
    ref.current = value;
  }, [value])` — **useEffect** — Runs after render to On render N, ref still holds value from render N-1 because the effect has not run yet. After paint, effect sets ref to the current value for next time..
- `onClick={() => setN((v) => v + 1)}` — **increment click** — Adds 1 using the latest state. On render N, ref still holds value from render N-1 because the effect has not run yet. After paint, effect sets ref to the current value for next time.
- `const [n, setN] = useState(0)` — **n state** — `n` is the value the UI shows. It starts at 0. `setN` updates it when the user interacts. On render N, ref still holds value from render N-1 because the effect has not run yet.
- `const ref = useRef<T>()` — **ref ref** — `ref` keeps a mutable value across renders without triggering re-renders when .current changes. Mutable box whose .current survives re-renders.

## Solution code

```tsx
import { useEffect, useRef } from 'react';

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

// Demo
export function PreviousDemo() {
  const [n, setN] = useState(0);
  const prev = usePrevious(n);
  return (
    <div>
      <p>Now: {n}, Before: {prev ?? '—'}</p>
      <button onClick={() => setN((v) => v + 1)}>+1</button>
    </div>
  );
}
```

## Walkthrough

On render N, ref still holds value from render N-1 because the effect has not run yet. After paint, effect sets ref to the current value for next time.

## Common mistakes

- Updating ref during render (Strict Mode double-render quirks)
- Using useState for previous (causes extra renders)

## Stretch goals

- Compare deep objects with usePrevious
- Animate only when value increases
