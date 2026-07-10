import { JsonLd } from '../components/JsonLd';
import { FAQ_ITEMS } from '../config/seo-content';
import { SITE_NAME } from '../config/brand';
import { useRouteScrollTop } from '../hooks/useRouteScrollTop';

export function FaqPage() {
  useRouteScrollTop();

  return (
    <article className="get-started seo-page">
      <JsonLd faq />
      <h1 className="page-title">{SITE_NAME} FAQ</h1>
      <p className="get-started-lead get-started-lead--secondary">
        Common questions about using {SITE_NAME} and preparing for Python interviews.
      </p>
      <div className="faq-list">
        {FAQ_ITEMS.map((item) => (
          <section key={item.question} className="faq-item get-started-section--compact">
            <h2 className="faq-question">{item.question}</h2>
            <p className="get-started-section-intro">{item.answer}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
