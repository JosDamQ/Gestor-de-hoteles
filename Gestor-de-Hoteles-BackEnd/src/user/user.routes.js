'use strict'

const express = require('express')
const userController = require('./user.controller')
const api = express.Router()
const {ensureAuth, isAdmin} = require('../services/authenticated');

api.get('/test', userController.test);

// Funciones publicas 
api.post('/login', userController.login);
api.put('/updateAccount/:id', ensureAuth, userController.updateAccount)
api.put('/updatePassword/:id', ensureAuth, userController.updatePassword)
api.delete('/deleteAccount/:id', ensureAuth, userController.deleteAccount)
api.get('/getAccount/:id', ensureAuth, userController.getAccount)
api.get('/myInfo', ensureAuth, userController.myInfo)

//Funciones CLIENT
api.post('/register', userController.register);
api.post('/addWorker', [ensureAuth, isAdmin], userController.addWorker)
api.get('/getUsers', [ensureAuth, isAdmin], userController.getUsers)
api.get('/getWorkers', [ensureAuth, isAdmin], userController.getWorkers)
api.get('/getAccounts', [ensureAuth, isAdmin], userController.getAccounts)

module.exports = api;