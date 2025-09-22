// src/pages/ResetPassword.jsx
import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import { auth } from "../firebase";
import "../styles/Auth.css";

export default function ResetPassword({ showNotification }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const oobCode = searchParams.get("oobCode");

  React.useEffect(() => {
    if (!oobCode) {
      setLoading(false);
      setValid(false);
      return;
    }

    // Verify the reset link with Firebase
    verifyPasswordResetCode(auth, oobCode)
      .then((email) => {
        setEmail(email);
        setValid(true);
        setLoading(false);
      })
      .catch(() => {
        setValid(false);
        setLoading(false);
      });
  }, [oobCode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || password.length < 6)
      return alert("Password must be at least 6 characters");
    if (password !== confirm) return alert("Passwords do not match");

    try {
      await confirmPasswordReset(auth, oobCode, password);
      if (showNotification)
        showNotification("✅ Password reset successful. Please log in.");
      navigate("/login");
    } catch (err) {
      alert("Failed to reset password: " + err.message);
    }
  };

  if (loading)
    return (
      <div className="auth-page">
        <div className="auth-card">
          <p>Checking reset link…</p>
        </div>
      </div>
    );

  if (!valid)
    return (
      <div className="auth-page">
        <div className="auth-card">
          <h3>Invalid or expired reset link</h3>
          <p>
            <a href="/forgot">Request a new link</a>
          </p>
        </div>
      </div>
    );

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="logo">PixNet</h1>
        <h3>Reset password for {email}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          <button type="submit">Set new password</button>
        </form>
      </div>
    </div>
  );
}
