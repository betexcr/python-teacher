export const securityExtras = {
  'XSS in React': {
    detail:
      'JSX escapes text by default; dangerouslySetInnerHTML bypasses that—sanitize with DOMPurify and treat CMS HTML as untrusted input.',
    code: `<p>{userBio}</p>

<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(cmsHtml) }} />`,
  },
  CSRF: {
    detail:
      'Cookie-based sessions need SameSite cookies and CSRF tokens on mutating requests—SPAs using Authorization headers are less exposed but APIs must still authenticate.',
    code: `fetch('/api/transfer', {
  method: 'POST',
  credentials: 'include',
  headers: { 'X-CSRF-Token': csrfFromMeta },
  body: JSON.stringify(payload),
});`,
  },
  'Never store secrets in frontend': {
    detail:
      'Anything in VITE_ or NEXT_PUBLIC_ env vars ships to browsers—proxy paid APIs through your server and bill per session server-side.',
    code: `// Bad: const STRIPE_SECRET = import.meta.env.VITE_STRIPE_SECRET;
// Good: POST /api/create-checkout-session from server route`,
  },
  'Auth token storage': {
    detail:
      'httpOnly, Secure, SameSite cookies hide tokens from document.cookie and XSS exfiltration—localStorage tokens are readable by any script injection.',
    code: `// Server sets: Set-Cookie: session=…; HttpOnly; Secure; SameSite=Lax
// Client: fetch('/api/me', { credentials: 'include' })`,
  },
  'Content Security Policy': {
    detail:
      'CSP headers restrict script-src and block inline injection—even with React escaping, CSP limits damage from compromised third-party scripts.',
    code: `// Content-Security-Policy: default-src 'self'; script-src 'self'`,
  },
  'Dependency auditing': {
    detail:
      'Run npm audit and Dependabot in CI; a compromised transitive package runs with the same privileges as your app code during build and runtime.',
    code: `// package.json scripts: "audit": "npm audit --audit-level=high"`,
  },
  'Open redirects': {
    detail:
      'Never navigate to user-supplied URLs blindly—allowlist hosts or map slugs to internal routes before calling navigate(returnUrl).',
    code: `const ALLOWED = new Set(['/', '/dashboard', '/settings']);

function safeRedirect(path: string) {
  if (ALLOWED.has(path)) navigate(path);
  else navigate('/');
}`,
  },
  'JWT in SPA': {
    detail:
      'Verify JWTs only on the server; short-lived access tokens plus refresh rotation limit theft window—client decode is for display, not trust.',
    code: `// Server: jwt.verify(token, secret)
// Client: show claims only after /api/session confirms`,
  },
  CORS: {
    detail:
      'CORS is a browser enforcement for cross-origin reads—it does not replace authentication; misconfigured Access-Control-Allow-Origin * with credentials is dangerous.',
    code: `// Server must echo specific origin, not * when credentials: true`,
  },
  'Input validation': {
    detail:
      'Client validation improves UX; attackers bypass it—always validate and encode on the server before DB writes and HTML echo.',
    code: `const parsed = schema.safeParse(req.body);
if (!parsed.success) return Response.json({ errors: parsed.error }, { status: 400 });`,
  },
  'Rate limiting': {
    detail:
      'Throttle login, password reset, and expensive search endpoints server-side—client debouncing does not stop scripted abuse.',
    code: `// middleware: if (tooManyRequests(ip)) return 429`,
  },
  'Subresource Integrity': {
    detail:
      'SRI hashes on CDN script tags detect tampering—if the CDN serves altered JS, the browser refuses to execute it.',
    code: `<script
  src="https://cdn.example.com/lib.js"
  integrity="sha384-…"
  crossOrigin="anonymous"
/>`,
  },
  Clickjacking: {
    detail:
      'X-Frame-Options DENY or CSP frame-ancestors stops your app from being embedded in invisible iframes that trick clicks.',
    code: `// Header: X-Frame-Options: DENY
// Or CSP: frame-ancestors 'none'`,
  },
  'Sensitive data in URLs': {
    detail:
      'Tokens in query strings leak via Referer headers, browser history, and server logs—use POST bodies or short-lived exchange codes instead.',
    code: `// Bad: /reset?token=eyJhbG…
// Good: POST /api/reset with token in body`,
  },
  'Supply chain': {
    detail:
      'Pin lockfiles, review new dependencies, and enable npm provenance where available—postinstall scripts are a common attack vector.',
    code: `// .npmrc: ignore-scripts=true (when safe for your toolchain)`,
  },
};
