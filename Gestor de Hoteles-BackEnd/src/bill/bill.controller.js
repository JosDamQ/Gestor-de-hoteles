'use strict'

const Bill = require('./bill.model')
const {validateData} = require('../utils/validate')
const User = require('../user/user.model')

exports.test = (req, res)=>{
  return res.send({message: 'Bill test running'});
}

exports.createBill = async(req, res)=>{
  try {
    let data = req.body;
    if(!data.description || data.description == '') return res.status(400).send({message: `Description can't be null`})
    if(data.description != 'EVENT' && data.description != 'RESERVATION') return res.status(400).send({message: `Description only accepts EVENT or RESERVATION`})
    let params = {
      user: data.user,
      hotel: data.hotel,
      duration: data.duration
    };
    if(data.description == 'EVENT'){
      params = {
        ...params,
        eventType: data.eventType,
        eventDate: data.eventDate,
        amountPeople: data.amountPeople
      }
      let msg = validateData(params)
      if(msg) return res.status(400).send({msg})
    }
    if(data.description == 'RESERVATION'){
      params = {
        ...params,
        room: data.room,
        entryDate: data.entryDate
      }
      let msg = validateData(params)
      if(msg) return res.status(400).send({msg})
    }
    return res.send({message: 'Hola'})

  } catch (err) {
    console.log(err);
  }
}