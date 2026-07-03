# Solution: Controlled Input Field

## Approach

Single state object or separate useState per field; validation computed during render.

## Key concepts

- **Controlled component**: React state is the single source of truth for the input value.
- **Derived validation**: const emailError = !email.includes("@") && email.length > 0

## Code highlights

- `<input value={email} onChange={(e) => setEmail(e.target.value)} />` — **controlled input** — Input text is owned by React state — value plus onChange keep the field in sync. React state is the single source of truth for the input value.
- `<textarea value={bio} onChange={(e) => setBio(e.target.value)} />` — **controlled input** — Input text is owned by React state — value plus onChange keep the field in sync. React state is the single source of truth for the input value.
- `<input value={name} onChange={(e) => setName(e.target.value)} />` — **controlled input** — Input text is owned by React state — value plus onChange keep the field in sync. React state is the single source of truth for the input value.
- `{emailError && <span role="alert">Invalid email</span>}` — **&& render** — Only renders the element when the left side is true.
- `const [email, setEmail] = useState('')` — **email state** — `email` is the value the UI shows. It starts at ''. `setEmail` updates it when the user interacts. Every keystroke flows through onChange into state, then back to value. Preview reads the same state.
- `const [name, setName] = useState('')` — **name state** — `name` is the value the UI shows. It starts at ''. `setName` updates it when the user interacts. Every keystroke flows through onChange into state, then back to value. Preview reads the same state.
- `const [bio, setBio] = useState('')` — **bio state** — `bio` is the value the UI shows. It starts at ''. `setBio` updates it when the user interacts. Every keystroke flows through onChange into state, then back to value. Preview reads the same state.
- `role="alert"` — **role="alert"** — Marks an error message so screen readers treat it as urgent.

## Solution code

```tsx
import { useState, FormEvent } from 'react';

export function ProfileForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');

  const emailError = email.length > 0 && !email.includes('@');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log({ name, email, bio });
  };

  return (
    <div className="layout">
      <form onSubmit={onSubmit}>
        <label>
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          {emailError && <span role="alert">Invalid email</span>}
        </label>
        <label>
          Bio
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
        </label>
        <button type="submit">Save</button>
      </form>
      <aside>
        <h3>{name || 'Anonymous'}</h3>
        <p>{email}</p>
        <p>{bio}</p>
      </aside>
    </div>
  );
}
```

## Walkthrough

Every keystroke flows through onChange into state, then back to value. Preview reads the same state.

## Common mistakes

- Forgetting value makes input uncontrolled
- Mixing defaultValue with value

## Stretch goals

- useReducer for form state
- Zod validation
