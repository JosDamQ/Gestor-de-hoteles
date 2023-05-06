'use strict';

const mongoose = require("mongoose");

const hotelSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
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
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  eventAvailability: {type: Boolean, default: true},
  popularity: {
    type: Number,
    default: 0
  }
}
  ,
  {
    versionKey: false
  });

module.exports = mongoose.model("Hotel", hotelSchema)
