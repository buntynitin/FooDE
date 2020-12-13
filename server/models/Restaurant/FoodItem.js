const mongoose = require('mongoose')

const foodItemSchema = new mongoose.Schema({
    restaurant_id:{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },
    name:{
        type : String,
        required : true,
        min : 1,
        max : 255
    },
    price : {
        type : Number,
        required : true,
    },
    isnonveg : {
        type : Boolean,
        required : true,
    },
    image : {
        type : String,
        required : false
    }

})

module.exports = mongoose.model('FoodItem',foodItemSchema);