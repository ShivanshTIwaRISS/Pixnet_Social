// src/components/UploadPost.jsx
import React, { useState, useEffect } from "react";
import "../styles/UploadPost.css";

const Upload = ({ onClose, onPostCreated }) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  // Close with ESC
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;

    setFile(f);

    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result); // base64 string
    reader.readAsDataURL(f);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return alert("⚠ Select an image or video!");

    setLoading(true);

    const newPost = {
      id: Date.now(),
      username: "pix_user",
      avatar: `https://i.pravatar.cc/40?u=${Date.now()}`,
      caption,
      mediaUrl: previewUrl,
      type: file.type.startsWith("video") ? "video" : "image",
      likes: Math.floor(Math.random() * 500),
      comments: [],
      createdAt: new Date().toISOString(),
    };

    // Save in localStorage
    const stored = JSON.parse(localStorage.getItem("posts")) || [];
    localStorage.setItem("posts", JSON.stringify([newPost, ...stored]));

    // Pass up to parent (for live feed update)
    onPostCreated?.(newPost);

    alert("✅ Post created locally!");
    setFile(null);
    setPreviewUrl(null);
    setCaption("");
    setLoading(false);
    onClose?.();
  };

  return (
    <div className="upload-overlay" onClick={onClose}>
      <div className="upload-box" onClick={(e) => e.stopPropagation()}>
        <div className="upload-header">
          <h3>Create new post</h3>
          <button className="close-btn" onClick={onClose}>✖</button>
        </div>

        <form className="upload-form" onSubmit={handleSubmit}>
          {!previewUrl ? (
            <div className="upload-drop">
              <p>📷 Drag or select media</p>
              <label className="select-btn">
                Select from computer
                <input
                  type="file"
                  accept="image/*,video/*"
                  hidden
                  onChange={handleFileChange}
                />
              </label>
            </div>
          ) : (
            <div className="preview-container">
              {file.type.startsWith("video") ? (
                <video src={previewUrl} controls />
              ) : (
                <img src={previewUrl} alt="Preview" />
              )}

              <textarea
                placeholder="Write a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />

              <button type="submit" className="post-btn" disabled={loading}>
                {loading ? "Saving..." : "Share"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Upload;
