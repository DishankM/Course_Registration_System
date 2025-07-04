const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const database = require('./config/database');
const courseRoutes = require('./router/CourseRouter');


const PORT = process.env.PORT || 5000;
database.connect();

const app = express();
app.use(cors());
app.use(express.json());

app.use(cors({
    origin: (origin, callback) => {
      if (!origin || ['http://localhost:5173', 'http://localhost:4000'].includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })

);


app.use('/api/courses', courseRoutes);


app.get('/', (req,res)=>{
    return res.json({
        success: true,
        message: 'Your server is up and running...'
    })
})

app.listen(PORT, () =>{
    console.log(`App is running at ${PORT}`)
})