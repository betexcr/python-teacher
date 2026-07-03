# Solution: Prevent Unnecessary Re-renders

## Approach

Isolate fast-changing state; memo expensive children; stabilize props.

## Key concepts

- **Context splitting**: Consumers of dispatch should not rerender when value changes.
- **Profiler**: Commit chart shows which optimizations helped.

## Code highlights

- `const CountContext = createContext(0);` — **createContext** — Shares data with any child below without passing props on every level.
- `const [tick, setTick] = useState(0)` — **tick state** — `tick` is the value the UI shows. It starts at 0. `setTick` updates it when the user interacts. SlowList memoized with stable items; tick isolated in context consumed only where needed.
- `onClick={dispatch}` — **onClick** — Runs when the user clicks this button. SlowList memoized with stable items; tick isolated in context consumed only where needed.
- `key={i}` — **key** — Helps React track each list row — use a stable id (i), not the array index, when items can reorder.

## Solution code

```tsx
import { createContext, memo, useCallback, useContext, useMemo, useState } from 'react';

const CountContext = createContext(0);
const DispatchContext = createContext(() => {});

const SlowList = memo(function SlowList({ items }: { items: string[] }) {
  return (
    <ul>
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
});

export function OptimizedTree() {
  const [tick, setTick] = useState(0);
  const [items] = useState(() => Array.from({ length: 100 }, (_, i) => `item-${i}`));

  const dispatch = useCallback(() => setTick((t) => t + 1), []);
  const value = useMemo(() => tick, [tick]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <CountContext.Provider value={value}>
        <FastHeader />
        <SlowList items={items} />
      </CountContext.Provider>
    </DispatchContext.Provider>
  );
}

const FastHeader = memo(function FastHeader() {
  const dispatch = useContext(DispatchContext);
  return <button onClick={dispatch}>Tick</button>;
});
```

## Walkthrough

SlowList memoized with stable items; tick isolated in context consumed only where needed.

## Common mistakes

- Memo parent but pass inline objects
- Context with {state, setState} single object

## Stretch goals

- useSyncExternalStore
- Virtualize list
