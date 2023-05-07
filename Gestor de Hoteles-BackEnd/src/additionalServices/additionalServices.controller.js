'use strict'
const { validateData } = require('../utils/validate');
const AdditionalServices = require('./additionalServices.model');


exports.saveAdditionalService= async(req,res)=>{
    try {
        let data = req.body;
        let serviceExist = await AdditionalServices.findOne({name: data.name})
        if(serviceExist) return res.status(400).send({message: 'Additional Service already exists'});
        let service = new AdditionalServices(data);
        await service.save();
        return res.send({message:'Saved services sucessfully'});
    } catch (err) {
        console.error(err);
        return res.status(500).send({message:'Error Saving Additional Service',error:err.message});
    }
}

exports.getsAdditionalServices = async(req,res)=>{
    try {
        let services = await AdditionalServices.find();
        return res.send({services});
    } catch (err) {
        return res.status(500).send({message:'Error Getting Additional Servicies'})
    }
}

exports.getAdditionalService = async(req,res)=>{
   try {
    let serviceId = req.params.id;
    let service = await AdditionalServices.findOne({_id: serviceId })/*.populate('user')*/.lean();
    if(!service) return res.status(404).send({message: 'Service not found'});
    return res.send({service});
    
   } catch (err) {
    console.error(err);
    return res.status(500).send({message:'Error getting service'});
   } 
}

exports.searchAdditionalServiceByName = async(req, res)=>{
    try{
        let data = req.body;
        let params = {
            name: data.name
        }
        let additionalService = await AdditionalServices.find({
            name: {
                $regex: params.name,
                $options: 'i'
            }
        })
        return res.send({additionalService})
    }catch(err){
        console.error(err);
        return res.status(500).send({message:'Service not found'});
    }
}

exports.update = async(req,res)=>{
    try {
        let serviceId = req.params.id;
        let data = req.body;
        let existService = await AdditionalServices.findOne({name: data.name});
        if(existService){
            if (existService._id != serviceId) return res.send({message:'Service already created'});
            let updatedService = await AdditionalServices.findOneAndUpdate(
                {_id: serviceId},
                data,
                {new:true}
            );
            if(!updatedService) return res.status(404).send({message:'Not found'});
            return res.send({updatedService})
        }
        let updatedService = await AdditionalServices.findOneAndUpdate(
            {_id: serviceId},
            data,
            {new:true}

        );
        if(!updatedService) return res.status(404).send({message:'Not found'});
        return res.send({updatedService})
        
    } catch (err) {
        console.error(err);
        return res.status(500).send({message:'Error'})
    }
}

exports.delete = async(req,res)=>{
try {
    let serviceId = req.params.id;
    let serviceDeleted = await AdditionalServices.deleteOne({_id: serviceId});
    if(serviceDeleted.deletedCount ===0) return res.status(404).send({message:'Service not found'});
    return res.send({message:'Service Deleted'});
} catch (err) {
    console.error(err);
    return res.status(500).send({message:'Error deleting service'});
}
}