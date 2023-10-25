import { useState } from "react";
import { useNavigate } from "react-router-dom";

function useUpdateEmail() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  function updateEmail(event) {
    event.preventDefault();

    fetch(
      `http://${process.env.REACT_APP_API_BASE_URL}:8080/emergency/user/updateEmail`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentPassword, newEmail }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setMsg("Email Update Successful.");
          navigate("/profile"); // Navigate to profile page after successful update
        } else {
          setMsg("Error Updating Email.");
        }
      });
  }

  return {
    currentPassword,
    setCurrentPassword,
    newEmail,
    setNewEmail,
    msg,
    updateEmail,
  };
}

export default useUpdateEmail;
