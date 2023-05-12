'use strict'

const EventType = require('./eventType.model');

exports.test = (req, res) =>{
    return res.status(201).send({ message: 'test is running' });
}

exports.saveEventType = async(req, res) =>{
    try{
        let data = req.body;
        if(!data.name || data.name == '' || !data.description || data.description == '' || !data.price || data.price == '') return res.status(400).send({message: 'Params required'});
        //validamos que el tipo de evento ya exista
        let existEventType = await EventType.findOne({name: data.name, description: data.description});
        if(existEventType) return res.status(400).send({message:'EventType already exists'});
        //Agregamos el tipo de evento
        let newEventType = new EventType(data);
        await newEventType.save();
        return res.status(201).send({message: 'Hotel saved sucessfully'});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error saving eventType'});
    }
}

exports.getsEventType = async(req, res) =>{
    try{
        let eventType = await EventType.find();
        return res.status(200).send({eventType});
    }catch(err){
        console.error(err);
        return res.status(500).send({message:'Error gettin eventType'});
    }
}

exports.getEventType = async(req, res)=>{
    try{
        let eventType = await EventType.findOne({_id: req.params.id});
        if(!eventType) return res.status(404).send({message: 'Event type not found'});
        return res.status(200).send({eventType});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting a Event Type'});
    }
}

exports.searchByName = async(req, res)=>{
    try{
        let data = req.body;
        let params = {
            name: data.name
        }
        if(!data.name || data.name == '') return res.status(400).send({message: 'Params required'});
        let eventType = await EventType.find({
            name: {
                $regex: params.name,
                $options: 'i'
            }
        })
        return res.send({eventType});
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error searching eventType'})
    }
}


/*exports.uptadeEventType = async(req, res)=>{
    try{
        let eventTypeId = req.params.id;
        let data = req.body;
        let params = {
            description: data.description,
            price: data.price
        }
        if(!data.description || data.description == '' || !data.price || data.price == '') return res.status(400).send({message: 'Params required'});
        let updatedTypeService = await EventType.findByIdAndUpdate(
            { _id: eventTypeId },
            params,
            { new: true }
        );
        if (!updatedTypeService) return res.status(404).send({ message: 'Event Type not found' });
        return res.send({ message: 'Event Type Updatesd succesfully' })
        
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error updating an eventType'});
    }
}*/

exports.uptadeEventType = async(req,res)=>{
    try {
        let eventTypeId = req.params.id;
        let data = req.body;
        if(!data.name || data.name == '' || !data.description || data.description == '' || !data.price || data.price == '') return res.status(400).send({message: 'Params required'});
        let existEventType = await EventType.findOne({name: data.name, description: data.description});
        if(existEventType){
            if (existEventType._id != eventTypeId) return res.send({message:'eventType its already created'});
            let updateEventType = await EventType.findOneAndUpdate(
                {_id: eventTypeId},
                data,
                {new:true}
            );
            if(!updateEventType) return res.status(404).send({message:'Not found'});
            return res.send({updateEventType})
        }
        let updateEventType = await EventType.findOneAndUpdate(
            {_id: eventTypeId},
            data,
            {new:true}
        );
        if(!updateEventType) return res.status(404).send({message:'Not found'});
        return res.send({updateEventType})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message:'Error'})
    }
}

exports.deleteEventType = async(req, res)=>{
    try {
        let eventTypeId = req.params.id;
        let deleteEventType = await EventType.findByIdAndDelete({_id: eventTypeId});
        if(!deleteEventType) return res.status(404).send({message: 'Event Type not found'});
        return res.send({message: 'Event type deleted succesfully'})
    } catch (err) {
        console.log(err)
    }
}