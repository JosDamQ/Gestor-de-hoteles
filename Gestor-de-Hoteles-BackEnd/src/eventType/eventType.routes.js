'use strict'

const express = require('express');
const eventTypeController = require('./eventType.controller');
const api = express.Router();
const {ensureAuth} = require('../services/authenticated');

//Rutas
api.get('/test', eventTypeController.test);
api.post('/save', ensureAuth, eventTypeController.saveEventType);
api.get('/gets', eventTypeController.getsEventType);
api.get('/get/:id', eventTypeController.getEventTypeById);
api.post('/searchByName', eventTypeController.searchByName);
api.put('/update/:id', eventTypeController.uptadeEventType);
api.delete('/delete/:id', eventTypeController.deleteEventType);

module.exports = api