'use strict'

const express = require('express');
const api = express.Router();
const roomController = require('./room.controller');

api.get('/test', roomController.test);
api.post('/save', roomController.saveRoom)

module.exports = api;