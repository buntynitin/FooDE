const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
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
    picture : {
        type : String,
        required : false,
    },

})

module.exports = mongoose.model('User',userSchema);