//MONGODB PW: 9wAytpdXHGTQ94e
//MONGODB CONNECTION: mongodb+srv://Bartosz:<password>@cluster0.edbqm.mongodb.net/<dbname>?retryWrites=true&w=majority

const express = require('express');
const mongoose = require('mongoose');


const app = express();

mongoose.connect('mongodb+srv://Bartosz:9wAytpdXHGTQ94e@cluster0.edbqm.mongodb.net/<dbname>?retryWrites=true&w=majority')
    .then(() => {
        console.log('Successfully connected to MongoDB Atlas!');
    })
    .catch((error) => {
        console.log('Unable to connect to MongoDB Atlas!');
        console.error(error)
    });

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

module.exports = app;