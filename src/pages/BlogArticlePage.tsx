import { Link, useParams } from 'react-router-dom';
import { JsonLd } from '../components/JsonLd';
import { getBlogArticle } from '../config/seo-content';
import { useRouteScrollTop } from '../hooks/useRouteScrollTop';

function renderParagraphs(body: string) {
  return body.split(/\n\n+/).map((block, i) => {
    if (block.startsWith('## ')) {
      return (
        <h2 key={i} className="blog-heading">
          {block.replace(/^##\s+/, '')}
        </h2>
      );
    }
    return (
      <p key={i} className="get-started-section-intro">
        {block}
      </p>
    );
  });
}

export function BlogArticlePage() {
  useRouteScrollTop();
  const { slug = '' } = useParams();
  const article = getBlogArticle(slug);

  if (!article) {
    return (
      <article className="get-started">
        <p>Article not found.</p>
        <Link to="/blog">Back to blog</Link>
      </article>
    );
  }

  return (
    <article className="get-started seo-page blog-article">
      <JsonLd
        learningResource={{ name: article.title, description: article.description }}
        breadcrumbs={[
          { name: 'Blog', path: '/blog' },
          { name: article.title },
        ]}
      />
      <Link to="/blog" className="sd-back-link">
        ← Blog
      </Link>
      <p className="blog-pillar-label">{article.pillar}</p>
      <h1 className="page-title">{article.title}</h1>
      <p className="get-started-lead get-started-lead--secondary">{article.description}</p>
      <div className="blog-body">{renderParagraphs(article.body)}</div>
    </article>
  );
}
