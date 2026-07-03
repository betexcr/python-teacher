# Progress Bar Component

**Difficulty:** easy  
**Topics:** props, a11y

## Learning goals

- Build accessible progress UI
- Clamp values 0–100

## Challenge

Reusable `ProgressBar` with `value`, `max`, optional `label`. Animate width changes. Support indeterminate mode (loading unknown duration).

## Requirements

1. role="progressbar" with aria-valuenow/min/max
2. Clamp value between 0 and max
3. Indeterminate CSS animation when value is null

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/easy/13-progress-bar-component/`. Reference write-ups in this repo live under `challenges/easy/13-progress-bar-component/` (not loaded by the app).

```tsx
type ProgressBarProps = { value: number | null; max?: number; label?: string };
```

## Hints

1. percent = (value / max) * 100
2. aria-busy for indeterminate

## Acceptance criteria

- [ ] **Determinate and indeterminate modes**
  With a percent prop, the bar should fill to match (for example 50% half full). In indeterminate mode, show a moving or pulsing animation when progress is unknown. Both modes should look distinct.

- [ ] **Accessible**
  Inspect the bar in devtools or a screen reader and confirm role="progressbar", aria-valuenow (when determinate), and aria-valuemin/max or aria-busy (when indeterminate) are set. Assistive tech needs these to describe progress.

## Resources

- [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)
- [ARIA: progressbar role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/progressbar_role)
- [Conditional rendering](https://react.dev/learn/conditional-rendering)
