import { useState } from "react";
import { useNavigate } from "react-router-dom";

function useUpdateAddress() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [address, setAddress] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [user_name, setUserName] = useState(
    sessionStorage.getItem("user_name") || ""
  );

  function updateAddress(event) {
    event.preventDefault();

    // Assuming a backend API endpoint /emergency/user/updateAddress for updating user's address
    fetch(`${process.env.REACT_APP_API_BASE_URL}/emergency/user/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        location: address,
        password: currentPassword,
        userName: user_name,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          setMsg("Address Update Successful.");
          navigate("/settings");
        } else {
          setMsg(data.msg);
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
