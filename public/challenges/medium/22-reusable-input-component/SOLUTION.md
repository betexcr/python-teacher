# Solution: Build a Reusable Input Component

## Approach

forwardRef + useId for associations.

## Key concepts

- **forwardRef**: Lets parents imperatively access DOM node.

## Code highlights

- `{error && <span id={errId} role="alert">{error}</span>}` — **&& render** — Only renders the element when the left side is true.
- `{hint && <span id={hintId}>{hint}</span>}` — **&& render** — Only renders the element when the left side is true.
- `role="alert"` — **role="alert"** — Marks an error message so screen readers treat it as urgent.
- `forwardRef` — **forwardRef** — Lets parents imperatively access DOM node.

## Solution code

```tsx
import { forwardRef, useId } from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, ...rest }, ref) => {
    const id = useId();
    const hintId = hint ? `${id}-hint` : undefined;
    const errId = error ? `${id}-error` : undefined;
    return (
      <div>
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={[hintId, errId].filter(Boolean).join(' ') || undefined}
          {...rest}
        />
        {hint && <span id={hintId}>{hint}</span>}
        {error && <span id={errId} role="alert">{error}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';
```

## Walkthrough

useId links label, hint, error for screen readers.

## Common mistakes

- Spreading props before explicit ones incorrectly
- Missing displayName

## Stretch goals

- Variants with cva
- Password toggle
