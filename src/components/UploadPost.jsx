import React, { useState } from "react";
import "../styles/UploadPost.css";

const Upload = () => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [caption, setCaption] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (image) {
      alert("Post uploaded successfully (dummy) 🎉");
      setImage(null);
      setPreviewUrl(null);
      setCaption("");
    } else {
      alert("Please select an image to upload!");
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-post">
        <h2>Create a New Post ✨</h2>
        <form onSubmit={handleSubmit}>
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="preview-image"
            />
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <textarea
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          ></textarea>
          <button type="submit">Upload Post 🚀</button>
        </form>
      </div>
    </div>
  );
};

export default Upload;
