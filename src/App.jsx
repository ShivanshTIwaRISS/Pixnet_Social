// src/App.jsx (full updated file)
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Feed from "./components/Feed";
import Home from "./components/Home";
import SavedPosts from "./components/SavedPosts";
import Notification from "./components/Notifications";
import Profile from "./pages/Profile";
import Upload from "./components/UploadPost";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import UserProfile from "./components/UserProfile";

import "./App.css";

function Layout({ children, onOpenUpload }) {
  const location = useLocation();
  // hide navbar for auth flows
  const hideNavbar = ["/login", "/register", "/forgot", "/reset-password"].includes(
    location.pathname.split("?")[0]
  );

  return (
    <>
      {!hideNavbar && <Navbar onOpenUpload={onOpenUpload} />}
      <div className="main-content">{children}</div>
    </>
  );
}

function App() {
  const [notification, setNotification] = useState("");
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const showNotification = (message) => setNotification(message);
  const clearNotification = () => setNotification("");

  return (
    <Router>
      <Notification message={notification} clearNotification={clearNotification} />
      {isUploadOpen && <Upload onClose={() => setIsUploadOpen(false)} />}

      <Layout onOpenUpload={() => setIsUploadOpen(true)}>
        <Routes>
          {/* Public / Auth */}
          <Route path="/login" element={<Login showNotification={showNotification} />} />
          <Route path="/register" element={<Register showNotification={showNotification} />} />
          <Route path="/forgot" element={<ForgotPassword showNotification={showNotification} />} />
          <Route path="/reset-password" element={<ResetPassword showNotification={showNotification} />} />
          <Route path="/user/:username" element={<UserProfile />} />

          {/* Protected */}
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
                <Feed showNotification={showNotification} />
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
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
