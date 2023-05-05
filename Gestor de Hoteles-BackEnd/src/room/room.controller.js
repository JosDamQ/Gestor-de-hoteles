'use strict'

const Room = require('./room.model');
const Hotel = require('../hotel/hotel.model')

exports.test = async(req, res)=>{
    try {
        return res.status(201).send({message: 'Test is running '})
    } catch (err) {
        console.log(err)
    }
}

exports.saveRoom = async(req, res)=>{
    try {
        let data = req.body;
        let existRoom = await Room.findOne({number: data.number} && {hotel: data.hotel});
        if(existRoom) return res.status(400).send({message: 'Room number already exist'})
        let newRoom = new Room(data);
        await newRoom.save();
        return res.send({message: 'Room saved succesfully'});
    } catch (err) {
        console.log(err)
    }
}

exports.getByHotel = async(req, res)=>{
    try {
        let data = req.body;
        let findHotel = await Hotel.findMany({name: data.name})
    } catch (err) {
        console.log(err)
    }

}
