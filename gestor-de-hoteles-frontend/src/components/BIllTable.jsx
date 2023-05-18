import axios from 'axios';
import React, { useState, useEffect, useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../pages/InfoUserPage/InfoUserPage.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../src/Index'

export const BillTable = () => {

    const [bill, setBill] = useState([]);
    const {dataUser, setDataUser} = useContext(AuthContext)
    console.log(dataUser)

    const headers = {
      'Content-Types': 'aplication/json',
      'Authorization': localStorage.getItem('token')
    }

    const getUser = async () => {
      try {
        const { data } = await axios.get('http://localhost:2765/User/myInfo', {headers: headers});
        console.log(data.myInfo.sub)
        setDataUser({
          sub: data.myInfo.sub,
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

    

      console.log(dataUser.sub)
      const id = dataUser.sub

    const getBill = async()=>{
        try {
            const { data } = await axios.get(`http://localhost:2765/Bill/getMyReservations/${id}`, {headers: headers});
            console.log(data)
            setBill(data.reservations)
        } catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
      const fetchData = async () => {
        await getUser();
      };
      fetchData();
    }, []);
  
    useEffect(() => {
      const fetchData = async () => {
        if (dataUser.sub) {
          await getBill(dataUser.sub);
        }
      };
      fetchData();
    }, [dataUser.sub]);
    return (
        <>
        <table className="table table-light table-striped">
            <thead >
              <tr>
                <th >description</th>
                <th >hotel</th>
                <th >room</th>
                <th >entryDate</th>
                <th >departureDate</th>
                <th >duration</th>
                <th >state</th>
                <th >additionalServices</th>
                <th >additionalMeals</th>
                <th >total</th>
              </tr>
            </thead>
            <tbody>
              {
    
                bill.map(({_id, description, user, hotel, room, entryDate, departureDate, duration, state, additionalServices, additionalMeals, total}, index) =>{
                  return(
                    
                    <tr key={index}>
                    <td>{description}</td>
                    <td>
                    {Array.isArray(hotel) ? (
                      hotel.map(({ _id, name, address }, i) => (
                        <div key={i}>
                          {name}, {address}
                        </div>
                      ))
                    ) : (
                      <div>
                        {hotel.name}, {hotel.address}
                      </div>
                    )}
                  </td>
                  <td>
                    {Array.isArray(room) ? (
                      room.map(({ _id, name, number }, i) => (
                        <div key={i}>
                          {name}, {number}
                        </div>
                      ))
                    ) : (
                      <div>
                        {room.name}, {room.number}
                      </div>
                    )}
                  </td>
                    <td>{entryDate}</td>
                    <td>{departureDate}</td>
                    <td>{duration}</td>
                    <td>{state}</td>
                    <td>
                    {Array.isArray(additionalMeals) ? (
                      additionalMeals.map(({ _id, name, price }, i) => (
                        <div key={i}>
                          {name}, {price}
                        </div>
                      ))
                    ) : (
                      <div>
                        {additionalMeals.name}, {additionalMeals.price}
                      </div>
                    )}
                  </td>
                  <td>
                    {Array.isArray(additionalServices) ? (
                      additionalServices.map(({ _id, name, price }, i) => (
                        <div key={i}>
                          {name}, {price}
                        </div>
                      ))
                    ) : (
                      <div>
                        {additionalServices.name}, {additionalServices.price}
                      </div>
                    )}
                  </td>
                    <td>{total}</td>

                    
                    </tr>
    
                    
                  )
                })
              }
            </tbody>
          </table></>
    )
}