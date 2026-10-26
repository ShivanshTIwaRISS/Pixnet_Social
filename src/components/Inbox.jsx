import React, { useState, useEffect } from 'react';
import { Send, Image, Heart, MoreHorizontal, Edit2, Video } from 'lucide-react';
import '../styles/Inbox.css';

const Inbox = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Generate mock conversations
    const mockConversations = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      username: `user_${i}`,
      avatar: `https://i.pravatar.cc/56?img=${i + 10}`,
      lastMessage: 'Hey, how are you?',
      time: `${i + 1}h`,
      unread: i < 3,
    }));
    setConversations(mockConversations);
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      // Generate mock messages
      const mockMessages = [
        { id: 1, text: 'Hey there!', sent: false, time: '2:30 PM' },
        { id: 2, text: 'Hi! How are you?', sent: true, time: '2:31 PM' },
        { id: 3, text: "I'm doing great, thanks for asking!", sent: false, time: '2:32 PM' },
        { id: 4, text: 'Did you see my latest post?', sent: false, time: '2:33 PM' },
        { id: 5, text: 'Yes! It looks amazing 🔥', sent: true, time: '2:35 PM' },
      ];
      setMessages(mockMessages);
    }
  }, [selectedConversation]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: messages.length + 1,
      text: newMessage,
      sent: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="inbox-page">
      {/* Sidebar */}
      <div className="inbox-sidebar">
        <div className="inbox-header">
          <h2>your_username</h2>
          <div className="inbox-actions">
            <button className="inbox-action-btn" aria-label="New message">
              <Edit2 size={24} />
            </button>
          </div>
        </div>

        <div className="inbox-search">
          <input
            type="text"
            placeholder="Search"
            className="inbox-search-input"
          />
        </div>

        <div className="conversations-list">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`conversation-item ${selectedConversation?.id === conversation.id ? 'active' : ''}`}
              onClick={() => setSelectedConversation(conversation)}
            >
              <img
                src={conversation.avatar}
                alt={conversation.username}
                className="conversation-avatar"
              />
              <div className="conversation-info">
                <div className="conversation-name">{conversation.username}</div>
                <div className="conversation-preview">
                  {conversation.lastMessage}
                </div>
              </div>
              <div className="conversation-time">{conversation.time}</div>
              {conversation.unread && <div className="unread-badge"></div>}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="chat-area">
        {selectedConversation ? (
          <>
            <div className="chat-header">
              <img
                src={selectedConversation.avatar}
                alt={selectedConversation.username}
                className="conversation-avatar"
              />
              <div className="chat-user-info">
                <div className="chat-username">{selectedConversation.username}</div>
                <div className="chat-status">Active now</div>
              </div>
              <div className="chat-actions">
                <button className="chat-action-btn" aria-label="Video call">
                  <Video size={24} />
                </button>
                <button className="chat-action-btn" aria-label="More options">
                  <MoreHorizontal size={24} />
                </button>
              </div>
            </div>

            <div className="chat-messages">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`message ${message.sent ? 'sent' : 'received'}`}
                >
                  <div>{message.text}</div>
                  <div className="message-time">{message.time}</div>
                </div>
              ))}
            </div>

            <form className="chat-input-area" onSubmit={handleSendMessage}>
              <button type="button" className="chat-action-btn" aria-label="Add photo">
                <Image size={24} />
              </button>
              <input
                type="text"
                placeholder="Message..."
                className="chat-input"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button type="button" className="chat-action-btn" aria-label="Add heart">
                <Heart size={24} />
              </button>
              {newMessage && (
                <button type="submit" className="send-btn" aria-label="Send message">
                  <Send size={20} />
                </button>
              )}
            </form>
          </>
        ) : (
          <div className="chat-empty">
            <div className="chat-empty-icon">
              <Send size={48} />
            </div>
            <h3>Your messages</h3>
            <p>Send private photos and messages to a friend or group.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inbox;
