import React, { useState, useEffect, useRef } from "react";
import "../styles/Inbox.css";

function Inbox() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Load saved conversations from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("inbox")) || [];
    setConversations(saved);
  }, []);

  // Save conversations to localStorage
  useEffect(() => {
    localStorage.setItem("inbox", JSON.stringify(conversations));
  }, [conversations]);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentChat?.messages]);

  const sendMessage = () => {
    if (!message.trim() || !currentChat) return;
    const updated = conversations.map((conv) => {
      if (conv.id === currentChat.id) {
        return {
          ...conv,
          messages: [
            ...conv.messages,
            { text: message, sender: "you", timestamp: new Date() },
          ],
        };
      }
      return conv;
    });
    setConversations(updated);
    setMessage("");
    setCurrentChat((prev) => ({
      ...prev,
      messages: [...prev.messages, { text: message, sender: "you", timestamp: new Date() }],
    }));
  };

  const startChat = (user) => {
    let chat = conversations.find((c) => c.id === user.id);
    if (!chat) {
      chat = { id: user.id, name: user.name, messages: [] };
      setConversations([...conversations, chat]);
    }
    setCurrentChat(chat);
  };

  // Example users
  const users = [
    { id: 1, name: "Alex" },
    { id: 2, name: "Sam" },
    { id: 3, name: "Jordan" },
    { id: 4, name: "Taylor" },
    { id: 5, name: "Morgan" },
  ];

  return (
    <div className="inbox-page">
      <div className="inbox-sidebar">
        <h2>Chats</h2>
        <div className="user-list">
          {users.map((user) => (
            <div
              key={user.id}
              className={`user-item ${currentChat?.id === user.id ? "active" : ""}`}
              onClick={() => startChat(user)}
            >
              <div className="avatar">{user.name.charAt(0)}</div>
              <span>{user.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="inbox-chat">
        {currentChat ? (
          <>
            <div className="chat-header">{currentChat.name}</div>
            <div className="chat-messages">
              {currentChat.messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`message ${msg.sender === "you" ? "sent" : "received"}`}
                >
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef}></div>
            </div>
            <div className="chat-input">
              <input
                type="text"
                placeholder="Message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </>
        ) : (
          <div className="no-chat">Select a user to start chatting</div>
        )}
      </div>
    </div>
  );
}

export default Inbox;
