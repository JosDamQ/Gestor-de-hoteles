"use strict";
const { validateData } = require("../utils/validate");
const AdditionalServices = require("./additionalServices.model");

exports.saveAdditionalService = async (req, res) => {
  try {
    let data = req.body;
    let serviceExists = await AdditionalServices.find({
      name: { $regex: data.name, $options: "i" },
      description: { $regex: data.description, $options: "i" },
    });
    for (const serv of serviceExists) {
      if (
        serv.name.toUpperCase() == data.name.toUpperCase() &&
        serv.description.toUpperCase() == data.description.toUpperCase()
      )
        return res
          .status(400)
          .send({ message: "Additional service already exists" });
    }
    let service = new AdditionalServices(data);
    await service.save();
    return res.send({ message: "Saved services sucessfully" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ message: "Error Saving Additional Service", error: err.message });
  }
};

exports.getsAdditionalServices = async (req, res) => {
  try {
    let services = await AdditionalServices.find();
    return res.send({ services });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ message: "Error Getting Additional Servicies" });
  }
};

exports.getAdditionalService = async (req, res) => {
  try {
    let serviceId = req.params.id;
    let service = await AdditionalServices.findOne({
      _id: serviceId,
    })
    if (!service) return res.status(404).send({ message: "Service not found" });
    return res.send({ service });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Error getting service" });
  }
};

exports.searchAdditionalServiceByName = async (req, res) => {
  try {
    let data = req.body;
    let additionalService = await AdditionalServices.find({
      name: {
        $regex: data.name,
        $options: "i",
      },
    });
    return res.send({ additionalService });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Service not found" });
  }
};

exports.update = async (req, res) => {
  try {
    let serviceId = req.params.id;
    let data = req.body;

    let serviceExists = await AdditionalServices.find({
      name: { $regex: data.name, $options: "i" },
      description: { $regex: data.description, $options: "i" },
    });
    for (const serv of serviceExists) {
      if (
        serv.name.toUpperCase() == data.name.toUpperCase() &&
        serv.description.toUpperCase() == data.description.toUpperCase() &&
        serv._id != serviceId
      )
        return res
          .status(400)
          .send({ message: "Additional service already exists" });
    }

    let updatedService = await AdditionalServices.findOneAndUpdate(
      { _id: serviceId },
      data,
      { new: true }
    );
    if (!updatedService) return res.status(404).send({ message: "Not found" });
    return res.send({ updatedService });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Error" });
  }
};

exports.delete = async (req, res) => {
  try {
    let serviceId = req.params.id;
    let serviceDeleted = await AdditionalServices.deleteOne({ _id: serviceId });
    if (serviceDeleted.deletedCount === 0)
      return res.status(404).send({ message: "Service not found" });
    return res.send({ message: "Service Deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Error deleting service" });
  }
};
