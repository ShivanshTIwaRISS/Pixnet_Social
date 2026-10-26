import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

export default function ForgotPassword({ showNotification }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setSent(true);
      showNotification("📧 Reset email sent! Check your inbox.");
    } catch (err) {
      showNotification("❌ " + err.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="logo">PixNet</h1>
        {!sent ? (
          <form onSubmit={handleReset}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Send Reset Link</button>
          </form>
        ) : (
          <p>✅ Check your email to reset your password!</p>
        )}
      </div>
    </div>
  );
}
