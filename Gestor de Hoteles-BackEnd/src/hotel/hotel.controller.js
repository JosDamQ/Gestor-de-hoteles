'use strict'

const Hotel = require('./hotel.model')
const User = require('../user/user.model')

exports.test = (req, res) => {
    return res.status(201).send({ message: 'test is running' });
}

// --------------------------------------- ADMIN ------------------------------------------------------------

//Hotel

exports.addHotel = async (req, res) => {
    try{
        let data = req.body
        //let userRole = req.user.rol
        let dataRequited = data.admin;
        if (!dataRequited) return res.status(400).send({ message: 'Params admin is required' })
        //Validar que el usuario exista
        let userExist = await User.findOne({ _id: dataRequited })
        if (!userExist) return res.status(400).send({ message: 'user not found' });
        //Validar que sea rol ADMIN de hotel
        if(userExist.rol !== 'WORKER') return res.status(403).send({ message: 'Only one ADMIN can have a Hotel' });
        //Validarmos que el ADMIN no tenga otra hotel a su cargo
        let adminInHotel = await Hotel.findOne({admin: data.admin})
        if(adminInHotel) return res.status(400).send({message: 'This Admin already has a hotel'});
        //Validamos que el hotel no se repita
        let hotelExist = await Hotel.findOne({
            $and:[
                {name: data.name},
                {address: data.address}
            ] 
        })
        if (hotelExist) return res.status(400).send({ message:'Hotel already exists'});
        //Agregamos hotel
        let newHotel = new Hotel(data);
        await newHotel.save();
        return res.status(201).send({message: 'Hotel saved sucessfully'});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error creating Hotel'});
    }
}

exports.getsHotels = async(req, res) => {
    try{
        let hotels = await Hotel.find();
        return res.status(200).send({hotels})
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting Hotel'});
    }
}

exports.getHotel = async(req, res) => {
    try{
        let hotel = await Hotel.findOne({ _id: req.params.id });
        if(!hotel) return res.status(404).send({message: 'Hotel not found'});
        return res.status(200).send({hotel});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting Hotel'});
    }
}

exports.searchByName = async(req, res) => {
    try{
        let data = req.body;
        let params = {
            name: data.name
        }
        let hotel = await Hotel.find({
            name: {
                $regex: params.name,
                $options: 'i'
            }
        })
        return res.send({hotel});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error searching Hotel'});
    }
}

exports.searchByAddress = async(req, res) => {
    try{
        let data = req.body;
        let params = {
            address: data.address
        }
        let hotel = await Hotel.find({
            address: {
                $regex: params.address,
                $options: 'i'
            }
        })
        return res.send({hotel});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error searching Hotel'});
    }
}

//Rooms

exports.addRoom = async(req, res) => {
    try{
        let hotelID = req.params.id;
        let data = req.body;
        //Verificamos que exista el hotel
        let hotel = await Hotel.findOne({_id: hotelID})
        if(!hotel) return res.status(404).send({message: 'Hotel not found'});
        //Verificamos que la habitacion no exista
        const roomExist = hotel.rooms.some(room => /*room.name == data.name && */ room.number == data.number)
        if (roomExist) return res.status(400).send({ message: 'Room already exists in this hotel' });
        //Agregamos la room al hotel encontrado
        hotel.rooms.push(data);
        hotel.numberOfRooms = hotel.rooms.length;
        await hotel.save();
        return res.status(201).send({ message:'Room added to hotel successfully'});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error adding a room'})
    }
}

exports.getRoomsByHotel = async (req, res) => {
    try {
      let hotelId = req.params.id;
      // Validar que el ID del hotel sea válido
      //if (!mongoose.Types.ObjectId.isValid(hotelId)) return res.status(400).send({ message: 'Invalid hotel ID' });
      // Buscar el hotel por su ID y devolver todas sus habitaciones
      let hotel = await Hotel.findOne({_id: hotelId});
      if (!hotel) return res.status(404).send({ message: 'Hotel not found' });
      return res.send(hotel.rooms);
    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: 'Error getting rooms' });
    }
}

exports.searchRoomByName = async(req, res) => {
    try{
        let hotelId = req.params.id;
        let data = req.body
        let params = {
            name: data.name
        }
        //Validar que exista el hotel
        let hotel = await Hotel.findOne({_id: hotelId});
        if(!hotel) return res.status(404).send({message: 'Hotel not found'});
        //Buscar la habitacion por su nombre
        const regex = new RegExp(params, 'i');
        const rooms = hotel.rooms.filter(room => regex.test(room.name));
        return res.send({rooms});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error searching Room'});
    }
}

//--------------------------------------------------- WORKER ------------------------------------------

exports.getsHotelsAtYourExpense = async(req, res) => {
    try{
        let id = req.user.sub;
        let hotels = await Hotel.find({admin: id});
        if(hotels.length === 0) return res.send({message: 'You dont have Hotel at your expense'});
        return res.status(200).send({hotels});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting hotels at your expense'});
    }
}

exports.viewRoomsAvailable = async(req, res) => {
    try{
        let id = req.user.sub;
        let hotel = await Hotel.findOne({admin: id});
        if(!hotel) return res.send({message: 'You dont have Hotel at your expense'});
        let availableRooms = hotel.rooms.filter((room) => room.available);
        return res.status(200).send({rooms: availableRooms});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting rooms available'});
    }
}




  