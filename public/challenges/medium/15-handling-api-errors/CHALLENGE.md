# Handling API Errors

**Difficulty:** medium  
**Topics:** fetch, errors

## Learning goals

- Map HTTP status to user messages
- Retry transient failures

## Challenge

Data hook that distinguishes 404 vs 500 vs network error. UI shows message and Retry for 5xx.

## Requirements

1. Typed error object
2. Max 3 retries with backoff
3. 404 shows not found UI

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/medium/15-handling-api-errors/`. Reference write-ups in this repo live under `challenges/medium/15-handling-api-errors/` (not loaded by the app).

```tsx
class ApiError extends Error { status: number }
```

## Hints

1. if (!res.ok) throw new ApiError(res.status)
2. exponential backoff setTimeout

## Acceptance criteria

- [ ] **Statuses mapped**
  Simulate 404, 500, and network failure and confirm the user sees different, helpful messages (not one generic string). Mapping status codes guides users on what to do next.

- [ ] **Retry limited**
  Use retry and confirm it stops after a max count or shows that limit is reached. Unlimited retries can hammer a failing API and confuse users.

## Resources

- [Fetching data with Effects](https://react.dev/learn/synchronizing-with-effects#fetching-data)
- [Conditional rendering](https://react.dev/learn/conditional-rendering)
- [useEffect – Reference](https://react.dev/reference/react/useEffect)
