'use strict'

const express = require('express')
const hotelController = require('./hotel.controller')
const api = express.Router()
const {ensureAuth, isAdmin, isWorker} = require('../services/authenticated');

//Funciones hotel Admin
api.get('/test', hotelController.test);
api.post('/add', [ensureAuth, isAdmin], hotelController.addHotel);
api.get('/gets', hotelController.getsHotels);
api.get('/get/:id', hotelController.getHotel);
api.get('/searchByNameAndAddress', hotelController.searchByName);
api.delete('/deleteHotel/:id', ensureAuth, hotelController.deleteHotel)
api.put('/addAdditionalService/:id', ensureAuth, hotelController.addAdditionalServicesHotel);
api.put('/addAdditionalMeals/:id', ensureAuth, hotelController.addAdditionalMealsHotel);

module.exports = api