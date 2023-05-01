'use strict'

const express = require('express');
const morgan = require ('morgan');
const helmet = require ('helmet');
const cors = require ('cors');
const app = express();
const port = process.env.PORT || 3000;
const additionalServicesRoutes = require ('../src/additionalServices/additionalServices.routes');
const userRoutes = require('../src/user/user.routes');
const eventRoutes = require ('../src/event/event.routes');
const hotelRoutes = require('../src/hotel/hotel.routes');
const reservationRoutes = require('../src/reservation/reservation.routes');
const roomRoutes= require('../src/room/room.routes');
const billRoutes = require('../src/bill/bill.routes');

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use('/AdditionalServices', additionalServicesRoutes);
app.use('/Event', eventRoutes);
app.use('/Hotel', hotelRoutes);
app.use('/User', userRoutes);
app.use('/Reservation',reservationRoutes);
app.use('/Room',roomRoutes);
app.use('/Bill', billRoutes);


exports.initServer = ()=>{
    app.listen(port);
    userController.adminDefault()
    console.log(`Server http running in port ${port}`);
}