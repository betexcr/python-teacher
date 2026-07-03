# Solution: Focus an Input with useRef

## Approach

Refs bridge to DOM for focus—a side effect friendly operation.

## Key concepts

- **useRef (DOM)**: React sets .current to the host node when mounted.
- **Imperative focus**: Necessary for accessibility shortcuts and wizard flows.

## Code highlights

- `useEffect(() => {
    emailRef.current?.focus();
  }, [])` — **useEffect** — Runs after render to After mount, effect focuses email..
- `const passwordRef = useRef<HTMLInputElement>(null)` — **ref passwordRef** — `passwordRef` keeps a mutable value across renders without triggering re-renders when .current changes. After mount, effect focuses email. Buttons call focus on demand without re-render.
- `const emailRef = useRef<HTMLInputElement>(null)` — **ref emailRef** — `emailRef` keeps a mutable value across renders without triggering re-renders when .current changes. After mount, effect focuses email. Buttons call focus on demand without re-render.
- `onClick={() => passwordRef.current?.focus()}` — **onClick** — Runs when the user clicks this button. Buttons call focus on demand without re-render.
- `onClick={() => emailRef.current?.focus()}` — **onClick** — Runs when the user clicks this button. Buttons call focus on demand without re-render.

## Solution code

```tsx
import { useEffect, useRef } from 'react';

export function LoginFocus() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  return (
    <form>
      <input ref={emailRef} type="email" placeholder="Email" />
      <input ref={passwordRef} type="password" placeholder="Password" />
      <button type="button" onClick={() => emailRef.current?.focus()}>
        Forgot password?
      </button>
      <button type="button" onClick={() => passwordRef.current?.focus()}>
        Go to password
      </button>
    </form>
  );
}
```

## Walkthrough

After mount, effect focuses email. Buttons call focus on demand without re-render.

## Common mistakes

- document.querySelector instead of ref
- Focusing before input mounted

## Stretch goals

- Focus trap in modal
- autoFocus prop comparison
