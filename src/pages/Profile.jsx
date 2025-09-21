import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/Profile.css";

const Profile = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [reels, setReels] = useState([]);
  const [tagged, setTagged] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [activeTab, setActiveTab] = useState("posts");

  useEffect(() => {
    setUserData({
      username: username || "pix_user",
      avatar: `https://i.pravatar.cc/150?u=${username}`,
      bio: "📸 Sharing my vibes with the world 🌍✨",
      followers: Math.floor(Math.random() * 1000) + 100,
      following: Math.floor(Math.random() * 500) + 50,
    });

    // Fake API for posts, reels, and tagged
    fetch(
      `https://picsum.photos/v2/list?page=${
        Math.floor(Math.random() * 5) + 1
      }&limit=9`
    )
      .then((res) => res.json())
      .then((data) => setPosts(data));

    fetch(
      `https://picsum.photos/v2/list?page=${
        Math.floor(Math.random() * 5) + 6
      }&limit=6`
    )
      .then((res) => res.json())
      .then((data) => setReels(data));

    fetch(
      `https://picsum.photos/v2/list?page=${
        Math.floor(Math.random() * 5) + 10
      }&limit=4`
    )
      .then((res) => res.json())
      .then((data) => setTagged(data));
  }, [username]);

  if (!userData) return <p className="loading">Loading profile...</p>;

  const renderContent = () => {
    const data =
      activeTab === "posts" ? posts : activeTab === "reels" ? reels : tagged;

    if (data.length === 0) return <p className="no-posts">No {activeTab} yet.</p>;

    return (
      <div className="profile-posts-grid">
        {data.map((item) => (
          <div
            className="profile-post"
            key={item.id}
            onClick={() => setSelectedPost(item.download_url)}
          >
            <img src={item.download_url} alt="Post" />
            {activeTab === "reels" && <span className="reel-icon">🎥</span>}
            {activeTab === "tagged" && <span className="tagged-icon">🏷</span>}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="profile-container">
      {/* --- Header --- */}
      <div className="profile-header">
        <img src={userData.avatar} alt={userData.username} className="profile-pic" />
        <div className="profile-main">
          <div className="profile-top">
            <h2>@{userData.username}</h2>
            <div className="profile-actions">
              <button className="follow-btn">Follow</button>
              <button className="message-btn">Message</button>
              <button className="more-btn">⋯</button>
            </div>
          </div>

          <div className="profile-stats">
            <span><strong>{posts.length}</strong> posts</span>
            <span><strong>{userData.followers}</strong> followers</span>
            <span><strong>{userData.following}</strong> following</span>
          </div>

          <p className="profile-bio">{userData.bio}</p>
        </div>
      </div>

      {/* --- Highlights --- */}
      <div className="highlights">
        {["Travel", "Friends", "Work"].map((h, index) => (
          <div className="highlight" key={index}>
            <div className="highlight-circle">
              <img src={`https://i.pravatar.cc/80?img=${index + 5}`} alt={h} />
            </div>
            <span>{h}</span>
          </div>
        ))}
      </div>

      {/* --- Tabs (Posts / Reels / Tagged) --- */}
      <div className="profile-tabs">
        <button
          className={activeTab === "posts" ? "active" : ""}
          onClick={() => setActiveTab("posts")}
        >
          📷 Posts
        </button>
        <button
          className={activeTab === "reels" ? "active" : ""}
          onClick={() => setActiveTab("reels")}
        >
          🎥 Reels
        </button>
        <button
          className={activeTab === "tagged" ? "active" : ""}
          onClick={() => setActiveTab("tagged")}
        >
          🏷 Tagged
        </button>
      </div>

      {/* --- Grid Content --- */}
      {renderContent()}

      {/* --- Modal --- */}
      {selectedPost && (
        <div className="modal" onClick={() => setSelectedPost(null)}>
          <img src={selectedPost} alt="Full Post" className="modal-image" />
        </div>
      )}
    </div>
  );
};

export default Profile;
