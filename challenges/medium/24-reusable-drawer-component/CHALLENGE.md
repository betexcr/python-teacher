# Build a Reusable Drawer Component

**Difficulty:** medium  
**Topics:** portals, a11y

## Learning goals

- Slide-over panel with focus trap
- Close on escape and overlay click

## Challenge

Drawer opens from right; portals to document.body; traps focus; restores focus on close.

## Requirements

1. createPortal
2. role dialog aria-modal
3. Escape closes
4. Focus trap basic

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/medium/24-reusable-drawer-component/`. Reference write-ups in this repo live under `challenges/medium/24-reusable-drawer-component/` (not loaded by the app).

```tsx
import { createPortal } from 'react-dom';
```

## Hints

1. useEffect focus first element
2. return focus to trigger on close

## Acceptance criteria

- [ ] **Portal renders**
  Open the drawer and inspect the DOM; content should render under document.body via createPortal, not trapped inside a parent with overflow hidden.

- [ ] **Escape closes**
  With the drawer open, press Escape and confirm it closes and focus returns sensibly. Modal dialogs must be dismissible by keyboard.

- [ ] **Overlay click closes**
  Click the dimmed backdrop and confirm the drawer closes; clicking inside the panel should not close it. Distinguish overlay target from panel content in the handler.

## Resources

- [createPortal – Reference](https://react.dev/reference/react-dom/createPortal)
- [ARIA: dialog modal pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [Accessibility in React](https://react.dev/learn/accessibility)
