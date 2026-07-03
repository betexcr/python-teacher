import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { searchContent } from '../hooks/useTrackProgress';

export function SiteSearch() {
  const [query, setQuery] = useState('');
  const results = useMemo(() => searchContent(query), [query]);

  return (
    <div className="site-search">
      <label className="site-search-label" htmlFor="site-search-input">
        Search
      </label>
      <input
        id="site-search-input"
        type="search"
        className="site-search-input"
        placeholder="Challenges, flashcards, patterns…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoComplete="off"
      />
      {query.trim() && (
        <ul className="site-search-results">
          {results.length === 0 ? (
            <li className="site-search-empty">No matches</li>
          ) : (
            results.map((r) => (
              <li key={`${r.href}-${r.title}`}>
                <Link to={r.href} className="site-search-result" onClick={() => setQuery('')}>
                  <span className="site-search-result-title">{r.title}</span>
                  <span className="site-search-result-meta">
                    {r.section} · {r.subtitle}
                  </span>
                </Link>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
