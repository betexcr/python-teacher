# Refactor to Props

**Difficulty:** easy  
**Topics:** props, lifting state

## Learning goals

- Identify hardcoded data
- Make components reusable via props

## Challenge

You are given a monolithic `UserCard` with hardcoded name/avatar/role. Refactor into presentational `UserCard` + container that passes props. Add optional `onFollow` callback.

## Requirements

1. No hardcoded user data inside UserCard
2. Prop types for name, avatarUrl, role
3. onFollow optional

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/easy/11-refactor-to-props/`. Reference write-ups in this repo live under `challenges/easy/11-refactor-to-props/` (not loaded by the app).

```tsx
// Before: function UserCard() { return <div>Jane Doe</div> }
```

## Hints

1. Split data (container) from UI (presentational)
2. Default props for optional fields

## Acceptance criteria

- [ ] **Two users render from array**
  Map over a users array and confirm two (or more) profile cards render with the correct names and avatars from data. Lists of components should come from data, not copy-pasted JSX.

- [ ] **Follow button calls callback**
  Click Follow on a user card and confirm the parent receives the user id or name (console log or updated parent state is fine). The child should not own global follow state unless the challenge says so.

## Resources

- [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)
- [Sharing State Between Components](https://react.dev/learn/sharing-state-between-components)
- [Thinking in React](https://react.dev/learn/thinking-in-react)
