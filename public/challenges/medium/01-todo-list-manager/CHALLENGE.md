# Todo List Manager

**Difficulty:** medium  
**Topics:** useState, filtering, CRUD

## Learning goals

- CRUD on a collection
- Filter tabs (all/active/done)

## Challenge

Full todo app: add, toggle complete, delete, filter All/Active/Completed, and show remaining count.

## Requirements

1. Unique id per todo
2. Filters work
3. Footer shows items left
4. Clear completed button

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/medium/01-todo-list-manager/`. Reference write-ups in this repo live under `challenges/medium/01-todo-list-manager/` (not loaded by the app).

```tsx
type Todo = { id: string; text: string; done: boolean };
```

## Hints

1. Derive filtered list: todos.filter(...)
2. Toggle with map immutably

## Acceptance criteria

- [ ] **All CRUD works**
  Add todos, mark them complete, edit them, and delete them. Every action should update the list immediately with no ghost items.

- [ ] **Filters correct**
  Switch between All, Active, and Completed and confirm only the right todos show. Filtering should read from state, not hide items in the DOM only.

- [ ] **Clear completed**
  Mark several todos done, run Clear completed, and confirm finished items disappear while active ones remain. Bulk actions should update state in one step.

## Resources

- [Updating Arrays in State](https://react.dev/learn/updating-arrays-in-state)
- [Managing State](https://react.dev/learn/managing-state)
- [Controlled inputs](https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable)
