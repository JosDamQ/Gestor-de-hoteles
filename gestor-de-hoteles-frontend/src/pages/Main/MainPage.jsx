import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import '../Main/MainPage.css'

import {Navbar} from "../../components/Navbar";
import { Link, useNavigate } from "react-router-dom";


export const MainPage = () =>{
    const navigate = useNavigate()

return( 
<>
    <div>
    <Navbar></Navbar>
    </div>
    <div className="page-content">
      <div className="left-section">
        <h1 className="big-text">¿Buscas el lugar ideal para unas buenas vacaciones?</h1>
        <button className="button" onClick={()=>navigate('/')}>Encuentralo Ya!!</button>
      </div>
      <div className="right-section">
        <h2 className="title">Mision</h2>
        <p className="small-text">Nuestra misión es brindar a los viajeros una experiencia excepcional al reservar hoteles, simplificando el proceso, proporcionando información confiable y garantizando altos estándares de calidad. Queremos ser líderes en la industria, ofreciendo servicios personalizados, adaptándonos a las necesidades cambiantes y utilizando la tecnología de manera innovadora. En resumen, somos el aliado confiable que ofrece acceso a hoteles de calidad, una reserva sencilla y un servicio excepcional para satisfacer las necesidades de nuestros clientes viajeros.</p>
      </div>
    </div>
</>)

}