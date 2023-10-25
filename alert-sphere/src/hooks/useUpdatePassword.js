import { useState } from "react";
import { useNavigate } from "react-router-dom";

function useUpdatePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  function updatePassword(event) {
    event.preventDefault();

    fetch(
      `http://${process.env.REACT_APP_API_BASE_URL}:8080/emergency/user/updatePassword`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setMsg("Password Update Successful.");
          navigate("/profile"); // Navigate to profile page after successful update
        } else {
          setMsg("Error Updating Password.");
        }
      });
  }

  return {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    msg,
    updatePassword,
  };
}

export default useUpdatePassword;
