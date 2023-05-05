'use strict'

const mongoose = require('mongoose');

const eventTypeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        uppercase: true
    },
    description: {
        type: String,
        requerid: true
    },
    price: {
        type: Number, 
        default: 0,
        required: true
    }
},
{
    versionKey: false
});

module.exports = mongoose.model("EventType", eventTypeSchema);