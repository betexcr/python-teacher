# Solution: Fallback UI (Error Boundaries)

## Approach

Use react-error-boundary so your boundary and fallback stay function components; log in onError and reset with resetErrorBoundary.

## Key concepts

- **Error boundary**: Catches child render errors—not event handlers or async.

## Code highlights

- `const [resetKey, setResetKey] = useState(0)` — **resetKey state** — `resetKey` is the value the UI shows. It starts at 0. `setResetKey` updates it when the user interacts. ErrorBoundary from react-error-boundary catches the throw; Fallback calls resetErrorBoundary; onReset bumps resetKey to remount Buggy.
- `onClick={resetErrorBoundary}` — **click handler** — Updates state (resetErrorBoundary). ErrorBoundary from react-error-boundary catches the throw; Fallback calls resetErrorBoundary; onReset bumps resetKey to remount Buggy.
- `key={resetKey}` — **key** — Helps React track each list row — use a stable id (resetKey), not the array index, when items can reorder.
- `role="alert"` — **role="alert"** — Marks an error message so screen readers treat it as urgent.

## Solution code

```tsx
import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

function Fallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div role="alert">
      <p>Something went wrong.</p>
      <button type="button" onClick={resetErrorBoundary}>
        Try again
      </button>
    </div>
  );
}

function Buggy() {
  throw new Error('boom');
}

export function Demo() {
  const [resetKey, setResetKey] = useState(0);

  return (
    <ErrorBoundary
      FallbackComponent={Fallback}
      onError={(error, info) => console.error(error, info.componentStack)}
      onReset={() => setResetKey((k) => k + 1)}
      resetKeys={[resetKey]}
    >
      <Buggy key={resetKey} />
    </ErrorBoundary>
  );
}
```

## Walkthrough

ErrorBoundary from react-error-boundary catches the throw; Fallback calls resetErrorBoundary; onReset bumps resetKey to remount Buggy.

## Common mistakes

- Expecting try/catch around JSX to catch render errors
- Expecting the boundary to catch event handler or async errors

## Stretch goals

- Report to Sentry in onError
- Different fallbacks per route
