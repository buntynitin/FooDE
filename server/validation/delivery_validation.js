const Joi = require('joi');
const { model } = require('../models/Delivery/Delivery');

const deliveryValidation = data => {
    const schema = Joi.object({
        name: Joi.string().min(6).max(255).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).max(255).required(),
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

const addressValidation = data =>{
    const schema = Joi.object({
        formatted_address: Joi.string().required(),
        latitude:Joi.number().max(90).min(-90).required(),
        longitude:Joi.number().max(180).min(-180).required(),
    })
    return schema.validate(data)
}

const isAcceptingValidation = data =>{
    const schema = Joi.object({
        isaccepting: Joi.boolean().required(),
    })
    return schema.validate(data)
}



module.exports.deliveryValidation = deliveryValidation;
module.exports.loginValidation = loginValidation;
module.exports.addressValidation = addressValidation
module.exports.isAcceptingValidation = isAcceptingValidation