import React, {useContext, useEffect} from 'react'
import './InfoUserPage.css'
import { AuthContext } from "../../Index";
import axios from "axios";
//import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../../node_modules/bootstrap/dist/js/bootstrap.min.js'

export const InfoUserPage = () => {

    const headers = {
        'Content-Types': 'aplication/json',
        'Authorization': localStorage.getItem('token')
      }

    const {dataUser, setDataUser} = useContext(AuthContext)
    
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
  return (
    <>
        <section className="seccion-perfil-usuario">
        <div className="perfil-usuario-header">
            <div className="perfil-usuario-portada">
                <div className="perfil-usuario-avatar">
                    <img src="/usuario.png" alt="" /> 
                </div>
            </div>
        </div>
        <div className="perfil-usuario-body">
            <div className="perfil-usuario-bio">
                <h3 className="titulo">{dataUser.email}</h3>
            </div>
            <div className="perfil-usuario-footer">
                <ul className="lista-datos">
                <li><i className="icono fas fa-phone-alt"></i> Name: {dataUser.name} </li>
                    <li><i className="icono fas fa-phone-alt"></i> Email: {dataUser.email}</li>
                    
                </ul>
                <ul className="lista-datos">
                    <li><i className="icono fas fa-map-marker-alt"></i> Surname: {dataUser.surname} </li>
                    <li><i className="icono fas fa-calendar-alt"></i> Phone: {dataUser.phone}</li>
                </ul>
            </div>
            <br />
            <div className="perfil-usuario-bio">
                <h3 className="titulo">Reservations</h3>
            </div>
            {/*<div className="perfil-usuario-footer">*/}
                <table className= "table table-light table-striped">
                    <thead>
                        <tr>
                            <th>Hotel</th>
                            <th>Room</th>
                            <th>Additional Services</th>
                            <th>Date</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Hotel cualquier cosa</td>
                            <td>Presidencial o yo que se</td>
                            <td>Ninguno</td>
                            <td>Hoy a mañana</td>
                            <td>5000</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <br />
            {/*</div>*/}
        </div>
    </section>
    </>
  )
}
