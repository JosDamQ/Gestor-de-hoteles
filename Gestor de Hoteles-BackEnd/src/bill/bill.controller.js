'use strict'

const Bill = require('./bill.model')

exports.test = (req, res)=>{
  return res.send({message: 'Bill test running'});
}