import { Link } from 'react-router-dom';
import { JsonLd } from '../components/JsonLd';
import { BLOG_ARTICLES } from '../config/seo-content';
import { SITE_NAME } from '../config/brand';
import { useRouteScrollTop } from '../hooks/useRouteScrollTop';

export function BlogIndexPage() {
  useRouteScrollTop();
  const pillars = BLOG_ARTICLES.filter((a) =>
    ['complete-python-interview-guide-2026', 'backend-system-design-python-interview', 'python-patterns-interview-deep-dive'].includes(a.slug),
  );

  return (
    <article className="get-started seo-page">
      <JsonLd />
      <h1 className="page-title">{SITE_NAME} Blog</h1>
      <p className="get-started-lead">
        Interview guides, study plans, and Python prep articles. Pair these with challenges and
        flashcards on the site.
      </p>
      <section className="get-started-section">
        <h2>Pillar guides</h2>
        <ul className="get-started-pointers">
          {pillars.map((article) => (
            <li key={article.slug}>
              <Link to={`/blog/${article.slug}`}>{article.title}</Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="get-started-section">
        <h2>All articles</h2>
        <ul className="get-started-pointers">
          {BLOG_ARTICLES.map((article) => (
            <li key={article.slug}>
              <Link to={`/blog/${article.slug}`}>{article.title}</Link>
              <span className="blog-article-meta"> — {article.pillar}</span>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
