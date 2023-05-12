'use strict'

const express = require('express')
const userController = require('./user.controller')
const api = express.Router()
const {ensureAuth, isAdmin} = require('../services/authenticated');

api.get('/test', userController.test);
api.post('/login', userController.login);
//Funciones CLIENT
api.post('/register', userController.register);
api.get('/getUser/:id', [ensureAuth, isAdmin], userController.getUser)
//api.post('/createUser', ensureAuth, userController.createUser)
api.get('/getUsers', [ensureAuth, isAdmin], userController.getUsers)
//api.put('/updateUser/:id', ensureAuth, userController.updateUser)
api.post('/addWorker', [ensureAuth, isAdmin], userController.addWorker)
api.get('/getWorkers', [ensureAuth, isAdmin], userController.getWorkers)
api.get('/getWorker/:id', [ensureAuth, isAdmin], userController.getWorker)
api.put('/updateWorker/:id', [ensureAuth, isAdmin], userController.updateWorker)
api.put('/updatePasswordWorker/:id', ensureAuth, userController.updatePasswordWorker)
api.put('/updatePasswordUser/:id', ensureAuth, userController.updatePasswordUser)
api.delete('/deleteWorker/:id', [ensureAuth, isAdmin], userController.deleteWorker)

module.exports = api;