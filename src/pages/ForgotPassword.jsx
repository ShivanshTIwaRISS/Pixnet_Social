import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';
import '../styles/Auth.css';

export default function ForgotPassword({ showNotification }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setSent(true);
      showNotification?.('✅ Password reset email sent!');
    } catch (err) {
      showNotification?.('❌ ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
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

        <div className="auth-form-container">
          <div className="auth-card">
            <h1 className="auth-logo">
              <span className="logo-gradient">PixNet</span>
            </h1>
            
            {sent ? (
              <div className="reset-success">
                <h2 className="auth-tagline">Check your email</h2>
                <p className="info">
                  We've sent password reset instructions to <strong>{email}</strong>
                </p>
                <p className="info" style={{ marginTop: '16px' }}>
                  <Link to="/login" className="forgot-link">Back to login</Link>
                </p>
              </div>
            ) : (
              <>
                <h2 className="auth-tagline">Trouble logging in?</h2>
                <p className="info">
                  Enter your email and we'll send you a link to get back into your account.
                </p>

                <form onSubmit={handleReset} className="auth-form">
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

                  <button 
                    type="submit" 
                    className="auth-btn"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="btn-spinner"></div>
                    ) : (
                      'Send login link'
                    )}
                  </button>
                </form>
              </>
            )}

            <div className="auth-divider">
              <div className="divider-line"></div>
              <span className="divider-text">OR</span>
              <div className="divider-line"></div>
            </div>

            <Link to="/register" className="forgot-link">
              Create new account
            </Link>
          </div>

          <div className="auth-card signup-card">
            <p className="signup-text">
              Remember your password?{' '}
              <Link to="/login" className="signup-link">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
