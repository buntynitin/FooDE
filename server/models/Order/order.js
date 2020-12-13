const { number, object } = require('joi');
const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    restaurant_id:{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },
    restaurant_name:{
        type : String,
        required : true,
    },
    user_name:{
        type : String,
        required : true,
    },
    address:{
        type: Object,
        required: true
    },
    user_id:{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },
    order_id:{
        type : String,
        required : true
    },
    total_amount:{
        type : Number,
        required :true
    },
    phone:{
        type : Number,
        required :true
    },
    payment_type:{
        type : String,
        required :true
    },
    payment_status:{
        type: String,
        required: false
    },
    order_status:{
        type: String,
        required: true
    },
    basket : {
        type: [Object],
        required: true,
    },
    custom_chat: {
        type: [Object],
        default: []
    },
    time : {
        type : Date,
        default: Date.now
    },
    

})

module.exports = mongoose.model('Order',orderSchema);