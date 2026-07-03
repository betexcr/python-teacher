import { Link } from 'react-router-dom';

export function GetStartedFooter() {
  return (
    <>
      <section className="get-started-section">
        <h2>Official docs</h2>
        <ul className="get-started-links">
          <li>
            <a href="https://docs.python.org/3/tutorial/" target="_blank" rel="noopener noreferrer">
              Python — Tutorial
            </a>
          </li>
          <li>
            <a href="https://docs.pytest.org/" target="_blank" rel="noopener noreferrer">
              pytest — Documentation
            </a>
          </li>
          <li>
            <a href="https://fastapi.tiangolo.com/" target="_blank" rel="noopener noreferrer">
              FastAPI — Documentation
            </a>
          </li>
        </ul>
      </section>

      <section className="get-started-section get-started-section--compact">
        <h2>Other sections</h2>
        <ul className="get-started-pointers">
          <li>
            <Link to="/flashcards">Flashcards</Link> — interview Q&amp;A; works entirely in the browser.
          </li>
          <li>
            <Link to="/python-patterns">Python Patterns</Link> — idioms and design patterns with copyable examples.
          </li>
          <li>
            <Link to="/system-design">System Design</Link> — backend architecture guides; no local setup required.
          </li>
        </ul>
      </section>

      <footer className="get-started-cta">
        <Link to="/challenges" className="get-started-cta-btn primary">
          Browse Challenges
        </Link>
        <Link to="/flashcards" className="get-started-cta-btn">
          Study Flashcards
        </Link>
      </footer>
    </>
  );
}
