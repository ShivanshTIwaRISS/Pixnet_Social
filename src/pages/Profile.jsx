import React, { useState, useEffect } from "react";
import "../styles/Profile.css";

const Profile = () => {
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const uploaded = localStorage.getItem("uploadedPosts");
    if (uploaded) {
      setMyPosts(JSON.parse(uploaded));
    }
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src="https://i.pravatar.cc/100"
          alt="Profile"
          className="profile-pic"
        />
        <div className="profile-info">
          <h2>@pix_user</h2>
          <p>📸 Just sharing vibes.</p>
          <div className="profile-stats">
            <span>{myPosts.length} Posts</span>
            <span>120 Followers</span>
            <span>180 Following</span>
          </div>
        </div>
      </div>

      <h3>Your Posts</h3>

      {myPosts.length === 0 ? (
        <p>You haven't uploaded anything yet.</p>
      ) : (
        <div className="my-posts-grid">
          {myPosts.map((post, index) => (
            <div className="my-post" key={index}>
              <img src={post.image} alt="Uploaded" />
              <p>{post.caption}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
