const router = require('express').Router();
const User = require('../../models/User/User');
const { userValidation, loginValidation } = require('../../validation/user_validation')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_KEY)
const axios = require('axios')


router.post('/register', async (req, res) => {
    const { error } = userValidation(req.body)
    if (error)
        return res.status(400).json({ 'error': error.details[0].message })

    try {
        const emailExists = await User.findOne({ email: (req.body.email) })
        if (emailExists)
            return res.status(400).json({ 'error': "Email already registered" })
    } catch {
        return res.status(400).json({ 'error': "Network error" })
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        picture: req.body.picture || ''
    })
    try {
        const saveduser = await user.save();
        res.send({ 'message': "User Created" })

    } catch (e) {
        res.status(400).json({ 'error': "Network error" });
    }
})

router.post('/login', async (req, res) => {

    const { error } = loginValidation(req.body)
    if (error)
        return res.status(400).json({ 'error': error.details[0].message })

    //IF USER REGISTERED
    try {
        const isuser = await User.findOne({ email: (req.body.email) })
        if (!isuser)
            return res.status(400).json({ 'error': "Account not found" })

        const validPass = await bcrypt.compare(req.body.password, isuser.password);
        if (!validPass)
            return res.status(400).json({ 'error': "Invalid Credentials!" })

        const token = jwt.sign({ "_id": isuser._id, "name": isuser.name, "email": isuser.email, "picture": isuser.picture }, process.env.TOKEN_SECRET)
        return res.status(200).json({ 'token': token })

    } catch {
        return res.status(400).json({ 'error': "Network error" })
    }

})


router.post('/glogin', (req, res) => {
    const { tokenId } = req.body
    client.verifyIdToken({ idToken: tokenId, audience: process.env.GOOGLE_KEY }).then(async response => {
        const { email, email_verified, name, picture, at_hash } = response.payload
        const userobj = { name, email, picture, password: at_hash }

        if (email_verified) {

            try {

                const userExists = await User.findOne({ email })
                if (userExists) {
                    const token = jwt.sign({ "_id": userExists._id, "name": userExists.name, "email": userExists.email, "picture": userExists.picture }, process.env.TOKEN_SECRET)

                    return res.status(200).json({ 'token': token })
                }
                else {
                    const user = new User(userobj)

                    try {
                        const saveduser = await user.save();
                        const token = jwt.sign({ "_id": saveduser._id, "name": saveduser.name, "email": saveduser.email, "picture": saveduser.picture }, process.env.TOKEN_SECRET)
                        return res.status(200).json({ 'token': token })

                    } catch (e) {
                        return res.status(400).json({ 'error': "Network error" });
                    }
                }

            } catch {
                return res.status(400).json({ 'error': "Network error" })
            }


        }
        else {
            return res.status(400).json({ "error": "E-mail can't be verified" })
        }
    })

});

router.post('/flogin',(req, res) => {
    const { accessToken } = req.body
    axios.get(`https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${accessToken}`).then(async function (response){

            const userobj = {name:response.data.name,email:response.data.email,picture:response.data.picture.data.url,password:response.data.id}

            try {

                const userExists = await User.findOne({ email:userobj.email })
                if (userExists) {
                    const token = jwt.sign({ "_id": userExists._id, "name": userExists.name, "email": userExists.email, "picture": userExists.picture }, process.env.TOKEN_SECRET)

                    return res.status(200).json({ 'token': token })
                }
                else {
                    const user = new User(userobj)

                    try {
                        const saveduser = await user.save();
                        const token = jwt.sign({ "_id": saveduser._id, "name": saveduser.name, "email": saveduser.email, "picture": saveduser.picture }, process.env.TOKEN_SECRET)
                        return res.status(200).json({ 'token': token })

                    } catch (e) {
                        return res.status(400).json({ 'error': "Network error" });
                    }
                }

            } catch {
                return res.status(400).json({ 'error': "Network error" })
            }
            console.log(userobj)
    }).catch(function (error){
        return res.status(400).json({ "error": "Bad request" })
    })
    

});


router.get('/geocode',async(req, res) => {
    axios.get(`https://apis.mapmyindia.com/advancedmaps/v1/${process.env.MAPMYINDIA_USER}/rev_geocode?lat=${req.query.lat}&lng=${req.query.long}`,
    )
        .then(function (response){
            res.status(200).send(response.data)
        }).catch(function (error){
            res.status(400).json({"error":"Network Error"})
        })
});




module.exports = router