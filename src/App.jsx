import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Feed from './components/Feed';
import Home from './components/Home';
import SavedPosts from './components/SavedPosts';
import Notifications from './components/Notifications';
import Profile from './pages/Profile';
import Upload from './components/UploadPost';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute';
import Inbox from './components/Inbox';

import './App.css';

function Layout({ children, onOpenUpload }) {
  const location = useLocation();
  const hideNavbar = ['/login', '/register', '/forgot', '/reset-password'].includes(
    location.pathname.split('?')[0]
  );

  return (
    <>
      {!hideNavbar && <Navbar onOpenUpload={onOpenUpload} />}
      <div className="main-content">{children}</div>
    </>
  );
}

function App() {
  const [notification, setNotification] = useState('');
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const showNotification = (message) => setNotification(message);
  const clearNotification = () => setNotification('');

  return (
    <Router>
      {/* Global Notification Toast */}
      {notification && (
        <div 
          className="global-notification"
          onClick={clearNotification}
        >
          {notification}
        </div>
      )}

      {/* Upload Modal */}
      {isUploadOpen && <Upload onClose={() => setIsUploadOpen(false)} />}

      <Layout onOpenUpload={() => setIsUploadOpen(true)}>
        <Routes>
          {/* Public / Auth */}
          <Route path="/login" element={<Login showNotification={showNotification} />} />
          <Route path="/register" element={<Register showNotification={showNotification} />} />
          <Route path="/forgot" element={<ForgotPassword showNotification={showNotification} />} />
          <Route path="/reset-password" element={<ResetPassword showNotification={showNotification} />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home showNotification={showNotification} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/feed"
            element={
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved"
            element={
              <ProtectedRoute>
                <SavedPosts showNotification={showNotification} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inbox"
            element={
              <ProtectedRoute>
                <Inbox />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>

      {/* Global Notification Styles */}
      <style>{`
        .global-notification {
          position: fixed;
          bottom: 100px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--bg-modal);
          color: var(--text-primary);
          padding: 12px 24px;
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-lg);
          z-index: 3000;
          animation: fadeIn 0.3s ease;
          cursor: pointer;
          font-weight: 500;
        }
      `}</style>
    </Router>
  );
}

export default App;
