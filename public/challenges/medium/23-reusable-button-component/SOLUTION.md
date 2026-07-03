# Solution: Build a Reusable Button Component

## Approach

Single component composes class names and conditional spinner.

## Key concepts

- **aria-busy**: Announces loading state to assistive tech.

## Code highlights

- `{loading && <span className="spinner" aria-hidden />}` — **&& render** — Only renders the element when the left side is true.
- `disabled={disabled || loading}` — **disabled** — Disabled when disabled || loading — UI follows state instead of manual DOM tweaks. loading sets disabled and aria-busy; variant drives CSS modifier.

## Solution code

```tsx
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'danger';
  loading?: boolean;
};

export function Button({ variant = 'primary', loading, children, disabled, ...rest }: ButtonProps) {
  return (
    <button
      className={`btn btn--${variant}`}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && <span className="spinner" aria-hidden />}
      {children}
    </button>
  );
}
```

## Walkthrough

loading sets disabled and aria-busy; variant drives CSS modifier.

## Common mistakes

- Not disabling during load
- Spinner without aria-hidden

## Stretch goals

- as="a" polymorphism
- Icon-only button labels
