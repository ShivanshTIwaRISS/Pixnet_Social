import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import "../styles/Chat.css";

const ChatPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState({});
  const [message, setMessage] = useState('');
  const [typing, setTyping] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    axios.get('https://randomuser.me/api/?results=10')
      .then(response => setUsers(response.data.results))
      .catch(error => console.error("Error fetching users:", error));
  }, []);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (message) {
      setTyping(true);
    } else {
      setTyping(false);
    }
  }, [message]);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setReplyTo(null);

    setMessages(prev => ({
      ...prev,
      [user.login.uuid]: prev[user.login.uuid] || [
        { user: user.name.first, text: 'Hey! How are you?', timestamp: new Date() },
        { user: 'You', text: 'I am good, thanks!', timestamp: new Date() },
        { user: user.name.first, text: 'What are you up to?', timestamp: new Date() },
      ]
    }));
  };

  const handleSendMessage = () => {
    if (message.trim() && selectedUser) {
      const newMessage = {
        user: 'You',
        text: message,
        timestamp: new Date(),
        replyTo: replyTo ? replyTo.text : null,
      };

      setMessages(prev => ({
        ...prev,
        [selectedUser.login.uuid]: [...(prev[selectedUser.login.uuid] || []), newMessage],
      }));

      setMessage('');
      setReplyTo(null);
      setTyping(false);
      scrollToBottom();
    }
  };

  const currentMessages = selectedUser ? messages[selectedUser.login.uuid] || [] : [];

  return (
    <div className="chat-container">
      <div className="user-list">
        <h3>Users</h3>
        <div className="user-list-items">
          {users.map(user => (
            <div
              key={user.login.uuid}
              className={`user-item ${selectedUser && selectedUser.login.uuid === user.login.uuid ? 'active' : ''}`}
              onClick={() => handleUserSelect(user)}
            >
              <img src={user.picture.thumbnail} alt="User" />
              <span>{user.name.first} {user.name.last}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="chat-box">
        {selectedUser ? (
          <>
            <div className="chat-header">
              <img src={selectedUser.picture.large} alt="User" />
              <h2>{selectedUser.name.first} {selectedUser.name.last}</h2>
            </div>

            <div className="messages">
              {currentMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${msg.user === 'You' ? 'sent' : 'received'}`}
                >
                  <div className="message-content">
                    {msg.replyTo && (
                      <div className="reply-message">
                        <span>Replying to: {msg.replyTo}</span>
                      </div>
                    )}
                    <p>{msg.text}</p>
                    <span className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                    <button className="reply-btn" onClick={() => setReplyTo(msg)}>Reply</button>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef}></div>
            </div>

            {replyTo && (
              <div className="replying-to">
                Replying to: <strong>{replyTo.text}</strong>
                <button onClick={() => setReplyTo(null)}>✖</button>
              </div>
            )}

            <div className="message-input">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
              />
              <button onClick={handleSendMessage}>Send</button>
              {typing && <div className="typing-indicator">...</div>}
            </div>
          </>
        ) : (
          <p>Select a user to start chatting</p>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
