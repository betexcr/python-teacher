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
        </Route>
      </Routes>
    </>
  );
}

export default App;
