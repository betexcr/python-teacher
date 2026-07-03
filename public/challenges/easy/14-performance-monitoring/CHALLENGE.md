# Performance Monitoring

**Difficulty:** easy  
**Topics:** Profiler API, useEffect

## Learning goals

- Measure render cost
- Log slow renders in dev

## Challenge

Wrap a heavy child tree with React `<Profiler>` and log phases where duration exceeds a threshold (e.g. 16ms). Display last commit time in UI.

## Requirements

1. onRender callback
2. Track last duration in state
3. Only log in development

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/easy/14-performance-monitoring/`. Reference write-ups in this repo live under `challenges/easy/14-performance-monitoring/` (not loaded by the app).

```tsx
<Profiler id="Heavy" onRender={onRender}>...</Profiler>
```

## Hints

1. onRender(id, phase, actualDuration, ...)
2. phase is mount or update

## Acceptance criteria

- [ ] **Profiler wired**
  Wrap the slow part of your tree in React Profiler with an onRender callback. When the child renders, your callback should run so you can measure render time.

- [ ] **Threshold logging**
  When a render takes longer than your threshold (for example 16ms), log a warning to the console. This mimics how teams spot slow components in development.

- [ ] **UI shows metric**
  Show the last render duration (or similar) on screen so you can see it change when you trigger a slow update. Visible metrics make profiling easier than console-only logs.

## Resources

- [Profiler – Reference](https://react.dev/reference/react/Profiler)
- [useEffect – Reference](https://react.dev/reference/react/useEffect)
- [React Performance tools](https://react.dev/learn/react-developer-tools)
