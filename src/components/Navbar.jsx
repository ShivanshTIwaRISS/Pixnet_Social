import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { Home, Image, Bookmark, User, UploadCloud, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase"; // <-- make sure you have this exported
import { useAuthState } from "react-firebase-hooks/auth";

function Navbar({ onOpenUpload }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [user] = useAuthState(auth); // listens to current user

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="navbar">
      {/* Logo (Clickable - redirects to home) */}
      <div className="logo" onClick={() => navigate("/")}>
        <span className="logo-text">PixNet</span>
      </div>

      {/* Navigation Links */}
      <div className="nav-links">
        <button
          type="button"
          className={`nav-item ${location.pathname === "/" ? "active" : ""}`}
          onClick={() => navigate("/")}
        >
          <Home className="nav-icon" />
          <span className="nav-label">Home</span>
        </button>

        <button
          type="button"
          className={`nav-item ${location.pathname === "/feed" ? "active" : ""}`}
          onClick={() => navigate("/feed")}
        >
          <Image className="nav-icon" />
          <span className="nav-label">Feed</span>
        </button>

        <button
          type="button"
          className={`nav-item ${location.pathname === "/saved" ? "active" : ""}`}
          onClick={() => navigate("/saved")}
        >
          <Bookmark className="nav-icon" />
          <span className="nav-label">Saved</span>
        </button>

        <button
          type="button"
          className={`nav-item ${location.pathname === "/profile" ? "active" : ""}`}
          onClick={() => navigate("/profile")}
        >
          {user?.photoURL ? (
            <img src={user.photoURL} alt="Profile" className="profile-avatar" />
          ) : (
            <User className="nav-icon" />
          )}
          <span className="nav-label">Profile</span>
        </button>

        {/* Upload Button */}
        <button
          type="button"
          className="nav-item upload-btn"
          onClick={onOpenUpload}
        >
          <UploadCloud className="nav-icon" />
          <span className="nav-label">Upload</span>
        </button>

        {/* Logout Button */}
        {user && (
          <button
            type="button"
            className="nav-item logout-btn"
            onClick={handleLogout}
          >
            <LogOut className="nav-icon" />
            <span className="nav-label">Logout</span>
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
