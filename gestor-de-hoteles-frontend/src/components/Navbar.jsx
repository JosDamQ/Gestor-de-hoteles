import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Index";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";


export const Navbar = ({ onNavbarItemClick }) => {

  const {dataUser, setDataUser} = useContext(AuthContext)
  const navigate = useNavigate()

  const headers = {
    'Content-Types': 'aplication/json',
    'Authorization': localStorage.getItem('token')
  }

  const logOut = ()=>{
    localStorage.clear()
    navigate('/')
    setDataUser('')
}

  const getUser = async () => {
    try {
      const { data } = await axios('http://localhost:2765/User/myInfo', {headers: headers});
      setDataUser({
        name: data.myInfo.name,
        surname: data.myInfo.surname,
        phone: data.myInfo.phone,
        email: data.myInfo.email,
        rol: data.myInfo.rol
      })
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getUser()
  }, []);
  
    const handleNavbarItemClick = (message2) => {
      if (onNavbarItemClick) {
        onNavbarItemClick(message2);
      }
    };

  return (
    <section className="navigation">
      <div className="navigation">
        <img
          src="../src/assets/Hotel4All.png"
          className="imgNavbar"
          alt="Logo"
          onClick={() => handleNavbarItemClick("Hotels")}
        />
          <a onClick={() => handleNavbarItemClick("Hotels")} className="app-link">
            Hotel 4 All
          </a>
      </div>
      <input id="buttonList" type="checkbox"/>
      
      <div className="navigation-links">
        <a  className="nav-link active" onClick={() => handleNavbarItemClick("Events")}>
          Event
        </a>
        <a  className="nav-link active" onClick={() => handleNavbarItemClick("Hotels")}>
          Hotel
        </a>
        <a  className="nav-link active" onClick={() => handleNavbarItemClick("Stats")}>
          Estadisticas
        </a>
      </div>
      <div className="nav-right-side">
        <button className="logOut" onClick={logOut}>
          logOut
        </button>
        <Link to='/infoUser'>
          <button className="profile-btn">
            <span>{dataUser.email}</span>
            <img
              src="https://images.unsplash.com/photo-1492633397843-92adffad3d1c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2167&q=80"
              alt="pp"
            />
          </button>
          </Link>
      </div>
    </section>
  );
};
