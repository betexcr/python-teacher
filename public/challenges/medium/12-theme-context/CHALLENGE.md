# Theme Context

**Difficulty:** medium  
**Topics:** Context API

## Learning goals

- Provide theme via context
- Consume with custom hook

## Challenge

Create ThemeProvider, useTheme hook, and themed Button/Text children without prop drilling.

## Requirements

1. Context default safe
2. Provider holds theme + toggle
3. useTheme throws outside provider (optional)

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/medium/12-theme-context/`. Reference write-ups in this repo live under `challenges/medium/12-theme-context/` (not loaded by the app).

```tsx
const ThemeContext = createContext(null);
```

## Hints

1. useMemo value object to avoid rerenders
2. export function useTheme() { const ctx = useContext...}

## Acceptance criteria

- [ ] **Deep tree consumes theme**
  Place theme provider high and read theme from a deeply nested component without prop drilling. Changing theme there should not require passing props through every level.

- [ ] **Toggle updates all**
  Toggle theme from a child button and confirm every consumer in the tree re-renders with the new colors or class. Context broadcasts one value to all subscribers.

## Resources

- [Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context)
- [useContext – Reference](https://react.dev/reference/react/useContext)
- [createContext – Reference](https://react.dev/reference/react/createContext)
