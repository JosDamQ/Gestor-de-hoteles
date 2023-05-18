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
api.delete('/deleteHotel/:id',hotelController.deleteHotel);
api.put('/updateHotel/:id',hotelController.updateHotel)


module.exports = api