# Custom domains & Google Search Console

Operational checklist for PythonTeacher, NodeTeacher, and ReactTeacher.

## Recommended domains

| Site | Suggested domain | Vercel project |
|------|------------------|----------------|
| PythonTeacher | `pythonprep.com` or `pythonteacher.dev` | python-teacher |
| NodeTeacher | `nodeprep.com` or `nodeteacher.dev` | nodejs-teacher |
| RustTeacher | `rustprep.com` or `rustteacher.dev` | rust-teacher |
| ReactTeacher | `reactteacher.dev` or `reactprep.com` | react-teacher |

## Vercel setup

1. Open each project in Vercel â†’ **Settings â†’ Domains**.
2. Add the custom domain and follow DNS instructions (A/CNAME).
3. Set the custom domain as **primary** once SSL is active.
4. Update `SITE_URL` in `src/config/brand.ts` and redeploy.
5. Run `npm run generate` so `sitemap.xml`, `robots.txt`, and `llms.txt` use the new URL.

## Google Search Console

For each property:

1. Add property as **URL prefix** (e.g. `https://pythonprep.com`).
2. Verify via DNS TXT or HTML file (Vercel supports both).
3. Submit `https://<domain>/sitemap.xml`.
4. Request indexing for `/get-started`, `/faq`, `/about`, and top challenge URLs.
5. Monitor **Pages** and **Core Web Vitals** monthly.

## Bing Webmaster Tools

Repeat sitemap submission at [bing.com/webmasters](https://www.bing.com/webmasters).

## After migration

- Keep `*.vercel.app` URLs redirecting to the custom domain (Vercel default).
- Update portfolio footer links in `src/config/seo-content.ts` across all three repos.
- Re-share OG URLs on social profiles if branding domains change.

