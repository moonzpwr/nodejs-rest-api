const Joi = require('joi');

const schemaRegistration = Joi.object({
    password: Joi.string().alphanum().min(6).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } }).required(),

})

const validate = async (schema, obj, next) => {
    try {
        const value = await schema.validateAsync(obj)
        return next()
    } catch (error) {
        console.log(error);
        next({status: 400, message: error.message})
    }
}

module.exports = {
    validationRegistration: async (req, res, next) => {
        return await validate(schemaRegistration, req.body, next)
    }
}