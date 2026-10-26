import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Heart, MessageCircle, Play } from 'lucide-react';
import '../styles/Feed.css';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [bookmarkedPosts, setBookmarkedPosts] = useState(() => {
    const saved = localStorage.getItem('bookmarkedPosts');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedPost, setSelectedPost] = useState(null);
  const [likedPosts, setLikedPosts] = useState({});
  const observer = useRef();

  const fetchPosts = async (pageNumber) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://picsum.photos/v2/list?page=${pageNumber}&limit=30`
      );
      const data = await response.json();
      setPosts((prev) => [...prev, ...data]);
    } catch (err) {
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const lastPostRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) setPage((prev) => prev + 1);
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  const toggleBookmark = (post, e) => {
    e.stopPropagation();
    let updated;
    if (bookmarkedPosts.some((p) => p.id === post.id)) {
      updated = bookmarkedPosts.filter((p) => p.id !== post.id);
    } else {
      updated = [...bookmarkedPosts, post];
    }
    setBookmarkedPosts(updated);
    localStorage.setItem('bookmarkedPosts', JSON.stringify(updated));
  };

  const isBookmarked = (id) => bookmarkedPosts.some((p) => p.id === id);

  const toggleLike = (postId, e) => {
    e.stopPropagation();
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  return (
    <div className="explore-container">
      <div className="explore-grid">
        {posts.map((post, i) => {
          const isLast = i === posts.length - 1;
          const isVideo = Math.random() > 0.85;
          
          return (
            <div
              className="explore-card"
              key={post.id}
              ref={isLast ? lastPostRef : null}
              onClick={() => setSelectedPost(post)}
            >
              <img src={post.download_url} alt={post.author} loading="lazy" />
              
              {isVideo && (
                <div className="reel-icon">
                  <Play size={20} fill="white" />
                </div>
              )}
              
              <button
                className={`bookmark-btn ${isBookmarked(post.id) ? 'bookmarked' : ''}`}
                onClick={(e) => toggleBookmark(post, e)}
                aria-label="Bookmark"
              >
                {isBookmarked(post.id) ? '★' : '☆'}
              </button>
              
              <div className="card-overlay">
                <span className="overlay-stat">
                  <Heart 
                    size={18} 
                    fill={likedPosts[post.id] ? '#ed4956' : 'white'}
                  />
                  {Math.floor(Math.random() * 5000).toLocaleString()}
                </span>
                <span className="overlay-stat">
                  <MessageCircle size={18} fill="white" />
                  {Math.floor(Math.random() * 100)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {loading && (
        <div className="loader">
          <div className="spinner"></div>
        </div>
      )}

      {selectedPost && (
        <div className="modal" onClick={() => setSelectedPost(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="close-btn" 
              onClick={() => setSelectedPost(null)}
              aria-label="Close"
            >
              ×
            </button>
            <img src={selectedPost.download_url} alt={selectedPost.author} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;
