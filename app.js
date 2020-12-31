//MONGODB PW: 9wAytpdXHGTQ94e
//MONGODB CONNECTION: mongodb+srv://Bartosz:<password>@cluster0.edbqm.mongodb.net/<dbname>?retryWrites=true&w=majority

const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(bodyParser.json());

app.use('/api/auth', userRoutes);

module.exports = app;