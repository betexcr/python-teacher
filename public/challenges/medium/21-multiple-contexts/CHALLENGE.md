# Multiple Contexts

**Difficulty:** medium  
**Topics:** Context

## Learning goals

- Compose multiple providers
- Avoid unnecessary coupling

## Challenge

App uses ThemeContext and LocaleContext (en/es). Components may consume one or both. Order providers correctly.

## Requirements

1. Nested providers
2. Hooks useTheme + useLocale
3. Changing locale does not reset theme

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/medium/21-multiple-contexts/`. Reference write-ups in this repo live under `challenges/medium/21-multiple-contexts/` (not loaded by the app).

```tsx
export function AppProviders({ children }) { ... }
```

## Hints

1. Combine in AppProviders component
2. Memoize context values separately

## Acceptance criteria

- [ ] **Both contexts work**
  Use theme context and user context (or the pair in your spec) in the same tree and confirm each provides the right values. Multiple providers can nest without conflict.

- [ ] **Independent updates**
  Change only theme and confirm user context consumers do not get unrelated updates, and vice versa. Separate contexts keep concerns isolated.

## Resources

- [Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context)
- [Scaling up with reducer and context](https://react.dev/learn/scaling-up-with-reducer-and-context)
- [useContext – Reference](https://react.dev/reference/react/useContext)
