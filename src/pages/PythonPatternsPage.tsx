import { Link } from 'react-router-dom';
import { pythonPatterns } from '../data/python-patterns';

export function PythonPatternsPage() {
  return (
    <>
      <h1 className="page-title">Python Patterns</h1>
      <p className="get-started-lead get-started-lead--secondary">
        Idioms, design patterns, and architecture techniques with copyable examples — useful for interviews
        and production Python codebases.
      </p>
      <div className="system-design-grid">
        {pythonPatterns.map((pattern) => (
          <Link
            key={pattern.slug}
            to={`/python-patterns/${pattern.slug}`}
            className="system-design-card"
          >
            <h3>{pattern.title}</h3>
            <p>{pattern.subtitle}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
