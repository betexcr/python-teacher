import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PageMeta } from './components/PageMeta';
import { AppLayout } from './layout/AppLayout';
import { ChallengeDetailPage } from './pages/ChallengeDetailPage';
import { ChallengesPage } from './pages/ChallengesPage';
import { FlashcardStudyPage } from './pages/FlashcardStudyPage';
import { FlashcardsPage } from './pages/FlashcardsPage';
import { GetStartedPage } from './pages/GetStartedPage';
import { PythonBasicsPage } from './pages/PythonBasicsPage';
import { PythonPatternDetailPage } from './pages/PythonPatternDetailPage';
import { PythonPatternsPage } from './pages/PythonPatternsPage';
import { SystemDesignDetailPage } from './pages/SystemDesignDetailPage';
import { SystemDesignPage } from './pages/SystemDesignPage';
import './styles/app.css';

const AboutPage = lazy(() =>
  import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })),
);
const FaqPage = lazy(() => import('./pages/FaqPage').then((m) => ({ default: m.FaqPage })));
const BlogIndexPage = lazy(() =>
  import('./pages/BlogIndexPage').then((m) => ({ default: m.BlogIndexPage })),
);
const BlogArticlePage = lazy(() =>
  import('./pages/BlogArticlePage').then((m) => ({ default: m.BlogArticlePage })),
);
const InterviewQuestionPage = lazy(() =>
  import('./pages/InterviewQuestionPage').then((m) => ({ default: m.InterviewQuestionPage })),
);
const ComparePage = lazy(() =>
  import('./pages/ComparePage').then((m) => ({ default: m.ComparePage })),
);

function App() {
  return (
    <>
      <PageMeta />
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to="/get-started" replace />} />
          <Route path="get-started" element={<GetStartedPage />} />
          <Route path="python-basics" element={<PythonBasicsPage />} />
          <Route path="challenges/:difficulty/:slug" element={<ChallengeDetailPage />} />
          <Route path="challenges/:difficulty" element={<ChallengesPage />} />
          <Route path="challenges" element={<ChallengesPage />} />
          <Route path="flashcards" element={<FlashcardsPage />} />
          <Route path="flashcards/:slug" element={<FlashcardStudyPage />} />
          <Route path="python-patterns" element={<PythonPatternsPage />} />
          <Route path="python-patterns/:slug" element={<PythonPatternDetailPage />} />
          <Route path="system-design" element={<SystemDesignPage />} />
          <Route path="system-design/:slug" element={<SystemDesignDetailPage />} />
          <Route
            path="about"
            element={
              <Suspense fallback={null}>
                <AboutPage />
              </Suspense>
            }
          />
          <Route
            path="faq"
            element={
              <Suspense fallback={null}>
                <FaqPage />
              </Suspense>
            }
          />
          <Route
            path="blog"
            element={
              <Suspense fallback={null}>
                <BlogIndexPage />
              </Suspense>
            }
          />
          <Route
            path="blog/:slug"
            element={
              <Suspense fallback={null}>
                <BlogArticlePage />
              </Suspense>
            }
          />
          <Route
            path="interview-questions/:slug"
            element={
              <Suspense fallback={null}>
                <InterviewQuestionPage />
              </Suspense>
            }
          />
          <Route
            path="compare/:slug"
            element={
              <Suspense fallback={null}>
                <ComparePage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
