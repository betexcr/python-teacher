import { Link, useParams } from 'react-router-dom';
import challengesIndex from '../data/challenges-index.json';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { JsonLd } from '../components/JsonLd';
import { RelatedPrepLinks } from '../components/RelatedPrepLinks';
import type { Difficulty } from '../lib/challenges';
import { useRouteScrollTop } from '../hooks/useRouteScrollTop';

function findBySlug(slug: string) {
  for (const [difficulty, items] of Object.entries(challengesIndex)) {
    const item = (items as { slug: string; title: string; acceptance: { summary: string }[] }[]).find(
      (c) => c.slug === slug,
    );
    if (item) return { difficulty: difficulty as Difficulty, ...item };
  }
  return undefined;
}

export function InterviewQuestionPage() {
  useRouteScrollTop();
  const { slug = '' } = useParams();
  const item = findBySlug(slug);

  if (!item) {
    return (
      <article className="get-started">
        <p>Interview question not found.</p>
        <Link to="/challenges">Browse challenges</Link>
      </article>
    );
  }

  return (
    <article className="get-started seo-page">
      <JsonLd
        learningResource={{
          name: `${item.title} — Python Interview Question`,
          description: `Practice ${item.title} with acceptance criteria and solution on PythonTeacher.`,
        }}
        breadcrumbs={[
          { name: 'Interview Questions', path: '/challenges' },
          { name: item.title },
        ]}
      />
      <Breadcrumbs
        items={[
          { name: 'Challenges', path: '/challenges' },
          { name: item.title },
        ]}
      />
      <h1 className="page-title">{item.title} Interview Question</h1>
      <p className="get-started-lead">
        Practice this {item.difficulty} Python coding challenge with acceptance criteria and a
        reference solution.
      </p>
      <section className="get-started-section">
        <h2>What to verify</h2>
        <ul className="get-started-pointers">
          {item.acceptance.map((c) => (
            <li key={c.summary}>{c.summary}</li>
          ))}
        </ul>
      </section>
      <p className="get-started-path-cta">
        <Link to={`/challenges/${item.difficulty}/${item.slug}`}>Open full challenge →</Link>
      </p>
      <RelatedPrepLinks />
    </article>
  );
}
