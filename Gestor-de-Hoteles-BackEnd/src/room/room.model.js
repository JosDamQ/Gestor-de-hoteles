"use strict";

const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
  name: { type: String, required: true },
  number: { type: Number, default: 0 },
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel" },
  description: { type: String, required: true },
  available: { type: Boolean, required: true, default: true },
  price: { type: Number, default: 0, required: true },
});

module.exports = mongoose.model("Room", roomSchema);
