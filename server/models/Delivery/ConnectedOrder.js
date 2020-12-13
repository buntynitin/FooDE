const mongoose = require('mongoose')

const connectedSchema = new mongoose.Schema({
    deliveryagent_id:{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },
    order_id:{
        type : String,
        required : true
    },
})

module.exports = mongoose.model('Connected',connectedSchema);