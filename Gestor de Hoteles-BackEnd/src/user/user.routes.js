'use strict'

const express = require('express')
const userController = require('./user.controller')
const api = express.Router()
const {ensureAuth} = require('../services/authenticated');

api.get('/test', userController.test);
api.post('/login', userController.login);
api.post('/createUser', ensureAuth, userController.createUser)
api.get('/getUsers', ensureAuth, userController.getUsers)
api.get('/getUser/:id', ensureAuth, userController.getUser)
api.put('/updateUser/:id', ensureAuth, userController.updateUser)
api.post('/addWorker', ensureAuth, userController.addWorker)
api.get('/getWorkers', ensureAuth, userController.getWorkers)
api.get('/getWorker/:id', ensureAuth, userController.getWorker)
api.put('/updateWorker/:id', ensureAuth, userController.updateWorker)
api.put('/updatePasswordWorker/:id', ensureAuth, userController.updatePasswordWorker)
api.delete('/deleteWorker/:id', ensureAuth, userController.deleteWorker)

module.exports = api;