import React, { useState, useEffect, useContext } from "react";
import {Navbar} from "../../components/Navbar";
import "../Home/HomePage.css";
import { Card } from "../../components/Card";
import { CardRoom } from "../../components/CardRoom";
import { CardEvent } from "../../components/cardEvents";
import { ModalRoom } from '../../components/Modals/ModalRoom'
import { AuthContext } from '../../Index'

import axios from 'axios'

export const HomePage = () => {

  const {dataUser} = useContext(AuthContext)
      // Modal
  const [showModalRoom, setShowModalRoom] = useState(false);
  const [showModalHotel, setShowModalHotel] = useState(false)
  const [showModalMeals, setShowModalMeals] = useState(false)
  const [showModalEventType, setShowModalEventType] = useState(false)
  const [showModalReservation, setShowModalReservation] = useState(false)
  const [showModalReservationEvent, setShowModalReservationEvent] = useState(false)
  const [showModalUser, setShowModalUser] = useState(false)

    // Modal
    // Funcionalidad de los cards
    const [hotels, setHotels] = useState([{}]);
    const [rooms, setRooms] = useState([{}]);
    const [events, setEvents] = useState([{}])
    // Es el hotel seleccionado, si es que hay alguno
    const [selectedHotel, setSelectedHotel] = useState('');
    // Mensajes que van cambiando
    const [message, setMessage] = useState()
    const [message2, setMessage2] = useState();
    const [message3, setMessage3] = useState("");
    // Funcionalidad barra de busqueda

  const [workers, setWorkers] = useState([{}]);



  const [form, setForm] = useState({
    name: '',
    address: ''
  })



  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  // Maneja las funciones del navbar
  const handleNavbarItemClick = (message2) => {
    if (message2 == 'Hotels'){
      console.log("Mensaje recibido:", message2);
      setRooms([]);
      setEvents([])
      setSelectedHotel('')
      getHotels();}
    if( message2 == 'Events'){
      console.log("Mensaje recibido:", message2);
      setRooms([]);
      setHotels([])
      setSelectedHotel('')
      getEvents()


    }
  };

  // Llena los card de hoteles
  const headers = {
    'Content-Types': 'aplication/json',
    'Authorization': localStorage.getItem('token')
  }

  //hotel
  const [formHotel, setFormHotel] = useState({
    name: '',
    address: '',
    admin: '',
    contact: '',
    email: '',
    phone: '',
    eventAvailability: ''
  })

  const handleChangeHotel = (e) => {
    setFormHotel({
      ...formHotel,
      [e.target.name]: e.target.value
    })
  }

  //cuarto
  const [formRoom, setFormRoom] = useState({
    name: '',
    number: '',
    hotel: '',
    description: '',
    price: ''
  })

  const handleChangeRoom = (e) => {
    setFormRoom({
      ...formRoom,
      hotel: selectedHotel.id,
      [e.target.name]: e.target.value
    })
  }

  //comidas
  const [formMeals, setFormMeals] = useState({
    name: '',
    description: '',
    price: ''
  })

  const handleChangeMeals = (e) => {
    setFormMeals({
      ...formMeals,
      [e.target.name]: e.target.value
    })
  }

  //tipo de evento
  const [formEventType, setFormEventType] = useState({
    name: '',
    description: '',
    price: ''
  })

  const handleChangeEventType = (e) => {
    setFormEventType({
      ...formEventType,
      [e.target.name]: e.target.value
    })
  }

  //reservation
  const [formReservation, setFormReservation] = useState({

  })

  const handleChangeReservation = (e) => {
    setFormReservation({
      ...formReservation,
      [e.target.name]: e.target.value
    })
  }

  //reservation event
  const [formEventReservation, setFormEventReservation] = useState({

  })
  

  const handleChangeEventReservation = (e) => {
    setFormEventReservation({
      ...formEventReservation,
      [e.target.name]: e.target.value
    })
  }


  const getHotels = async () => {
    try {
      const { data } = await axios('http://localhost:2765/Hotel/gets');
      setHotels(data.hotels);
    } catch (err) {
      console.error(err);
    }
  }

  const getEvents = async () => {
    try{
      const {data} = await axios('http://localhost:2765/eventType/gets')
      setEvents(data.eventType)
      console.log(data)
    }catch(err){
      console.error(err)
    }
  }

  // Funcionalidad barra de busqueda
  const searchHotelsByNameAndAddress = async () => {
    try {
      setHotels([]);
      setRooms([]);
      const { data } = await axios.post('http://localhost:2765/Hotel/searchByNameAndAddress', form);
      if (!data) getHotels();
      setHotels(data.hotels);
    } catch (err) {
      console.error(err);
    }
  }

  const getWorkers = async()=>{
    try {
      const {data} = await axios.get('http://localhost:2765/User/getWorkers', {headers: headers})
      setWorkers(data.workers)
      console.log(data)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(()=>getWorkers, []);
  
  const getRoomByHotel = async (hotelId, hotelName, hotelAddress, hotelEmail, hotelPhone) => {
    try {
      setSelectedHotel({id: hotelId, name: hotelName, address:hotelAddress, email:hotelEmail, Phone:hotelPhone});
      setHotels([]);
      setRooms([]);
      const { data } = await axios.get(`http://localhost:2765/Room/getsByHotel/${hotelId}`);
      setRooms(data.rooms);
    } catch (err) {
      console.error(err)
    }
  }


  useEffect(() => {
    getHotels()
    setEvents([]);
    setRooms([])
  }, []);
  
  const addHotel = async()=>{
    try {
      await axios.post('http://localhost:2765/Hotel/add', formHotel, {headers: headers})
      
      setFormHotel({})
    } catch (err) {
      console.error(err);
      
    }
  }

  const addRoom = async(e)=>{
    try {
      e.preventDefault()
      console.log(formRoom)
      await axios.post('http://localhost:2765/Room/save', formRoom, {headers: headers})
      setFormRoom({})
    } catch (err) {
      console.error(err);
    }
  }

  const addMeals = async()=>{
    try {
      const { data } = await axios.post('http://localhost:2765/AdditionalMeal/save', formMeals, {headers: headers})
      setFormMeals({})
    } catch (err) {
      console.error(err);
    }
  }

  const addTypeEvent = async()=>{
    try {
      const { data } = await axios.post('http://localhost:2765/AdditionalMeal/save', formEventType, {headers: headers})
      setFormEventType({})
    } catch (err) {
      console.error(err);
    }
  }


  useEffect(()=> getHotels, []);

  useEffect(() => {
    if (selectedHotel) {
      setMessage(`Hotel: ${selectedHotel.name}`);
      setMessage3(`Address: ${selectedHotel.address}`)
    } else if (selectedHotel == '') {
      setMessage('Latest Deals');
      setMessage3('')
    }
  }, [selectedHotel]);
  return (
    <>
      <div className="app-container">
        <Navbar onNavbarItemClick={handleNavbarItemClick}/>
        {/* <section className="navigation">
          <div className="navigation">
            <img
              src="../src/assets/Hotel4All.png"
              style={{ width: "70px" }}
              alt="Logo"
            />
            <a href="#" className="app-link">
              Hotel 4 All
            </a>
          </div>

          <div className="navigation-links">
            <a href="#" className="nav-link ">
              Destinations
            </a>
            <a href="#" className="nav-link active">
              Hotels
            </a>
            <a href="#" className="nav-link">
              Camping
            </a>
            <a href="#" className="nav-link">
              Car Rent
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
        </section> */}
        <section className="app-actions">
          <div className="app-actions-line">
            <div className="search-wrapper">
              <button className="loaction-btn">
                <svg
                  className="btn-icon feather feather-map-pin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </button>
              <input
                type="text"
                className="search-input"
                onChange={handleChange} name='address'
                placeholder="¿En que zona desea Buscar?"
              />
              <input
                type="text"
                className="search-input"
                onChange={handleChange} name='name'
                placeholder="¿Ya sabes en que hotel?"
              />
              <button onClick={searchHotelsByNameAndAddress} className="search-btn">Find Hotel</button>
            </div>
            <div className="contact-actions-wrapper">
              <div className="contact-actions">
                <span>Contact us: </span>
                <a href="#" className="contact-link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-envelope-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                  </svg>
                </a>
                <a href="#" className="contact-link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-telephone-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        <div>
          
          <button className="button1" onClick={()=> setShowModalHotel(true)} >Agregar hotel</button>
          <button className="button1" onClick={()=> setShowModalMeals(true)} >Mostrar comida</button>
          <button className="button1" onClick={()=> setShowModalEventType(true)} >Mostrar eventos</button>
          <button className="button1" onClick={()=> setShowModalReservation(true)} >Mostrar reservaicon</button>
          <button className="button1" onClick={()=> setShowModalReservationEvent(true)} >Mostrar reservacion de evento</button>
        </div>

        <section className="app-main">
          

          {
            //Mostrar modal de Cuarto
          }
          {showModalRoom ? <ModalRoom titleModal= {'Agregar Cuarto'} showModalRoom={showModalRoom} setShowModalRoom={setShowModalRoom}>
            
            <input className="inputModal" type='text' placeholder='Nombre' name='name' onChange={handleChangeRoom} required />
            <input className="inputModal" type='number' placeholder='Numero de cuarto' name='number' onChange={handleChangeRoom} required />
            <input className="inputModal" type='text' placeholder='Descripcion' name='description' onChange={handleChangeRoom} required />
            <input className="inputModal" type='number' placeholder='Precio' name='price' onChange={handleChangeRoom} required />
            <button className="botonAdd" onClick={addRoom} >Agregar Cuarto</button>
          </ModalRoom> : <></>}

          
          {
            //Mostrar modal de hotel
          }
          {showModalHotel ? <ModalRoom titleModal= {'Agregar Hotel'} showModalRoom={showModalHotel} setShowModalRoom={setShowModalHotel}>
            <input className="inputModal" type='text' placeholder='Nombre' name='name' onChange={handleChangeHotel} required />
            <input className="inputModal" type='text' placeholder='Direccion' name='address' onChange={handleChangeHotel} required />
            <select className="inputModal" onChange={handleChangeHotel} name="admin" required>
              <option value="">Ingresa un usuario</option>
              {
                workers.map(({_id, name}, i)=>{
                  return (<option key={i} value={_id}> {name} </option>)
                })
              }
            </select>
            <input className="inputModal" type='number' placeholder='Contacto' name='contact' onChange={handleChangeHotel} required />
            <input className="inputModal" type='text' placeholder='Email' name='email' onChange={handleChangeHotel} required />
            <input className="inputModal" type='number' placeholder='Telefono' name='phone' onChange={handleChangeHotel} required />
            <input className="inputModal" type='text' placeholder='Disponibilida de eventos' name='eventAvailability' onChange={handleChangeHotel} required />
            <button className="botonAdd" onClick={(e)=>{addHotel(), (e).preventDefault(e)}} >Agregar Hotel</button>
          </ModalRoom> : <></>}

          {
            //Mostrar modal de Comida extra
          }
          {showModalMeals ? <ModalRoom titleModal= {'Agregar Comida'} showModalRoom={showModalMeals} setShowModalRoom={setShowModalMeals}>
          <input className="inputModal" type='text' placeholder='Nombre' name='name' onChange={handleChangeMeals} required />
            <input className="inputModal" type='text' placeholder='Descripcion' name='description' onChange={handleChangeMeals} required />
            <input className="inputModal" type='number' placeholder='Precio' name='price' onChange={handleChangeMeals} required />
            <button className="botonAdd" onClick={addMeals} >Alerta</button>
          </ModalRoom> : <></>}

          {
            //Mostrar modal de tipo de evento
          }
          {showModalEventType ? <ModalRoom titleModal= {'Agregar Tipo de evento'} showModalRoom={showModalEventType} setShowModalRoom={setShowModalEventType}>
            <input className="inputModal" type='text' placeholder='Nombre' name='name' onChange={handleChangeEventType} required />
            <input className="inputModal" type='text' placeholder='Descripcion' name='description' onChange={handleChangeEventType} required />
            <input className="inputModal" type='number' placeholder='Precio' name='price' onChange={handleChangeEventType} required />
            <button className="botonAdd" onClick={addTypeEvent} >Agregar tipo de evento</button>
          </ModalRoom> : <></>}

          {
            //Mostrar modal de reservacion de cuarto
          }
          {showModalReservation ? <ModalRoom titleModal= {'Agregar Reservacion de cuarto'} showModalRoom={showModalReservation} setShowModalRoom={setShowModalReservation}>
            <p>No agregar hotel</p>
            <button onClick={()=>alert("hola mundo")} >Alerta</button>
          </ModalRoom> : <></>}

          {
            //Mostrar modal de reservacion de evento
          }
          {showModalReservationEvent ? <ModalRoom titleModal= {'Agregar Reservacion de evento'} showModalRoom={showModalReservationEvent} setShowModalRoom={setShowModalReservationEvent}>
            <p>No agregar hotel</p>
            <button onClick={()=>alert("hola mundo")} >Alerta</button>
          </ModalRoom> : <></>}

          {
            //Mostrar modal de Usuario
          }


          <div className="app-main-left cards-area">
          
            {
              hotels.map(({ _id, name, address, email, phone }, i) => {
                return (
                  <Card
                    key={i}
                    _id={_id}
                    name={name}
                    address={address}
                    email={email}
                    phone={phone}
                    onClick={() => {getRoomByHotel(_id, name, address, email, phone) }}
                  >
                  </Card>
                )
              })
            }
            {
              rooms.map(({ _id, name, number, price, description }, i) => {
                return (
                  <CardRoom
                    key={i}
                    name={name}
                    number={number}
                    price={price}
                    description={description}
                    onClick={()=> {}}
                  ></CardRoom>
                );
              })
            }
            {
              events.map(({ _id, name, description, price }, i) => {
                return (
                  <CardEvent
                    key={i}
                    name={name}
                    description={description}
                    price={price}
                  >
                  </CardEvent>
                )
              })
            }

          </div>
          {
            //card de hoteles
          }
          <div className="app-main-right cards-area">
            <div className="app-main-right-header">
              <div>
                <span>{message}</span>
                <br></br>
                <span>{message3}</span>
                <br></br>
              </div>
              {selectedHotel ? (
                <div>
                  <button className="button1" onClick={()=> setShowModalRoom(true)} >Agregar cuarto</button>
                  <button className="button1" onClick={()=> setShowModalRoom(true)} >Editar Hotel</button>
                </div>
              ) : <></>
                
              }
            </div>
            
            {
              hotels.map(({ _id, name, address, email, phone }, i) => {
                return (
                  <Card
                    key={i}
                    name={name}
                    address={address}
                    email={email}
                    phone={phone}
                    onClick={() => getRoomByHotel(_id, name, address, email, phone)}
                  >
                  </Card>
                )
              })
            }
          </div>
        </section>
      </div>

    </>
  );
};
