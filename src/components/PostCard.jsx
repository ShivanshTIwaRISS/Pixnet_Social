import React from 'react';
import '../styles/PostCard.css';

function PostCard({ image, caption }) {
  const handleSavePost = () => {
    const saved = JSON.parse(localStorage.getItem('savedPosts')) || [];
    saved.push({ image, caption });
    localStorage.setItem('savedPosts', JSON.stringify(saved));
    alert('Post saved!');
  };

  return (
    <div className="post-card">
      <img src={image} alt="Post" />
      <p>{caption}</p>
      <button onClick={handleSavePost}>Save Post</button>
    </div>
  );
}

export default PostCard;
