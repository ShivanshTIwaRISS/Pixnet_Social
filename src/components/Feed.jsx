import React, { useEffect, useState } from "react";
import "../styles/Feed.css";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [bookmarkedPosts, setBookmarkedPosts] = useState(() => {
    const saved = localStorage.getItem("bookmarkedPosts");
    return saved ? JSON.parse(saved) : [];
  });

  const fetchPosts = async (pageNumber) => {
    setLoading(true);
    try {
      const response = await fetch(`https://picsum.photos/v2/list?page=${pageNumber}&limit=12`);
      const data = await response.json();
      setPosts((prevPosts) => [...prevPosts, ...data]);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const toggleBookmark = (post) => {
    let updatedBookmarks;
    if (bookmarkedPosts.some((item) => item.id === post.id)) {
      updatedBookmarks = bookmarkedPosts.filter((item) => item.id !== post.id);
    } else {
      updatedBookmarks = [...bookmarkedPosts, post];
    }
    setBookmarkedPosts(updatedBookmarks);
    localStorage.setItem("bookmarkedPosts", JSON.stringify(updatedBookmarks));
  };

  const isBookmarked = (postId) => bookmarkedPosts.some((post) => post.id === postId);

  return (
    <div className="feed">
      <h2>Explore Feed</h2>

      <div className="feed-grid">
        {posts.map((post) => (
          <div className="feed-item" key={post.id}>
            <img src={post.download_url} alt={post.author} />
            <div className="feed-item-info">
              <p>{post.author}</p>
              <button
                className={`bookmark-btn ${isBookmarked(post.id) ? "bookmarked" : ""}`}
                onClick={() => toggleBookmark(post)}
              >
                {isBookmarked(post.id) ? "★" : "☆"}
              </button>
            </div>
          </div>
        ))}

        {loading &&
          Array.from({ length: 6 }).map((_, index) => (
            <div className="feed-item skeleton" key={`skeleton-${index}`}></div>
          ))}
      </div>

      {!loading && (
        <button className="load-more-btn" onClick={loadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default Feed;
