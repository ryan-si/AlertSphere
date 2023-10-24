import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function useRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  function register(event) {
    event.preventDefault();
    const url = `http://${process.env.REACT_APP_API_BASE_URL}:8080/emergency/user/register`;
    fetch(url, {
      method: "POST",
      headers: { accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ user_email: email, password: password, name: name, mobile: mobile, address: address})
    })
      .then(res => res.json())
      .then((res) => {
        if (res.code !== 200) {
          alert(res.msg);
          throw new Error(res.msg);
        }
        return res;
      })
      .then((res) => {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("email", email);
        navigate("/");
      })
      .catch((err) => setMsg(err.msg));
  }

  return {
    email, 
    setEmail, 
    password, 
    setPassword, 
    name, 
    setName, 
    mobile, 
    setMobile, 
    address, 
    setAddress,
    msg, 
    register
  };
}
export default useRegister;