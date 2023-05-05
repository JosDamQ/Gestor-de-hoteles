'use strict'

const express = require('express');
const morgan = require ('morgan');
const helmet = require ('helmet');
const cors = require ('cors');
const app = express();
const port = process.env.PORT || 3000;
const additionalServicesRoutes = require ('../src/additionalServices/additionalServices.routes');
const userRoutes = require('../src/user/user.routes');
const hotelRoutes = require('../src/hotel/hotel.routes');
const billRoutes = require('../src/bill/bill.routes');
const userController = require('../src/user/user.controller')
const eventType = require('../src/eventType/eventType.routes')
const roomsRoutes = require('../src/room/room.routes')

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use('/AdditionalServices', additionalServicesRoutes);
app.use('/Hotel', hotelRoutes);
app.use('/User', userRoutes);
app.use('/Room', roomsRoutes);
app.use('/Bill', billRoutes);
app.use('/EventType', eventType);


exports.initServer = ()=>{
    app.listen(port);
    userController.createAdminDefault()
    console.log(`Server http running in port ${port}`);
}