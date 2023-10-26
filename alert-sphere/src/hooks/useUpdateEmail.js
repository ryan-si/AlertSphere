import { useState } from "react";
import { useNavigate } from "react-router-dom";

function useUpdateEmail() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [user_name, setUserName] = useState(
    sessionStorage.getItem("user_name") || ""
  );

  function updateEmail(event) {
    event.preventDefault();

    console.log(newEmail);
    console.log(currentPassword);
    console.log(user_name);

    fetch(`${process.env.REACT_APP_API_BASE_URL}/emergency/user/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: newEmail,
        password: currentPassword,
        userName: user_name,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          setMsg("Email Update Successful.");
          navigate("/settings");
        } else {
          setMsg(data.msg);
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
