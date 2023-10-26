import React from "react";
import "./SideBarComponent.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function SideBarComponent() {
  const [token, setToken] = useState(sessionStorage.getItem("token") || "");

  const handleLogout = () => {
    // Send a POST request to the server to logout
    fetch(`${process.env.REACT_APP_API_BASE_URL}/emergency/user/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        // Remove the token from sessionStorage after successful logout
        sessionStorage.clear();
        // sessionStorage.removeItem("token");
        // sessionStorage.removeItem("email");
        // sessionStorage.removeItem("is_admin");
        // sessionStorage.removeItem("user_name");
        // sessionStorage.removeItem("imgsrc");
        // sessionStorage.removeItem("lat");
        // sessionStorage.removeItem("lng");
        // Optionally, redirect user to login page
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  return (
    <aside className="sidebar">
      <div className="company-section">
        <Link to="/">
          <img
            src="AlertSphereLogo.png"
            alt="Company Logo"
            className="company-logo"
          />
        </Link>
        {/* <span>
          <Link to="/">AlertSphere</Link>
        </span> */}
      </div>
      <ul className="menu-list">
        <li>
          <Link to="/news">Warnings</Link>
        </li>
        <li>
          <Link to="/healthTips">Health tips</Link>
        </li>
        {/* <li>
          <Link to="/favorites">Collection</Link>
        </li> */}
        <li>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
      <div className="footer-links">
        <a href="/help">Help Centre</a>
        <a href="/contact">Contact us</a>
        <a href="#" onClick={handleLogout}>
          Log out
        </a>
      </div>
    </aside>
  );
}

export default SideBarComponent;
