import { Link } from 'react-router-dom';

export function GetStartedPathSection() {
  return (
    <section className="get-started-section get-started-path">
      <h2>Two ways to use PythonTeacher</h2>
      <div className="get-started-path-grid">
        <div className="get-started-path-card">
          <h3>Study here</h3>
          <p>
            Read challenges, study flashcards, explore Python patterns, and browse system design in the sidebar. No
            download required.
          </p>
          <p className="get-started-path-cta">
            <Link to="/flashcards">Try flashcards</Link> or{' '}
            <Link to="/challenges">browse challenges</Link>.
          </p>
        </div>
        <div className="get-started-path-card">
          <h3>Coding challenges on your computer</h3>
          <p>
            You need your own project folder (
            <a
              href="https://github.com/betexcr/python-teacher"
              target="_blank"
              rel="noopener noreferrer"
            >
              clone this repo
            </a>{' '}
            or create a new Python project with <code>uv init</code>). You write code in an editor like Cursor,
            run tests locally, and read the challenge text here in the browser.
          </p>
          <p className="get-started-path-cta">Follow the steps below when you are ready to code.</p>
        </div>
      </div>
    </section>
  );
}
