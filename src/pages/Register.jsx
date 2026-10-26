import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import '../styles/Auth.css';

export default function Register({ showNotification }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      showNotification('✅ Account created successfully!');
      navigate('/');
    } catch (err) {
      showNotification('❌ ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Left Side - Branding */}
        <div className="auth-branding">
          <div className="auth-branding-content">
            <div className="auth-phone-mockup">
              <div className="phone-screen">
                <div className="phone-content">
                  <div className="phone-post">
                    <div className="phone-post-header">
                      <div className="phone-avatar"></div>
                      <div className="phone-user-info">
                        <div className="phone-username"></div>
                        <div className="phone-location"></div>
                      </div>
                    </div>
                    <div className="phone-image"></div>
                    <div className="phone-actions">
                      <div className="phone-action-icon"></div>
                      <div className="phone-action-icon"></div>
                      <div className="phone-action-icon"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="auth-form-container">
          <div className="auth-card">
            <h1 className="auth-logo">
              <span className="logo-gradient">PixNet</span>
            </h1>
            <p className="auth-subtitle">Sign up to see photos and videos from your friends.</p>

            <button type="button" className="social-login-btn primary">
              <svg viewBox="0 0 24 24" className="social-icon">
                <path fill="#fff" d="M22.675 0h-21.35C.596 0 0 .596 0 1.325v21.351C0 23.404.596 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.595 1.323-1.324V1.324C24 .596 23.405 0 22.675 0z"/>
              </svg>
              <span>Log in with Facebook</span>
            </button>

            <div className="auth-divider">
              <div className="divider-line"></div>
              <span className="divider-text">OR</span>
              <div className="divider-line"></div>
            </div>

            <form onSubmit={handleRegister} className="auth-form">
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="auth-input"
                  required
                />
              </div>

              <div className="input-group">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="auth-input"
                />
              </div>

              <div className="input-group">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="auth-input"
                />
              </div>

              <div className="input-group password-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-input"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <button 
                type="submit" 
                className="auth-btn"
                disabled={loading}
              >
                {loading ? (
                  <div className="btn-spinner"></div>
                ) : (
                  'Sign up'
                )}
              </button>

              <p className="terms-text">
                By signing up, you agree to our{' '}
                <Link to="/terms" className="terms-link">Terms</Link>,{' '}
                <Link to="/privacy" className="terms-link">Privacy Policy</Link> and{' '}
                <Link to="/cookies" className="terms-link">Cookies Policy</Link>.
              </p>
            </form>
          </div>

          <div className="auth-card signup-card">
            <p className="signup-text">
              Have an account?{' '}
              <Link to="/login" className="signup-link">
                Log in
              </Link>
            </p>
          </div>

          <div className="app-download">
            <p className="app-download-text">Get the app.</p>
            <div className="app-buttons">
              <img 
                src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png" 
                alt="Get it on Google Play" 
                className="app-btn-img"
              />
              <img 
                src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png" 
                alt="Get it from Microsoft" 
                className="app-btn-img"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
