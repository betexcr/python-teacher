# Simple Theme Switcher

**Difficulty:** easy  
**Topics:** useState, CSS variables

## Learning goals

- Toggle light/dark with state
- Apply theme via class or data attribute

## Challenge

App shell with theme toggle. Persist choice in localStorage. Apply `data-theme` on document root.

## Requirements

1. Two themes minimum
2. Persist to localStorage
3. Initial read avoids flash when possible

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/easy/16-simple-theme-switcher/`. Reference write-ups in this repo live under `challenges/easy/16-simple-theme-switcher/` (not loaded by the app).

```tsx
type Theme = 'light' | 'dark';
```

## Hints

1. useEffect sync document.documentElement.dataset.theme
2. Read localStorage in lazy useState initializer

## Acceptance criteria

- [ ] **Toggle works**
  Click the theme control and confirm light and dark (or similar) switch immediately on screen. State should drive which theme class or variables are active.

- [ ] **Persists across refresh**
  Pick a theme, refresh the browser, and confirm the same theme is still active. Save the choice in localStorage (or similar) so users do not lose their preference.

- [ ] **Styles change globally**
  Confirm background, text, and other tokens change across the whole page, not just one small box. Theme variables or classes on a root element should affect the entire layout.

## Resources

- [useState – Reference](https://react.dev/reference/react/useState)
- [CSS custom properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Conditional rendering](https://react.dev/learn/conditional-rendering)
