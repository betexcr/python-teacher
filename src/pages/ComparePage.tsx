import { Link, useParams } from 'react-router-dom';
import { JsonLd } from '../components/JsonLd';
import { COMPARE_PAGES } from '../config/seo-content';
import { useRouteScrollTop } from '../hooks/useRouteScrollTop';

export function ComparePage() {
  useRouteScrollTop();
  const { slug = '' } = useParams();
  const page = COMPARE_PAGES[slug];

  if (!page) {
    return (
      <article className="get-started">
        <p>Comparison not found.</p>
        <Link to="/get-started">Get Started</Link>
      </article>
    );
  }

  return (
    <article className="get-started seo-page">
      <JsonLd
        learningResource={{ name: page.title, description: page.description }}
        breadcrumbs={[{ name: 'Compare', path: '/get-started' }, { name: page.title }]}
      />
      <h1 className="page-title">{page.title}</h1>
      <p className="get-started-lead">{page.description}</p>
      <p className="get-started-section-intro">{page.body}</p>
      <p className="get-started-path-cta">
        <Link to="/get-started">Try PythonTeacher free →</Link>
      </p>
    </article>
  );
}
