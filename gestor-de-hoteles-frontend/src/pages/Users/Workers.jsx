import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";
import {Navbar} from "../../components/Navbar";

export const Workers = () => {

    const [users, setUsers] = useState([{}]);

    const headers = {
        'Content-Types': 'aplication/json',
        'Authorization': localStorage.getItem('token')
      }

    const getUsers = async () => {
        try {
          const { data } = await axios.get('http://localhost:2765/User/getWorkers', {headers: headers});
          setUsers(data.workers);
          console.log(data.workers)
        } catch (err) {
          console.error(err);
        }
      }

      useEffect(() => {
        getUsers();
      }, []);

  return (
    <>
    <Navbar></Navbar>
        <table className="table table-striped-columns table-sm">
        <thead className='table-dark'>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Surname</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        <tbody>
          {

            users.map(({_id, name, surname, email, phone, rol}, index) =>{
              return (

                <tr key={index}>
                  <td>{name}</td>
                  <td>{surname}</td>
                  <td>{email}</td>
                  <td>{phone}</td>
                  <td>{rol}</td>
                </tr>


              )
            })
          }
        </tbody>
      </table>
    </>
  )
}
