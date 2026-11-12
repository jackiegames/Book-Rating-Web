const express = require('express');
const app = express()
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected successfully!');
    })
    .catch((error) => {
        console.log('MongoDB connection failed:', error);
    });

const port = 4000;
app.listen(port, () => {
    console.log(`Server running on Port: ${port}`);
})

app.set('view engine', 'vue');

app.get("/", (req,res) =>{
    res.render
})