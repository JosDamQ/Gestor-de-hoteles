'use strict'

const express = require('express');
const api = express.Router();
const billController = require('./bill.controller');
const {ensureAuth} = require('../services/authenticated');

api.get('/test', billController.test);
api.post('/createReservation', ensureAuth, billController.createReservation);
api.put('/addAdditionalServiceReservation/:id', ensureAuth, billController.addAdditionalServicesReservation)
api.get('/getReservations', ensureAuth, billController.getReservations)
api.get('/getUsersByhotel', ensureAuth, billController.getUsersByHotel)
api.get('/getMyReservations/:id', ensureAuth, billController.getMyReservations)

module.exports = api;