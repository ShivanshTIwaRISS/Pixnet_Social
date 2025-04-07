import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import "../styles/Chat.css";

const ChatPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [typing, setTyping] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const chatEndRef = useRef(null);

  // Fetch users once
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://randomuser.me/api/?results=10');
        setUsers(response.data.results);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Dummy messages when user selected
  useEffect(() => {
    if (selectedUser) {
      setMessages([
        { user: selectedUser.name.first, text: 'Hey! How are you?', timestamp: new Date() },
        { user: 'You', text: 'I am good, thanks!', timestamp: new Date() },
        { user: selectedUser.name.first, text: 'What are you up to?', timestamp: new Date() },
      ]);
    }
  }, [selectedUser]);

  // Scroll to bottom function
  const scrollToBottom = () => {
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100); // slight delay ensures new message renders
  };

  // Send message
  const handleSendMessage = () => {
    if (message.trim() === '') return;

    const newMessage = {
      user: 'You',
      text: message.trim(),
      timestamp: new Date(),
      replyTo: replyTo ? replyTo.text : null,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage('');
    setReplyTo(null);
    setTyping(false);
    scrollToBottom();

    // Simulate reply from user after short delay
    setTimeout(() => {
      const simulatedReply = {
        user: selectedUser.name.first,
        text: 'Got your message!',
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, simulatedReply]);
      scrollToBottom();
    }, 1500);
  };

  // Typing effect
  useEffect(() => {
    if (message.trim() !== '') {
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
          {users.map((user) => (
            <div
              key={user.login.uuid}
              className={`user-item ${selectedUser?.login.uuid === user.login.uuid ? 'active' : ''}`}
              onClick={() => {
                setSelectedUser(user);
                setReplyTo(null);
              }}
            >
              <img src={user.picture.thumbnail} alt="User" />
              <span>{user.name.first} {user.name.last}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Box */}
      <div className="chat-box">
        {selectedUser ? (
          <>
            <div className="chat-header">
              <img src={selectedUser.picture.large} alt="User" />
              <h2>{selectedUser.name.first} {selectedUser.name.last}</h2>
            </div>

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
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button onClick={handleSendMessage}>Send</button>
              {typing && <div className="typing-indicator">Typing...</div>}
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
