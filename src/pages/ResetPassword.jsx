import React, { useState } from 'react';
import { confirmPasswordReset } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import '../styles/Auth.css';

export default function ResetPassword({ showNotification }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const oobCode = searchParams.get('oobCode');

  const handleReset = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      showNotification?.('❌ Passwords do not match');
      return;
    }

    if (!oobCode) {
      showNotification?.('❌ Invalid reset link');
      return;
    }

    setLoading(true);
    try {
      await confirmPasswordReset(auth, oobCode, password);
      showNotification?.('✅ Password reset successfully!');
      navigate('/login');
    } catch (err) {
      showNotification?.('❌ ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!oobCode) {
    return (
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-form-container" style={{ maxWidth: '350px', margin: '0 auto' }}>
            <div className="auth-card">
              <h1 className="auth-logo">
                <span className="logo-gradient">PixNet</span>
              </h1>
              <p className="info">Invalid or expired reset link.</p>
              <Link to="/forgot" className="forgot-link">
                Request a new reset link
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            <h2 className="auth-tagline">Create a new password</h2>
            <p className="info">
              Your new password must be different from previous passwords.
            </p>

            <form onSubmit={handleReset} className="auth-form">
              <div className="input-group password-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="New password"
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

              <div className="input-group password-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                  'Reset Password'
                )}
              </button>
            </form>
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
