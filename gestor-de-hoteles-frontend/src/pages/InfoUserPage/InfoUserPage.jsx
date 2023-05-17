import React from 'react';
import './InfoUserPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/bootstrap/dist/js/bootstrap.min.js';


export const InfoUserPage = () => {
  return (
    <>
        <section className="seccion-perfil-usuario">
        <div className="perfil-usuario-header">
            <div className="perfil-usuario-portada">
                <div className="perfil-usuario-avatar">
                    <img src="/usuario.png" alt="" /> 
                </div>
                {/*<button type="button" className="boton-portada">
                    <i className="far fa-image"></i> Cambiar fondo
</button>*/}
            </div>
        </div>
        <div className="perfil-usuario-body">
            <div className="perfil-usuario-bio">
                <h3 className="titulo">Info</h3>
            </div>
            <div className="perfil-usuario-footer">
                <ul className="lista-datos">
                    <li><i className="icono fas fa-map-signs"></i> Name: </li>
                    <li><i className="icono fas fa-phone-alt"></i> Email: </li>
                    <li><i className="icono fas fa-briefcase"></i> Role: </li>
                </ul>
                <ul className="lista-datos">
                    <li><i className="icono fas fa-map-marker-alt"></i> Surname: </li>
                    <li><i className="icono fas fa-calendar-alt"></i> Phone: </li>
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
