import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { GITHUB_REPO, SITE_NAME, SITE_URL } from '../config/brand';
import { FAQ_ITEMS, SEO_STATS } from '../config/seo-content';
import { getPageMeta } from '../data/seo';

type JsonLdProps = {
  breadcrumbs?: { name: string; path?: string }[];
  learningResource?: { name: string; description: string };
  faq?: boolean;
};

function script(data: object) {
  return JSON.stringify(data);
}

export function JsonLd({ breadcrumbs, learningResource, faq }: JsonLdProps) {
  const { pathname } = useLocation();
  const meta = getPageMeta(pathname);
  const canonical = `${SITE_URL}${pathname === '/' ? '/get-started' : pathname}`;

  const graphs = useMemo(() => {
    const items: object[] = [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        description: meta.description,
        publisher: { '@id': `${SITE_URL}/#organization` },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE_URL}/get-started?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        sameAs: [GITHUB_REPO],
      },
      {
        '@type': 'LearningResource',
        '@id': `${SITE_URL}/#learningresource`,
        name: SITE_NAME,
        description: `Free interview prep with ${SEO_STATS.challenges} challenges, ${SEO_STATS.flashcards}+ flashcards, and system design guides.`,
        educationalLevel: 'intermediate',
        isAccessibleForFree: true,
        inLanguage: 'en',
        url: SITE_URL,
      },
    ];

    if (breadcrumbs && breadcrumbs.length > 0) {
      items.push({
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: crumb.name,
          item: crumb.path ? `${SITE_URL}${crumb.path}` : undefined,
        })),
      });
    }

    if (learningResource) {
      items.push({
        '@type': 'LearningResource',
        name: learningResource.name,
        description: learningResource.description,
        url: canonical,
        isAccessibleForFree: true,
        provider: { '@id': `${SITE_URL}/#organization` },
      });
    }

    if (faq) {
      items.push({
        '@type': 'FAQPage',
        mainEntity: FAQ_ITEMS.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      });
    }

    return items;
  }, [breadcrumbs, learningResource, faq, canonical, meta.description]);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: script({ '@context': 'https://schema.org', '@graph': graphs }),
      }}
    />
  );
}
