# Fetching Data

**Difficulty:** easy  
**Topics:** useEffect, fetch, loading states

## Learning goals

- Fetch on mount
- Model loading / error / success UI

## Challenge

Fetch a list of users from `https://jsonplaceholder.typicode.com/users` (or mock). Show loading spinner, error message, and a list on success.

## Requirements

1. useEffect with cleanup (AbortController)
2. Three UI states: loading, error, data
3. Refetch button

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/easy/06-fetching-data/`. Reference write-ups in this repo live under `challenges/easy/06-fetching-data/` (not loaded by the app).

```tsx
export function UserList() {
  // loading, error, users
  useEffect(() => { /* fetch */ }, []);
}
```

## Hints

1. Abort fetch in cleanup to avoid setState on unmounted component
2. Empty dependency array = run once on mount

## Acceptance criteria

- [ ] **Loading shows first**
  When data is being fetched, you should see a loading message or spinner before results appear. That tells users the app is working, not broken.

- [ ] **Errors readable**
  Trigger a failed request (wrong URL or offline) and confirm a clear error message appears instead of a blank screen. Beginners should understand what went wrong without opening the console.

- [ ] **Refetch works**
  Use the retry or refetch control and confirm loading shows again, then new data or a new error appears. Refetch proves your effect or handler can run more than once safely.

## Resources

- [Fetching data with Effects](https://react.dev/learn/synchronizing-with-effects#fetching-data)
- [useEffect – Reference](https://react.dev/reference/react/useEffect)
- [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
