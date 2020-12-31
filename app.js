const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user');

const Sauce = require('./models/sauce');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.post('/api/sauces', (req, res, next) => {
    const sauce = new Sauce({
        userId: req.body.userId,
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        description: req.body.description,
        mainPepper: req.body.mainPepper,
        imageUrl: req.body.imageUrl,
        heat: req.body.heat,
        likes: req.body.likes,
        dislikes: req.body.dislikes,
        usersLiked: req.body.usersLiked,
        usersDisliked: req.body.usersDisliked,
    });
    sauce.save().then(
        () => {
            res.status(201).json({
                message: 'Post saved successfully!'
            })
        }).catch((error) => {
        res.status(400).json({
            error: error
        })
    })
});

app.use('/api/sauces', (req, res, next) => {
    const sauces = [{
        _id: '123',
        userId: '1234',
        name: 'Hot sauce',
        manufacter: 'helmans',
        description: 'hottest sauce avaliable on the market',
        mainPepper: 'chilli',
        imageUrl: 'https://www.chileseeds.co.uk/wp-content/uploads/2016/10/SweetChilliHotSauces-600x600.jpg',
        heat: 7,
        likes: 234,
        dislikes: 20,
        userLiked: [1234, 12345]

    }, {
        _id: '12',
        userId: '12345',
        name: 'Hotttest sauce',
        manufacter: 'helmans',
        description: 'hottest sauce avaliable on the market',
        mainPepper: 'chilli',
        imageUrl: 'https://www.chileseeds.co.uk/wp-content/uploads/2016/10/SweetChilliHotSauces-600x600.jpg',
        heat: 10,
        likes: 2,
        dislikes: 1,
        userLiked: [1234, 12345],
        usersDisliked: [123456]
    }];
    res.status(200).json(sauces)
});


app.use('/api/auth', userRoutes);

module.exports = app;