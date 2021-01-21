const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

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
    image: {
        type:String,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    label: {
        type: String, 
        default: ''
    },
    category: {
        type: String, 
        required: true
    },
    price: {
        type: Currency, 
        required: true, 
        min:0
    },
    comments: [commentSchema]
},{
    timestamps: true
});

var dishes = mongoose.model('Dish', dishSchema);
module.exports = dishes;