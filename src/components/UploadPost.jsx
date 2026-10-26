import React, { useState, useEffect } from 'react';
import { X, Upload as UploadIcon, Image, Video, ArrowLeft } from 'lucide-react';
import '../styles/UploadPost.css';

const Upload = ({ onClose, onPostCreated }) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: select, 2: edit, 3: caption

  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && onClose?.();
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'auto');
  }, []);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;

    setFile(f);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
      setStep(2);
    };
    reader.readAsDataURL(f);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const f = files[0];
      setFile(f);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        setStep(2);
      };
      reader.readAsDataURL(f);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);

    const newPost = {
      id: Date.now(),
      username: 'pix_user',
      avatar: `https://i.pravatar.cc/40?u=${Date.now()}`,
      caption,
      image: previewUrl,
      download_url: previewUrl,
      mediaUrl: previewUrl,
      type: file.type.startsWith('video') ? 'video' : 'image',
      likes: Math.floor(Math.random() * 500),
      comments: [],
      createdAt: new Date().toISOString(),
    };

    const stored = JSON.parse(localStorage.getItem('posts')) || [];
    localStorage.setItem('posts', JSON.stringify([newPost, ...stored]));

    onPostCreated?.(newPost);

    setTimeout(() => {
      setLoading(false);
      onClose?.();
    }, 500);
  };

  return (
    <div className="upload-overlay" onClick={onClose}>
      <div className="upload-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="upload-header">
          {step > 1 && (
            <button 
              className="upload-back-btn"
              onClick={() => setStep(step - 1)}
              aria-label="Go back"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <h2 className="upload-title">
            {step === 1 && 'Create new post'}
            {step === 2 && 'Edit'}
            {step === 3 && 'Create new post'}
          </h2>
          {step > 1 && (
            <button 
              className="upload-next-btn"
              onClick={() => setStep(3)}
              disabled={!previewUrl}
            >
              Next
            </button>
          )}
          <button className="upload-close-btn" onClick={onClose} aria-label="Close">
            <X size={24} />
          </button>
        </div>

        {/* Step 1: File Selection */}
        {step === 1 && (
          <div 
            className="upload-drop-zone"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <UploadIcon size={64} className="upload-icon" />
            <h3>Drag photos and videos here</h3>
            <p>or</p>
            <label className="upload-select-btn">
              Select from computer
              <input
                type="file"
                accept="image/*,video/*"
                hidden
                onChange={handleFileChange}
              />
            </label>
          </div>
        )}

        {/* Step 2: Preview/Edit */}
        {step === 2 && previewUrl && (
          <div className="upload-preview-container">
            {file?.type.startsWith('video') ? (
              <video 
                src={previewUrl} 
                controls 
                className="upload-preview-media"
              />
            ) : (
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="upload-preview-media"
              />
            )}
            <div className="upload-edit-options">
              <div className="edit-option active">
                <Image size={20} />
                <span>Filters</span>
              </div>
              <div className="edit-option">
                <Video size={20} />
                <span>Adjust</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Caption */}
        {step === 3 && (
          <div className="upload-caption-container">
            <div className="upload-preview-small">
              {file?.type.startsWith('video') ? (
                <video 
                  src={previewUrl} 
                  className="upload-preview-small-media"
                  muted
                />
              ) : (
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="upload-preview-small-media"
                />
              )}
            </div>
            <div className="upload-caption-section">
              <div className="upload-user-info">
                <img 
                  src="https://i.pravatar.cc/32?img=3" 
                  alt="User" 
                  className="upload-user-avatar"
                />
                <span className="upload-username">your_username</span>
              </div>
              <textarea
                placeholder="Write a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="upload-caption-input"
                rows={6}
              />
              <div className="upload-caption-footer">
                <span className="caption-hint">💡 Mention people with @</span>
                <span className="caption-counter">{caption.length}/2,200</span>
              </div>
            </div>
          </div>
        )}

        {/* Footer with Share Button */}
        {step === 3 && (
          <div className="upload-footer">
            <button 
              className="upload-share-btn"
              onClick={handleSubmit}
              disabled={loading || !previewUrl}
            >
              {loading ? (
                <>
                  <div className="btn-spinner"></div>
                  <span>Sharing...</span>
                </>
              ) : (
                'Share'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
