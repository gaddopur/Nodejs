const mongoose = require('mongoose');

const leaderSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    image:{
        type:String,
        required:true
    },
    designation:{
        type:String,
        required:true
    },
    abbr:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    featured:{
        type:Boolean,
        default: false
    }
});

const leaders = mongoose.model('leader', leaderSchema);
module.exports = leaders;