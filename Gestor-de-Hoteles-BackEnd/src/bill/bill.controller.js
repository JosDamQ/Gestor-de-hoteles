"use strict";

const Bill = require("./bill.model");
const { validateData } = require("../utils/validate");
const User = require("../user/user.model");
const Hotel = require("../hotel/hotel.model");
const Room = require("../room/room.model");

exports.test = (req, res) => {
  return res.send({ message: "Bill test running" });
};

exports.createReservation = async (req, res) => {
  try {
    let data = req.body;
    data.description = "RESERVATION";
    let me = req.user
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
    data.entryDate = new Date(data.entryDate).toLocaleDateString();
    let endDate = new Date(data.entryDate).toLocaleDateString();
    data.departureDate = new Date(endDate);
    let dateNow = new Date(Date.now());
    if (Date.parse(data.entryDate) < Date.parse(dateNow))
      return res
        .status(400)
        .send({ message: `Can't create a reservation in this date` });
    data.departureDate.setDate(data.departureDate.getDate() + parseInt(data.duration));
    data.departureDate = new Date(data.departureDate).toLocaleDateString();
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
    if (!leaseExists)
      return res.status(404).send({ message: "Lease not found" });
    // Validar que el servicio exista
    let serviceExists = await AdditionalServices.findOne({
      _id: data.additionalService,
    });
    if (!serviceExists)
      return res.status(404).send({ message: "Additional Services not found" });
    // Validar que no esté en el arreglo
    let msg = leaseExists.additionalServices.map((item) => {
      if (item.service == data.additionalService) return 400;
      return 201;
    });
    if (msg.includes(400))
      return res
        .status(400)
        .send({ message: "Additional Service already exists" });
    // cambiar total
    let total = leaseExists.total + serviceExists.price * leaseExists.month;
    // Agregar servicio adicional al arrendamiento
    let updatedLease = await Lease.findOneAndUpdate(
      { _id: leaseId },
      {
        total: total,
        additionalServices: [
          ...leaseExists.additionalServices,
          {
            service: data.additionalService,
          },
        ],
      },
      { new: true }
    ).populate(`additionalServices.service`);;
    return res.status(201).send({ updatedLease });
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
