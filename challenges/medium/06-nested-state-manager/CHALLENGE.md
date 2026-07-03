# Nested State Manager

**Difficulty:** medium  
**Topics:** immutable updates, nested objects

## Learning goals

- Update deeply nested state safely
- Use spread at each level

## Challenge

Settings panel: `user.profile.name`, `user.profile.avatar`, `user.preferences.notifications.email`. Update one leaf without mutating siblings.

## Requirements

1. Immutable updates at arbitrary depth
2. Helper updateProfile(path, value) optional
3. UI reflects nested structure

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/medium/06-nested-state-manager/`. Reference write-ups in this repo live under `challenges/medium/06-nested-state-manager/` (not loaded by the app).

```tsx
const [user, setUser] = useState({ profile: { name: '', avatar: '' }, preferences: { notifications: { email: true } } });
```

## Hints

1. setUser(u => ({ ...u, profile: { ...u.profile, name: v } }))
2. Consider useImmer for ergonomics

## Acceptance criteria

- [ ] **Leaf updates isolated**
  Change a nested field (for example a todo inside a project) and confirm only that branch updates while siblings stay the same. Immutable updates copy each level you change.

- [ ] **No mutation warnings**
  Use React Strict Mode and confirm the console never warns about mutating state directly. Always replace objects and arrays with new copies when updating nested data.

## Resources

- [Updating Objects in State](https://react.dev/learn/updating-objects-in-state)
- [Immutable update patterns](https://react.dev/learn/updating-objects-in-state#write-immutable-update-logic-with-spread-syntax)
- [useState – Reference](https://react.dev/reference/react/useState)
