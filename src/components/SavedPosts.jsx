import React, { useEffect, useState } from "react";
import "../styles/SavedPosts.css";

const Saved = () => {
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("bookmarkedPosts");
    if (saved) {
      setSavedPosts(JSON.parse(saved));
    }
  }, []);

  const removeBookmark = (postId) => {
    const updatedPosts = savedPosts.filter((post) => post.id !== postId);
    setSavedPosts(updatedPosts);
    localStorage.setItem("bookmarkedPosts", JSON.stringify(updatedPosts));
  };

  return (
    <div className="saved-container">
      <div className="saved">
        <h2>Saved Posts 📌</h2>

        {savedPosts.length === 0 ? (
          <div className="empty-state">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076500.png"
              alt="No saved posts"
            />
            <p>You haven’t saved any posts yet!</p>
            <small>Go explore and bookmark your favorites ⭐️</small>
          </div>
        ) : (
          <div className="saved-grid">
            {savedPosts.map((post) => (
              <div className="saved-item" key={post.id}>
                <img src={post.download_url} alt={post.author} />
                <div className="saved-item-info">
                  <p>{post.author}</p>
                  <button
                    className="remove-btn"
                    onClick={() => removeBookmark(post.id)}
                  >
                    Remove ❌
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Saved;
