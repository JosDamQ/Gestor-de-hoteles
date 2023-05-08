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
        let role = req.user.sub
        let existRoom = await Room.findOne({number: data.number, hotel:data.hotel});
        if(existRoom) return res.status(400).send({message: 'Room number already exist'});
        // return res.send({existRoom})
        let hotelExist = await Hotel.findById(data.hotel);
        if(role != hotelExist.admin) return res.status(400).send({message: 'Your not the admin of this hotel'});
        if (!hotelExist) return res.status(404).send({ message: 'Hotel not found' });
        hotelExist.numberOfRooms += 1;
        await hotelExist.save();
        let newRoom = new Room(data);
        await newRoom.save();
        return res.send({message: 'Room saved succesfully'});
    } catch (err) {
        console.log(err);
        return res.status(500).send({message: 'Error adding new room'})
    }
}

exports.getsRoomsByHotel = async(req, res)=>{
    try {
        let hotelId = req.params.id;
        let rooms = await Room.find({hotel: hotelId});
        if(!rooms) return res.status(400).send({message: 'Not rooms found in this hotel'});
        return res.send({rooms});
    }catch(err) {
        console.log(err);
        return res.status(500).send({message: 'Error getting rooms'})
    }
}

exports.getExpensive = async(req, res)=>{
    try{
        let rooms = await Room.find().sort({price:-1});
        return res.status(200).send({rooms});
    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error getting rooms'})
    }
}

exports.getCheap = async(req, res)=>{
    try{
        let rooms = await Room.find().sort({price:1});
        return res.status(200).send({rooms});
    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error getting rooms'})
    }
}

exports.updateRoom = async(req, res)=>{
    try{
        let data = req.body;
        let roomId = req.params.id
        let role = req.user.sub;
        let params1 = {
            name: data.name,
            number: data.number,
            description: data.description,
            price: data.price
        }

        let room = await Room.findOne({_id: roomId}).populate('hotel');
        if(role != room.hotel.admin/*.toString()*/) return res.status(401).send({message: 'Your not admin of this hotel'}) 
        if(room.available == false) return res.status(400).send({message: 'This room is ocupated'});
        let existNumber = await Room.findOne({number: data.number, hotel: room.hotel});
        if(existNumber && existNumber._id.toString() !== roomId) return res.status(400).send({message: 'Room number already exist'});
        await Room.updateOne(
            {_id: roomId},
            params1,
            {new: true}
        )
        // let room = await Room.findByIdAndUpdate(
        //     {_id: roomId},
        //     params1,
        //     {new: true})
        return res.send({message: 'Updated succesfully', room});
    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error updating room'})
    }
}

exports.deleteRoom = async(req,res)=>{
    try{
        let roomId = req.params.id;
        let role = req.user.sub;
        let room = await Room.findOne({_id: roomId}).populate('hotel','admin');
        if(!room) return res.status(404).send({message: 'Room not found'});
        if(room.available == false) return res.status(400).send({message: 'This room is ocupated'});
        if(role != room.hotel.admin/*.toString()*/) return res.status(401).send({message: 'Your not admin of this hotel'}) 
        await Room.deleteOne({_id: roomId});
        let hotelId = room.hotel;
        await Hotel.findOneAndUpdate({_id: hotelId},{$inc: {numberOfRooms: -1}});
        return res.send({message: 'Room deleted succesfully'})
    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error deleting room'})
    }
}


