const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
    deliveryagent_id:{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },
    restaurant_name:{
        type : String,
        required : true
    },
    address:{
        type : String,
        required : true
    }
})

module.exports = mongoose.model('Request',requestSchema);