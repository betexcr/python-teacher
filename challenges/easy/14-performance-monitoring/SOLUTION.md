# Solution: Performance Monitoring

## Approach

Profiler reports actualDuration; parent stores metrics for display.

## Key concepts

- **Profiler**: Measures subtree render/commit time; works in production with overhead—DevTools Profiler is the main workflow in dev.
- **actualDuration**: Time spent rendering the committed update.

## Code highlights

- `const [last, setLast] = useState(0)` — **last state** — `last` is the value the UI shows. It starts at 0. `setLast` updates it when the user interacts. Profiler wraps expensive subtree; callback receives timing after commit.
- `Profiler` — **Profiler** — Measures subtree render/commit time; works in production with overhead—DevTools Profiler is the main workflow in dev.

## Solution code

```tsx
import { Profiler, ProfilerOnRenderCallback, useState } from 'react';

const onRender: ProfilerOnRenderCallback = (id, phase, actualDuration) => {
  if (import.meta.env.DEV && actualDuration > 16) {
    console.warn(`[${id}] ${phase} took ${actualDuration.toFixed(1)}ms`);
  }
};

export function PerfMonitor({ children }: { children: React.ReactNode }) {
  const [last, setLast] = useState(0);

  const handleRender: ProfilerOnRenderCallback = (...args) => {
    onRender(...args);
    setLast(args[2]);
  };

  return (
    <div>
      <p>Last render: {last.toFixed(1)} ms</p>
      <Profiler id="App" onRender={handleRender}>
        {children}
      </Profiler>
    </div>
  );
}
```

## Walkthrough

Profiler wraps expensive subtree; callback receives timing after commit.

## Common mistakes

- Profiling production expecting numbers
- Confusing actual vs base duration

## Stretch goals

- Integrate web-vitals LCP
- Why did you render library
