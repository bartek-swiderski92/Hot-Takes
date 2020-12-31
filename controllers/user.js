const bcrypt = require('bcrypt')
const User = require('../models/user');


exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save().then(
                    () => {
                        console.log(user);
                        res.status(201).json({
                            message: 'User added successfully!'
                        });
                    })
                .catch((error) => {
                    res.status(500).json({
                        error: error
                    });
                });
        });
};

exports.login = (req, res, next) => {

};