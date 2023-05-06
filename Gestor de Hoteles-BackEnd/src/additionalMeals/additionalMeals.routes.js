'use strict'

const express = require('express');
const api = express.Router();
const additionalMealsController = require('./additionalMeals.controller');
const { ensureAuth } = require('../services/authenticated');

api.post('/save', ensureAuth, additionalMealsController.saveAdditionalMeals);
api.get('/get', ensureAuth, additionalMealsController.getsAdditionalMeals);
api.get ('/gets/:id', ensureAuth, additionalMealsController.getAdditionalMeals);
api.post('/searchByName', ensureAuth, additionalMealsController.searchAdditionalMealsByName);
api.put('/update/:id', ensureAuth, additionalMealsController.update);
api.delete('/delete/:id',ensureAuth, additionalMealsController.delete);

module.exports=api;