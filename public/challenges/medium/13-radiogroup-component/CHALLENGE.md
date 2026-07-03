# RadioGroup Component

**Difficulty:** medium  
**Topics:** a11y, composition

## Learning goals

- Build accessible radio group
- Manage roving focus optional

## Challenge

Controlled RadioGroup with options `{ value, label, disabled }`. Only one selected. Arrow keys move selection.

## Requirements

1. role="radiogroup"
2. Each option role="radio" aria-checked
3. Controlled value from parent

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/medium/13-radiogroup-component/`. Reference write-ups in this repo live under `challenges/medium/13-radiogroup-component/` (not loaded by the app).

```tsx
type Option = { value: string; label: string; disabled?: boolean };
```

## Hints

1. onKeyDown ArrowUp/Down changes value
2. Click sets value

## Acceptance criteria

- [ ] **Keyboard navigation**
  Tab into the group and move selection with arrow keys per the radio pattern. Focus should move between options and update the selected value.

- [ ] **ARIA correct**
  Confirm role="radiogroup", each option has role="radio", and aria-checked reflects selection. Screen readers should announce the group label and which option is selected.

## Resources

- [Accessibility in React](https://react.dev/learn/accessibility)
- [ARIA: radio group pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/)
- [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)
