# useAsync Hook

**Difficulty:** medium  
**Topics:** custom hooks, async

## Learning goals

- Normalize async state machine
- Handle race conditions

## Challenge

Implement `useAsync(asyncFn, deps)` returning `{ status, data, error, execute, reset }`.

## Requirements

1. Statuses: idle | pending | success | error
2. Ignore stale responses
3. execute() triggers fetch

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/medium/09-use-async-hook/`. Reference write-ups in this repo live under `challenges/medium/09-use-async-hook/` (not loaded by the app).

```tsx
export function useAsync<T>(fn: () => Promise<T>, deps: unknown[]) {}
```

## Hints

1. Increment requestId ref on each execute
2. Compare before setState

## Acceptance criteria

- [ ] **Race safe**
  Trigger two requests in a row quickly (change id or search fast) and confirm only the latest result is shown, not an older slow response. Ignore or abort stale responses inside the hook.

- [ ] **Reset clears**
  Call reset on the hook and confirm data, error, and loading return to idle initial state. Reset lets parents clear async state when closing a modal or form.

- [ ] **Deps change refetches optional**
  If your hook accepts dependencies, change them and confirm a new fetch runs; if deps are omitted, document that behavior. Optional refetch on dep change matches useEffect mental model.

## Resources

- [Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [Fetching data with Effects](https://react.dev/learn/synchronizing-with-effects#fetching-data)
- [useEffect – Reference](https://react.dev/reference/react/useEffect)
