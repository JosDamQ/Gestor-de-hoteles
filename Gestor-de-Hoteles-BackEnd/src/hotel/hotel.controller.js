'use strict'

const Hotel = require('./hotel.model')
const User = require('../user/user.model');
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


exports.deleteHotel = async (req, res) => {
   
    try {
      const hotelId = req.params.id;
    
      // Verificar si el hotel existe
      const hotel = await Hotel.findById(hotelId);
      if (!hotel) {
        return res.status(404).send({ message: 'Hotel not found' });
      }
  
      // Eliminar el hotel
      await Hotel.findByIdAndDelete(hotelId);
  
      return res.status(200).send({ message: 'Hotel deleted successfully' });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: 'An error occurred' });
    }
  };
  

  
  exports.updateHotel = async (req, res) => {
    try {
      let hotelId = req.params.id;
      let data = req.body;
  
      let hotelExists = await Hotel.find({
        name: { $regex: data.name, $options: "i" }
      });
      for (const hot of hotelExists) {
        if (
            hot.name.toUpperCase() == data.name.toUpperCase() &&
            hot._id != hotelId
        )
          return res
            .status(400)
            .send({ message: "Hotel already exists" });
      }
  
      let updatedHotel = await Hotel.findOneAndUpdate(
        { _id: hotelId },
        data,
        { new: true }
      );
      if (!updatedHotel) return res.status(404).send({ message: "Not found" });
      return res.send({ updatedHotel });
    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: "Error" });
    }
  };

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


exports.searchByAdmin = async(req, res) => {
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
  
  



  