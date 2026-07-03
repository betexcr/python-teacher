export const testingExtras = {
  'Testing Library philosophy': {
    detail:
      'Query by role, label, and accessible name—tests survive refactors that rename test IDs but break when real users lose access to controls.',
    code: `render(<LoginForm />);
const submit = screen.getByRole('button', { name: /sign in/i });
expect(submit).toBeEnabled();`,
  },
  'render vs screen': {
    detail:
      'render mounts into a container; screen queries the document—prefer screen after render so helpers work with portals and multiple roots.',
    code: `render(<App />);
expect(screen.getByRole('navigation')).toBeInTheDocument();`,
  },
  'userEvent vs fireEvent': {
    detail:
      'userEvent simulates realistic pointer/keyboard sequences (focus, keydown, input)—fireEvent only dispatches a single synthetic event and misses edge cases.',
    code: `await userEvent.click(screen.getByRole('button', { name: /save/i }));
await userEvent.type(screen.getByLabelText(/email/i), 'a@b.com');`,
  },
  'waitFor / findBy': {
    detail:
      'findBy* returns a promise that rejects on timeout; waitFor retries assertions until async UI settles—use for spinners → content transitions.',
    code: `await screen.findByText(/upload complete/i);
await waitFor(() => expect(mockFetch).toHaveBeenCalledWith('/api/upload'));`,
  },
  'Mocking fetch': {
    detail:
      'MSW intercepts at the network layer so components use real fetch—less brittle than mocking global.fetch implementation details per test.',
    code: `import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  http.get('/api/user', () => HttpResponse.json({ name: 'Ada' }))
);`,
  },
  'Testing hooks': {
    detail:
      'renderHook runs hooks in a real React tree; wrap state updates in act() so assertions see flushed renders.',
    code: `const { result } = renderHook(() => useCounter(), { wrapper: AllProviders });

act(() => result.current.inc());
expect(result.current.count).toBe(1);`,
  },
  'Provider wrappers': {
    detail:
      'Pass wrapper with QueryClientProvider, Router, and theme so hooks under test see the same context as production routes.',
    code: `render(<Profile />, {
  wrapper: ({ children }) => (
    <QueryClientProvider client={testClient}>{children}</QueryClientProvider>
  ),
});`,
  },
  'Snapshot testing caution': {
    detail:
      'Large snapshots churn on any markup tweak and do not assert behavior—prefer role/text assertions for components users actually interact with.',
    code: `expect(screen.getByRole('heading', { name: /welcome/i })).toBeVisible();
// Avoid: expect(container).toMatchSnapshot();`,
  },
  'E2E with Playwright': {
    detail:
      'Exercise real browsers for checkout and auth—slower than unit tests but catches integration issues (cookies, redirects, CSP) units miss.',
    code: `test('checkout', async ({ page }) => {
  await page.goto('/cart');
  await page.getByRole('button', { name: 'Pay' }).click();
  await expect(page.getByText('Thank you')).toBeVisible();
});`,
  },
  'Accessibility tests': {
    detail:
      'jest-axe catches missing labels and invalid roles in CI—automated checks complement manual VoiceOver/NVDA passes for focus order.',
    code: `const { container } = render(<Form />);
const results = await axe(container);
expect(results).toHaveNoViolations();`,
  },
  'Testing async components': {
    detail:
      'Assert loading UI first, then await success content—use findBy to avoid flaky fixed timeouts when fetch duration varies.',
    code: `render(<UserLoader id="1" />);
expect(screen.getByText(/loading/i)).toBeInTheDocument();
expect(await screen.findByText(/Ada/)).toBeInTheDocument();`,
  },
  'Mock modules': {
    detail:
      'vi.mock hoists to the top—mock the module boundary (./api) not deep internals so tests track the public contract.',
    code: `vi.mock('./api', () => ({
  fetchUser: vi.fn().mockResolvedValue({ name: 'Test' }),
}));`,
  },
  'Coverage limits': {
    detail:
      'High line coverage with shallow asserts gives false confidence—prioritize critical paths, error branches, and regressions you have actually seen in prod.',
    code: `// Prefer: assert redirect when session expires
// Over: expect(wrapper).toBeTruthy();`,
  },
  'CI testing': {
    detail:
      'Run lint, typecheck, and unit on every PR; shard Playwright across workers on main—cache node_modules and Turborepo outputs to keep feedback fast.',
    code: `# ci.yml jobs: lint → tsc → vitest → build → playwright (main only)`,
  },
  'Component isolation': {
    detail:
      'Storybook documents empty/error/loading states; unit tests target one component per file—easier to pinpoint failures than monolithic App tests.',
    code: `// UserCard.test.tsx — not entire App tree unless integration intent`,
  },
};
