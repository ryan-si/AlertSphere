import { useState } from "react";
import { useNavigate } from "react-router-dom";

function useUpdatePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [user_name, setUserName] = useState(
    sessionStorage.getItem("user_name") || ""
  );

  const navigate = useNavigate();

  function updatePassword(event) {
    event.preventDefault();

    console.log(currentPassword);
    console.log(newPassword);
    console.log(user_name);

    fetch(`${process.env.REACT_APP_API_BASE_URL}/emergency/user/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: currentPassword,
        newPassword: newPassword,
        userName: user_name,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.code === 200) {
          setMsg("Password Update Successful.");
          navigate("/settings");
        } else {
          setMsg(data.msg);
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
