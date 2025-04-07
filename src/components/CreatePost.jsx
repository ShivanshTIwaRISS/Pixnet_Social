import React, { useState } from 'react';
import '../styles/CreatePost.css';

function CreatePost() {
  const [image, setImage] = useState('');
  const [caption, setCaption] = useState('');
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image || !caption) {
      alert('Please add an image and a caption!');
      return;
    }

    const newPost = { image, caption };
    const savedPosts = JSON.parse(localStorage.getItem('savedPosts')) || [];
    savedPosts.push(newPost);
    localStorage.setItem('savedPosts', JSON.stringify(savedPosts));

    alert('Post created and saved successfully!');
    setImage('');
    setCaption('');
    setPreview(null);
  };

  return (
    <section className="create-post">
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <input
          type="text"
          placeholder="Write a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <button type="submit">Post</button>
      </form>

      {preview && (
        <div className="preview">
          <h3>Preview:</h3>
          <img src={preview} alt="Preview" />
          <p>{caption}</p>
        </div>
      )}
    </section>
  );
}

export default CreatePost;
