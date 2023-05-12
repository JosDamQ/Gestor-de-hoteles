'use strict'

const express = require('express');
const api = express.Router();
const roomController = require('./room.controller');
const { ensureAuth } = require('../services/authenticated');

api.get('/test', roomController.test);
api.post('/save', ensureAuth, roomController.saveRoom);
api.get('/getsByHotel/:id', roomController.getsRoomsByHotel);
api.get('/getExpensive', roomController.getExpensive);
api.get('/getCheap', roomController.getCheap);
api.put('/updateRoom/:id', ensureAuth, roomController.updateRoom);
api.delete('/deleteRoom/:id', ensureAuth, roomController.deleteRoom)

module.exports = api;