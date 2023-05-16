import React, { useEffect, useState } from "react";
import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Index";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate()
  const { loggedIn, setLoggedIn } = useContext(AuthContext);
  const [user, setUser] = useState({});

  const headers = {
    "Content-Types": "aplication/json",
    Authorization: localStorage.getItem("token"),
  };

  let getInfoUser = async () => {
    try {
      let { data } = await axios.get("http://localhost:2765/user/getInfoUser", {
        headers: headers,
      });
      setUser({
        name: data.user.name,
        surname: data.user.surname,
        rol: data.user.rol,
      });
      setLoggedIn(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => getInfoUser, []);

  const logout = ()=>{
    localStorage.clear()
    setLoggedIn(false);
    navigate('/')
  }

  return (
    <nav className="navbar">
      <h1>Hotel's 4 all</h1>
      {loggedIn ? (
        <>
          <label onClick={logout} className="btnNavbar">Log out</label>
          <label className="btnNavbar">
            {user.name} {user.surname}
          </label>
        </>
      ) : (
        <>
          <Link to="login">
            <label className="btnNavbar">Sign in</label>
          </Link>
          <Link to="register">
            <label className="btnNavbar">Sign up</label>
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
