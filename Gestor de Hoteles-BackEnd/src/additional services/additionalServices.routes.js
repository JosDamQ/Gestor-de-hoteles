'use strict'

const express = require('express');
const api = express.Router();
const additionalServicesController = require('./additionalServices.controller');
const { ensureAuth } = require('../services/authenticated');

api.post('/save', ensureAuth, additionalServicesController.saveAdditionalService);
api.get('/get', ensureAuth, additionalServicesController.getAdditionalServices);
api.get ('/gets/:id', ensureAuth, additionalServicesController.getAdditionalService);
api.put('/update/:id', ensureAuth, additionalServicesController.update);
api.delete('/delete/:id',ensureAuth, additionalServicesController.delete);

module.exports=api;