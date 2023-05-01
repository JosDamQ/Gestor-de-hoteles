'use strict'
const additionalServices = require('./additionalServices.model');


exports.saveAdditionalService= async(req,res)=>{
    try {
        let data = req.body;
        let service = new additionalServices(data);
        await service.save();
        return res.send({message:'Saved services sucessfully'});
    } catch (err) {
        console.error(err);
        return res.status(500).send({message:'Error Saving Additional Service',error:err.message});
    }
}

exports.getAdditionalServices = async(req,res)=>{
    try {
        let services = await additionalServices.find();
        return res.send({services});
    } catch (err) {
        return res.status(500).send({message:'Error Getting Additional Servicies'})
    }
}

exports.getAdditionalService = async(req,res)=>{
   try {
    let serviceId = req.params.id;
    let service = await additionalServices.findOne({_id: serviceId }).populate('user').lean();
    if(!service) return res.statu(404).send({message: 'Service not found'});
    return res.send({service});
    
   } catch (err) {
    console.error(err);
    return res.status(500).send({message:'Error getting service'});
   } 
}

exports.update = async(req,res)=>{
    try {
        let serviceId = req.params.id;
        let data = req.body;
        let existService = await additionalServices.findOne({name: data.name});
        if(existService){
            if (existService._id != serviceId) return res.send({message:'Service already created'});
            let updatedService = await additionalServices.findOneAndUpdate(
                {_id: serviceId},
                data,
                {new:true}
            );
            if(!updatedService) return res.status(404).send({message:'Not found'});
            return res.send({updatedService})

        }
        let updatedService = await additionalServices.findOneAndUpdate(
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
    let serviceDeleted = await additionalServices.deleteOne({_id: serviceId});
    if(serviceDeleted.deletedCount ===0) return res.status(404).send({message:'Service not found'});
    return res.send({message:'Service Deleted'});
} catch (err) {
    console.error(err);
    return res.status(500).send({message:'Error deleting service'});
}
}