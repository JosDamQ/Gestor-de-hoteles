'use strict'

const Hotel = require('./hotel.model')
const User = require('../user/user.model');
const Bill = require('../bill/bill.model')
const { unauthorizatedData } = require('../utils/validate');

exports.test = (req, res) => {
    return res.status(201).send({ message: 'test is running' });
}

// --------------------------------------- ADMIN ------------------------------------------------------------

//Hotel

exports.addHotel = async (req, res) => {
    try{
        let data = req.body
        let notAllowed = {
            popularity: data.popularity,
            eventAvailability: data.eventAvailability,
            additionalMeals: data.additionalMeals,
            additionalServices: data.additionalServices,
            numberOfRooms: data.numberOfRooms
        }
        let notAuthorizated = unauthorizatedData(notAllowed)
        if(notAuthorizated) return res.status(400).send({notAuthorizated});
        //Validar que el usuario exista
        let userExist = await User.findOne({ _id: data.admin, rol: 'WORKER' });
        if (!userExist) return res.status(400).send({ message: 'Worker not found' });
        //Validarmos que el ADMIN no tenga otra hotel a su cargo
        let adminInHotel = await Hotel.findOne({admin: data.admin})
        if(adminInHotel) return res.status(400).send({message: 'This Admin already has a hotel'});
        //Validamos que el hotel no se repita
        let hotelExist = await Hotel.find({
            name: {$regex: data.name, $options: 'i'},
            address: {$regex: data.address, $options: 'i'}
        })
        for(const addres of hotelExist){
            if (
                addres.name.toUpperCase() == data.name.toUpperCase() &&
                addres.address.toUpperCase() == data.address.toUpperCase()
              )
                return res
                  .status(400)
                  .send({ message: "Hotel already exists in this address" });
        }
        //Agregamos hotel
        let newHotel = new Hotel(data);
        await newHotel.save();
        return res.status(201).send({message: 'Hotel saved sucessfully'});
    }catch(err){
        console.error(err);
        return res.status(500).send({error: err.message});
    }
}

exports.getsHotels = async(req, res) => {
    try{
        let hotels = await Hotel.find().populate('admin', {password: 0}).lean();
        return res.status(200).send({hotels})
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting Hotel'});
    }
}

exports.getHotel = async(req, res) => {
    try{
        let hotel = await Hotel.findOne({ _id: req.params.id }).populate('admin', {password: 0}).lean();
        if(!hotel) return res.status(404).send({message: 'Hotel not found'});
        return res.status(200).send({hotel});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting Hotel'});
    }
}

exports.getHotelByWorker = async (req, res) => {
    try {
      const workerId = req.params.id;
      const hotels = await Hotel.find({ admin: workerId });
  
      if (hotels.length === 0) {
        return res.status(404).send({ message: "No hotels found for this worker" });
      }
  
      return res.send({ hotels });
    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: "Error getting hotels" });
    }
}

exports.searchByName = async(req, res) => {
    try{
        let data = req.body;
        let filter;
        if(data.address && data.name)
            filter = await Hotel.find({
                name: {$regex: data.name, $options: 'i'}, 
                address: {$regex: data.address, $options: 'i'}
            });
        if(!data.name || data.name == '')
            filter = await Hotel.find({address: {$regex: data.address, $options: 'i'}});
        if (!data.address || data.address == '')
            filter = await Hotel.find({name: {$regex: data.name, $options: 'i'}});
        return res.send({filter});
        
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error searching Hotel'});
    }
}

exports.deleteHotel = async (req, res) => {
    try {
      const hotelId = req.params.id;
      const hotel = await Hotel.findById(hotelId);
      if(!hotel) return res.status(404).send({message: 'Hotel not found'})
      const adminId = hotel.admin;
      const reservations = await Bill.find({ hotel: hotelId });
      if (reservations.length > 0) {
        return res.status(400).send({
          message: "Cannot delete hotel. There are reservations associated with it.",
        });
      }
      await Hotel.findOneAndDelete({ _id: hotelId });
      await User.findOneAndDelete({_id: adminId})
      return res.send({ message: "Hotel and Admin deleted successfully" });
    }catch (err) {
      console.error(err);
      return res.status(500).send({ message: "Error deleting hotel" });
    }
}

exports.updateHotel = async (req, res) => {
    try {
      const hotelId = req.params.id;
      const data = req.body;
      const params = {
        name: data.name,
        address: data.addres
      }
      // Verificar si hay reservaciones asociadas al hotel
      const reservations = await Bill.find({ hotel: hotelId });
      if (reservations.length > 0) {
        return res.status(400).send({
          message: "Cannot update hotel. There are reservations associated with it.",
        });
      }
      await Hotel.findOneAndUpdate(
        { _id: hotelId },
         params,
         {new: true});
      return res.send({ message: "Hotel updated successfully" , });
    }catch (err){
      console.error(err);
      return res.status(500).send({ message: "Error updating hotel" });
    }
};




  