import { JsonLd } from '../components/JsonLd';
import { GITHUB_REPO, SITE_NAME, SITE_URL } from '../config/brand';
import { SEO_STATS, SITE_DESCRIPTION } from '../config/seo-content';
import { useRouteScrollTop } from '../hooks/useRouteScrollTop';

export function AboutPage() {
  useRouteScrollTop();

  return (
    <article className="get-started seo-page">
      <JsonLd />
      <h1 className="page-title">About {SITE_NAME}</h1>
      <p className="get-started-lead">{SITE_DESCRIPTION}</p>
      <section className="get-started-section">
        <h2>What we offer</h2>
        <ul className="get-started-pointers">
          <li>{SEO_STATS.challenges} hands-on coding challenges with acceptance criteria</li>
          <li>{SEO_STATS.flashcards}+ flashcards across {SEO_STATS.flashcardDecks} decks</li>
          <li>{SEO_STATS.patterns} Python pattern guides with copyable examples</li>
          <li>{SEO_STATS.systemDesign} backend system design walkthroughs</li>
          <li>Python Basics tutorial with guided tour</li>
        </ul>
      </section>
      <section className="get-started-section">
        <h2>Open source</h2>
        <p className="get-started-section-intro">
          {SITE_NAME} is maintained at{' '}
          <a href={GITHUB_REPO} rel="noopener noreferrer">
            GitHub
          </a>
          . Content is generated from source scripts so challenges and flashcards stay consistent.
        </p>
      </section>
      <section className="get-started-section">
        <h2>Contact & updates</h2>
        <p className="get-started-section-intro">
          Live at <a href={SITE_URL}>{SITE_URL}</a>. Report issues or suggest content via GitHub
          issues.
        </p>
      </section>
    </article>
  );
}
