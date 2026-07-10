import { Link } from 'react-router-dom';

type Crumb = { name: string; path?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="seo-breadcrumbs" aria-label="Breadcrumb">
      {items.map((item, i) => (
        <span key={`${item.name}-${i}`}>
          {i > 0 && <span aria-hidden> / </span>}
          {item.path ? <Link to={item.path}>{item.name}</Link> : <span>{item.name}</span>}
        </span>
      ))}
    </nav>
  );
}
