import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Feed from "./components/Feed";
import Home from "./components/Home";
import SavedPosts from "./components/SavedPosts";
import Notification from "./components/Notifications";
import Profile from "./pages/Profile";
import Upload from "./components/UploadPost"; 

import "./App.css";

function App() {
  const [notification, setNotification] = useState("");
  const [isUploadOpen, setIsUploadOpen] = useState(false); 

  const showNotification = (message) => {
    setNotification(message);
  };

  const clearNotification = () => {
    setNotification("");
  };

  return (
    <Router>
      <div className="App">
        <Navbar onOpenUpload={() => setIsUploadOpen(true)} />
        <Notification message={notification} clearNotification={clearNotification} />
        {isUploadOpen && <Upload onClose={() => setIsUploadOpen(false)} />}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home showNotification={showNotification} />} />
            <Route path="/feed" element={<Feed showNotification={showNotification} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/saved" element={<SavedPosts showNotification={showNotification} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
