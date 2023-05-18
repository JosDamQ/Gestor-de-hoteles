'use strict'

const Hotel = require('./hotel.model')
const User = require('../user/user.model');
const { unauthorizatedData } = require('../utils/validate');
const Bill = require('../bill/bill.model')
const AdditionalServices = require('../additionalServices/additionalServices.model')
const AdditionalMeals = require('../additionalMeals/additionalMeals.model');

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

exports.addAdditionalServicesHotel = async (req, res) => {
    try {
      let hotelId = req.params.id;
      let data = req.body;
      let hotelExist = await Hotel.findOne({ _id: hotelId });
      if (!hotelExist)
        return res.status(404).send({ message: "Hotel not found" });
    if(hotelExist.admin != req.user.sub) return res.status(400).send({message: 'You do not have permissions'})
      let serviceExists = await AdditionalServices.findOne({
        _id: data.additionalService,
      });
      if (!serviceExists)
        return res.status(404).send({ message: "Additional Services not found" });
      let msg = hotelExist.additionalServices.map((item) => {
        if (item.additionalServices == data.additionalService) return 400;
        return 201;
      });
      if (msg.includes(400))
        return res
          .status(400)
          .send({ message: "Additional Service already exists" });
      let updatedHotel = await Hotel.findOneAndUpdate(
        { _id: hotelId },
        {
          additionalServices: [
            ...hotelExist.additionalServices,
            {
              additionalServices: data.additionalService,
            },
          ],
        },
        { new: true }
      ).populate('additionalServices.additionalServices');
      return res.status(201).send({ updatedHotel });
    } catch (err) {
      console.log(err);
    }
  };

  exports.addAdditionalMealsHotel = async (req, res) => {
    try {
      let hotelId = req.params.id;
      let data = req.body;
      let hotelExist = await Hotel.findOne({ _id: hotelId }).populate('additionalMeals');
      if (!hotelExist)
        return res.status(404).send({ message: "Hotel not found" });
    if(hotelExist.admin != req.user.sub) return res.status(400).send({message: 'You do not have permissions'})
      let mealExists = await AdditionalMeals.findOne({
        _id: data.additionalMeal
      });
      if (!mealExists)
        return res.status(404).send({ message: "Additional Meal not found" });
      let msg = hotelExist.additionalMeals.map((item) => {
        if (item.additionalMeal == data.additionalMeal) return 400;
        return 201;
      });
      if (msg.includes(400))
        return res
          .status(400)
          .send({ message: "Additional Meal already exists" });
      let updatedHotel = await Hotel.findOneAndUpdate(
        { _id: hotelId },
        {
          additionalMeals: [
            ...hotelExist.additionalMeals,
            {
              additionalMeal: data.additionalMeal,
            },
          ],
        },
        { new: true }
      ).populate('additionalMeals.additionalMeal');
      return res.status(201).send({ updatedHotel });
    } catch (err) {
      console.log(err);
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

exports.deleteHotel = async (req, res) => {
    try {
      const hotelId = req.params.id;
      // Verificar si hay reservaciones asociadas al hotel
      const reservations = await Bill.find({ hotel: hotelId });
      if (reservations.length > 0) {
        return res.status(400).send({
          message: "Cannot delete hotel. There are reservations associated with it.",
        });
      }

      await Hotel.findOneAndDelete({ _id: hotelId });
      return res.send({ message: "Hotel deleted successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: "Error deleting hotel" });
    }
  };