// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase"; // make sure you export auth from firebase.js

function ProtectedRoute({ children }) {
  const [user, loading] = useAuthState(auth);

  if (loading) return <p style={{ textAlign: "center", color: "white" }}>Loading...</p>;

  if (!user) return <Navigate to="/login" replace />;

  return children;
}

export default ProtectedRoute;
