import { useState } from "react";
import { useNavigate } from "react-router-dom";

function useUpdateAddress() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [address, setAddress] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  function updateAddress(event) {
    event.preventDefault();

    // Assuming a backend API endpoint /emergency/user/updateAddress for updating user's address
    fetch(
      `http://${process.env.REACT_APP_API_BASE_URL}:8080/emergency/user/updateAddress`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentPassword, address }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setMsg("Address Update Successful.");
          navigate("/profile"); // Navigate to profile page after successful update
        } else {
          setMsg("Error Updating Address.");
        }
      });
  }

  return {
    currentPassword,
    setCurrentPassword,
    address,
    setAddress,
    msg,
    updateAddress,
  };
}

export default useUpdateAddress;
