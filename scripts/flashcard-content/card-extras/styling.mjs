export const stylingExtras = {
  'CSS Modules': {
    detail:
      'Build tools hash class names locally—import styles.title without global collisions; compose with composes or multiple classes.',
    code: `import styles from './Card.module.css';

export function Card({ children }: { children: React.ReactNode }) {
  return <article className={styles.card}>{children}</article>;
}`,
  },
  'Tailwind CSS': {
    detail:
      'Utility classes colocate styling in JSX; @layer and design tokens keep consistency—purge/content config must include all template paths.',
    code: `<button className="rounded-lg bg-violet-600 px-4 py-2 text-white hover:bg-violet-500 focus-visible:ring-2">
  Save
</button>`,
  },
  'CSS-in-JS (styled-components)': {
    detail:
      'Runtime CSS-in-JS adds bundle and insertion cost—fine for dynamic themes; consider zero-runtime (Vanilla Extract, Linaria) for perf-sensitive apps.',
    code: `const Button = styled.button\`
  padding: 0.5rem 1rem;
  background: \${(p) => p.theme.primary};
\`;`,
  },
  'Vanilla Extract': {
    detail:
      'Write styles in .css.ts files extracted at build—type-safe variants with zero runtime style injection cost.',
    code: `import { style } from '@vanilla-extract/css';

export const card = style({
  padding: '1rem',
  borderRadius: '8px',
});`,
  },
  'Inline styles': {
    detail:
      'style={{ }} objects suit one-off dynamic values (progress width)—avoid duplicating design tokens inline across dozens of components.',
    code: `<div style={{ transform: \`translateX(\${percent}%)\` }} />`,
  },
  'clsx / cn utility': {
    detail:
      'Merge conditional classes without string typos—cn often wraps clsx + tailwind-merge to resolve conflicting utilities.',
    code: `function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

<button className={cn('btn', isActive && 'btn-active')} />`,
  },
  'Design systems': {
    detail:
      'Token-driven spacing/color plus primitives (Button, Input) keep product teams aligned—shadcn copies components you own into the repo.',
    code: `// tokens: --space-4, components/Button.tsx variants`,
  },
  'Dark mode': {
    detail:
      'class="dark" on html with CSS variables scales better than duplicating palettes—respect prefers-color-scheme for system default.',
    code: `<html className={theme === 'dark' ? 'dark' : ''}>
  <body className="bg-background text-foreground" />
</html>`,
  },
  'Responsive design': {
    detail:
      'Mobile-first breakpoints (md:, lg:) and container queries (@container) adapt components inside sidebars without global viewport hacks.',
    code: `<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
  {items.map((i) => <Card key={i.id} item={i} />)}
</div>`,
  },
  'Global styles': {
    detail:
      'Resets and typography live in a single global entry—@layer base in Tailwind orders cascade predictably vs scattered !important.',
    code: `@layer base {
  body { @apply bg-white text-slate-900 antialiased; }
}`,
  },
  'Animation performance': {
    detail:
      'Animate transform and opacity only—width/height/top animations trigger layout; prefer CSS transitions over JS rAF loops for simple UI.',
    code: `.panel {
  transition: transform 200ms ease, opacity 200ms ease;
}`,
  },
  'SSR CSS': {
    detail:
      'Runtime CSS-in-JS may flash unstyled content—extract critical CSS or use build-time CSS so server HTML matches first paint.',
    code: `// Vanilla Extract / CSS Modules: styles in built CSS file linked in HTML`,
  },
  'Tailwind content scanning': {
    detail:
      'v4 @source globs and v3 content arrays must include app, src, and MDX paths—missing globs drop utilities silently from production CSS.',
    code: `/* app.css v4 */
@source "../src/**/*.{tsx,ts}";
@source "../app/**/*.{tsx,ts}";`,
  },
  'Component variants': {
    detail:
      'cva() maps variant props to class strings with TypeScript inference—pairs with cn for default and compound variants.',
    code: `const button = cva('inline-flex items-center rounded-md', {
  variants: {
    size: { sm: 'h-8 px-3 text-sm', md: 'h-10 px-4' },
    intent: { primary: 'bg-violet-600 text-white', ghost: 'bg-transparent' },
  },
  defaultVariants: { size: 'md', intent: 'primary' },
});`,
  },
  'Scoped vs global': {
    detail:
      'Modules and CSS-in-JS scope component styles; globals handle resets—leaking globals causes specificity wars across features.',
    code: `import './globals.css';
import styles from './Widget.module.css';`,
  },
};
