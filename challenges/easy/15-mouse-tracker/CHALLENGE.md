# MouseTracker

**Difficulty:** easy  
**Topics:** events, useEffect

## Learning goals

- Listen to window events
- Clean up listeners

## Challenge

Track cursor position relative to a box. Show coordinates and whether pointer is inside the box.

## Requirements

1. mousemove on window or container
2. Cleanup on unmount
3. Visual dot follows cursor inside box

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/easy/15-mouse-tracker/`. Reference write-ups in this repo live under `challenges/easy/15-mouse-tracker/` (not loaded by the app).

```tsx
const [pos, setPos] = useState({ x: 0, y: 0 });
```

## Hints

1. getBoundingClientRect for relative coords
2. onMouseMove on div vs window

## Acceptance criteria

- [ ] **Coords accurate**
  Move the mouse inside the tracked area and confirm x and y update and roughly match the pointer position. Coordinates should feel responsive, not stuck.

- [ ] **Inside/outside indicator**
  Move the pointer in and out of the box and confirm the UI clearly says whether the mouse is inside or outside. This proves your hit area matches the element bounds.

- [ ] **Listener removed**
  Unmount the component or toggle tracking off and confirm listeners are removed (no duplicate updates, no errors after unmount). Effect cleanup should remove mousemove or related listeners.

## Resources

- [Adding Event Listeners in Effects](https://react.dev/learn/synchronizing-with-effects#adding-a-window-event-listener)
- [useEffect – Reference](https://react.dev/reference/react/useEffect)
- [Responding to Events](https://react.dev/learn/responding-to-events)
