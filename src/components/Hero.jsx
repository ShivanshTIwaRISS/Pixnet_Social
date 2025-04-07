import React, { useEffect, useState } from "react";
import "../styles/Home.css";

function Home({ showNotification }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://picsum.photos/v2/list?page=2&limit=8")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch(() => showNotification("Failed to load posts"));
  }, [showNotification]);

  return (
    <div className="home-container">
      <section className="hero-section">
        <h1>Welcome to PixNet</h1>
        <p>Explore amazing photos shared by the community</p>
      </section>

      <section className="trending-section">
        <h2>Trending Now</h2>
        <div className="posts-grid">
          {posts.map((post) => (
            <div key={post.id} className="post-card">
              <img src={post.download_url} alt={post.author} />
              <p>{post.author}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
