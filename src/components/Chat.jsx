import React, { useState, useEffect, useRef } from 'react';
import "../styles/Chat.css";

const dummyUsers = [
  { id: 1, name: 'Alice Johnson', picture: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { id: 2, name: 'Bob Smith', picture: 'https://randomuser.me/api/portraits/men/2.jpg' },
  { id: 3, name: 'Clara Lee', picture: 'https://randomuser.me/api/portraits/women/3.jpg' },
  { id: 4, name: 'David Wilson', picture: 'https://randomuser.me/api/portraits/men/4.jpg' },
  { id: 5, name: 'Emily Brown', picture: 'https://randomuser.me/api/portraits/women/5.jpg' },
];

const dummyMessages = [
  { user: 'Alice Johnson', text: 'Hey! How are you?', timestamp: new Date() },
  { user: 'You', text: 'I am good, thanks!', timestamp: new Date() },
  { user: 'Alice Johnson', text: 'What are you up to?', timestamp: new Date() },
];

const ChatPage = () => {
  const [users, setUsers] = useState(dummyUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [typing, setTyping] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    // Load dummy users (already set initially)
    setUsers(dummyUsers);
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setMessages(dummyMessages);
      scrollToBottom();
    }
  }, [selectedUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        user: 'You',
        text: message.trim(),
        timestamp: new Date(),
        replyTo: replyTo ? replyTo.text : null,
      };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setMessage('');
      setReplyTo(null);
      setTyping(false);
    }
  };

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

  return (
    <div className="chat-container">
      {/* User List */}
      <div className="user-list">
        <h3>Users</h3>
        <div className="user-list-items">
          {users.map(user => (
            <div
              key={user.id}
              className={`user-item ${selectedUser?.id === user.id ? 'active' : ''}`}
              onClick={() => {
                setSelectedUser(user);
                setReplyTo(null);
              }}
            >
              <img src={user.picture} alt={user.name} />
              <span>{user.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Box */}
      <div className="chat-box">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="chat-header">
              <img src={selectedUser.picture} alt={selectedUser.name} />
              <h2>{selectedUser.name}</h2>
            </div>

            {/* Messages */}
            <div className="messages">
              {messages.map((msg, index) => (
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
                    <span className="timestamp">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <button className="reply-btn" onClick={() => setReplyTo(msg)}>Reply</button>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef}></div>
            </div>

            {/* Reply Indicator */}
            {replyTo && (
              <div className="replying-to">
                Replying to: <strong>{replyTo.text}</strong>
                <button onClick={() => setReplyTo(null)}>✖</button>
              </div>
            )}

            {/* Message Input */}
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
          <p className="select-user-message">Select a user to start chatting</p>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
