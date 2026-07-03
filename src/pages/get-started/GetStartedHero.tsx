import { Link } from 'react-router-dom';
import { SITE_NAME } from '../../config/brand';

export function GetStartedHero() {
  return (
    <header className="get-started-hero">
      <h1 className="page-title">Get Started</h1>
      <p className="get-started-lead">
        <strong>{SITE_NAME}</strong> is Python interview prep you can start immediately — challenges,
        flashcards, Python patterns, and system design walkthroughs, no install required. Your progress saves in
        this browser; no account needed.
      </p>
      <p className="get-started-lead get-started-lead--secondary">
        New to Python? Skim <Link to="/python-basics">Python Basics</Link> first, then try the{' '}
        <Link to="/challenges">easy challenges</Link>. To write code locally, set up a project on your
        machine — flashcards and system design work fully here without that step.
      </p>
    </header>
  );
}
