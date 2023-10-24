import React from "react";
import "./SideBarComponent.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function SideBarComponent() {
  const [token, setToken] = useState(sessionStorage.getItem("token") || "");

  const handleLogout = () => {
    // Send a POST request to the server to logout
    fetch("http://10.19.229.4:8080/emergency/user/logout", {
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
        sessionStorage.removeItem("token");
        // Optionally, redirect user to login page
        window.location.href = "/login";
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
