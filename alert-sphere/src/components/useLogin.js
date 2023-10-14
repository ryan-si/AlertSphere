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

  function login() {
    const url = "";
    fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
    .then((res) => res.json())
    .then((res) => {
      if (res.error !== 200) {
        throw new Error(res.msg);
      }
      return res;
    })
    .then((res) => {
      sessionStorage.setItem("token", res.data.token);
    })
    .catch((err) => setMsg(err.msg));
  }

  useEffect(() => {
    if (token) {
      navigate("/homePage");
      sessionStorage.setItem("email", email);
    }
  }, [msg, token, email, navigate]);

  return {
    email,
    setEmail,
    password,
    setPassword,
    msg,
    login
  };
}