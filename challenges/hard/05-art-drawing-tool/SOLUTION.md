# Solution: Art Drawing Tool

## Approach

2D context path drawing with state for isDrawing.

## Key concepts

- **Canvas DPR**: Multiply canvas buffer size by devicePixelRatio for sharp lines.
- **Pointer events**: Unified mouse/touch via pointerdown/move/up.

## Code highlights

- `useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width` — **useEffect** — Runs after render to Pointer events draw line segments; DPR effect sizes backing store for crisp strokes..
- `<input type="color" value={color} onChange={(e) => setColor(e.target.value)} />` — **controlled input** — Input text is owned by React state — value plus onChange keep the field in sync. Pointer events draw line segments; DPR effect sizes backing store for crisp strokes.
- `const [drawing, setDrawing] = useState(false)` — **drawing state** — `drawing` is the value the UI shows. It starts at false. `setDrawing` updates it when the user interacts. Pointer events draw line segments; DPR effect sizes backing store for crisp strokes.
- `const ref = useRef<HTMLCanvasElement>(null)` — **ref ref** — `ref` keeps a mutable value across renders without triggering re-renders when .current changes. Pointer events draw line segments; DPR effect sizes backing store for crisp strokes.
- `const [color, setColor] = useState('#000')` — **color state** — `color` is the value the UI shows. It starts at '#000'. `setColor` updates it when the user interacts. Pointer events draw line segments; DPR effect sizes backing store for crisp strokes.
- `const [size, setSize] = useState(4)` — **size state** — `size` is the value the UI shows. It starts at 4. `setSize` updates it when the user interacts. Pointer events draw line segments; DPR effect sizes backing store for crisp strokes.
- `onClick={download}` — **onClick** — Runs when the user clicks this button. Pointer events draw line segments; DPR effect sizes backing store for crisp strokes.
- `onClick={clear}` — **onClick** — Runs when the user clicks this button. Pointer events draw line segments; DPR effect sizes backing store for crisp strokes.

## Solution code

```tsx
import { useEffect, useRef, useState } from 'react';

export function DrawingTool() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState('#000');
  const [size, setSize] = useState(4);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);
  }, []);

  const pos = (e: React.PointerEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const onDown = (e: React.PointerEvent) => {
    const ctx = ref.current!.getContext('2d')!;
    const { x, y } = pos(e);
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x, y);
    setDrawing(true);
  };

  const onMove = (e: React.PointerEvent) => {
    if (!drawing) return;
    const ctx = ref.current!.getContext('2d')!;
    const { x, y } = pos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const clear = () => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const download = () => {
    const url = ref.current!.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'drawing.png';
    a.click();
  };

  return (
    <div>
      <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
      <input type="range" min={1} max={32} value={size} onChange={(e) => setSize(Number(e.target.value))} />
      <button onClick={clear}>Clear</button>
      <button onClick={download}>Download</button>
      <canvas
        ref={ref}
        style={{ width: '100%', height: 400, border: '1px solid #ccc', touchAction: 'none' }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={() => setDrawing(false)}
        onPointerLeave={() => setDrawing(false)}
      />
    </div>
  );
}
```

## Walkthrough

Pointer events draw line segments; DPR effect sizes backing store for crisp strokes.

## Common mistakes

- Not scaling for retina
- Missing touchAction none causing scroll

## Stretch goals

- Undo stack
- Layers
