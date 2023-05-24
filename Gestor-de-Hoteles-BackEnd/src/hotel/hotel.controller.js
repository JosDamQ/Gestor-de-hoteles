'use strict'

const Hotel = require('./hotel.model')
const User = require('../user/user.model')

exports.test = (req, res) => {
    return res.status(201).send({ message: 'test is running' });
}

// --------------------------------------- ADMIN ------------------------------------------------------------

//Hotel

exports.addHotel = async (req, res) => {
    try{
        let data = req.body
        //let userRole = req.user.rol
        let dataRequired = data.admin;
        if (!dataRequired || dataRequired == '' || !data.name || data.name == '' || !data.address || data.address == '' ||
            !data.contact || data.contact == '' || !data.email || data.email == '' || !data.phone || data.phone == '' ||
            !data.eventAvailability || data.eventAvailability == '') return res.status(400).send({ message: 'Params is required' });
        if(data.numberOfRooms) return res.status(400).send({message:'The param numberOfRooms is not allowed'})
        //Validar que el usuario exista
        let userExist = await User.findOne({ _id: dataRequired })
        if (!userExist) return res.status(400).send({ message: 'user not found' });
        //Validar que sea rol ADMIN de hotel
        if(userExist.rol !== 'WORKER') return res.status(403).send({ message: 'Only one ADMIN can have a Hotel' });
        //Validarmos que el ADMIN no tenga otra hotel a su cargo
        let adminInHotel = await Hotel.findOne({admin: data.admin})
        if(adminInHotel) return res.status(400).send({message: 'This Admin already has a hotel'});
        //Validamos que el hotel no se repita
        let hotelExist = await Hotel.findOne({
            $and:[
                {name: data.name},
                {address: data.address}
            ] 
        })
        if (hotelExist) return res.status(400).send({ message:'Hotel already exists'});
        //Agregamos hotel
        let newHotel = new Hotel(data);
        await newHotel.save();
        return res.status(201).send({message: 'Hotel saved sucessfully'});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error creating Hotel'});
    }
}

exports.getHotelsByPopularity = async(req, res) =>{
    try{
        let hotels = await Hotel.find().sort({popularity: -1}).populate('admin', 'name');
        return res.status(200).send({hotels})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error getting hotels'}); 
    }
}

exports.getsHotels = async(req, res) => {
    try{
        let hotels = await Hotel.find().populate('admin', 'name');
        return res.status(200).send({hotels})
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting Hotel'});
    }
}

exports.getHotel = async(req, res) => {
    try{
        let hotel = await Hotel.findOne({ _id: req.params.id }).populate('admin', 'name');
        if(!hotel) return res.status(404).send({message: 'Hotel not found'});
        return res.status(200).send({hotel});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting Hotel'});
    }
}

exports.searchByName = async(req, res) => {
    try{
        let data = req.body;
        let params = {
            name: data.name,
            address: data.address
        }
        let filter = {}
        if(data.name){
            filter.name = {
                $regex: params.name,
                $options: "i",
            }
        }
        if (data.address) {
            filter.address = {
                $regex: params.address,
                $options: "i",
            };
        }
        let hotels = await Hotel.find(filter).populate('admin', 'name');
        return res.send({hotels});
        /*
        let hotel = await Hotel.find({
            $and:[
                {name: {
                    $regex: params.name,
                    $options: 'i'
                }},
                {address: {
                    $regex: params.address,
                    $options: 'i'
                }},
            ]
            
        })
        return res.send({hotel});*/
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error searching Hotel'});
    }
}




  