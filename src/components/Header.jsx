import React from 'react';
import '../styles/Header.css';

function Header({ toggleDarkMode, darkMode }) {
  return (
    <header className="header">
      <a href="/" className="logo">PixNet</a>
      <nav className="nav">
        <a href="/">Home</a>
        <a href="/">Explore</a>
        <a href="/">Profile</a>
        <button onClick={toggleDarkMode} style={{
          marginLeft: '20px',
          padding: '5px 10px',
          border: 'none',
          background: darkMode ? '#f4f4f4' : '#333',
          color: darkMode ? '#333' : '#fff',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </nav>
    </header>
  );
}

export default Header;
