import React, { useState, useEffect } from "react";
import "../styles/UploadPost.css";

const Upload = ({ onClose }) => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [caption, setCaption] = useState("");

  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose && onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) {
      alert("⚠ Please select an image to upload!");
      return;
    }
    alert("✅ Post uploaded successfully (dummy)!");
    setImage(null);
    setPreviewUrl(null);
    setCaption("");
    onClose && onClose();
  };

  return (
    <div className="upload-overlay" onClick={onClose}>
      <div className="upload-box" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="upload-header">
          <h3>Create new post</h3>
          <button className="close-btn" onClick={onClose}>✖</button>
        </div>

        {/* Content */}
        <form className="upload-form" onSubmit={handleSubmit}>
          {!previewUrl ? (
            <div className="upload-drop">
              <div className="upload-icon">📷</div>
              <p>Drag photos and videos here</p>
              <label className="select-btn">
                Select from computer
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  hidden
                />
              </label>
            </div>
          ) : (
            <div className="preview-container">
              <img src={previewUrl} alt="Preview" />
              <textarea
                placeholder="Write a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
              <button type="submit" className="post-btn">
                Share
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Upload;
