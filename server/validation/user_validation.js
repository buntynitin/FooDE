const Joi = require('joi');

const userValidation = data => {
    const schema = Joi.object({
        name: Joi.string().min(6).max(255).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).max(255).required(),
        picture: Joi.string().allow(''),

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

module.exports.userValidation = userValidation;
module.exports.loginValidation = loginValidation;