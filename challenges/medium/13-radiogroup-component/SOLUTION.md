# Solution: RadioGroup Component

## Approach

Parent owns value; RadioGroup renders radios as buttons with radio role.

## Key concepts

- **Radio group pattern**: One name, one selected value—WAI-ARIA radiogroup.

## Code highlights

- `onClick={() => onChange(o.value)}` — **onClick** — Runs when the user clicks this button. Controlled value from parent; keyboard wraps selection index.
- `disabled={o.disabled}` — **disabled** — Disabled when o.disabled — UI follows state instead of manual DOM tweaks. Controlled value from parent; keyboard wraps selection index.
- `key={o.value}` — **key** — Helps React track each list row — use a stable id (o.value), not the array index, when items can reorder.

## Solution code

```tsx
type Option = { value: string; label: string; disabled?: boolean };

export function RadioGroup({
  value,
  onChange,
  options,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  label: string;
}) {
  const onKeyDown = (e: React.KeyboardEvent) => {
    const idx = options.findIndex((o) => o.value === value);
    if (e.key === 'ArrowDown') onChange(options[(idx + 1) % options.length].value);
    if (e.key === 'ArrowUp') onChange(options[(idx - 1 + options.length) % options.length].value);
  };

  return (
    <div role="radiogroup" aria-label={label} onKeyDown={onKeyDown}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          disabled={o.disabled}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
```

## Walkthrough

Controlled value from parent; keyboard wraps selection index.

## Common mistakes

- Native radio without grouping label
- Forgetting aria-checked

## Stretch goals

- Roving tabindex
- RadioGroupContext for compound API
