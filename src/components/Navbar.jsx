import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { Home, Image, Bookmark, User, UploadCloud, LogOut, Mail } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Navbar({ onOpenUpload }) { // removed onOpenInbox, we'll navigate to /inbox
  const location = useLocation();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

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
      {/* Logo */}
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

{/* Inbox / Messages Button */}
        <button
          type="button"
          className="nav-item inbox-btn"
          onClick={() => navigate("/inbox")} // ✅ Navigate to Inbox page
        >
          <Mail className="nav-icon" />
          <span className="nav-label">Inbox</span>
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
