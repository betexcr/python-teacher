# useInterval Hook

**Difficulty:** easy  
**Topics:** useEffect, useRef, custom hooks

## Learning goals

- Encapsulate setInterval logic
- Keep callback fresh without resetting interval unnecessarily

## Challenge

Implement `useInterval(callback, delayMs | null)`. When delay is null, pause. Use it to flip a boolean every second.

## Requirements

1. Pauses when delay is null
2. Clears interval on unmount
3. Callback may change without leaking stale closures (use ref pattern)

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/easy/08-use-interval-hook/`. Reference write-ups in this repo live under `challenges/easy/08-use-interval-hook/` (not loaded by the app).

```tsx
export function useInterval(cb: () => void, delay: number | null) {}
```

## Hints

1. Store latest callback in ref updated each render
2. Effect depends on delay only

## Acceptance criteria

- [ ] **Ticks regularly**
  Start the timer or counter and confirm it updates on a steady schedule (for example every second). The interval callback should fire repeatedly while running.

- [ ] **Pause works**
  Pause the timer and confirm the value stops changing until you resume. Pause should clear or stop the interval without resetting the count unless you ask for that.

- [ ] **No memory leaks**
  Start and stop the timer several times, then leave the page or unmount the component. Open the browser console and confirm there are no errors about updating unmounted components. Cleanup in useEffect prevents leaked intervals.

## Resources

- [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
- [Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [useEffect – Reference](https://react.dev/reference/react/useEffect)
