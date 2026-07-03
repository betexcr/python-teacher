# Solution: Theme Context

## Approach

Context shares { theme, setTheme }; consumers read via hook.

## Key concepts

- **Context**: Broadcasts value to subtree without intermediate props.

## Code highlights

- `const ThemeContext = createContext<Ctx | null>(null);` — **createContext** — Shares data with any child below without passing props on every level. Broadcasts value to subtree without intermediate props.
- `const [theme, setTheme] = useState<Theme>('light')` — **theme state** — `theme` is the value the UI shows. It starts at 'light'. `setTheme` updates it when the user interacts. Provider memoizes value; hook enforces correct usage.
- `onClick={toggle}` — **onClick** — Runs when the user clicks this button. Provider memoizes value; hook enforces correct usage.

## Solution code

```tsx
import { createContext, useContext, useMemo, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';
type Ctx = { theme: Theme; toggle: () => void };

const ThemeContext = createContext<Ctx | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const value = useMemo(
    () => ({ theme, toggle: () => setTheme((t) => (t === 'light' ? 'dark' : 'light')) }),
    [theme]
  );
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme outside ThemeProvider');
  return ctx;
}

export function ThemedButton() {
  const { theme, toggle } = useTheme();
  return <button data-theme={theme} onClick={toggle}>Toggle ({theme})</button>;
}
```

## Walkthrough

Provider memoizes value; hook enforces correct usage.

## Common mistakes

- New object in Provider value each render
- Overusing context for frequently changing data

## Stretch goals

- Split contexts: theme vs dispatch
- useContextSelector
