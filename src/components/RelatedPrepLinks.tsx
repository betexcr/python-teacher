import { Link } from 'react-router-dom';

type RelatedLink = { href: string; label: string };

const DEFAULT_RELATED: RelatedLink[] = [
  { href: '/flashcards/fundamentals', label: 'Python fundamentals flashcards' },
  { href: '/python-patterns/decorators', label: 'Decorators pattern' },
  { href: '/system-design/rate-limited-api', label: 'Rate-limited API system design' },
];

export function RelatedPrepLinks({ links = DEFAULT_RELATED }: { links?: RelatedLink[] }) {
  return (
    <section className="related-prep-links get-started-section--compact">
      <h2 className="related-prep-links-title">Related prep</h2>
      <ul className="get-started-pointers">
        {links.map((link) => (
          <li key={link.href}>
            <Link to={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
