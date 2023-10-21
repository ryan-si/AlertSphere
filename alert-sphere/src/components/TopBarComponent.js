import React from "react";
import { useState } from "react";
import "./TopBarComponent.css";

function TopBarComponent() {
  const [email, setEmail] = useState(sessionStorage.getItem("email") || "");
  const [token, setToken] = useState(sessionStorage.getItem("token") || "");

  return (
    <div className="login-status">
      {token ? (
        <div className="user-info">
          <img
            src="user-avatar.png"
            alt="User Avatar"
            className="user-avatar"
          />
          <span>{email}</span>
        </div>
      ) : (
        <div className="login-register-prompt">
          <span>
            Please <a href="/login">Login</a>/<a href="/register">Register</a>
          </span>
        </div>
      )}
    </div>
  );
}

export default TopBarComponent;
