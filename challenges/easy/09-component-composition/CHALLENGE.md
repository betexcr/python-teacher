# Component Composition

**Difficulty:** easy  
**Topics:** children, composition

## Learning goals

- Use children and slots pattern
- Avoid prop drilling for layout

## Challenge

Build a `Card` with `Card.Header`, `Card.Body`, and `Card.Footer` using composition (compound components or named exports). Consume it to show an article preview.

## Requirements

1. Flexible layout via children
2. Card applies shared border/padding
3. Subcomponents optional

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/easy/09-component-composition/`. Reference write-ups in this repo live under `challenges/easy/09-component-composition/` (not loaded by the app).

```tsx
export function Card({ children }: { children: React.ReactNode }) {}
```

## Hints

1. Attach static properties: Card.Header = function Header...
2. Or pass slots: header={<.../>}

## Acceptance criteria

- [ ] **Composable API**
  Build small pieces (like Card, Card.Header, Card.Body) that fit together in JSX the way the challenge describes. Parents should pass children or slots instead of one giant component with dozens of props.

- [ ] **Article example renders**
  Render the sample article layout from the challenge and confirm title, body, and optional footer all show in the right places. If the example looks right, your composition pattern works.

## Resources

- [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)
- [Passing JSX as children](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children)
- [Your UI as a tree](https://react.dev/learn/understanding-your-ui-as-a-tree)
