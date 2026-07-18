import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

/** @type {Record<string, { siteUrl: string; siteName: string; basicsPath: string; patternsPath: string }>} */
const BRANDS = {
  python: {
    siteUrl: 'https://pythonprep.vercel.app',
    siteName: 'PythonTeacher',
    basicsPath: '/python-basics',
    patternsPath: '/python-patterns',
  },
  node: {
    siteUrl: 'https://nodeprep.vercel.app',
    siteName: 'NodeTeacher',
    basicsPath: '/node-basics',
    patternsPath: '/node-patterns',
  },
  react: {
    siteUrl: 'https://reactteacher.vercel.app',
    siteName: 'ReactTeacher',
    basicsPath: '/js-basics',
    patternsPath: '/react-patterns',
  },
};

const brandKey = process.env.SEO_BRAND ?? 'python';
const brand = BRANDS[brandKey] ?? BRANDS.python;

function loadOgRoutes() {
  const manifestPath = join(root, 'src/data/og-manifest.ts');
  const raw = readFileSync(manifestPath, 'utf8');
  const match = raw.match(/"routes":\s*(\{[\s\S]*\})\s*,?\s*\}\s*as const/);
  if (!match) throw new Error('Could not parse og-manifest routes');
  return Object.keys(JSON.parse(match[1]));
}

function loadInterviewSlugs() {
  const indexPath = join(root, 'src/data/challenges-index.json');
  const index = JSON.parse(readFileSync(indexPath, 'utf8'));
  const slugs = [];
  for (const [difficulty, items] of Object.entries(index)) {
    for (const item of items) {
      slugs.push({
        path: `/interview-questions/${item.slug}`,
        difficulty,
        title: item.title,
      });
    }
  }
  return slugs;
}

function loadBlogSlugs() {
  const blogPath = join(root, 'src/data/seo/blog-slugs.json');
  try {
    const data = JSON.parse(readFileSync(blogPath, 'utf8'));
    return data.slugs.map((slug) => `/blog/${slug}`);
  } catch {
    return [];
  }
}

function loadCompareSlugs() {
  const comparePath = join(root, 'src/data/seo/compare-slugs.json');
  try {
    const data = JSON.parse(readFileSync(comparePath, 'utf8'));
    return data.slugs.map((slug) => `/compare/${slug}`);
  } catch {
    return [];
  }
}

const staticPaths = [
  '/get-started',
  '/about',
  '/faq',
  '/blog',
  brand.basicsPath,
  '/challenges',
  '/challenges/easy',
  '/challenges/medium',
  '/challenges/hard',
  '/challenges/very-hard',
  '/flashcards',
  brand.patternsPath,
  '/system-design',
];

const ogRoutes = loadOgRoutes();
const interviewPaths = loadInterviewSlugs().map((i) => i.path);
const blogPaths = loadBlogSlugs();
const comparePaths = loadCompareSlugs();

const allPaths = [...new Set([...staticPaths, ...ogRoutes, ...interviewPaths, ...blogPaths, ...comparePaths])].sort();

const today = new Date().toISOString().slice(0, 10);

const sitemapEntries = allPaths
  .map((path) => {
    const loc = `${brand.siteUrl}${path}`;
    const priority = path === '/get-started' ? '1.0' : path.startsWith('/blog') ? '0.7' : '0.8';
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  })
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`;

const sitemapUrl = `${brand.siteUrl}/sitemap/sitemap.xml`;
const robots = `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`;

const llms = `# ${brand.siteName}\n\n> Free ${brand.siteName.replace('Teacher', '')} interview prep: coding challenges, flashcards, patterns, and system design guides.\n\n- Site: ${brand.siteUrl}\n- Get started: ${brand.siteUrl}/get-started\n- Challenges: ${brand.siteUrl}/challenges\n- Flashcards: ${brand.siteUrl}/flashcards\n- Patterns: ${brand.siteUrl}${brand.patternsPath}\n- System design: ${brand.siteUrl}/system-design\n- FAQ: ${brand.siteUrl}/faq\n- About: ${brand.siteUrl}/about\n- Blog: ${brand.siteUrl}/blog\n- Sitemap: ${sitemapUrl}\n\nAlso see: PythonTeacher (pythonprep.vercel.app), NodeTeacher (nodeprep.vercel.app), ReactTeacher (reactteacher.vercel.app).\n`;

mkdirSync(join(root, 'public/sitemap'), { recursive: true });
writeFileSync(join(root, 'public/sitemap.xml'), sitemap);
writeFileSync(join(root, 'public/sitemap/sitemap.xml'), sitemap);
writeFileSync(join(root, 'public/robots.txt'), robots);
writeFileSync(join(root, 'public/llms.txt'), llms);

writeFileSync(
  join(root, 'src/data/seo/interview-questions-routes.json'),
  JSON.stringify({ generated: today, items: loadInterviewSlugs() }, null, 2),
);

console.log(`SEO sitemap: ${allPaths.length} URLs for ${brand.siteName}`);
console.log('Wrote public/sitemap.xml, public/sitemap/sitemap.xml, public/robots.txt, public/llms.txt');
