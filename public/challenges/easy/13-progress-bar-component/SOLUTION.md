# Solution: Progress Bar Component

## Approach

Compute percentage; apply style width; ARIA reflects numbers.

## Key concepts

- **ARIA progressbar**: Screen readers announce value and bounds.
- **Clamping**: Math.min(max, Math.max(0, value)) avoids overflow UI.

## Code highlights

- `{label && <span id="pb-label">{label}</span>}` — **&& render** — Only renders the element when the left side is true.

## Solution code

```tsx
type ProgressBarProps = {
  value: number | null;
  max?: number;
  label?: string;
};

export function ProgressBar({ value, max = 100, label }: ProgressBarProps) {
  const indeterminate = value === null;
  const clamped = value === null ? 0 : Math.min(max, Math.max(0, value));
  const percent = indeterminate ? 0 : (clamped / max) * 100;

  return (
    <div>
      {label && <span id="pb-label">{label}</span>}
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={indeterminate ? undefined : clamped}
        aria-labelledby={label ? 'pb-label' : undefined}
        className={indeterminate ? 'progress indeterminate' : 'progress'}
      >
        <div className="bar" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
```

## Walkthrough

Null value toggles indeterminate class for CSS keyframes; otherwise width reflects percent.

## Common mistakes

- Missing aria-valuenow
- Not clamping >100%

## Stretch goals

- Stripe animation
- Controlled upload demo
