# Build a Reusable Button Component

**Difficulty:** medium  
**Topics:** components, polymorphism

## Learning goals

- Variants and loading state
- Polymorphic `as` prop optional

## Challenge

Button supports variants primary/ghost/danger, sizes sm/md/lg, loading spinner disabling interaction, and icon slots.

## Requirements

1. aria-busy when loading
2. disabled when loading
3. Variant styles via data attributes or classes

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/medium/23-reusable-button-component/`. Reference write-ups in this repo live under `challenges/medium/23-reusable-button-component/` (not loaded by the app).

```tsx
type ButtonProps = { variant?: 'primary' | 'ghost'; loading?: boolean };
```

## Hints

1. className joins variant classes
2. Spinner with aria-hidden

## Acceptance criteria

- [ ] **Loading prevents double submit**
  Click submit while loading is true and confirm only one action fires (button disabled or ignore clicks). Prevents duplicate orders or duplicate API posts.

- [ ] **Variants distinct**
  Render primary, secondary, and danger (or your variants) side by side and confirm each looks clearly different. Variants should be prop-driven, not copy-pasted styles.

## Resources

- [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)
- [TypeScript: typing components](https://react.dev/learn/typescript#typing-component-props)
- [Accessibility in React](https://react.dev/learn/accessibility)
