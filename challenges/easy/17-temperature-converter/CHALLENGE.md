# Temperature Converter

**Difficulty:** easy  
**Topics:** controlled inputs, derived state

## Learning goals

- Keep single source of truth
- Convert C ↔ F bidirectionally

## Challenge

Two linked inputs: Celsius and Fahrenheit. Editing one updates the other using conversion formulas. Handle empty input gracefully.

## Requirements

1. F = C * 9/5 + 32
2. Editing C updates F and vice versa
3. Allow temporary empty field without NaN display

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/easy/17-temperature-converter/`. Reference write-ups in this repo live under `challenges/easy/17-temperature-converter/` (not loaded by the app).

```tsx
// Pick one canonical unit or track "last edited" field
```

## Hints

1. Store { value: string, unit: "C" | "F" } for last edited field
2. Or store celsius number | null and derive fahrenheit

## Acceptance criteria

- [ ] **Bidirectional sync**
  Type Celsius and confirm Fahrenheit updates, then type Fahrenheit and confirm Celsius updates. Only one field should be the "source" per edit so both stay mathematically consistent.

- [ ] **No infinite loops**
  Edit either field quickly and confirm the app does not freeze or flicker from endless updates. Guard conversions so updating one field does not immediately re-trigger the same change in a loop.

- [ ] **Empty allowed**
  Clear one input and confirm the other can show empty or placeholder instead of NaN or 0 forced incorrectly. Empty is valid while the user is still typing.

## Resources

- [Derived state (when to calculate during render)](https://react.dev/learn/you-might-not-need-an-effect#updating-state-based-on-props-or-state)
- [Controlled inputs](https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable)
- [Sharing State Between Components](https://react.dev/learn/sharing-state-between-components)
