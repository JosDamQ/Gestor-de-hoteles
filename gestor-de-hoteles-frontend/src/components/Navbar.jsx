import React, { useEffect, useState } from "react";
import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Index";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = ({ onNavbarItemClick }) => {
  
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
        />
        <a href="#" className="app-link">
          Hotel 4 All
        </a>
      </div>
      <input id="buttonList" type="checkbox"/>
      
      <div className="navigation-links">
        <a href="#" className="nav-link active" onClick={() => handleNavbarItemClick("Events")}>
          Event
        </a>
        <a href="#" className="nav-link active" onClick={() => handleNavbarItemClick("Hotels")}>
          Hotels
        </a>
        <a href="#" className="nav-link active" onClick={() => handleNavbarItemClick("Stats")}>
          Estadisticas
        </a>
      </div>
      <div className="nav-right-side">
        <button className="mode-switch">
          <svg
            className="sun feather feather-sun"
            fill="none"
            stroke="#fbb046"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <defs />
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
          <svg
            className="moon feather feather-moon"
            fill="none"
            stroke="#ffffff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <defs />
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
          </svg>
        </button>
        <button className="profile-btn">
          <span>Su usuario</span>
          <img
            src="https://images.unsplash.com/photo-1492633397843-92adffad3d1c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2167&q=80"
            alt="pp"
          />
        </button>
      </div>
    </section>
  );
};
