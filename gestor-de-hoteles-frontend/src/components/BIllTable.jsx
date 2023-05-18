import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export const BillTable = () => {

    const [bill, setBill] = useState([{}]);

    const getBill = async()=>{
        try {
            const { data } = await axios.get('http://localhost:3300/lease/get');
            setBill(data.bill)
        } catch (err) {
            console.error(err);
    
        }
    }