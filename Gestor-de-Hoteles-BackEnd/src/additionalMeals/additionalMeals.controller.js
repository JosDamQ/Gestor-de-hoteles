"use strict";
const { validateData } = require("../utils/validate");
const AdditionalMeals = require("./additionalMeals.model");

exports.saveAdditionalMeals = async (req, res) => {
  try {
    let data = req.body;
    let existMeal = await AdditionalMeals.find({
      name: { $regex: data.name, $options: "i" },
      description: { $regex: data.description, $options: "i" },
    });
    for (const meal of existMeal) {
      if (
        meal.name.toUpperCase() == data.name.toUpperCase() &&
        meal.description.toUpperCase() == data.description.toUpperCase()
      )
        return res
          .status(400)
          .send({ message: "Additional meals already exists" });
    }
    let meals = new AdditionalMeals(data);
    await meals.save();
    return res.send({ message: "Saved meals sucessfully" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ message: "Error Saving AdditionalMeals", error: err.message });
  }
};

exports.getsAdditionalMeals = async (req, res) => {
  try {
    let meals = await AdditionalMeals.find();
    return res.send({ meals });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Error Getting AdditionalMeals" });
  }
};

exports.getAdditionalMealsById = async (req, res) => {
  try {
    let mealsId = req.params.id;
    let meals = await AdditionalMeals.findOne({ _id: mealsId });
    if (!meals) return res.status(404).send({ message: "meals not found" });
    return res.send({ meals });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Error getting meals" });
  }
};

exports.searchAdditionalMealsByName = async (req, res) => {
  try {
    let data = req.body;
    let additionalMeals = await AdditionalMeals.find({
      name: {
        $regex: data.name,
        $options: "i",
      },
    });
    return res.send({ additionalMeals });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "meal not found" });
  }
};

exports.update = async (req, res) => {
  try {
    let mealsId = req.params.id;
    let data = req.body;
    let params = {
        name: data.name,
        description: data.description,
        price: data.price
    }
    let msg = validateData(params)
    if(msg) return res.status(500).send({msg})
    let existMeal = await AdditionalMeals.find({
      name: { $regex: data.name, $options: "i" },
      description: { $regex: data.description, $options: "i" },
    });
    for (const meal of existMeal) {
      if (
        meal.name.toUpperCase() == data.name.toUpperCase() &&
        meal.description.toUpperCase() == data.description.toUpperCase() &&
        mealsId != meal._id
      )
        return res
          .status(400)
          .send({ message: "Additional meals already exists" });
    }

    let updatedMeal = await AdditionalMeals.findOneAndUpdate(
      { _id: mealsId },
      data,
      { new: true }
    );
    if (!updatedMeal) return res.status(404).send({ message: "Not found" });
    return res.send({ updatedMeal });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Error" });
  }
};

exports.delete = async (req, res) => {
  try {
    let mealsId = req.params.id;
    let mealsDeleted = await AdditionalMeals.deleteOne({ _id: mealsId });
    if (mealsDeleted.deletedCount === 0)
      return res.status(404).send({ message: "Meals not found" });
    return res.send({ message: "Meals Deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Error deleting Meals" });
  }
};
