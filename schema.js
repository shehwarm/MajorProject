const Joi = require('joi');

module.exports.lsitingSchema = Joi.object({
    lisitng : Joi.object({
        title : Joi.string().required(),
        description: Joi.string().required(),
        location : Joi.string().required(),
        country : Joi.string().required(),
        price : Joi.number().required().min(0),
        image : Joi.string().allow("", null),
    }).required()
})