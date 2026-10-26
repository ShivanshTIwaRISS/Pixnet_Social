import React, { useState, useEffect } from 'react';
import { Heart, UserPlus, MessageCircle, AtSign } from 'lucide-react';
import '../styles/Notifications.css';

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Generate mock notifications
    const mockNotifications = [
      {
        id: 1,
        type: 'like',
        username: 'sarah_jones',
        avatar: 'https://i.pravatar.cc/44?img=1',
        text: 'liked your photo.',
        time: '2h',
        image: 'https://picsum.photos/44/44?random=1',
        unread: true,
      },
      {
        id: 2,
        type: 'follow',
        username: 'mike_designs',
        avatar: 'https://i.pravatar.cc/44?img=2',
        text: 'started following you.',
        time: '5h',
        unread: true,
        isFollowing: false,
      },
      {
        id: 3,
        type: 'comment',
        username: 'alex_smith',
        avatar: 'https://i.pravatar.cc/44?img=3',
        text: 'commented: "Amazing shot! 🔥"',
        time: '1d',
        image: 'https://picsum.photos/44/44?random=2',
        unread: false,
      },
      {
        id: 4,
        type: 'mention',
        username: 'julia_art',
        avatar: 'https://i.pravatar.cc/44?img=4',
        text: 'mentioned you in a comment.',
        time: '2d',
        image: 'https://picsum.photos/44/44?random=3',
        unread: false,
      },
      {
        id: 5,
        type: 'follow',
        username: 'devon_creates',
        avatar: 'https://i.pravatar.cc/44?img=5',
        text: 'started following you.',
        time: '3d',
        unread: false,
        isFollowing: true,
      },
    ];
    setNotifications(mockNotifications);
  }, []);

  const handleFollow = (id) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, isFollowing: !n.isFollowing } : n
      )
    );
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like':
        return <Heart size={16} fill="#ed4956" color="#ed4956" />;
      case 'follow':
        return <UserPlus size={16} />;
      case 'comment':
        return <MessageCircle size={16} />;
      case 'mention':
        return <AtSign size={16} />;
      default:
        return null;
    }
  };

  return (
    <div className="notifications-page">
      <div className="notifications-container">
        <div className="notifications-header">
          <h1>Notifications</h1>
        </div>

        <div className="notifications-tabs">
          <button
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
          <button
            className={`tab-btn ${activeTab === 'mentions' ? 'active' : ''}`}
            onClick={() => setActiveTab('mentions')}
          >
            Mentions
          </button>
        </div>

        <div className="notifications-list">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-item ${notification.unread ? 'unread' : ''}`}
            >
              <img
                src={notification.avatar}
                alt={notification.username}
                className="notification-avatar"
              />
              <div className="notification-content">
                <span className="notification-username">{notification.username}</span>{' '}
                <span className="notification-text">{notification.text}</span>
                <div className="notification-time">{notification.time}</div>
              </div>
              <div className="notification-action">
                {notification.type === 'follow' ? (
                  <button
                    className={notification.isFollowing ? 'following-btn' : 'follow-back-btn'}
                    onClick={() => handleFollow(notification.id)}
                  >
                    {notification.isFollowing ? 'Following' : 'Follow'}
                  </button>
                ) : (
                  notification.image && (
                    <img
                      src={notification.image}
                      alt="Post"
                      className="notification-image"
                    />
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="activity-section">
          <h3 className="activity-title">Today</h3>
          {notifications.slice(0, 3).map((notification) => (
            <div key={`activity-${notification.id}`} className="activity-item">
              <img
                src={notification.avatar}
                alt={notification.username}
                className="activity-avatar"
              />
              <div className="activity-content">
                <span className="notification-username">{notification.username}</span>{' '}
                {getNotificationIcon(notification.type)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
