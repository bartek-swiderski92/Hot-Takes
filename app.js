const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log('request received');
    next();
});

app.use((req, res, next) => {
    res.status(201);
    next();
});

app.use((req, res, next) => {
    res.json({
        message: 'your request was successful'
    });
    next();
});

app.use((req, res, next) => {
    console.log('request sent successfully')
})

module.exports = app;