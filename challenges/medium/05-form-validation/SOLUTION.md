# Solution: Form Validation

## Approach

Controlled fields + validate function + touched map.

## Key concepts

- **Touched vs dirty**: Improve UX by not showing errors immediately on type.

## Code highlights

- `const [values, setValues] = useState({ username: '', email: '', password: '', confirm: '' })` — **values state** — `values` is the value the UI shows. It starts at { username: '', email: '', password: '', confirm: '' }. `setValues` updates it when the user interacts. errors recomputed each render; touched gates visibility; submit marks all touched.
- `{show(f) && <span role="alert">{errors[f]}</span>}` — **&& render** — Only renders the element when the left side is true.
- `disabled={Object.keys(errors).length > 0}` — **disabled** — Disabled when Object.keys(errors).length > 0 — UI follows state instead of manual DOM tweaks. errors recomputed each render; touched gates visibility; submit marks all touched.
- `role="alert"` — **role="alert"** — Marks an error message so screen readers treat it as urgent.
- `key={f}` — **key** — Helps React track each list row — use a stable id (f), not the array index, when items can reorder.

## Solution code

```tsx
import { useState, FormEvent } from 'react';

function validate(v: Record<string, string>) {
  const e: Record<string, string> = {};
  if (v.username.length < 3) e.username = 'Min 3 characters';
  if (!v.email.includes('@')) e.email = 'Invalid email';
  if (!/\d/.test(v.password) || v.password.length < 8) e.password = '8+ chars with number';
  if (v.password !== v.confirm) e.confirm = 'Passwords must match';
  return e;
}

export function RegisterForm() {
  const [values, setValues] = useState({ username: '', email: '', password: '', confirm: '' });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const errors = validate(values);
  const show = (f: string) => touched[f] && errors[f];

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTouched({ username: true, email: true, password: true, confirm: true });
    if (Object.keys(errors).length) return;
    alert('OK');
  };

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  return (
    <form onSubmit={onSubmit} noValidate>
      {(['username','email','password','confirm'] as const).map((f) => (
        <label key={f}>
          {f}
          <input value={values[f]} onChange={set(f)} onBlur={() => setTouched((t) => ({ ...t, [f]: true }))} />
          {show(f) && <span role="alert">{errors[f]}</span>}
        </label>
      ))}
      <button type="submit" disabled={Object.keys(errors).length > 0}>Register</button>
    </form>
  );
}
```

## Walkthrough

errors recomputed each render; touched gates visibility; submit marks all touched.

## Common mistakes

- Validating only on submit
- Storing errors in state redundantly

## Stretch goals

- react-hook-form
- Zod schema
