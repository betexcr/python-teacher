import { Link } from 'react-router-dom';
import { SITE_NAME } from '../../config/brand';
import { SEO_STATS } from '../../config/seo-content';

export function GetStartedHero() {
  return (
    <header className="get-started-hero">
      <h1 className="page-title">
        Free Python Interview Prep: Challenges, Flashcards &amp; System Design
      </h1>
      <p className="get-started-lead">
        Master Python fundamentals, APIs, and backend system design for your next interview — free,
        in-browser, no signup. <strong>{SITE_NAME}</strong> includes {SEO_STATS.challenges} challenges,{' '}
        {SEO_STATS.flashcards}+ flashcards, and guided walkthroughs. Progress saves in this browser.
      </p>
      <p className="get-started-lead get-started-lead--secondary">
        New to Python? Skim <Link to="/python-basics">Python Basics</Link> first, then try the{' '}
        <Link to="/challenges">easy challenges</Link>. To write code locally, set up a project on your
        machine — flashcards and system design work fully here without that step.
      </p>
    </header>
  );
}
