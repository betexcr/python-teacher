# Solution: Theme Toggle

## Approach

Switch is a button with switch role; state drives aria-checked and CSS.

## Key concepts

- **role="switch"**: Communicates binary on/off to assistive tech.
- **aria-checked**: Required mirror of toggle state.

## Code highlights

- `const [dark, setDark] = useState(false)` — **dark state** — `dark` is the value the UI shows. It starts at false. `setDark` updates it when the user interacts. Button acts as switch; aria-checked updates; CSS class drives track/thumb.
- `onClick={() => setDark((d) => !d)}` — **click handler** — Updates state (). Button acts as switch; aria-checked updates; CSS class drives track/thumb.

## Solution code

```tsx
import { useState } from 'react';

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Dark mode"
      className={dark ? 'switch on' : 'switch'}
      onClick={() => setDark((d) => !d)}
    >
      <span aria-hidden>{dark ? '🌙' : '☀️'}</span>
    </button>
  );
}
```

## Walkthrough

Button acts as switch; aria-checked updates; CSS class drives track/thumb.

## Common mistakes

- Using checkbox without label
- Missing aria-checked

## Stretch goals

- Connect to useTheme hook
- Motion-reduced styles
