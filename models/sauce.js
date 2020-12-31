const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacter: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number},
    dislikes: { type: Number},
    userLiked: [String],
    usersDisliked: [String]
});

module.exports = mongoose.model('Sauce', sauceSchema);