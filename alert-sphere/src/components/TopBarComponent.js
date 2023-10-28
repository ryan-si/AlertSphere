import React from "react";
import { useState } from "react";
import "./TopBarComponent.css";

function TopBarComponent() {
  const [email, setEmail] = useState(sessionStorage.getItem("email") || "");
  const [token, setToken] = useState(sessionStorage.getItem("token") || "");
  const [user_name, setUserName] = useState(
    sessionStorage.getItem("user_name") || ""
  );
  const [imgsrc, setImgsrc] = useState(sessionStorage.getItem("imgsrc") || "");
  // console.log(imgsrc);

  return (
    <div className="login-status">
      {token ? (
        <div className="user-info">
          <img src={imgsrc} alt="User Avatar" className="user-avatar" />
          <span>{user_name}</span>
        </div>
      ) : (
        <div className="login-register-prompt">
          <span>
            Please{" "}
            <a href="/login" className="text-blue-500">
              Login
            </a>{" "}
            /{" "}
            <a href="/register" className="text-blue-500">
              Register
            </a>
          </span>
        </div>
      )}
    </div>
  );
}

export default TopBarComponent;
