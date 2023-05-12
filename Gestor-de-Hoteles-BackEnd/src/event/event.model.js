'use strict';

const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    eventType: {
        type: String,
        required: true,
      },
      duration: {
        type: String,
        required: true,
      },
      hotel: [{
        _id:{type: mongoose.Schema.Types.ObjectId, 
            ref: 'Hotel'}, 
        name: String,
        numberOfRooms: Number,
        address: String,
        admin: String,
        contact: String}],
      numberOfPeopleToAttend: {
        type: number,
        required: true,
      },
      eventDate: {
        type: String, 
        required: true
      },
      user: [{
        _id:{type: mongoose.Schema.Types.ObjectId, 
            ref: 'User'}, 
        name: String,
        surname: String,
        email: String,
        password: String,
        phone: String,
        rol: String}],
        
      additionalServices: [{
        _id:{type: mongoose.Schema.Types.ObjectId, 
            ref: 'additionalServices'}, 
        name: String,
        description: String,
        price: number,
        }],
    } ,     
    {
        versionKey: false
    });

module.exports = mongoose.model("Event",eventSchema)