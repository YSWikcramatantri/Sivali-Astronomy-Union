
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './contexts/AppContext';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import RegisterPage from './components/RegisterPage';
import QuizLoginPage from './components/QuizLoginPage';
import QuizPage from './components/QuizPage';
import AdminPage from './components/AdminPage';

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/quiz" element={<QuizLoginPage />} />
            <Route path="/quiz/start" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
            <Route path="/sivali-admin-portal-7b3d9f" element={<AdminPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </HashRouter>
    </AppProvider>
  );
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { currentParticipantId } = useAppContext();
    if (!currentParticipantId) {
        return <Navigate to="/quiz" replace />;
    }
    return <>{children}</>;
};

export default App;
