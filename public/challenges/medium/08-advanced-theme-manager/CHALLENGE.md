# Advanced Theme Manager

**Difficulty:** medium  
**Topics:** themes, CSS variables

## Learning goals

- Multiple theme presets
- Preview before apply

## Challenge

Theme gallery with presets (ocean, forest, midnight). Preview pane shows components; Apply commits to document.

## Requirements

1. Draft vs applied theme
2. CSS variables per preset
3. Reset to system default

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/medium/08-advanced-theme-manager/`. Reference write-ups in this repo live under `challenges/medium/08-advanced-theme-manager/` (not loaded by the app).

```tsx
const presets = { ocean: { '--bg': '#0af' }, ... };
```

## Hints

1. Draft state in component; Apply copies to context/document
2. matchMedia for system

## Acceptance criteria

- [ ] **Preview differs from applied until Apply**
  Adjust colors or tokens in the editor and confirm the live preview updates, but the rest of the app keeps the old theme until you click Apply. Draft vs applied theme prevents accidental global changes.

- [ ] **Reset works**
  Change several settings, click Reset, and confirm preview and applied theme return to defaults. Reset should restore known baseline values in state.

## Resources

- [CSS custom properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [useState – Reference](https://react.dev/reference/react/useState)
- [Updating Objects in State](https://react.dev/learn/updating-objects-in-state)
