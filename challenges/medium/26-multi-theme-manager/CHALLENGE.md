# Multi-Theme Manager

**Difficulty:** medium  
**Topics:** Context, CSS

## Learning goals

- Combine system + custom themes
- Sync across tabs

## Challenge

Theme manager: light, dark, system, plus custom user theme from color pickers. Listen to storage events for multi-tab sync.

## Requirements

1. system uses matchMedia
2. custom theme saved to localStorage
3. storage event updates other tabs

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/medium/26-multi-theme-manager/`. Reference write-ups in this repo live under `challenges/medium/26-multi-theme-manager/` (not loaded by the app).

```tsx
type ThemeMode = 'light' | 'dark' | 'system' | 'custom';
```

## Hints

1. window.addEventListener("storage", ...)
2. resolved = system === dark ? dark : light

## Acceptance criteria

- [ ] **System tracks OS**
  Set theme to system and change OS light/dark preference; the app should follow without a manual toggle. matchMedia listens for prefers-color-scheme changes.

- [ ] **Tabs stay in sync**
  Open two tabs, change theme in one, and confirm the other updates (storage event or broadcast). Shared persistence keeps experience consistent across tabs.

## Resources

- [Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context)
- [CSS custom properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [useContext – Reference](https://react.dev/reference/react/useContext)
