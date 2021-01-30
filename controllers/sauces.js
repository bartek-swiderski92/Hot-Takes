const Sauce = require('../models/sauce');
const fs = require('fs');
const {
    Z_FIXED
} = require('zlib');

exports.getAllSauces = (req, res, next) => {
    Sauce.find().then((sauces) => {
        res.status(200).json(sauces);
    }).catch((error) => {
        res.status(400).json({
            error: error
        })
    })
}

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
        _id: req.params.id
    }).then((sauce) => {
        res.status(200).json(sauce);
    }).catch((error) => {
        res.status(404).json({
            error: error
        })
    })
};

exports.addSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    const url = req.protocol + '://' + req.get('host');
    const sauce = new Sauce({
        name: sauceObject.name,
        manufacturer: sauceObject.manufacturer,
        description: sauceObject.description,
        mainPepper: sauceObject.mainPepper,
        imageUrl: url + '/images/' + req.file.filename,
        heat: sauceObject.heat,
        userId: sauceObject.userId,
    });
    sauce.save().then(
        () => {
            res.status(201).json({
                message: 'Post saved successfully!'
            })
        }).catch((error) => {
        res.status(400).json({
            error: error,
        })
    });
};

exports.modifySauce = (req, res, next) => {
    let sauce = new Sauce({
        _id: req.params.id
    });
    if (req.file) {
        const sauceObject = JSON.parse(req.body.sauce);
        const url = req.protocol + '://' + req.get('host');
        sauce = {
            _id: req.params.id,
            name: sauceObject.name,
            manufacturer: sauceObject.manufacturer,
            description: sauceObject.description,
            mainPepper: sauceObject.mainPepper,
            imageUrl: url + '/images/' + req.file.filename,
            heat: sauceObject.heat,
            userId: sauceObject.userId,
        }
    } else {
        sauce = {
            _id: req.params.id,
            name: req.body.name,
            manufacturer: req.body.manufacturer,
            description: req.body.description,
            mainPepper: req.body.mainPepper,
            heat: req.body.heat,
            userId: req.body.userId,
        };
    };
    Sauce.updateOne({
        _id: req.params.id
    }, sauce).then(() => {
        res.status(201).json({
            message: 'Sauce updated successfully!'
        })
    }).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        });
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({
        _id: req.params.id
    }).then((sauce) => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink('images/' + filename, () => {
            Sauce.deleteOne({
                    _id: req.params.id
                })
                .then(() => {
                    res.status(200).json({
                        message: 'Deleted!'
                    });
                }).catch((error) => {
                    res.status(400).json({
                        error: error
                    });
                });
        });
    });
};

exports.modifyLike = (req, res, next) => {
    //TODO: console.log(req.params);

    Sauce.findOne({
        _id: res.req.params.id,
    }, function (error, sauce) {
        const userId = req.body.userId
        const likedArray = sauce.userLiked;
        const dislikedArray = sauce.userDisliked;
        const likeValue = req.body.like;
        const userLikeIndex = likedArray.indexOf(userId);
        const userDislikeIndex = dislikedArray.indexOf(userId);

        if (likeValue === 1) {
            likedArray.push(userId)
        } else if (likeValue === -1) {
            dislikedArray.push(userId);
        } else {
            if (userLikeIndex >= 0) {
                likedArray.splice(userLikeIndex, 1);
            } else if (userDislikeIndex >= 0) {
                dislikedArray.splice(userDislikeIndex, 1);
            }
        }
        sauce.likes = likedArray.length;
        sauce.dislikes = dislikedArray.length;
        Sauce.updateOne({
            _id: res.req.params.id
        }, sauce).then(() => {
            res.status(200).json({
                message: 'Like updated successfully!'
            })
        }).catch(
            (error) => {
                res.status(400).json({
                    error: error
                });
            });
    })
}