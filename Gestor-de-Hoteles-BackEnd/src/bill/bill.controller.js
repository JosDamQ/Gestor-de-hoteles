"use strict";

const Bill = require("./bill.model");
const { validateData } = require("../utils/validate");
const User = require("../user/user.model");
const Hotel = require("../hotel/hotel.model");
const Room = require("../room/room.model");
const AdditionalServices = require("../additionalServices/additionalServices.model");
const AdditionalMeals = require("../additionalMeals/additionalMeals.model");
const EventType = require("../eventType/eventType.model");
const moment = require("moment");

exports.test = (req, res) => {
  return res.send({ message: "Bill test running" });
};

exports.createReservation = async (req, res) => {
  try {
    let data = req.body;
    data.description = "RESERVATION";
    let me = req.user;
    if (!data.duration || data.duration == '') data.duration = 1;
    data.user = req.user.sub;
    let params = {
      room: data.room,
      entryDate: data.entryDate,
    };
    let msg = validateData(params);
    if (msg) return res.status(400).send({ msg });
    if (me.rol != "CLIENT")
      return res
        .status(400)
        .send({ message: `You can't create a reservation` });
    let hotelExists = await Hotel.findOne({ _id: data.hotel });
    if (!hotelExists)
      return res.status(400).send({ message: "Hotel not found" });
    let roomExists = await Room.findOne({ _id: data.room, hotel: data.hotel });
    if (!roomExists)
      return res.status(400).send({ message: "Room not found in this hotel" });
    let startDate = data.entryDate;
    data.entryDate = moment(startDate, "DD/MM/YYYY", true);
    data.departureDate = moment(startDate, "DD/MM/YYYY", true);
    if (Date.parse(data.entryDate) < Date.parse(new Date()))
      return res
        .status(400)
        .send({ message: `Can't create a reservation in this date` });
    data.departureDate = data.departureDate.add(data.duration, 'days')
    data.entryDate = data.entryDate.format('DD/MM/YYYY')
    data.departureDate = data.departureDate.format('DD/MM/YYYY')
    let availabilityRoom = await Bill.findOne({
      entryDate: data.entryDate,
      room: data.room,
      state: "PENDING",
    });
    if (availabilityRoom)
      return res
        .status(400)
        .send({ message: "Room has a reservation on this date" });
    data.total = roomExists.price * data.duration;

    let newReservation = new Bill(data);
    await newReservation.save();
    return res.send({ message: "Reservation created successfully" });
  } catch (err) {
    console.log(err);
    return res.send({ message: "Error creating reservation" });
  }
};

exports.addAdditionalServicesReservation = async (req, res) => {
  try {
    let reservationId = req.params.id;
    let data = req.body;
    let reservationExists = await Bill.findOne({ _id: reservationId });
    if (!reservationExists)
      return res.status(404).send({ message: "Reservation not found" });
    let serviceExists = await AdditionalServices.findOne({
      _id: data.additionalService,
    });
    if (!serviceExists)
      return res.status(404).send({ message: "Additional Services not found" });
    let msg = reservationExists.additionalServices.map((item) => {
      if (item.additionalService == data.additionalService) return 400;
      return 201;
    });
    if (msg.includes(400))
      return res
        .status(400)
        .send({ message: "Additional Service already exists" });
    let total =
      reservationExists.total +
      serviceExists.price * reservationExists.duration;
    let updatedBill = await Bill.findOneAndUpdate(
      { _id: reservationId },
      {
        total: total,
        additionalServices: [
          ...reservationExists.additionalServices,
          {
            additionalService: data.additionalService,
          },
        ],
      },
      { new: true }
    ).populate(`additionalServices.additionalService`);
    return res.status(201).send({ updatedBill });
  } catch (err) {
    console.log(err);
  }
};

exports.createEvent = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
  }
};
