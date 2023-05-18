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
const mongoose = require("mongoose");

exports.test = (req, res) => {
  return res.send({ message: "Bill test running" });
};

exports.createReservation = async (req, res) => {
  try {
    let data = req.body;
    data.description = "RESERVATION";
    let me = req.user;
    if (!data.duration || data.duration == "") data.duration = 1;
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
    data.departureDate = data.departureDate.add(data.duration, "days");
    data.entryDate = data.entryDate.format("DD/MM/YYYY");
    data.departureDate = data.departureDate.format("DD/MM/YYYY");
    let availabilityRoom = await Bill.find({
      room: data.room,
      $or: [{ state: "PENDING" }, { state: "PROGRESS" }],
    });
    let entry = Date.parse(moment(data.entryDate, "DD/MM/YYYY"));
    let departure = Date.parse(moment(data.departureDate, "DD/MM/YYYY"));
    let dateProcess = availabilityRoom.filter((item) => {
      let menor = Date.parse(moment(item.entryDate, "DD/MM/YYYY"));
      let mayor = Date.parse(moment(item.departureDate, "DD/MM/YYYY"));
      if (
        (entry >= menor && entry < mayor) ||
        (departure > menor && departure <= mayor)
      )
        return item;
    });
    if (dateProcess.length != 0)
      return res
        .status(400)
        .send({ message: "Room has a reservation on this date" });
    data.total = roomExists.price * data.duration;
    console.log(data.entryDate);
    if (data.entryDate == "Invalid date")
      return res.send({ message: data.entryDate });
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
    let serviceHotelExists = await Hotel.findOne({
      _id: reservationExists.hotel,
    }).populate("additionalServices");
    let serviceHotel = serviceHotelExists.additionalServices.filter((item) =>
      item.additionalServices.equals(data.additionalService)
    );
    if (serviceHotel.length == 0)
      return res.status(400).send({ message: "AdditionalService not found" });
    let serviceExists = await AdditionalServices.findOne({
      _id: serviceHotel[0].additionalServices
    });
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

exports.getReservations = async (req, res) => {
  try {
    let reservations = await Bill.findOne({ description: "RESERVATION" })
      .populate("user", { password: 0 })
      .populate("hotel", { eventAvailability: 0 })
      .populate("room", { available: 0 })
      .populate("additionalServices.additionalService")
      .populate("additionalMeals.additionalMeal");
    return res.send({ reservations });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Error getting reservations" });
  }
};

exports.getMyReservations = async (req, res) => {
  try {
    let me = req.user;
    if (me.rol != "CLIENT" || me.sub != req.params.id)
      return res.status(400).send({ message: "You do not have permissions" });
    let reservations = await Bill.find({
      user: me.sub,
      description: "RESERVATION",
    })
      .populate("user", { password: 0 })
      .populate("hotel", { eventAvailability: 0 })
      .populate("room", { available: 0 })
      .populate("additionalServices.additionalService")
      .populate("additionalMeals.additionalMeal");
    return res.send({ reservations });
  } catch (err) {
    console.log(err);
    return res.send({ message: "Error getting reservations" });
  }
};

exports.getUsersByHotel = async (req, res) => {
  try {
    if (req.user.rol != "WORKER")
      return res.send(400).send({ message: "You do not have permissions" });
    let hotel = await Hotel.findOne({ admin: req.user.sub });
    let reservations = await Bill.find({ hotel: hotel._id, state: "PENDING" });

    let user = [];
    reservations.forEach((item) => {
      if (!user.includes(item.user.toString())) user.push(item.user.toString());
    });

    let users = await Promise.all(
      user.map(async (item) => {
        let userId = new mongoose.Types.ObjectId(item);
        let myUser = await User.findOne({ _id: userId }).lean();
        delete myUser.password;
        return myUser;
      })
    );
    return res.send({ users });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Error getting user" });
  }
};

exports.createEvent = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
  }
};
