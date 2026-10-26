import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Bookmark, Plus } from 'lucide-react';
import '../styles/SavedPosts.css';

const SavedPosts = ({ showNotification }) => {
  const [savedPosts, setSavedPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedPosts')) || [];
    setSavedPosts(saved);
  }, []);

  const handleRemove = (postId) => {
    const updated = savedPosts.filter((p) => p.id !== postId);
    setSavedPosts(updated);
    localStorage.setItem('savedPosts', JSON.stringify(updated));
    showNotification?.('Post removed from saved');
  };

  return (
    <div className="saved-page">
      <div className="saved-container">
        <div className="saved-header">
          <h1>Saved</h1>
          <span className="saved-count">{savedPosts.length} posts</span>
        </div>

        {/* Collections */}
        <div className="collections-section">
          <div className="collections-header">
            <h2 className="collections-title">Collections</h2>
            <button className="new-collection-btn">
              <Plus size={16} />
              New
            </button>
          </div>
          <div className="collections-grid">
            <div className="collection-card">
              <div className="collection-cover">
                <img src="https://picsum.photos/200/200?random=100" alt="All Posts" />
              </div>
              <div className="collection-name">All Posts</div>
              <div className="collection-count">{savedPosts.length} posts</div>
            </div>
          </div>
        </div>

        {/* Saved Posts Grid */}
        {savedPosts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <Bookmark size={40} />
            </div>
            <h3>Save posts</h3>
            <p>Save photos and videos that you want to see again.</p>
          </div>
        ) : (
          <div className="saved-grid">
            {savedPosts.map((post, index) => (
              <div
                key={post.id || index}
                className="saved-post-card"
                onClick={() => setSelectedPost(post)}
              >
                <img
                  src={post.download_url || post.mediaUrl || post.image}
                  alt="Saved post"
                />
                <div className="saved-post-overlay">
                  <span className="saved-stat">
                    <Heart size={18} fill="white" />
                    {post.likes?.toLocaleString() || Math.floor(Math.random() * 1000)}
                  </span>
                  <span className="saved-stat">
                    <MessageCircle size={18} fill="white" />
                    {Math.floor(Math.random() * 100)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {selectedPost && (
          <div 
            className="modal" 
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}
            onClick={() => setSelectedPost(null)}
          >
            <img 
              src={selectedPost.download_url || selectedPost.mediaUrl || selectedPost.image}
              alt="Post"
              style={{ maxWidth: '90%', maxHeight: '90vh', objectFit: 'contain' }}
            />
            <button 
              style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', color: 'white', fontSize: 48, cursor: 'pointer' }}
              onClick={() => setSelectedPost(null)}
            >
              ×
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedPosts;
