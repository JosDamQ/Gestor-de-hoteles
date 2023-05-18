"use strict";

const EventType = require("./eventType.model");
const {validateData} = require('../utils/validate')

exports.test = (req, res) => {
  return res.status(201).send({ message: "test is running" });
};

exports.saveEventType = async (req, res) => {
  try {
    let data = req.body;
    //validamos que el tipo de evento ya exista
    let existEventType = await EventType.find({
      name: { $regex: data.name, $options: "i" },
      description: { $regex: data.description, $options: "i" },
    });
    for (const ev of existEventType) {
      if (
        ev.name.toUpperCase() == data.name.toUpperCase() &&
        ev.description.toUpperCase() == data.description.toUpperCase()
      )
        return res
          .status(400)
          .send({ message: "EventType already exists" });
    }
    //Agregamos el tipo de evento
    let newEventType = new EventType(data);
    await newEventType.save();
    return res.status(201).send({ message: "EventType saved sucessfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Error saving eventType" });
  }
};

exports.getsEventType = async (req, res) => {
  try {
    let eventType = await EventType.find();
    return res.send({ eventType });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Error gettin eventType" });
  }
};

exports.getEventTypeById = async (req, res) => {
  try {
    let eventType = await EventType.findOne({ _id: req.params.id });
    if (!eventType)
      return res.status(404).send({ message: "Event type not found" });
    return res.send({ eventType });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Error getting a Event Type" });
  }
};

exports.searchByName = async (req, res) => {
  try {
    let data = req.body;
    let eventType = await EventType.find({
      name: {
        $regex: data.name,
        $options: "i",
      },
    });
    return res.send({ eventType });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Error searching eventType" });
  }
};

exports.uptadeEventType = async (req, res) => {
  try {
    let eventTypeId = req.params.id;
    let data = req.body;
    let params = {
        name: data.name,
        description: data.description
    }
    let msg = validateData(params)
    if(msg) return res.status(400).send({msg})
    let eventExists = await EventType.find({
      name: { $regex: data.name, $options: "i" },
      description: { $regex: data.description, $options: "i" },
    });
    for (const ev of eventExists) {
      if (
        ev.name.toUpperCase() == data.name.toUpperCase() &&
        ev.description.toUpperCase() == data.description.toUpperCase() &&
        ev._id != eventTypeId
      )
        return res
          .status(400)
          .send({ message: "EventType already exists" });
    }
    let updatedTypeService = await EventType.findByIdAndUpdate(
      { _id: eventTypeId },
      data,
      { new: true }
    );
    if (!updatedTypeService)
      return res.status(404).send({ message: "Event Type not found" });
    return res.send({ message: "Event Type Updated succesfully", updatedTypeService });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Error updating an eventType" });
  }
};

exports.deleteEventType = async (req, res) => {
  try {
    let eventTypeId = req.params.id;
    let deleteEventType = await EventType.findByIdAndDelete({
      _id: eventTypeId,
    });
    if (!deleteEventType)
      return res.status(404).send({ message: "Event Type not found" });
    return res.send({ message: "Event type deleted succesfully" });
  } catch (err) {
    console.log(err);
  }
};
