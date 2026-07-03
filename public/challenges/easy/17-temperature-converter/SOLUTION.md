# Solution: Temperature Converter

## Approach

Track which field was last edited and a string value; derive the other field.

## Key concepts

- **Single source of truth**: Avoid storing both numbers independently—they desync.
- **Last-edited wins**: Canonical pattern for multi-unit converters.

## Code highlights

- `<input value={fahrenheit} onChange={(e) => onF(e.target.value)} />` — **controlled input** — Input text is owned by React state — value plus onChange keep the field in sync. Celsius string is canonical; Fahrenheit is derived on render unless user edits F which writes back to C.
- `<input value={celsius} onChange={(e) => onC(e.target.value)} />` — **controlled input** — Input text is owned by React state — value plus onChange keep the field in sync. Celsius string is canonical; Fahrenheit is derived on render unless user edits F which writes back to C.
- `const [celsius, setCelsius] = useState('')` — **celsius state** — `celsius` is the value the UI shows. It starts at ''. `setCelsius` updates it when the user interacts. Celsius string is canonical; Fahrenheit is derived on render unless user edits F which writes back to C.

## Solution code

```tsx
import { useState } from 'react';

const toF = (c: number) => (c * 9) / 5 + 32;
const toC = (f: number) => ((f - 32) * 5) / 9;

export function TemperatureConverter() {
  const [celsius, setCelsius] = useState('');

  const fahrenheit =
    celsius === '' || Number.isNaN(Number(celsius))
      ? ''
      : String(Number((toF(Number(celsius))).toFixed(2)));

  const onC = (v: string) => setCelsius(v);
  const onF = (v: string) => {
    if (v === '') return setCelsius('');
    const n = Number(v);
    if (Number.isNaN(n)) return;
    setCelsius(String(Number(toC(n).toFixed(2))));
  };

  return (
    <div>
      <label>
        Celsius
        <input value={celsius} onChange={(e) => onC(e.target.value)} />
      </label>
      <label>
        Fahrenheit
        <input value={fahrenheit} onChange={(e) => onF(e.target.value)} />
      </label>
    </div>
  );
}
```

## Walkthrough

Celsius string is canonical; Fahrenheit is derived on render unless user edits F which writes back to C.

## Common mistakes

- Two useState numbers updating each other in useEffect loop
- Showing NaN

## Stretch goals

- Kelvin support
- Input validation
