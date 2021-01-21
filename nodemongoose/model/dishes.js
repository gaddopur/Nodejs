const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required:true
    },
    comment: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, {timestamps:true});

const dishSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    comments: [commentSchema]
},{
    timestamps: true
});

var dishes = mongoose.model('Dish', dishSchema);
module.exports = dishes;