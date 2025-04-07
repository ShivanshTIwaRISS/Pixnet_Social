import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { Home, Image, Bookmark, User, UploadCloud } from "lucide-react";
import logo from "../assets/image.png";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="PixNet Logo" className="logo-image" />
        <span className="logo-text">PixNet</span>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-item">
          <Home className="nav-icon" />
          <span className="nav-label">Home</span>
        </Link>
        <Link to="/feed" className="nav-item">
          <Image className="nav-icon" />
          <span className="nav-label">Feed</span>
        </Link>
        <Link to="/saved" className="nav-item">
          <Bookmark className="nav-icon" />
          <span className="nav-label">Saved</span>
        </Link>
        <Link to="/profile" className="nav-item">
          <User className="nav-icon" />
          <span className="nav-label">Profile</span>
        </Link>
        <Link to="/upload" className="nav-item">
          <UploadCloud className="nav-icon" />
          <span className="nav-label">Upload</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
