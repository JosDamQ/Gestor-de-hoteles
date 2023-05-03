'use strict'

const express = require('express')
const hotelController = require('./hotel.controller')
const api = express.Router()
const {ensureAuth, isAdmin, isWorker} = require('../services/authenticated');


//Funciones hotel Admin
api.get('/test', hotelController.test);
api.post('/add', [ensureAuth, isAdmin], hotelController.addHotel);
api.get('/gets', [ensureAuth, isAdmin], hotelController.getsHotels);
api.get('/get/:id', [ensureAuth, isAdmin], hotelController.getHotel);
api.get('/searchByName', ensureAuth, hotelController.searchByName);
api.get('/searchByAddress', ensureAuth, hotelController.searchByAddress);

//Funciones rooms Admin
api.post('/addRoom/:id', [ensureAuth, isAdmin], hotelController.addRoom);
api.get('/getRoomsByHotel/:id', ensureAuth, hotelController.getRoomsByHotel);
api.post('/searchByName/:id', ensureAuth, hotelController.searchRoomByName);

//-----------------------------Worker----------------------------------------------
api.get('/viewHotelsAtYourExpense', [ensureAuth, isWorker], hotelController.getsHotelsAtYourExpense);
api.get('/availableRooms', ensureAuth, hotelController.viewRoomsAvailable);

module.exports = api