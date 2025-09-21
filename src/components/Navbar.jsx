import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { Home, Image, Bookmark, User, UploadCloud } from "lucide-react";
import logo from "../assets/image.png";

function Navbar({ onOpenUpload }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <img src={logo} alt="PixNet Logo" className="logo-image" />
      </div>

      {/* Navigation Buttons */}
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
          <User className="nav-icon" />
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
      </div>
    </nav>
  );
}

export default Navbar;
