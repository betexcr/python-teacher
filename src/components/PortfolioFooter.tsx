import { PORTFOLIO_SITES } from '../config/seo-content';

export function PortfolioFooter() {
  return (
    <footer className="portfolio-footer">
      <p className="portfolio-footer-label">Also prep</p>
      <ul className="portfolio-footer-links">
        {PORTFOLIO_SITES.map((site) => (
          <li key={site.url}>
            {site.current ? (
              <span aria-current="page">{site.name}</span>
            ) : (
              <a href={site.url} rel="noopener noreferrer">
                {site.name}
              </a>
            )}
          </li>
        ))}
      </ul>
    </footer>
  );
}
