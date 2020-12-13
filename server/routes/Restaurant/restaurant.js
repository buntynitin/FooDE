const router = require('express').Router();
const RestaurantOwner = require('../../models/Restaurant/RestaurantOwner');
const Restaurant = require('../../models/Restaurant/Restaurant');
const FoodItem = require('../../models/Restaurant/FoodItem')
const bcrypt = require('bcryptjs');
const { cloudinary } = require('../../components/cloudinary');
const { restaurantOwnerValidation, restaurantValidation, restaurantLoginValidation, foodItemValidation, latlngValidation } = require('../../validation/restaurant_validation');
const jwt = require('jsonwebtoken');
const geolib = require('geolib');
var mongoose = require('mongoose');
const verify = require('./verifyToken');

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}


router.post('/registerOwner', async (req, res) => {
    //FORM ERRORS
    const { error } = restaurantOwnerValidation(req.body)
    if (error)
        return res.status(400).json({ 'error': error.details[0].message })

    //ALREADY REGISTERED USER
    try {
        const emailExists = await RestaurantOwner.findOne({ email: (req.body.email) })
        if (emailExists)
            return res.status(400).json({ 'error': "Email already registered" })
    } catch {
        return res.status(400).json({ 'error': "Network error" })
    }

    //HASHING PASS
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //ADD NEW USER
    const restaurantowner = new RestaurantOwner({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
    })
    try {
        const savedrestaurantowner = await restaurantowner.save();
        res.send({ 'owner_id': savedrestaurantowner._id })

    } catch (e) {
        res.status(400).json({ 'error': "Network error" });
    }
}

);


router.post('/addRestaurant', async (req, res) => {
    const { error } = restaurantValidation(req.body)
    if (error)
        return res.status(400).json({ 'error': error.details[0].message })


    try {
        const ownerExists = await RestaurantOwner.findOne({ _id: mongoose.Types.ObjectId(req.body.owner_id) })
        if (!ownerExists)
            return res.status(400).json({ 'error': "Owner_ID does not exist" })
    } catch {
        return res.status(400).json({ 'error': "Network error" })
    }

    try {
        const sameOwnerExists = await Restaurant.findOne({ owner_id: mongoose.Types.ObjectId(req.body.owner_id) })
        if (sameOwnerExists)
            return res.status(400).json({ 'error': "Owner must have a single restaurant" })
    } catch {
        return res.status(400).json({ 'error': "Network error" })
    }



    const restaurant = new Restaurant(req.body)
    try {
        const savedRestaurant = await restaurant.save();
        res.send({ 'restaurant_id': savedRestaurant._id })

    } catch (e) {
        res.status(400).json({ 'error': "Network error" });
    }
});


router.post('/login', async (req, res) => {
    //FORM ERRORS
    const { error } = restaurantLoginValidation(req.body)
    if (error)
        return res.status(400).json({ 'error': error.details[0].message })

    //IF USER REGISTERED
    try {
        const restaurantowner = await RestaurantOwner.findOne({ email: (req.body.email) })
        if (!restaurantowner)
            return res.status(400).json({ 'error': "Account not found" })

        const validPass = await bcrypt.compare(req.body.password, restaurantowner.password);
        if (!validPass)
            return res.status(400).json({ 'error': "Invalid Credentials!" })

        //CREATE AND ASSIGN TOKEN    
        const token = jwt.sign({ _id: restaurantowner._id, username: restaurantowner.username, email: restaurantowner.email }, process.env.TOKEN_SECRET)
        return res.status(200).json({ 'token': token })
        // res.header('auth-token', token).send(token)

    } catch {
        return res.status(400).json({ 'error': "Network error" })
    }

})


