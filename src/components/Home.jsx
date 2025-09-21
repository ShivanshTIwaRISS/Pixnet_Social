import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  BookmarkCheck,
  MoreHorizontal,
  X,
  Check
} from "lucide-react";
import "../styles/Home.css";

function Home() {
  const [posts, setPosts] = useState([]);
  const [stories, setStories] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [savedPosts, setSavedPosts] = useState(() =>
    JSON.parse(localStorage.getItem("savedPosts")) || []
  );
  const [selectedPost, setSelectedPost] = useState(null);
  const [showShare, setShowShare] = useState(null);
  const [toast, setToast] = useState("");
  const [page, setPage] = useState(1);
  const [shareUsers, setShareUsers] = useState([]);

  useEffect(() => {
    fetchPosts(page);
    fetchStories();
    fetchSuggestions();
    fetchShareUsers();

    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 10 >=
        document.documentElement.scrollHeight
      ) {
        fetchPosts(page + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page]);

  const fetchPosts = async (pageNum) => {
    try {
      const res = await axios.get(`https://picsum.photos/v2/list?page=${pageNum}&limit=5`);
      setPosts((prev) => [
        ...prev,
        ...res.data.map((p) => ({
          ...p,
          username: randomUsername(),
          avatar: `https://i.pravatar.cc/40?img=${Math.floor(Math.random() * 70)}`,
          likes: Math.floor(Math.random() * 900 + 100),
          comments: [
            { user: "alex", text: "🔥 This is amazing!" },
            { user: "sara", text: "Wow! 😍" },
          ],
          isLiked: false,
        })),
      ]);
      setPage(pageNum);
    } catch (err) {
      console.error("Error fetching posts", err);
    }
  };

  const fetchStories = () => {
    setStories(
      Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        user: randomUsername(),
        img: `https://picsum.photos/seed/story${i}/80/80`,
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
    const names = ["neo", "mike", "julia", "lisa", "devon", "ash", "zoe", "ryan"];
    return names[Math.floor(Math.random() * names.length)] + "_" + Math.floor(Math.random() * 999);
  };

  const toggleLike = (id) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };

  const toggleSave = (post) => {
    let updated;
    if (savedPosts.some((p) => p.id === post.id)) {
      updated = savedPosts.filter((p) => p.id !== post.id);
    } else {
      updated = [...savedPosts, post];
    }
    setSavedPosts(updated);
    localStorage.setItem("savedPosts", JSON.stringify(updated));
  };

  const toggleFollow = (id) => {
    setSuggestions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isFollowing: !s.isFollowing } : s))
    );
  };

  const addComment = (postId, commentText) => {
    if (!commentText.trim()) return;
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, comments: [...p.comments, { user: "you", text: commentText }] }
          : p
      )
    );
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://yourapp.com/post/" + showShare.id);
    showToast("🔗 Link copied to clipboard!");
  };

  const toggleSendUser = (id) => {
    setShareUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, sent: !u.sent } : u))
    );
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  return (
    <div className="home-layout">
      {/* FEED SECTION */}
      <div className="feed">
        {/* Stories */}
        <div className="stories-bar">
          {stories.map((s) => (
            <div key={s.id} className="story">
              <img src={s.img} alt={s.user} />
              <p>{s.user}</p>
            </div>
          ))}
        </div>

        {/* Posts */}
        {posts.map((post) => (
          <div className="post-card" key={post.id}>
            <div className="post-header">
              <div className="ph-left">
                <img src={post.avatar} alt={post.username} />
                <span>{post.username}</span>
              </div>
              <MoreHorizontal className="more-icon" />
            </div>

            <img src={post.download_url} alt={post.username} className="post-img" />

            <div className="post-actions">
              <div className="left-actions">
                <Heart
                  className={post.isLiked ? "liked" : ""}
                  onClick={() => toggleLike(post.id)}
                />
                <MessageCircle onClick={() => setSelectedPost(post)} />
                <Send onClick={() => setShowShare(post)} />
              </div>
              <div className="right-actions">
                {savedPosts.some((p) => p.id === post.id) ? (
                  <BookmarkCheck onClick={() => toggleSave(post)} />
                ) : (
                  <Bookmark onClick={() => toggleSave(post)} />
                )}
              </div>
            </div>

            <p className="likes">{post.likes} likes</p>
            <p className="view-comments" onClick={() => setSelectedPost(post)}>
              View all {post.comments.length} comments
            </p>
          </div>
        ))}
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="right-sidebar">
        <h3>Suggested for you</h3>
        {suggestions.map((u) => (
          <div className="suggested-user" key={u.id}>
            <img src={u.avatar} alt={u.name} />
            <span>{u.name}</span>
            <button className="follow-btn" onClick={() => toggleFollow(u.id)}>
              {u.isFollowing ? "Following" : "Follow"}
            </button>
          </div>
        ))}
      </div>

      {/* COMMENTS MODAL */}
      {selectedPost && (
        <div className="modal-overlay" onClick={() => setSelectedPost(null)}>
          <div className="comment-modal" onClick={(e) => e.stopPropagation()}>
            <img src={selectedPost.download_url} alt="post" className="modal-img" />
            <div className="modal-comments">
              <div className="modal-header">
                <h3>Comments</h3>
                <X onClick={() => setSelectedPost(null)} />
              </div>
              <div className="comment-list">
                {selectedPost.comments.map((c, i) => (
                  <p key={i}>
                    <strong>{c.user}</strong> {c.text}
                  </p>
                ))}
              </div>
              <div className="comment-input">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addComment(selectedPost.id, e.target.value);
                      e.target.value = "";
                    }
                  }}
                />
                <button
                  onClick={(e) => {
                    const input = e.target.previousSibling;
                    addComment(selectedPost.id, input.value);
                    input.value = "";
                  }}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SHARE MODAL */}
      {showShare && (
        <div className="modal-overlay" onClick={() => setShowShare(null)}>
          <div className="share-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Share Post</h3>
              <X onClick={() => setShowShare(null)} />
            </div>
            <div className="share-options">
              <button onClick={handleCopyLink}>
                <img src="/icons/link.svg" alt="copy" /> Copy Link
              </button>
              <button onClick={() => showToast("Opening WhatsApp...")}>
                <img src="/icons/whatsapp.svg" alt="whatsapp" /> WhatsApp
              </button>
              <button onClick={() => showToast("Opening Facebook...")}>
                <img src="/icons/facebook.svg" alt="facebook" /> Facebook
              </button>
              <button onClick={() => showToast("Opening Twitter...")}>
                <img src="/icons/twitter.svg" alt="twitter" /> Twitter
              </button>
            </div>
            <hr />
            <h4>Send to</h4>
            <div className="send-users">
              {shareUsers.map((u) => (
                <div key={u.id} className="send-user">
                  <img src={u.avatar} alt={u.name} />
                  <span>{u.name}</span>
                  <button
                    className={`send-btn ${u.sent ? "sent" : ""}`}
                    onClick={() => toggleSendUser(u.id)}
                  >
                    {u.sent ? "Sent" : "Send"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

export default Home;
