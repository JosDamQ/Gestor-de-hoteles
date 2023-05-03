'use strict';

const mongoose = require("mongoose");

const hotelSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      rooms:[{
        name: String,
        number: { type: Number, default: 0 },
        numberBeds: { type: Number, default: 0 },
        description: String,
        available: Boolean,
        price: { type: Number, default: 0 }
      }],
      numberOfRooms: {
        type: Number,
        default: 0
        //required: true,
      },
      address: {
        type: String,
        required: true,
      },
      admin: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true,
      },
      contact: {
        type: String, 
        required: true
      },
      popularity:{
        type: Number,
        default: 0
      }
    }
    ,
    {
        versionKey: false
    });

module.exports = mongoose.model("Hotel",hotelSchema)