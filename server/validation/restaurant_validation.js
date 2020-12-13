const Joi = require('joi');


const registerValidation = data => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),

        location: Joi.object({

            type: Joi.string(),
            coordinates: Joi.array().ordered(
                Joi.number().min(-180).max(180).required(),
                Joi.number().min(-90).max(90).required())

        })



    });

    return schema.validate(data)

}


const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data)
}



const restaurantOwnerValidation = data => {
    const schema = Joi.object({
        username: Joi.string().min(6).max(255).required(),
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(255).required(),

    });
    return schema.validate(data)

}

const restaurantValidation = data => {
    const schema = Joi.object({
        owner_id: Joi.string().min(24).max(24).required(),
        restaurantname: Joi.string().min(6).max(255).required(),
        mobile: Joi.number().integer().min(1000000000).max(9999999999).required(),
        image: Joi.string().allow(''),
        openingtime: Joi.string().pattern(new RegExp('[0-9][0-9]:[0-9][0-9]')).required(),
        closingtime: Joi.string().pattern(new RegExp('[0-9][0-9]:[0-9][0-9]')).required(),
        tags:Joi.array().items(
            Joi.object({
              key: Joi.number().integer(),
              label: Joi.string()
            })
          ).required(),
        address: Joi.string().min(6).max(255).required(),
        city: Joi.string().min(6).max(255).required(),
        state: Joi.string().min(6).max(255).required(),
        zipcode: Joi.number().integer().min(100000).max(999999).required(),
        coordinates: Joi.array().items(
            Joi.number().max(180).min(-180).required(),
            Joi.number().max(90).min(-90).required(),
          ).length(2).required()

    });
    return schema.validate(data)
}

const restaurantLoginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required(),

    });
    return schema.validate(data)

}



const foodItemValidation = data => {
    const schema = Joi.object({
        name: Joi.string().min(1).max(255).required(),
        price: Joi.number().required(),
        isnonveg : Joi.boolean().required(),
        image: Joi.string().allow(''),

    });
    return schema.validate(data)

}

const latlngValidation = data =>{
    const schema = Joi.object({
        latitude:Joi.number().max(90).min(-90).required(),
        longitude:Joi.number().max(180).min(-180).required(),
        })

    return schema.validate(data)
}

    module.exports.registerValidation = registerValidation;
    module.exports.loginValidation = loginValidation;
    module.exports.restaurantOwnerValidation = restaurantOwnerValidation;
    module.exports.restaurantValidation = restaurantValidation;
    module.exports.restaurantLoginValidation = restaurantLoginValidation;
    module.exports.foodItemValidation = foodItemValidation;
    module.exports.latlngValidation = latlngValidation;