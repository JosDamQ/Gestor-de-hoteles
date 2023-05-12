'use strict';

const mongoose = require("mongoose");

const reservationSchema = mongoose.Schema({
    hotel: [{
        _id:{type: mongoose.Schema.Types.ObjectId, 
            ref: 'Hotel'}, 
        name: String,
        numberOfRooms: Number,
        address: String,
        admin: String,
        contact: String}],

        room:[{
            _id:{type: mongoose.Schema.Types.ObjectId,
            ref:'Room',},
            description: String,
            availability: Boolean,
            peoplePerRoom: Number,
            price: String
        }],
        entryDate:{
            type: String,
            required: true
        },
        departureDate:{
            type: String,
            required: true
        },
        numberOfPeopleToAttend:{
            type: Number,
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
            }
            ,
            {
                versionKey: false
            }
);

module.exports = mongoose.model("Reservation",reservationSchema)