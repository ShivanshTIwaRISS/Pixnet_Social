import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTheme } from '../context/ThemeContext';
import { 
  Home, 
  Search, 
  Compass, 
  Film, 
  MessageCircle, 
  Heart, 
  PlusSquare, 
  User, 
  Menu,
  Sun,
  Moon,
  LogOut,
  Bookmark,
  Settings,
  Grid
} from 'lucide-react';
import '../styles/Navbar.css';

const Navbar = ({ onOpenUpload }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const { theme, toggleTheme } = useTheme();
  const [showMore, setShowMore] = React.useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/feed', icon: Grid, label: 'Explore' },
    { path: '/reels', icon: Film, label: 'Reels' },
    { path: '/inbox', icon: MessageCircle, label: 'Messages' },
    { path: '/notifications', icon: Heart, label: 'Notifications' },
    { path: '/saved', icon: Bookmark, label: 'Saved' },
    { path: '/profile', icon: User, label: 'Profile', isProfile: true },
  ];

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo" onClick={() => navigate('/')}>
        <div className="logo-gradient">PixNet</div>
      </div>

      {/* Search Bar (Desktop) */}
      <div className="navbar-search">
        <Search className="search-icon" />
        <input 
          type="text" 
          placeholder="Search" 
          className="search-input"
        />
      </div>

      {/* Navigation Links */}
      <div className="navbar-links">
        {navItems.slice(0, 6).map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              type="button"
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
              aria-label={item.label}
            >
              <Icon className="nav-icon" strokeWidth={isActive ? 2.5 : 2} />
              <span className="nav-label">{item.label}</span>
            </button>
          );
        })}

        {/* Create Post Button */}
        <button
          type="button"
          className="nav-item"
          onClick={onOpenUpload}
          aria-label="Create post"
        >
          <PlusSquare className="nav-icon" />
          <span className="nav-label">Create</span>
        </button>

        {/* Profile */}
        <button
          type="button"
          className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`}
          onClick={() => navigate('/profile')}
          aria-label="Profile"
        >
          {user?.photoURL ? (
            <img 
              src={user.photoURL} 
              alt="Profile" 
              className="nav-avatar" 
            />
          ) : (
            <User className="nav-icon" />
          )}
          <span className="nav-label">Profile</span>
        </button>

        {/* Theme Toggle */}
        <button
          type="button"
          className="nav-item"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="nav-icon" />
          ) : (
            <Moon className="nav-icon" />
          )}
          <span className="nav-label">{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>

        {/* More Menu */}
        <div className="more-menu-wrapper">
          <button
            type="button"
            className="nav-item"
            onClick={() => setShowMore(!showMore)}
            aria-label="More options"
          >
            <Menu className="nav-icon" />
            <span className="nav-label">More</span>
          </button>

          {showMore && (
            <div className="more-dropdown">
              <button 
                className="dropdown-item"
                onClick={() => {
                  navigate('/settings');
                  setShowMore(false);
                }}
              >
                <Settings className="dropdown-icon" />
                <span>Settings</span>
              </button>
              <button 
                className="dropdown-item"
                onClick={() => {
                  navigate('/saved');
                  setShowMore(false);
                }}
              >
                <Bookmark className="dropdown-icon" />
                <span>Saved</span>
              </button>
              <div className="dropdown-divider" />
              <button 
                className="dropdown-item logout"
                onClick={handleLogout}
              >
                <LogOut className="dropdown-icon" />
                <span>Log out</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="navbar-mobile">
        <button
          type="button"
          className={`mobile-nav-item ${location.pathname === '/' ? 'active' : ''}`}
          onClick={() => navigate('/')}
        >
          <Home strokeWidth={location.pathname === '/' ? 2.5 : 2} />
        </button>
        <button
          type="button"
          className={`mobile-nav-item ${location.pathname === '/feed' ? 'active' : ''}`}
          onClick={() => navigate('/feed')}
        >
          <Grid strokeWidth={location.pathname === '/feed' ? 2.5 : 2} />
        </button>
        <button
          type="button"
          className="mobile-nav-item"
          onClick={onOpenUpload}
        >
          <PlusSquare strokeWidth={2} />
        </button>
        <button
          type="button"
          className={`mobile-nav-item ${location.pathname === '/inbox' ? 'active' : ''}`}
          onClick={() => navigate('/inbox')}
        >
          <MessageCircle strokeWidth={location.pathname === '/inbox' ? 2.5 : 2} />
        </button>
        <button
          type="button"
          className={`mobile-nav-item ${location.pathname === '/profile' ? 'active' : ''}`}
          onClick={() => navigate('/profile')}
        >
          {user?.photoURL ? (
            <img src={user.photoURL} alt="Profile" className="mobile-nav-avatar" />
          ) : (
            <User strokeWidth={location.pathname === '/profile' ? 2.5 : 2} />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
