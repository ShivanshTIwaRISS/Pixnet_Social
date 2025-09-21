import React, { useEffect, useState, useRef, useCallback } from "react";
import "../styles/Feed.css";
import Upload from "./UploadPost.jsx";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [bookmarkedPosts, setBookmarkedPosts] = useState(() => {
    const saved = localStorage.getItem("bookmarkedPosts");
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedPost, setSelectedPost] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const observer = useRef();

  // Fetch posts
  const fetchPosts = async (pageNumber) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://picsum.photos/v2/list?page=${pageNumber}&limit=20`
      );
      const data = await response.json();
      setPosts((prev) => [...prev, ...data]);
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  // Infinite Scroll
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

  // Bookmark Logic
  const toggleBookmark = (post) => {
    let updated;
    if (bookmarkedPosts.some((p) => p.id === post.id)) {
      updated = bookmarkedPosts.filter((p) => p.id !== post.id);
    } else {
      updated = [...bookmarkedPosts, post];
    }
    setBookmarkedPosts(updated);
    localStorage.setItem("bookmarkedPosts", JSON.stringify(updated));
  };

  const isBookmarked = (id) => bookmarkedPosts.some((p) => p.id === id);

  return (
    <div className="explore-container">
      {/* Floating Create Post Button (like Instagram’s “+” button) */}
      <button className="create-post-btn" onClick={() => setIsUploadOpen(true)}>
        ＋
      </button>

      {/* Grid */}
      <div className="explore-grid">
        {posts.map((post, i) => {
          const isLast = i === posts.length - 1;
          return (
            <div
              className="explore-card"
              key={post.id}
              ref={isLast ? lastPostRef : null}
              onClick={() => setSelectedPost(post)}
            >
              <img src={post.download_url} alt={post.author} />
              {/* Simulated Reel Icon */}
              {Math.random() > 0.7 && <div className="reel-icon">🎥</div>}
              <button
                className={`bookmark-btn ${
                  isBookmarked(post.id) ? "bookmarked" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleBookmark(post);
                }}
              >
                {isBookmarked(post.id) ? "★" : "☆"}
              </button>
            </div>
          );
        })}
      </div>

      {loading && <div className="loader"></div>}

      {/* Modal for Enlarged Post */}
      {selectedPost && (
        <div className="modal" onClick={() => setSelectedPost(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={() => setSelectedPost(null)}>
              ✕
            </span>
            <img src={selectedPost.download_url} alt={selectedPost.author} />
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {isUploadOpen && <Upload onClose={() => setIsUploadOpen(false)} />}
    </div>
  );
};

export default Feed;
