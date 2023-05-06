'use strict'
const { validateData } = require('../utils/validate');
const AdditionalMeals = require('./additionalMeals.model');


exports.saveAdditionalMeals= async(req,res)=>{
    try {
        let data = req.body;
        let meals = new AdditionalMeals(data);
        await meals.save();
        return res.send({message:'Saved meals sucessfully'});
    } catch (err) {
        console.error(err);
        return res.status(500).send({message:'Error Saving AdditionalMeals',error:err.message});
    }
}

exports.getsAdditionalMeals = async(req,res)=>{
    try {
        let meals = await AdditionalMeals.find();
        return res.send({meals});
    } catch (err) {
        return res.status(500).send({message:'Error Getting AdditionalMeals'})
    }
}

exports.getsAdditionalMeals = async(req,res)=>{
   try {
    let mealsId = req.params.id;
    let meals = await AdditionalMeals.findOne({_id: mealsId });
    if(!meals) return res.status(404).send({message: 'meals not found'});
    return res.send({meals});
    
   } catch (err) {
    console.error(err);
    return res.status(500).send({message:'Error getting meals'});
   } 
}

exports.searchAdditionalMealsByName = async(req, res)=>{
    try{
        let data = req.body;
        let params = {
            name: data.name
        }
        let additionalMeals = await AdditionalMeals.find({
            name: {
                $regex: params.name,
                $options: 'i'
            }
        })
        return res.send({additionalMeals})
    }catch(err){
        console.error(err);
        return res.status(500).send({message:'meal not found'});
    }
}

exports.update = async(req,res)=>{
    try {
        let mealsId = req.params.id;
        let data = req.body;
        let existMeals = await AdditionalMeals.findOne({name: data.name});
        if(existMeals){
            if (existMeals._id != mealsId) return res.send({message:'meal its already created'});
            let updatedMeal = await AdditionalMeals.findOneAndUpdate(
                {_id: mealsId},
                data,
                {new:true}
            );
            if(!updatedMeal) return res.status(404).send({message:'Not found'});
            return res.send({updatedMeal})
        }
        let updatedMeal = await AdditionalMeals.findOneAndUpdate(
            {_id: mealsId},
            data,
            {new:true}

        );
        if(!updatedMeal) return res.status(404).send({message:'Not found'});
        return res.send({updatedMeal})
        
    } catch (err) {
        console.error(err);
        return res.status(500).send({message:'Error'})
    }
}

exports.delete = async(req,res)=>{
try {
    let mealsId = req.params.id;
    let mealsDeleted = await AdditionalMeals.deleteOne({_id: mealsId});
    if(mealsDeleted.deletedCount ===0) return res.status(404).send({message:'Meals not found'});
    return res.send({message:'Meals Deleted'});
} catch (err) {
    console.error(err);
    return res.status(500).send({message:'Error deleting Meals'});
}
}