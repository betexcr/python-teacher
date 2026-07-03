# Image Carousel

**Difficulty:** medium  
**Topics:** state, effects, a11y

## Learning goals

- Cycle slides with prev/next
- Optional autoplay with pause on hover

## Challenge

Carousel with images, indicators, prev/next, keyboard arrows, and autoplay every 5s (pause on hover/focus).

## Requirements

1. Wrap index with modulo
2. aria-live polite for slide title
3. Autoplay cleanup

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/medium/02-image-carousel/`. Reference write-ups in this repo live under `challenges/medium/02-image-carousel/` (not loaded by the app).

```tsx
const slides = [{ src, alt, title }];
```

## Hints

1. index = (index + 1) % slides.length
2. useEffect interval when autoplay enabled

## Acceptance criteria

- [ ] **Navigation works**
  Use next/previous buttons or dots and confirm the visible slide changes with the correct image and caption. Index state should wrap or clamp per the spec.

- [ ] **Autoplay pauses**
  When autoplay runs, hover or focus the carousel (or press pause if provided) and confirm slides stop advancing until you resume. Users need control over motion.

- [ ] **Keyboard support**
  Use arrow keys (and Home/End if required) to change slides when the carousel is focused. Keyboard support is required for accessible carousels.

## Resources

- [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
- [useState – Reference](https://react.dev/reference/react/useState)
- [ARIA: carousel pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/)
