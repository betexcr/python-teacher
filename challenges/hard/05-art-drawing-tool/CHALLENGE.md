# Art Drawing Tool

**Difficulty:** hard  
**Topics:** canvas, refs, events

## Learning goals

- Draw on canvas with mouse/touch
- Color and brush size
- Clear and export PNG

## Challenge

HTML canvas drawing app: pencil tool, color picker, brush size slider, eraser, clear canvas, download PNG. Handle mouse down/move/up and touch events.

## Requirements

1. Smooth strokes
2. Device pixel ratio scaling
3. Export via toDataURL

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/hard/05-art-drawing-tool/`. Reference write-ups in this repo live under `challenges/hard/05-art-drawing-tool/` (not loaded by the app).

```tsx
const canvasRef = useRef<HTMLCanvasElement>(null);
```

## Hints

1. Scale canvas width/height by devicePixelRatio
2. lineTo on mousemove with lineCap round

## Acceptance criteria

- [ ] **Draws smoothly**
  Click and drag on the canvas and confirm continuous strokes without large gaps. Mouse or pointer events should stream points while the button is held.

- [ ] **Export downloads file**
  Click export and confirm a PNG (or required format) downloads with your drawing visible. toDataURL or similar should capture the current canvas pixels.

- [ ] **Clear works**
  Draw something, press Clear, and confirm the canvas is empty and you can draw again from scratch. Clear should reset both pixels and any stroke state in memory.

## Resources

- [Manipulating the DOM with Refs](https://react.dev/learn/manipulating-the-dom-with-refs)
- [Canvas API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Responding to Events](https://react.dev/learn/responding-to-events)
