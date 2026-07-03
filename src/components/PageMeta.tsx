import { useLocation } from 'react-router-dom';
import { getPageMeta, ogImageUrl, SITE_NAME, SITE_URL } from '../data/seo';

export function PageMeta() {
  const { pathname } = useLocation();
  const meta = getPageMeta(pathname);
  const image = ogImageUrl(meta.ogImageId);
  const canonical = `${SITE_URL}${pathname === '/' ? '/get-started' : pathname}`;

  return (
    <>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={meta.title} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={image} />
    </>
  );
}
