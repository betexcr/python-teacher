# Fallback UI (Error Boundaries)

**Difficulty:** medium  
**Topics:** ErrorBoundary, error handling

## Learning goals

- Catch render errors with an error boundary
- Show fallback UI with retry

## Challenge

Wrap a component that throws during render with an error boundary. Show a fallback with a retry button that resets the boundary so children can render again.

## Requirements

1. Error boundary catches render errors (use react-error-boundary or a class boundary)
2. FallbackComponent is a function component
3. Retry resets boundary state; log errors in onError

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/medium/14-fallback-ui-class-components/`. Reference write-ups in this repo live under `challenges/medium/14-fallback-ui-class-components/` (not loaded by the app).

```tsx
import { ErrorBoundary } from 'react-error-boundary';

function Fallback({ error, resetErrorBoundary }) {
  // ...
}
```

## Hints

1. npm install react-error-boundary
2. FallbackComponent receives resetErrorBoundary
3. resetKeys or key on child to remount after retry

## Acceptance criteria

- [ ] **Fallback shows on throw**
  Render a child that throws during render and confirm the error boundary shows your fallback UI instead of a white screen. Use an error boundary (e.g. react-error-boundary)—not try/catch around JSX.

- [ ] **Retry recovers**
  Click retry or reset state so the child can render again without a full page reload. Recovery should clear the error flag and attempt a normal render.

## Resources

- [Error boundaries (learn)](https://react.dev/learn/error-boundaries)
- [react-error-boundary](https://github.com/bvaughn/react-error-boundary)
- [Error Boundaries (reference)](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
