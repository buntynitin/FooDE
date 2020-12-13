const router = require('express').Router();
const Delivery = require('../../models/Delivery/Delivery');
const Restaurant = require('../../models/Restaurant/Restaurant');
const Order = require('../../models/Order/order')
const Request = require('../../models/Delivery/Request');
const Connected = require('../../models/Delivery/ConnectedOrder')
const { deliveryValidation, loginValidation, addressValidation, isAcceptingValidation } = require('../../validation/delivery_validation')
const verify = require('./verifyToken')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const axios = require('axios');
const geolib = require('geolib');
var mongoose = require('mongoose');

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}



router.post('/register', async (req, res) => {
    const { error } = deliveryValidation(req.body)
    if (error)
        return res.status(400).json({ 'error': error.details[0].message })

    try {
        const emailExists = await Delivery.findOne({ email: (req.body.email) })
        if (emailExists)
            return res.status(400).json({ 'error': "Email already registered" })
    } catch {
        return res.status(400).json({ 'error': "Network error" })
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const delivery = new Delivery({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        address: { hasaddress: false }
    })
    try {
        const saveddelivery = await delivery.save();
        res.send({ 'message': "User Created" })

    } catch (e) {
        res.status(400).json({ 'error': "Network error" });
    }
})


router.post('/login', async (req, res) => {

    const { error } = loginValidation(req.body)
    if (error)
        return res.status(400).json({ 'error': error.details[0].message })

    //IF ALREADY REGISTERED
    try {
        const isuser = await Delivery.findOne({ email: (req.body.email) })
        if (!isuser)
            return res.status(400).json({ 'error': "Account not found" })

        const validPass = await bcrypt.compare(req.body.password, isuser.password);
        if (!validPass)
            return res.status(400).json({ 'error': "Invalid Credentials!" })

        const token = jwt.sign({ "_id": isuser._id, "name": isuser.name, "email": isuser.email }, process.env.TOKEN_SECRET)
        return res.status(200).json({ 'token': token })

    } catch {
        return res.status(400).json({ 'error': "Network error" })
    }

})


router.post('/updateLocation', verify, async (req, res) => {
    const { error } = addressValidation(req.body)
    if (error)
        return res.status(400).json({ 'error': error.details[0].message })

    const addressobject = req.body
    addressobject["hasaddress"] = true

    try {
        const updatedAddress = await Delivery.findOneAndUpdate({ _id: req.user._id }, { "address": addressobject })
        return res.status(200).json(updatedAddress)

    } catch {
        return res.status(400).json({ 'error': "Bad request" })
    }

})

router.post('/updateAccepting', verify, async (req, res) => {
    const { error } = isAcceptingValidation({ isaccepting: req.query.isaccepting })
    if (error)
        return res.status(400).json({ 'error': error.details[0].message })

    try {
        await Delivery.findOneAndUpdate({ _id: req.user._id }, { "isaccepting": req.query.isaccepting })
        return res.status(200).json({ message: "updated" })

    } catch {
        return res.status(400).json({ 'error': "Network error" })
    }

})


router.post('/sendDeliveryrequest', verify, async (req, res) => {
    try {

        const { restaurantname, address, city, state, zipcode, coordinates } = await Restaurant.findOne({ owner_id: req.user._id })

        try {

            const origin = { latitude: coordinates[1], longitude: coordinates[0] }
            const list = await Delivery.find({})
            const distanceMatrix = []
            list.map((item) => {

                if (item.isaccepting && item.address.hasaddress) {

                    const distance = geolib.getDistance(origin, { latitude: item.address.latitude, longitude: item.address.longitude })
                    if (distance <= 5000)  //5km is delivery-agent's serviceable area
                        distanceMatrix.push({ distance: distance, delivery_id: item._id })

                }
            })



            if (distanceMatrix.length === 0)
                return res.status(400).json({ 'error': 'No nearby delivery agent' })

            var mindistance = 5000
            var mindistanceindex = 0
            distanceMatrix.map((item, index) => {
                if (item.distance < mindistance) {
                    mindistance = item.distance
                    mindistanceindex = index
                }
            })




            const request = new Request({
                deliveryagent_id: mongoose.Types.ObjectId(distanceMatrix[mindistanceindex].delivery_id),
                restaurant_name: restaurantname,
                address: `${address} ${city}, ${state} - ${zipcode}`
            })

            try {
                await request.save();
                return res.status(200).json({ 'message': 'Request Sent' })
            }
            catch {
                return res.status(400).json({ 'error': 'Something went wrong' })
            }


        } catch {
            return res.status(400).json({ 'error': 'Something went wrong' })
        }



    } catch {
        return res.status(400).json({ 'error': 'Something went wrong' })
    }
});



router.post('/handTodelivery', verify, async (req, res) => {

    if (req.body.order_id && (req.body.order_id.length === 36)) {
        try {
            const order = await Order.findOne({ order_id: req.body.order_id })
            if (order === null)
                return res.status(400).json({ "error": "Invalid QR code" })
            if(order.order_status === 'In Transit')
                return res.status(400).json({ "error": "Order already connected" })
            const newconnection = new Connected({
                order_id: req.body.order_id,
                deliveryagent_id: mongoose.Types.ObjectId(req.user._id)
            })

            const savedconnection = await newconnection.save()

            await Order.findOneAndUpdate({order_id: req.body.order_id},{order_status : 'In Transit'})

            return res.status(200).json({ 'message': "Connected to order" })


        } catch {
            return res.status(400).json({ 'error': "Network Error" })
        }

    }
    else {
        return res.send("Error in request body")
    }
})



router.get('/getDeliveryorders', verify, async (req, res) => {
    try {

        const orderList = await Connected.find({ deliveryagent_id: req.user._id }).sort({ _id: -1 })
        if (orderList.length <= 0)
            return res.status(400).json({ 'error': 'No request' })
        else
            return res.send(orderList)

    } catch {
        return res.status(400).json({ 'error': 'Network error' })
    }
})



router.get('/getRequest', verify, async (req, res) => {
    try {

        const requestList = await Request.find({ deliveryagent_id: req.user._id }).sort({ _id: -1 })
        if (requestList.length <= 0)
            return res.status(400).json({ 'error': 'No request' })
        else
            return res.send(requestList)

    } catch {
        return res.status(400).json({ 'error': 'Network error' })
    }
})



router.get('/getUserdetail', verify, async (req, res) => {
    try {
        user = await Delivery.findOne({ _id: req.user._id })
        if (user)
            res.status(200).json(user)
        else
            return res.status(400).json({ 'error': "Bad request" })

    } catch {
        return res.status(400).json({ 'error': "Bad request" })
    }
})






router.get('/geocode', async (req, res) => {
    axios.get(`https://apis.mapmyindia.com/advancedmaps/v1/${process.env.MAPMYINDIA_DELIVERY}/rev_geocode?lat=${req.query.lat}&lng=${req.query.long}`,
    )
        .then(function (response) {
            res.status(200).send(response.data)
        }).catch(function (error) {
            res.status(400).json({ "error": "Network Error" })
        })
});




module.exports = router