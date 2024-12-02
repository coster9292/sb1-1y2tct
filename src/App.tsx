import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { LandingPage } from './pages/LandingPage';
import { HomePage } from './pages/HomePage';
// import { CarListingPage } from './pages/CarListingPage';
import { CarDetailsPage } from './pages/CarDetailsPage';
// import { SmartNegotiatorPage } from './pages/SmartNegotiatorPage';
import { AutoAgentPage2 } from './pages/AutoAgentPage2';
import { NegotiationsPage } from './pages/NegotiationsPage';
import { ChatPage } from './pages/ChatPage';
import { SettingsPage } from './pages/SettingsPage';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { useAuth } from './contexts/AuthContext';

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {user && <Header />}
      <Routes>
        <Route path="/" element={!user ? <LandingPage /> : <HomePage />} />
        <Route path="/cars/:carId" element={<ProtectedRoute><CarDetailsPage /></ProtectedRoute>} />
        <Route path="/auto-agent" element={<ProtectedRoute><AutoAgentPage2 /></ProtectedRoute>} />
        <Route path="/negotiations/:carIds" element={<ProtectedRoute><NegotiationsPage /></ProtectedRoute>} />
        <Route path="/chat/:carId" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
        <Route path="*" element={!user ? <LandingPage /> : <HomePage />} />
      </Routes>
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}