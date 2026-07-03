import { Link, useParams } from 'react-router-dom';
import { MarkdownView } from '../components/MarkdownView';
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
    </article>
  );
}
