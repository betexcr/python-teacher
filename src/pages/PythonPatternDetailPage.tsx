import { Link, useParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { JsonLd } from '../components/JsonLd';
import { MarkdownView } from '../components/MarkdownView';
import { RelatedPrepLinks } from '../components/RelatedPrepLinks';
import { getPythonPatternHighlights } from '../data/python-patterns/codeHighlights';
import { getPatternBySlug } from '../data/python-patterns';
import { useRouteScrollTop } from '../hooks/useRouteScrollTop';
import { useReadTracking } from '../hooks/useReadTracking';

export function PythonPatternDetailPage() {
  useRouteScrollTop();
  const { slug } = useParams<{ slug: string }>();
  const pattern = slug ? getPatternBySlug(slug) : undefined;
  useReadTracking('python-pattern', slug);

  if (!pattern) {
    return (
      <div>
        <p>Pattern not found.</p>
        <Link to="/python-patterns" className="sd-back-link">
          Back to Python Patterns
        </Link>
      </div>
    );
  }

  return (
    <article className="system-design-detail">
      <JsonLd
        learningResource={{
          name: pattern.pageTitle,
          description: pattern.subtitle,
        }}
        breadcrumbs={[
          { name: 'Python Patterns', path: '/python-patterns' },
          { name: pattern.title },
        ]}
      />
      <Breadcrumbs
        items={[
          { name: 'Python Patterns', path: '/python-patterns' },
          { name: pattern.title },
        ]}
      />
      <Link to="/python-patterns" className="sd-back-link">
        ← Python Patterns
      </Link>
      <div className="system-design-prose">
        <MarkdownView
          source={pattern.content}
          solutionHighlights={getPythonPatternHighlights(pattern.slug)}
          codeHighlightLegend="Key terms in this example"
        />
      </div>
      <RelatedPrepLinks
        links={[
          { href: `/challenges/medium/01-decorator-timing`, label: 'Decorator timing challenge' },
          { href: '/flashcards/fundamentals', label: 'Python fundamentals flashcards' },
          { href: '/system-design/rate-limited-api', label: 'Rate-limited API system design' },
        ]}
      />
    </article>
  );
}
