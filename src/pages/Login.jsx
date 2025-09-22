import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ showNotification }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      showNotification("✅ Logged in successfully!");
      navigate("/");
    } catch (err) {
      showNotification("❌ " + err.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="logo">PixNet</h1>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Log In</button>
        </form>
        <p className="forgot-line">
          <Link to="/forgot" className="forgot-link">Forgot password?</Link>
        </p>
        <p className="auth-footer">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
