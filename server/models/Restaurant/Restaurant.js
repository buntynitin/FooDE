const { object } = require('joi');
const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema({
    owner_id:{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },
    restaurantname : {
        type : String,
        required : true,

    },
    mobile : {
        type : Number,
        required : true,
    },
    image : {
        type : String,
        required : false,
    },
    openingtime : {
        type : String,
        required : true,
    },
    closingtime : {
        type : String,
        required : true,
    },
    tags : {
        type: [Object],
        required: true,
    },
    address : {
        type : String,
        required : true,
    },
    city : {
        type : String,
        required : true,
    },
    state : {
        type : String,
        required : true,
    },
    zipcode : {
        type : Number,
        required : true,
    },
    coordinates : {
        type : [Number],
        required : true,
    }
})

module.exports = mongoose.model('Restaurant',restaurantSchema);