router.post('/addFood', verify, async (req, res) => {

    const { error } = foodItemValidation(req.body)
    if (error)
        return res.status(400).json({ 'error': error.details[0].message })

    try {
        const rest = await Restaurant.findOne({ owner_id: mongoose.Types.ObjectId(req.user._id) })
        if (!rest) {
            return res.status(400).json({ 'error': "Bad request" })
        }
        else {
            var formbody = req.body
            formbody["restaurant_id"] = rest._id
            const fooditem = new FoodItem(req.body)
            try {
                const savedfooditem = await fooditem.save();
                res.send(savedfooditem)

            } catch (e) {
                res.status(400).json({ 'error': "Network error" });
            }
        }


    } catch {
        return res.status(400).json({ 'error': "Network error" })
    }

}
);


router.post('/deleteFood', verify, async (req, res) => {

    try {
        const rest = await Restaurant.findOne({ owner_id: mongoose.Types.ObjectId(req.user._id) })
        if (rest) {
            try {
                const del = await FoodItem.deleteOne({ restaurant_id: mongoose.Types.ObjectId(rest._id), _id: mongoose.Types.ObjectId(req.body._id) })
                if (del) {

                    return res.status(200).json({ "message": "deleted" });

                }
                else {
                    return res.status(400).json({ 'error': "Bad request" });
                }
            }
            catch {
                return res.status(400).json({ 'error': "Network error" })
            }

        }
        else {

            return res.status(400).json({ 'error': "Bad request" });

        }


    } catch {
        return res.status(400).json({ 'error': "Network error" })
    }

}
);

router.get('/restaurantDetail', async (req, res) => {
    try {
        const detail = await Restaurant.findOne({ owner_id: mongoose.Types.ObjectId(req.query.owner_id) })
        res.send(detail)
    } catch (e) {
        res.status(400).json({ 'error': "Bad Request" });
    }
});



router.get('/restaurantList', async (req, res) => {
    const origin = {latitude:parseFloat(req.query.latitude),longitude:parseFloat(req.query.longitude)}
    const { error } = latlngValidation(origin)
    if (error)
        return res.status(400).json({ 'error': error.details[0].message })
    
    try {
        const list = await Restaurant.find({})
        const updatedList = []
        list.map((item)=>{
        const distance =   geolib.getDistance(origin,{ latitude: item.coordinates[1], longitude: item.coordinates[0] })

        if(distance <= 5000 )  //5km is restaurant's serviceable area
                updatedList.push(item)
            
        })
        res.send(updatedList)
    } catch (e) {
        res.status(400).json({ 'error': "Bad Request" });
    }


});





router.get('/allrestaurantList', async (req, res) => {
    try {
        const list = await Restaurant.find({})
        res.send(list)
    } catch (e) {
        res.status(400).json({ 'error': "Bad Request" });
    }


});


router.get('/restaurantCatalog', async (req, res) => {
    if (req.query.restaurant_id) {

        try {
            const catalog = await FoodItem.find({ restaurant_id: mongoose.Types.ObjectId(req.query.restaurant_id) })
            res.send(catalog)
        } catch (e) {
            res.status(400).json({ 'error': "Bad Request" });
        }
    }
    else {
        try {
            const catalog = await FoodItem.find({})
            res.send(catalog)
        } catch (e) {
            res.status(400).json({ 'error': "Bad Request" });
        }
    }
  
});


router.get('/restaurantAlldetail', async (req, res) => {
    if (req.query.restaurant_id) {

        try {
            const catalog = await Restaurant.aggregate([
                {
                    '$match': {
                      '_id':  mongoose.Types.ObjectId(req.query.restaurant_id)
                    }
                  },
                {
                '$lookup': {
                    'from': 'fooditems',
                    'localField': '_id',
                    'foreignField': 'restaurant_id',
                    'as': 'catalog'
                }
            }]
            )
            res.send(catalog[0])
        } catch (e) {
            res.status(400).json({ 'error': "Bad Request" });
        }
    }
    else {
            
            res.status(400).json({ 'error': "restaurrant_id missing" });
        }
    
});






router.post('/uploadImage', async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'restaurants',
        });
        res.status(200).json({ url: uploadResponse.url })
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});

router.post('/uploadFood', async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'fooditems',
        });
        res.status(200).json({ url: uploadResponse.url })
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});


module.exports = router