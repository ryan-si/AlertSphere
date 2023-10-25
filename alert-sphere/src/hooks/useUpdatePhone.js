import { useState } from "react";
import { useNavigate } from "react-router-dom";

function useUpdatePhone() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  function updatePhone(event) {
    event.preventDefault();

    // Verify the current password and then update the phone number.
    // For demonstration purposes, I'm assuming a simple fetch to an API endpoint.
    fetch(
      `http://${process.env.REACT_APP_API_BASE_URL}:8080/emergency/user/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, phone }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setMsg("Update Mobile Number Successful.");
          navigate("/profile"); // Navigate to profile page after successful update
        } else {
          setMsg("Error Updating Mobile Number.");
        }
      });
  }

  return {
    phone,
    setPhone,
    password,
    setPassword,
    msg,
    updatePhone,
  };
}

export default useUpdatePhone;
