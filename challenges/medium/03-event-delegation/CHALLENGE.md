# Event Delegation

**Difficulty:** medium  
**Topics:** events, DOM

## Learning goals

- Handle events on parent for dynamic children
- Use data attributes to identify targets

## Challenge

Render a dynamic list of buttons (add/remove). Use **one** click handler on `<ul>` to detect which item was clicked via `event.target` and `data-id`.

## Requirements

1. Single listener on list container
2. Works for newly added items without rebinding
3. Delete vs select actions

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/medium/03-event-delegation/`. Reference write-ups in this repo live under `challenges/medium/03-event-delegation/` (not loaded by the app).

```tsx
<ul onClick={handleListClick}>
```

## Hints

1. if (!(e.target instanceof HTMLElement)) return
2. const id = target.closest("[data-id]")?.getAttribute("data-id")

## Acceptance criteria

- [ ] **One delegated handler**
  Attach a single click handler on the list container instead of one per row. Click different rows and confirm the handler still identifies which item was clicked via event.target or closest.

- [ ] **Dynamic items work**
  Add a new row after load and click it; the same delegated handler should work without rebinding listeners. Delegation scales when the list changes often.

## Resources

- [Responding to Events](https://react.dev/learn/responding-to-events)
- [Event delegation (MDN)](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling)
- [React event objects](https://react.dev/reference/react-dom/components/common#react-event-object)
