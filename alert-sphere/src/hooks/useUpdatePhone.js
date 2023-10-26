import { useState } from "react";
import { useNavigate } from "react-router-dom";

function useUpdatePhone() {
  // const [currentPassword, setCurrentPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [user_name, setUserName] = useState(
    sessionStorage.getItem("user_name") || ""
  );

  function updatePhone(event) {
    console.log(password);
    console.log(phone);
    console.log(user_name);

    event.preventDefault();

    // Verify the current password and then update the phone number.
    // For demonstration purposes, I'm assuming a simple fetch to an API endpoint.
    fetch(`${process.env.REACT_APP_API_BASE_URL}/emergency/user/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        phoneNumber: phone,
        userName: user_name,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          setMsg("Update Mobile Number Successful.");
          navigate("/settings");
        } else {
          setMsg(data.msg);
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
