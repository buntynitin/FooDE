const mongoose = require('mongoose')

const deliverySchema = new mongoose.Schema({
    name:{
        type : String,
        required : true,
        min : 6,
        max : 255
    },
    email : {
        type : String,
        required : true,
        min : 6,
        max : 255
    },
    password : {
        type : String,
        required : true,
        min : 6,
        max : 255
    },
    address :{
        type : Object,
        required : true,
    },
    isaccepting :{
        type : Boolean,
        default : false,
        required : true,
    }
})

module.exports = mongoose.model('Delivery',deliverySchema);