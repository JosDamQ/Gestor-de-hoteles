'use strict'

const Bill = require('./bill.model')
const {validateData} = require('../utils/validate')
const User = require('../user/user.model')
const Hotel = require('../hotel/hotel.model')
const Room = require('../room/room.model')

exports.test = (req, res)=>{
  return res.send({message: 'Bill test running'});
}

exports.createBill = async(req, res)=>{
  try {
    let data = req.body;
    data.description = 'RESERVATION';
    data.user = req.user.sub;
    let params = {
      room: data.room,
      entryDate: data.entryDate
    }
    // Verifica si la habitacion esta disponible o no
    const roomAvailable = await Room.findById({_id: data.room})
    if(roomAvailable.available == false) return res.status(403).send({message: 'Room is not available'})
    // Setea el departure date
    const endDate = new Date(data.entryDate);
    endDate.setDate(endDate.getDate() + parseInt(data.duration));
    data.departureDate = endDate.toISOString().substr(0, 10);
    const departureDate = new Date (data.entryDate);

    // verifica que el usuario no tenga otra reservacion entre esta fecha en cualquier hotel
    const otherReservation = await Bill.find({user: req.user.sub});
    
    const prevDepartureDate = new Date (otherReservation[0].departureDate)
    const prevEntryDate = new Date(otherReservation[0].entryDate)
    const newEntryDate = new Date(data.entryDate)
    console.log(prevEntryDate)
    console.log(prevDepartureDate)
    console.log(newEntryDate)
    if ( prevDepartureDate>= newEntryDate && newEntryDate >= prevEntryDate ) return res.status(403).send({message: 'You already have a reservation in this date'})
    
    // Setea hotel, sin necesidad de que el dato sea ingresado
    const hotelRoom = await Room.findOne({_id: data.room})
    data.hotel = hotelRoom.hotel
    // Pone la habitacion como no disponible
    await Room.findOneAndUpdate(
      {_id: data.room},
      {available: false},
      {new: true})
    // Crea la reservacion
    let msg = validateData(params)
    if(msg) return res.status(400).send({msg});
    let newReservation = new Bill(data)
    await newReservation.save()
    
    return res.send({message: 'Reservation was created successfully'})
  } catch (err) {
    console.log(err);
  }
}