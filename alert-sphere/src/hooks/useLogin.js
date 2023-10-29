import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  function getRandomNumber() {
    return Math.floor(Math.random() * 10) + 1;
  }

  function login(event) {
    event.preventDefault();
    const url = `${process.env.REACT_APP_API_BASE_URL}/emergency/user/login`;
    // console.log(url)
    fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_email: email, password: password }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.code !== 200) {
          alert(res.msg);
          throw new Error(res.msg);
        }
        return res;
      })
      .then((res) => {
        const randomNumber = getRandomNumber();
        console.log(randomNumber);
        const imgsrc = "ava" + randomNumber + ".png";
        console.log(imgsrc);
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("is_admin", res.data.is_admin);
        sessionStorage.setItem("user_name", res.data.user_name);
        sessionStorage.setItem("imgsrc", imgsrc);
        sessionStorage.setItem("lat", res.data.lat);
        sessionStorage.setItem("lng", res.data.lng);
        navigate("/");
      })
      .catch((err) => setMsg(err.msg));
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    msg,
    login,
  };
}
