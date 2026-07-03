import { useRouteScrollTop } from '../hooks/useRouteScrollTop';
import { ProgressDashboard } from '../components/ProgressDashboard';
import { SiteSearch } from '../components/SiteSearch';
import { GetStartedAiSection } from './get-started/GetStartedAiSection';
import { GetStartedBrowserSection } from './get-started/GetStartedBrowserSection';
import { GetStartedFooter } from './get-started/GetStartedFooter';
import { GetStartedHero } from './get-started/GetStartedHero';
import { GetStartedLocalSetup } from './get-started/GetStartedLocalSetup';
import { GetStartedPathSection } from './get-started/GetStartedPathSection';

export function GetStartedPage() {
  useRouteScrollTop();

  return (
    <article className="get-started">
      <GetStartedHero />
      <SiteSearch />
      <ProgressDashboard />
      <GetStartedPathSection />
      <GetStartedBrowserSection />
      <GetStartedAiSection />
      <GetStartedLocalSetup />
      <GetStartedFooter />
    </article>
  );
}
