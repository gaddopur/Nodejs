const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique: true,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    admin:{
        type: Boolean,
        default: false
    }
});

const users = mongoose.model('user', userSchema);
module.exports = users;