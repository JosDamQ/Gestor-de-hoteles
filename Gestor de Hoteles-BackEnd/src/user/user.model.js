'use strict';

const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      surname: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      phone: {
        type: String, 
        required: true
      },
      rol: {
        type: String,
        upperCase: true,
        required: true
      },
    }
    ,
    {
        versionKey: false
    });

module.exports = mongoose.model("User",userSchema)