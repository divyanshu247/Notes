import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/image.png"; 
import "../components/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="glass-navbar">
      <div className="nav-left">
        <Link to="/">
          <img src={logo} alt="image.png" className="nav-logo" />
        </Link>
      </div>

      <ul className="nav-list">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/notes">Notes</Link></li>
        <li><Link to="/pyq">PYQs</Link></li>
        <li><Link to="/upload">Upload</Link></li>
        <li>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
