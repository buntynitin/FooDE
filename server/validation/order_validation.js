const Joi = require('joi');



const orderValidation = data => {
    const schema = Joi.object({
        restaurant_id: Joi.string().min(24).max(24).required(),
        restaurant_name: Joi.string().required(),
        user_name: Joi.string().required(),
        user_id: Joi.string().min(24).max(24).required(),
        address: Joi.object().required(),
        order_id: Joi.string().min(36).max(36).required(),
        total_amount: Joi.number().min(0).required(),
        phone: Joi.number().integer().min(1000000000).max(9999999999).required(),
        payment_type: Joi.string().required(),
        payment_status: Joi.string().allow(''),
        order_status: Joi.string().required(),
        basket: Joi.array().items(
            Joi.object({
                _id : Joi.string().min(24).max(24).required(),
                restaurant_id : Joi.string().min(24).max(24).required(),
                name: Joi.string().min(1).max(255).required(),
                price: Joi.number().required(),
                isnonveg: Joi.boolean().required(),
                image: Joi.string().allow(''),
                count: Joi.number().integer().min(1).required(),
                __v: Joi.number(),
            })
        ).required(),
        custom_chat: Joi.array().items(
            Joi.object().allow({}),
        )

    });
    return schema.validate(data)
}

module.exports.orderValidation = orderValidation;