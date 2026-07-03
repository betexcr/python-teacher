# Share State with Context

**Difficulty:** medium  
**Topics:** Context, lifting state

## Learning goals

- Avoid prop drilling for auth-like state
- Split read/write contexts optional

## Challenge

Auth context: user, login, logout. Navbar shows user; Profile page edits name—all without drilling props.

## Requirements

1. AuthProvider at app root
2. useAuth hook
3. login sets mock user

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/medium/18-share-state-with-context/`. Reference write-ups in this repo live under `challenges/medium/18-share-state-with-context/` (not loaded by the app).

```tsx
type User = { id: string; name: string } | null;
```

## Hints

1. Separate AuthDispatch context to limit rerenders (advanced)

## Acceptance criteria

- [ ] **Any depth reads user**
  Log in or set a user in context and confirm a deeply nested component shows the same name without props through every layer. Context shares auth-like data globally.

- [ ] **Logout clears**
  Logout should set user to null and hide protected UI everywhere at once. All consumers must see the cleared user on the next render.

## Resources

- [Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context)
- [Sharing State Between Components](https://react.dev/learn/sharing-state-between-components)
- [useContext – Reference](https://react.dev/reference/react/useContext)
