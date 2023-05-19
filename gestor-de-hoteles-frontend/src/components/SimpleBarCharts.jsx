import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Navbar } from './Navbar';

const SimpleBarCharts = () => {

    const [hotels, setHotels] = useState([{}]);

    const getHotels = async () => {
        try {
          const { data } = await axios('http://localhost:2765/Hotel/gets');
          setHotels(data.hotels);
        } catch (err) {
          console.error(err);
        }
      }

      useEffect(() => {
        getHotels()
      }, []);

  return (
    <>
    <Navbar></Navbar>
    <ResponsiveContainer width="100%" aspect={2}>
        <BarChart 
            data={hotels}
            width={100}
            height={300}
            margin={{
                top:5,
                right:30,
                left:20,
                bottom:5
            }}
        >
        <CartesianGrid strokeDasharray="4 1 2" />
        <XAxis dataKey="numberOfRooms"/>
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="numberOfRooms" fill="#6b48ff"/>
        </BarChart>
    </ResponsiveContainer>
    </>
  )
}

export default SimpleBarCharts