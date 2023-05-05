'use strict'

const mongoose = require('mongoose')

const billSchema = mongoose.Schema({
  description: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
  // eventType:  {type: mongoose.Schema.Types.ObjectId, ref: 'EventType'},
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  eventDate: String,
  entryDate: { type: String, required: true },
  departureDate: String,
  duration: { type: Number, required: true },
  amountPeople: Number,
  additionalServices: [
    {
      additionalService: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AdditionalServices'
      }
    }
  ],
  total: Number
})