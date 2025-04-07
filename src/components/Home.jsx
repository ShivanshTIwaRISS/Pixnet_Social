import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Home.css";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchPosts();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchPosts = () => {
    setLoading(true);
    axios
      .get(`https://picsum.photos/v2/list?page=${page}&limit=6`)
      .then((response) => {
        const postsWithCounts = response.data.map((post) => ({
          ...post,
          likes: Math.floor(Math.random() * 500 + 100),
          comments: Math.floor(Math.random() * 50 + 10),
        }));
        setPosts((prevPosts) => [...prevPosts, ...postsWithCounts]);
        setPage((prevPage) => prevPage + 1);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      fetchPosts();
    }
  };

  const handleSavePost = (post) => {
    const savedPosts = JSON.parse(localStorage.getItem("savedPosts")) || [];
    const isAlreadySaved = savedPosts.find((item) => item.id === post.id);

    if (!isAlreadySaved) {
      const postWithDetails = {
        ...post,
        likes: post.likes,
        comments: post.comments,
      };
      savedPosts.push(postWithDetails);
      localStorage.setItem("savedPosts", JSON.stringify(savedPosts));
      alert("Post saved successfully!");
    } else {
      alert("Post already saved!");
    }
  };

  return (
    <div className="home-container">
      <div className="home">
        <div className="posts-grid">
          {posts.map((post) => (
            <div className="post-card" key={post.id}>
              <img src={post.download_url} alt={post.author} />
              <div className="post-info">
                <h4>{post.author}</h4>
                <p>{post.likes} Likes • {post.comments} Comments</p>
                <div className="post-actions">
                  <button>❤️ Like</button>
                  <button>💬 Comment</button>
                  <button onClick={() => handleSavePost(post)}>🔖 Save</button>
                  <button>📤 Share</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {loading && <div className="loader"></div>}
      </div>
    </div>
  );
}

export default Home;
