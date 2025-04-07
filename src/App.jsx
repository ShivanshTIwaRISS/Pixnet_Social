import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Feed from "./components/Feed";
import Home from "./components/Home";
import SavedPosts from "./components/SavedPosts";
import Upload from "./components/UploadPost";
import Notification from "./components/Notifications";
import Profile from "./pages/Profile";

import "./App.css";

function App() {
  const [notification, setNotification] = useState("");

  const showNotification = (message) => {
    setNotification(message);
  };

  const clearNotification = () => {
    setNotification("");
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Notification message={notification} clearNotification={clearNotification} />
        <div className="main-content"></div>

        <Routes>
          <Route path="/" element={<Home showNotification={showNotification} />} />
          <Route path="/feed" element={<Feed showNotification={showNotification} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/saved" element={<SavedPosts showNotification={showNotification} />} />
          <Route path="/upload" element={<Upload showNotification={showNotification} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
