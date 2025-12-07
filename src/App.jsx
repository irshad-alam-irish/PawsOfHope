import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './components/Layout/MainLayout';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import AnimalsList from './pages/Animals/AnimalsList';
import ReportsList from './pages/Reports/ReportsList';
import AdoptionRequestsPage from './pages/Adoptions/AdoptionRequests';
import Messages from './pages/Messages/Messages';

import UserActivity from './pages/UserActivity/UserActivity';
import NotificationsPage from './pages/Notifications/NotificationsPage';

import SettingsPage from './pages/Settings/SettingsPage';

import AnimalDetails from './pages/Animals/AnimalDetails';

import ReportDetails from './pages/Reports/ReportDetails';

import AddAnimal from './pages/Animals/AddAnimal';

// Placeholder pages for future development
const PlaceholderPage = ({ title }) => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="text-center">
      <div className="w-24 h-24 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-4xl">🚧</span>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-500">This page is coming soon!</p>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#3d2e1e',
              color: '#fff',
              borderRadius: '12px',
              padding: '12px 16px',
            },
            success: {
              iconTheme: {
                primary: '#e5a11c',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />

        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />

            {/* Animals */}
            <Route path="animals" element={<AnimalsList />} />
            <Route path="animals/add" element={<AddAnimal />} />
            <Route path="animals/adopted" element={<AnimalsList />} /> {/* Reusing list for now */}
            <Route path="animals/treatment" element={<AnimalsList />} /> {/* Reusing list for now */}
            <Route path="animals/:id" element={<AnimalDetails />} />

            {/* User Activity */}
            <Route path="user-activity" element={<UserActivity />} />
            <Route path="users/:id" element={<PlaceholderPage title="User Profile" />} />

            {/* Reports */}
            <Route path="reports" element={<ReportsList />} />
            <Route path="reports/:id" element={<ReportDetails />} />

            {/* Adoptions */}
            <Route path="adoptions" element={<AdoptionRequestsPage />} />
            <Route path="adoptions/:id" element={<PlaceholderPage title="Adoption Details" />} />

            {/* Messages */}
            <Route path="messages" element={<Messages />} />

            {/* Notifications */}
            <Route path="notifications" element={<NotificationsPage />} />

            {/* Settings */}
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Catch all - redirect to dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
