export const toolsExtras = {
  Vite: {
    detail:
      'Dev server serves native ESM with esbuild prebundling for speed; production Rollup build tree-shakes and code-splits—default for new React SPAs.',
    code: `export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
});`,
  },
  'Webpack role': {
    detail:
      'Mature loader/plugin graph for legacy apps—slower cold start than Vite but still common in enterprises and Create React App migrations.',
    code: `module.exports = {
  entry: './src/main.tsx',
  module: { rules: [{ test: /\\.tsx?$/, use: 'ts-loader' }] },
};`,
  },
  'TypeScript in build': {
    detail:
      'Vite transpiles with esbuild/swc; run tsc --noEmit separately for types—faster CI than expecting tsc to emit every bundle.',
    code: `// package.json: "typecheck": "tsc -p tsconfig.app.json --noEmit"`,
  },
  'ESLint + React': {
    detail:
      'eslint-plugin-react-hooks enforces rules of hooks and exhaustive-deps—catches stale closures before they ship.',
    code: `// eslint.config.js extends: reactHooks.configs['recommended-latest']`,
  },
  Prettier: {
    detail:
      'Format on save ends style debates—pair with eslint-config-prettier so formatting rules do not fight lint rules.',
    code: `// .prettierrc: { "singleQuote": true, "semi": true }`,
  },
  'Environment variables': {
    detail:
      'Only VITE_ prefixed vars are exposed to client code in Vite—DATABASE_URL without prefix stays server-side in SSR frameworks.',
    code: `const api = import.meta.env.VITE_API_URL;`,
  },
  'Source maps': {
    detail:
      'hidden-source-map uploads to Sentry without publishing maps publicly—users cannot reverse-engineer your TS from production URLs.',
    code: `// vite build: sourcemap: 'hidden'`,
  },
  'Tree shaking': {
    detail:
      'ESM static imports enable dead code elimination—side-effectful barrel imports or CommonJS can prevent shaking lodash-sized deps.',
    code: `import { debounce } from 'lodash-es';`,
  },
  'Bundle analysis': {
    detail:
      'Visualize chunk weight after build—surprise dependencies (moment locales, whole icons packs) show up as oversized rectangles.',
    code: `// vite.config: plugins: [visualizer({ open: true })]`,
  },
  Vitest: {
    detail:
      'Shares Vite config and transforms—vi.fn and jsdom run component tests without a separate Jest transformer pipeline.',
    code: `import { describe, it, expect } from 'vitest';

describe('formatPrice', () => {
  it('formats cents', () => expect(formatPrice(199)).toBe('$1.99'));
});`,
  },
  'CI pipeline': {
    detail:
      'Fail fast: lint and typecheck before tests and build—cache pnpm store and Turborepo outputs to keep PR feedback under a few minutes.',
    code: `jobs:
  verify:
    steps: [checkout, pnpm install, lint, typecheck, test, build]`,
  },
  'pnpm vs npm': {
    detail:
      'pnpm symlinks packages per project with a global content store—saves disk and avoids phantom dependencies from hoisted node_modules.',
    code: `pnpm install
pnpm --filter web build`,
  },
  'Monorepo tools': {
    detail:
      'Turborepo hashes task inputs and skips unchanged package builds—critical when ten packages share one repo.',
    code: `// turbo.json: build dependsOn: ["^build"]`,
  },
  HMR: {
    detail:
      'Vite HMR updates modules in place preserving React state when possible—misconfigured boundaries still full-reload on some CSS changes.',
    code: `if (import.meta.hot) {
  import.meta.hot.accept();
}`,
  },
  'Docker for SPA': {
    detail:
      'Multi-stage build: Node stage runs pnpm build, nginx stage serves static dist/—never run dev server in production images.',
    code: `# Dockerfile: FROM node AS build → pnpm build → FROM nginx COPY dist`,
  },
};
