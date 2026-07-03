export const accessibilityExtras = {
  'Semantic HTML first': {
    detail:
      'Use button for actions, nav for navigation, and headings in order—ARIA should reinforce semantics, not replace a div pretending to be a button.',
    code: `<nav aria-label="Main">
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>
<button type="button">Save</button>`,
  },
  'Accessible name': {
    detail:
      'Every control needs a name from visible text, aria-label, or aria-labelledby—icon-only buttons fail audits without an accessible name.',
    code: `<button type="button" aria-label="Close dialog">
  <CloseIcon aria-hidden />
</button>`,
  },
  'Keyboard navigation': {
    detail:
      'Tab order should follow visual order; custom widgets need key handlers for Enter, Space, and arrows per WAI-ARIA patterns.',
    code: `function MenuItem({ onActivate }: { onActivate: () => void }) {
  return (
    <div
      role="menuitem"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onActivate();
        }
      }}
    />
  );
}`,
  },
  'Focus management': {
    detail:
      'Move focus into modals on open and return focus to the trigger on close—trap Tab inside the dialog until dismissed.',
    code: `useEffect(() => {
  const prev = document.activeElement as HTMLElement;
  dialogRef.current?.focus();
  return () => prev?.focus();
}, []);`,
  },
  'aria-live': {
    detail:
      'Live regions announce async status without moving focus—polite waits for pauses; assertive interrupts immediately for critical errors.',
    code: `<div aria-live="polite" role="status">
  {saved ? 'Changes saved' : ''}
</div>`,
  },
  'Color contrast': {
    detail:
      'WCAG AA requires 4.5:1 for normal text—do not convey errors only with red; pair color with text and icons.',
    code: `<p className="text-red-700">
  <ErrorIcon aria-hidden /> Invalid email
</p>`,
  },
  'alt text': {
    detail:
      'Decorative images use alt=""; informative images need concise descriptions; functional images describe the action, not the bitmap.',
    code: `<img src="/chart.png" alt="Revenue up 12% in Q2" />
<img src="/divider.svg" alt="" role="presentation" />`,
  },
  'Form labels': {
    detail:
      'Placeholders are not labels—visible <label htmlFor> or aria-labelledby must associate every input for screen readers.',
    code: `<label htmlFor="email">Email address</label>
<input id="email" name="email" type="email" autoComplete="email" />`,
  },
  'Skip links': {
    detail:
      'First focusable link jumps to #main—keyboard users skip repetitive nav on every page load in large apps.',
    code: `<a href="#main" className="skip-link">
  Skip to main content
</a>
<main id="main">…</main>`,
  },
  'Reduced motion': {
    detail:
      'Honor prefers-reduced-motion by disabling parallax and large transitions—vestibular disorders are triggered by infinite animations.',
    code: `@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; }
}`,
  },
  'Role attribute': {
    detail:
      'Use role when no native element fits—role="dialog" needs aria-modal and labelledby; incorrect roles confuse assistive tech.',
    code: `<div role="dialog" aria-modal="true" aria-labelledby="title-id">
  <h2 id="title-id">Confirm</h2>
</div>`,
  },
  'Heading order': {
    detail:
      'Do not skip heading levels for styling—one h1 per page (or per route) outlines document structure for rotor navigation.',
    code: `<h1>Account</h1>
<h2>Profile</h2>
<h3>Contact</h3>`,
  },
  'Testing a11y': {
    detail:
      'Automated axe catches ~30% of issues—manual VoiceOver/NVDA passes still required for focus order and meaningful announcements.',
    code: `const { container } = render(<Checkout />);
expect(await axe(container)).toHaveNoViolations();`,
  },
  'React Aria / Radix': {
    detail:
      'Headless primitives implement combobox, dialog, and menu keyboard models—faster than hand-rolling aria-expanded and focus rings.',
    code: `import * as Dialog from '@radix-ui/react-dialog';

<Dialog.Root>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Content aria-describedby={undefined}>…</Dialog.Content>
</Dialog.Root>`,
  },
  'Disabled vs aria-disabled': {
    detail:
      'disabled removes from tab order; aria-disabled keeps focus for custom widgets that still need keyboard explanation before activation.',
    code: `<button aria-disabled={isBusy} onClick={isBusy ? undefined : submit}>
  Submit
</button>`,
  },
};
