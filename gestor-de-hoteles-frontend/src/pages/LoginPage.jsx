import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Index";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate()
  const { loggedIn, setLoggedIn } = useContext(AuthContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const login = async () => {
    try {
      let { data } = await axios.post("http://localhost:2765/user/login", form);
      if (data.token) {
        setLoggedIn(true)
        localStorage.setItem('token', data.token)
        swal({
          title: "Log in",
          text: `${data.message}`,
          icon: "success",
        });
        navigate('/')
      }
    } catch (err) {
      console.log(err);
      swal({
        title: "Error, Invalid Credentials",
        text: `${err.response.data.message}`,
        icon: "warning",
      });
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        onChange={handleChange}
        name="email"
        placeholder="Email"
      />
      <input
        type="text"
        onChange={handleChange}
        name="password"
        placeholder="Password"
      />
      <input type="submit" value="Ingresar" onClick={login} />
    </form>
  );
};
