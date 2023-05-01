'use strict';

const mongoose = require("mongoose");

const hotelSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      numberOfRooms: {
        type: Number,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      admin: {
        type: String,
        required: true,
      },
      contact: {
        type: String, 
        required: true
      },
    }
    ,
    {
        versionKey: false
    });

module.exports = mongoose.model("Hotel",hotelSchema)