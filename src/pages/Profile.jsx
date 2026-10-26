import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Settings, 
  Grid, 
  Film, 
  Bookmark,
  UserPlus,
  MessageCircle,
  MoreHorizontal,
  Camera
} from 'lucide-react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import '../styles/Profile.css';

const Profile = () => {
  const { username } = useParams();
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [reels, setReels] = useState([]);
  const [saved, setSaved] = useState([]);
  const [tagged, setTagged] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [activeTab, setActiveTab] = useState('posts');
  const [isFollowing, setIsFollowing] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  useEffect(() => {
    // Basic user info
    setUserData({
      username: username || user?.displayName || 'pix_user',
      avatar: user?.photoURL || `https://i.pravatar.cc/150?u=${username}`,
      bio: '📸 Sharing my vibes with the world 🌍✨\n🎨 Digital creator\n📍 Somewhere in the world',
      followers: Math.floor(Math.random() * 10000) + 1000,
      following: Math.floor(Math.random() * 1000) + 100,
      posts: Math.floor(Math.random() * 200) + 50,
    });

    // Load local posts
    const localPosts = JSON.parse(localStorage.getItem('posts')) || [];

    // Fake API posts for filler
    fetch(
      `https://picsum.photos/v2/list?page=${Math.floor(Math.random() * 5) + 1}&limit=12`
    )
      .then((res) => res.json())
      .then((data) => {
        const apiPosts = data.map((d) => ({
          id: d.id,
          mediaUrl: d.download_url,
          type: 'image',
          caption: 'Random API post 🌟',
          likes: Math.floor(Math.random() * 1000) + 100,
          comments: Math.floor(Math.random() * 100),
        }));
        setPosts([...localPosts, ...apiPosts]);
      });

    // Load saved posts
    const savedPosts = JSON.parse(localStorage.getItem('savedPosts')) || [];
    setSaved(savedPosts);

    // Fetch reels
    fetch(
      `https://picsum.photos/v2/list?page=${Math.floor(Math.random() * 5) + 6}&limit=12`
    )
      .then((res) => res.json())
      .then((data) =>
        setReels(
          data.map((d) => ({
            id: d.id,
            mediaUrl: d.download_url,
            type: 'video',
            caption: 'Random API reel 🎥',
            likes: Math.floor(Math.random() * 1000) + 100,
            comments: Math.floor(Math.random() * 100),
          }))
        )
      );

    // Fetch tagged
    fetch(
      `https://picsum.photos/v2/list?page=${Math.floor(Math.random() * 5) + 10}&limit=12`
    )
      .then((res) => res.json())
      .then((data) =>
        setTagged(
          data.map((d) => ({
            id: d.id,
            mediaUrl: d.download_url,
            type: 'image',
            caption: 'Tagged photo 🏷',
            likes: Math.floor(Math.random() * 1000) + 100,
            comments: Math.floor(Math.random() * 100),
          }))
        )
      );
  }, [username, user]);

  if (!userData) return <div className="loading-spinner"><div className="spinner"></div></div>;

  const renderContent = () => {
    const data = activeTab === 'posts' ? posts : activeTab === 'reels' ? reels : activeTab === 'saved' ? saved : tagged;

    if (data.length === 0) {
      return (
        <div className="no-posts-state">
          <div className="no-posts-icon">
            {activeTab === 'posts' && <Grid size={48} />}
            {activeTab === 'reels' && <Film size={48} />}
            {activeTab === 'saved' && <Bookmark size={48} />}
            {activeTab === 'tagged' && <UserPlus size={48} />}
          </div>
          <h3>No {activeTab} yet</h3>
        </div>
      );
    }

    return (
      <div className="profile-posts-grid">
        {data.map((item, index) => (
          <div
            className="profile-post-item"
            key={item.id || index}
            onClick={() => setSelectedPost(item)}
          >
            <img src={item.mediaUrl || item.download_url} alt="Post" />
            <div className="post-overlay">
              <span className="post-stat">❤️ {item.likes?.toLocaleString()}</span>
              <span className="post-stat">💬 {item.comments || 0}</span>
            </div>
            {item.type === 'video' && (
              <div className="video-indicator">
                <Film size={20} />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="profile-container">
      {/* Profile Header */}
      <header className="profile-header">
        <div className="profile-avatar-section">
          <div className="profile-avatar-wrapper">
            <img
              src={userData.avatar}
              alt={userData.username}
              className="profile-avatar"
            />
            <button className="avatar-edit-btn" aria-label="Change profile photo">
              <Camera size={20} />
            </button>
          </div>
        </div>

        <div className="profile-info-section">
          <div className="profile-username-row">
            <h1 className="profile-username">{userData.username}</h1>
            <div className="profile-actions">
              <button 
                className={`follow-btn ${isFollowing ? 'following' : ''}`}
                onClick={() => setIsFollowing(!isFollowing)}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
              <button className="message-btn">
                <MessageCircle size={16} />
                <span>Message</span>
              </button>
              <button className="more-btn" aria-label="More options">
                <MoreHorizontal size={24} />
              </button>
            </div>
          </div>

          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-number">{userData.posts}</span>
              <span className="stat-label">posts</span>
            </div>
            <button className="stat-item clickable" onClick={() => setShowFollowers(true)}>
              <span className="stat-number">{userData.followers.toLocaleString()}</span>
              <span className="stat-label">followers</span>
            </button>
            <button className="stat-item clickable" onClick={() => setShowFollowing(true)}>
              <span className="stat-number">{userData.following}</span>
              <span className="stat-label">following</span>
            </button>
          </div>

          <div className="profile-bio">
            <span className="bio-name">{userData.username}</span>
            <p className="bio-text">{userData.bio}</p>
          </div>
        </div>
      </header>

      {/* Highlights */}
      <div className="highlights-section">
        <div className="highlight-item">
          <div className="highlight-ring new">
            <div className="highlight-plus">+</div>
          </div>
          <span className="highlight-label">New</span>
        </div>
        {['Travel', 'Food', 'Music', 'Work', 'Friends'].map((name, i) => (
          <div className="highlight-item" key={i}>
            <div className="highlight-ring">
              <img 
                src={`https://i.pravatar.cc/80?img=${i + 10}`} 
                alt={name}
                className="highlight-avatar"
              />
            </div>
            <span className="highlight-label">{name}</span>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="profile-tabs">
        <button
          className={`profile-tab ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          <Grid size={12} />
          <span>POSTS</span>
        </button>
        <button
          className={`profile-tab ${activeTab === 'reels' ? 'active' : ''}`}
          onClick={() => setActiveTab('reels')}
        >
          <Film size={12} />
          <span>REELS</span>
        </button>
        <button
          className={`profile-tab ${activeTab === 'saved' ? 'active' : ''}`}
          onClick={() => setActiveTab('saved')}
        >
          <Bookmark size={12} />
          <span>SAVED</span>
        </button>
        <button
          className={`profile-tab ${activeTab === 'tagged' ? 'active' : ''}`}
          onClick={() => setActiveTab('tagged')}
        >
          <UserPlus size={12} />
          <span>TAGGED</span>
        </button>
      </div>

      {/* Content Grid */}
      <div className="profile-content">
        {renderContent()}
      </div>

      {/* Post Modal */}
      {selectedPost && (
        <div className="post-modal" onClick={() => setSelectedPost(null)}>
          <div className="post-modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedPost.mediaUrl || selectedPost.download_url} alt="Post" />
          </div>
          <button className="modal-close-btn" onClick={() => setSelectedPost(null)}>×</button>
        </div>
      )}

      {/* Followers Modal */}
      {showFollowers && (
        <div className="list-modal" onClick={() => setShowFollowers(false)}>
          <div className="list-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="list-modal-header">
              <h3>Followers</h3>
              <button onClick={() => setShowFollowers(false)}>×</button>
            </div>
            <div className="list-modal-body">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="list-item">
                  <img src={`https://i.pravatar.cc/44?img=${i}`} alt="User" className="list-avatar" />
                  <div className="list-info">
                    <span className="list-username">user_{i}</span>
                    <span className="list-name">User Name</span>
                  </div>
                  <button className="list-follow-btn">Remove</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Following Modal */}
      {showFollowing && (
        <div className="list-modal" onClick={() => setShowFollowing(false)}>
          <div className="list-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="list-modal-header">
              <h3>Following</h3>
              <button onClick={() => setShowFollowing(false)}>×</button>
            </div>
            <div className="list-modal-body">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="list-item">
                  <img src={`https://i.pravatar.cc/44?img=${i + 30}`} alt="User" className="list-avatar" />
                  <div className="list-info">
                    <span className="list-username">following_{i}</span>
                    <span className="list-name">Following User</span>
                  </div>
                  <button className="list-follow-btn following">Following</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
