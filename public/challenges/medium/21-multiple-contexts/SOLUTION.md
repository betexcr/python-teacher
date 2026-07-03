# Solution: Multiple Contexts

## Approach

Separate contexts for orthogonal concerns.

## Key concepts

- **Provider composition**: Nest providers; each concern isolated.

## Code highlights

- `onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}` — **click handler** — Updates state (). Independent state in AppProviders; children subscribe only to contexts they use.
- `const [theme, setTheme] = useState<'light' | 'dark'>('light')` — **theme state** — `theme` is the value the UI shows. It starts at 'light'. `setTheme` updates it when the user interacts. Independent state in AppProviders; children subscribe only to contexts they use.
- `onClick={() => setLocale((l) => (l === 'en' ? 'es' : 'en'))}` — **click handler** — Updates state (). Independent state in AppProviders; children subscribe only to contexts they use.
- `const [locale, setLocale] = useState<'en' | 'es'>('en')` — **locale state** — `locale` is the value the UI shows. It starts at 'en'. `setLocale` updates it when the user interacts. Independent state in AppProviders; children subscribe only to contexts they use.
- `const LocaleContext = createContext<'en' | 'es'>('en');` — **createContext** — Shares data with any child below without passing props on every level.

## Solution code

```tsx
const LocaleContext = createContext<'en' | 'es'>('en');
const ThemeContext = createContext<'light' | 'dark'>('light');

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<'en' | 'es'>('en');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  return (
    <ThemeContext.Provider value={theme}>
      <LocaleContext.Provider value={locale}>
        {children}
        <button onClick={() => setLocale((l) => (l === 'en' ? 'es' : 'en'))}>Lang</button>
        <button onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}>Theme</button>
      </LocaleContext.Provider>
    </ThemeContext.Provider>
  );
}
```

## Walkthrough

Independent state in AppProviders; children subscribe only to contexts they use.

## Common mistakes

- One mega context object causing all consumers to rerender
- Wrong provider order when dependencies exist

## Stretch goals

- Context selector
- i18n library integration
