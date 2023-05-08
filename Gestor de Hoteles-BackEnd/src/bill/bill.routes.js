'use strict'

const express = require('express');
const api = express.Router();
const billController = require('./bill.controller')
const {ensureAuth} = require('../services/authenticated')

api.get('/test', billController.test);
api.post('/createReservation', ensureAuth, billController.createReservation)
api.post('/createEvent', ensureAuth, billController.createEvent)

module.exports = api;