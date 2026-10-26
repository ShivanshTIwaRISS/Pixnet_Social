import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  X,
  Smile,
} from 'lucide-react';
import '../styles/Home.css';
import { Link } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState([]);
  const [myPosts, setMyPosts] = useState(
    JSON.parse(localStorage.getItem('myPosts')) || []
  );
  const [stories, setStories] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [savedPosts, setSavedPosts] = useState(
    JSON.parse(localStorage.getItem('savedPosts')) || []
  );
  const [selectedPost, setSelectedPost] = useState(null);
  const [showShare, setShowShare] = useState(null);
  const [toast, setToast] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [shareUsers, setShareUsers] = useState([]);
  const [likedAnimations, setLikedAnimations] = useState({});
  const observerRef = useRef(null);

  useEffect(() => {
    fetchPosts(page);
    fetchStories();
    fetchSuggestions();
    fetchShareUsers();
  }, []);

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [loading]);

  useEffect(() => {
    if (page > 1) {
      fetchPosts(page);
    }
  }, [page]);

  const fetchPosts = async (pageNum) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://picsum.photos/v2/list?page=${pageNum}&limit=5`
      );
      setPosts((prev) => [
        ...prev,
        ...res.data.map((p) => ({
          ...p,
          id: `${p.id}-${pageNum}`,
          username: randomUsername(),
          avatar: `https://i.pravatar.cc/40?img=${Math.floor(Math.random() * 70)}`,
          likes: Math.floor(Math.random() * 900 + 100),
          comments: [
            { user: 'alex', text: '🔥 This is amazing!' },
            { user: 'sara', text: 'Wow! 😍' },
          ],
          isLiked: false,
          type: 'api',
        })),
      ]);
    } catch (err) {
      console.error('Error fetching posts', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStories = () => {
    setStories(
      Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        user: randomUsername(),
        img: `https://picsum.photos/seed/story${i}/80/80`,
        hasStory: Math.random() > 0.3,
      }))
    );
  };

  const fetchSuggestions = () => {
    setSuggestions(
      Array.from({ length: 5 }).map((_, i) => ({
        id: i,
        name: randomUsername(),
        avatar: `https://i.pravatar.cc/40?img=${i + 20}`,
        isFollowing: false,
      }))
    );
  };

  const fetchShareUsers = () => {
    setShareUsers(
      Array.from({ length: 6 }).map((_, i) => ({
        id: i,
        name: randomUsername(),
        avatar: `https://i.pravatar.cc/40?img=${i + 40}`,
        sent: false,
      }))
    );
  };

  const randomUsername = () => {
    const names = ['neo', 'mike', 'julia', 'lisa', 'devon', 'ash', 'zoe', 'ryan'];
    return (
      names[Math.floor(Math.random() * names.length)] +
      '_' +
      Math.floor(Math.random() * 999)
    );
  };

  const toggleLike = (id) => {
    // Add heart animation
    setLikedAnimations((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setLikedAnimations((prev) => ({ ...prev, [id]: false }));
    }, 1000);

    const updateFn = (arr) =>
      arr.map((p) =>
        p.id === id
          ? {
              ...p,
              isLiked: !p.isLiked,
              likes: p.isLiked ? p.likes - 1 : p.likes + 1,
            }
          : p
      );

    setPosts((prev) => updateFn(prev));
    setMyPosts((prev) => {
      const updated = updateFn(prev);
      localStorage.setItem('myPosts', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleSave = (post) => {
    let updated;
    if (savedPosts.some((p) => p.id === post.id)) {
      updated = savedPosts.filter((p) => p.id !== post.id);
    } else {
      updated = [...savedPosts, post];
    }
    setSavedPosts(updated);
    localStorage.setItem('savedPosts', JSON.stringify(updated));
  };

  const toggleFollow = (id) => {
    setSuggestions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isFollowing: !s.isFollowing } : s))
    );
  };

  const addComment = (postId, commentText) => {
    if (!commentText.trim()) return;
    const updateFn = (arr) =>
      arr.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: [...p.comments, { user: 'you', text: commentText }],
            }
          : p
      );
    setPosts((prev) => updateFn(prev));
    setMyPosts((prev) => {
      const updated = updateFn(prev);
      localStorage.setItem('myPosts', JSON.stringify(updated));
      return updated;
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://pixnet.com/post/' + showShare.id);
    showToast('🔗 Link copied to clipboard!');
  };

  const toggleSendUser = (id) => {
    setShareUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, sent: !u.sent } : u))
    );
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  };

  // Double tap to like
  const handleDoubleTap = (e, post) => {
    if (!post.isLiked) {
      toggleLike(post.id);
    }
  };

  const allPosts = [...myPosts, ...posts];

  return (
    <div className="home-layout">
      {/* Feed */}
      <div className="feed">
        {/* Stories */}
        <div className="stories-container">
          <div className="stories-bar">
            {stories.map((s) => (
              <div key={s.id} className="story-item">
                <div className={`story-ring ${s.hasStory ? 'has-story' : ''}`}>
                  <img src={s.img} alt={s.user} className="story-avatar" />
                </div>
                <span className="story-username">{s.user}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Posts */}
        {allPosts.map((post) => (
          <article className="post-card" key={post.id}>
            {/* Post Header */}
            <header className="post-header">
              <div className="post-user">
                <Link to={`/user/${post.username}`}>
                  <img src={post.avatar} alt={post.username} className="post-avatar" />
                </Link>
                <Link to={`/user/${post.username}`} className="post-username">
                  {post.username}
                </Link>
              </div>
              <button className="post-options" aria-label="More options">
                <MoreHorizontal />
              </button>
            </header>

            {/* Post Image */}
            <div 
              className="post-image-container"
              onDoubleClick={(e) => handleDoubleTap(e, post)}
            >
              <img
                src={post.download_url || post.image}
                alt="Post"
                className="post-image"
                loading="lazy"
              />
              {likedAnimations[post.id] && (
                <div className="like-animation">
                  <Heart className="like-heart" fill="white" />
                </div>
              )}
            </div>

            {/* Post Actions */}
            <div className="post-actions">
              <div className="post-actions-left">
                <button 
                  className={`action-btn ${post.isLiked ? 'liked' : ''}`}
                  onClick={() => toggleLike(post.id)}
                  aria-label="Like"
                >
                  <Heart fill={post.isLiked ? '#ed4956' : 'none'} />
                </button>
                <button 
                  className="action-btn"
                  onClick={() => setSelectedPost(post)}
                  aria-label="Comment"
                >
                  <MessageCircle />
                </button>
                <button 
                  className="action-btn"
                  onClick={() => setShowShare(post)}
                  aria-label="Share"
                >
                  <Send />
                </button>
              </div>
              <button 
                className="action-btn"
                onClick={() => toggleSave(post)}
                aria-label="Save"
              >
                <Bookmark fill={savedPosts.some((p) => p.id === post.id) ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Post Details */}
            <div className="post-details">
              <div className="post-likes">
                {post.likes.toLocaleString()} likes
              </div>
              {post.caption && (
                <div className="post-caption">
                  <Link to={`/user/${post.username}`} className="caption-username">
                    {post.username}
                  </Link>
                  <span className="caption-text">{post.caption}</span>
                </div>
              )}
              <button 
                className="view-comments"
                onClick={() => setSelectedPost(post)}
              >
                View all {post.comments.length} comments
              </button>
              <div className="post-time">2 HOURS AGO</div>
            </div>

            {/* Add Comment */}
            <div className="post-comment-input">
              <Smile className="comment-emoji" />
              <input
                type="text"
                placeholder="Add a comment..."
                className="comment-input"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.target.value) {
                    addComment(post.id, e.target.value);
                    e.target.value = '';
                  }
                }}
              />
              <button
                className="comment-post-btn"
                onClick={(e) => {
                  const input = e.target.previousSibling;
                  if (input.value) {
                    addComment(post.id, input.value);
                    input.value = '';
                  }
                }}
              >
                Post
              </button>
            </div>
          </article>
        ))}

        {/* Loading Indicator */}
        <div ref={observerRef} className="loading-indicator">
          {loading && (
            <div className="spinner"></div>
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      <aside className="right-sidebar">
        {/* Current User */}
        <div className="sidebar-user">
          <img 
            src="https://i.pravatar.cc/56?img=3" 
            alt="Your profile" 
            className="sidebar-avatar" 
          />
          <div className="sidebar-user-info">
            <span className="sidebar-username">your_username</span>
            <span className="sidebar-name">Your Name</span>
          </div>
          <button className="switch-btn">Switch</button>
        </div>

        {/* Suggestions */}
        <div className="suggestions-section">
          <div className="suggestions-header">
            <span className="suggestions-title">Suggestions For You</span>
            <button className="see-all-btn">See All</button>
          </div>
          <div className="suggestions-list">
            {suggestions.map((u) => (
              <div key={u.id} className="suggestion-item">
                <img src={u.avatar} alt={u.name} className="suggestion-avatar" />
                <div className="suggestion-info">
                  <span className="suggestion-username">{u.name}</span>
                  <span className="suggestion-subtitle">Suggested for you</span>
                </div>
                <button 
                  className={`follow-btn ${u.isFollowing ? 'following' : ''}`}
                  onClick={() => toggleFollow(u.id)}
                >
                  {u.isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="sidebar-footer">
          <div className="footer-links">
            <a href="#">About</a>
            <a href="#">Help</a>
            <a href="#">Press</a>
            <a href="#">API</a>
            <a href="#">Jobs</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
          <div className="footer-copyright">
            © 2024 PIXNET
          </div>
        </footer>
      </aside>

      {/* Comments Modal */}
      {selectedPost && (
        <div className="modal-overlay" onClick={() => setSelectedPost(null)}>
          <div className="comment-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-image-section">
              <img
                src={selectedPost.download_url || selectedPost.image}
                alt="Post"
                className="modal-image"
              />
            </div>
            <div className="modal-comments-section">
              <div className="modal-header">
                <img src={selectedPost.avatar} alt={selectedPost.username} className="modal-avatar" />
                <span className="modal-username">{selectedPost.username}</span>
                <button 
                  className="modal-close"
                  onClick={() => setSelectedPost(null)}
                  aria-label="Close"
                >
                  <X />
                </button>
              </div>
              <div className="comments-list">
                {selectedPost.comments.map((c, i) => (
                  <div key={i} className="comment-item">
                    <span className="comment-user">{c.user}</span>
                    <span className="comment-text">{c.text}</span>
                  </div>
                ))}
              </div>
              <div className="modal-comment-input">
                <Smile className="modal-emoji" />
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="modal-input"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.target.value) {
                      addComment(selectedPost.id, e.target.value);
                      e.target.value = '';
                    }
                  }}
                />
                <button
                  className="modal-post-btn"
                  onClick={(e) => {
                    const input = e.target.previousSibling;
                    if (input.value) {
                      addComment(selectedPost.id, input.value);
                      input.value = '';
                    }
                  }}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShare && (
        <div className="modal-overlay" onClick={() => setShowShare(null)}>
          <div className="share-modal" onClick={(e) => e.stopPropagation()}>
            <div className="share-header">
              <h3>Share Post</h3>
              <button className="modal-close" onClick={() => setShowShare(null)}>
                <X />
              </button>
            </div>
            <div className="share-users">
              {shareUsers.map((u) => (
                <div key={u.id} className="share-user">
                  <img src={u.avatar} alt={u.name} className="share-avatar" />
                  <span className="share-username">{u.name}</span>
                  <button
                    className={`send-btn ${u.sent ? 'sent' : ''}`}
                    onClick={() => toggleSendUser(u.id)}
                  >
                    {u.sent ? 'Sent' : 'Send'}
                  </button>
                </div>
              ))}
            </div>
            <div className="share-divider" />
            <button className="copy-link-btn" onClick={handleCopyLink}>
              <span>🔗 Copy Link</span>
            </button>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

export default Home;
