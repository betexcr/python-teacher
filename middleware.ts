import {
  getPageMeta,
  ogImageUrl,
  SITE_NAME,
  SITE_URL,
  type PageMeta,
} from './src/data/seo.js';
import crawlSnapshots from './src/data/seo/crawl-snapshots.json' with { type: 'json' };

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function normalizePathname(pathname: string): string {
  if (pathname === '/') return '/get-started';
  return pathname.replace(/\/+$/, '') || '/get-started';
}

function getCrawlSnapshot(pathname: string) {
  const path = normalizePathname(pathname);
  return crawlSnapshots.snapshots.find((s) => s.path === path);
}

function buildCrawlBodyHtml(snapshot: { title: string; body: string }): string {
  const paragraphs = snapshot.body
    .split(/\n\n+/)
    .map((p) => `<p>${escapeHtml(p)}</p>`)
    .join('\n');
  return `<article id="crawl-snapshot" aria-hidden="true"><h1>${escapeHtml(snapshot.title)}</h1>${paragraphs}</article>`;
}

/** HTML snippet injected for social crawlers (edge middleware only). */
function buildOgHeadHtml(meta: PageMeta, pathname: string): string {
  const image = ogImageUrl(meta.ogImageId);
  const url = `${SITE_URL}${normalizePathname(pathname)}`;

  return `
    <title>${escapeHtml(meta.title)}</title>
    <meta name="description" content="${escapeHtml(meta.description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />
    <meta property="og:title" content="${escapeHtml(meta.title)}" />
    <meta property="og:description" content="${escapeHtml(meta.description)}" />
    <meta property="og:url" content="${escapeHtml(url)}" />
    <meta property="og:image" content="${escapeHtml(image)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${escapeHtml(meta.title)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(meta.title)}" />
    <meta name="twitter:description" content="${escapeHtml(meta.description)}" />
    <meta name="twitter:image" content="${escapeHtml(image)}" />
  `.trim();
}

const BOT_UA =
  /bot|crawl|spider|slurp|facebookexternalhit|Facebot|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|TelegramBot|Pinterest|Embedly/i;

export const config = {
  matcher: ['/((?!og/|assets/|favicon|challenges/|.*\\..*).*)'],
};

export default async function middleware(request: Request): Promise<Response | undefined> {
  const ua = request.headers.get('user-agent') ?? '';
  if (!BOT_UA.test(ua)) return undefined;

  const url = new URL(request.url);
  const meta = getPageMeta(url.pathname);
  const ogHead = buildOgHeadHtml(meta, url.pathname);

  const indexUrl = new URL('/index.html', request.url);
  const res = await fetch(indexUrl.toString(), { headers: { accept: 'text/html' } });
  if (!res.ok) return undefined;

  let html = await res.text();
  html = html.replace(/<title>[\s\S]*?<\/title>/i, '');
  html = html.replace(
    /<meta\s+charset="UTF-8"\s*\/?>/i,
    `<meta charset="UTF-8" />\n    ${ogHead}`,
  );

  const snapshot = getCrawlSnapshot(url.pathname);
  if (snapshot?.body) {
    const crawlHtml = buildCrawlBodyHtml(snapshot);
    html = html.replace('<div id="root"></div>', `${crawlHtml}\n    <div id="root"></div>`);
  }

  return new Response(html, {
    status: 200,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, max-age=0, must-revalidate',
    },
  });
}
