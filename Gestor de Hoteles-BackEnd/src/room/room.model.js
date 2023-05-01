'use strict';

const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
    description: {
        type: String,
        required: true,
      },
      availability: {
        type: Boolean,
        required: true,
      },
      peoplePerRoom: {
        type: Number,
        required: true,
      },
      price: {
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
    

      }
      ,
      {
          versionKey: false
      }        
      
      );

module.exports = mongoose.model("Room",roomSchema)