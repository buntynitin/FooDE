const express = require('express');
const app = express();
const mongoose = require('mongoose');
const restaurantRoute = require('./routes/Restaurant/restaurant')
const userRoute = require('./routes/User/user')
const orderRoute = require('./routes/Order/order')
const deliveryRoute = require('./routes/Delivery/delivery')
const cors = require('cors')
const port = process.env.PORT || 3000;
// var morgan = require('morgan')
app.use(express.static('public'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
require('dotenv').config();
app.use(cors());
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
mongoose.connect(process.env.DB_URI,{ useNewUrlParser: true,useUnifiedTopology: true, useFindAndModify: false },()=>{
    console.log("Connected to Database")
});


// const sleep = (milliseconds) => {
//     return new Promise(resolve => setTimeout(resolve, milliseconds))
// }


app.use('/api/order', orderRoute) 
app.use('/api/user', userRoute)
app.use('/api/restaurant', restaurantRoute)
app.use('/api/delivery', deliveryRoute)



 
app.listen(port);

