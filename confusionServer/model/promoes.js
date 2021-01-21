const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const promoSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    image:{
        type:String,
        required:true
    },
    label:{
        type: String,
        default:""
    },
    price:{
        type: Currency,
        required: true
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

const promoes = mongoose.model('promo', promoSchema);
module.exports = promoes;