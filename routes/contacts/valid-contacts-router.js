const Joi = require('joi');


const schemaCreateContact = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean()
})

const schemaUpdateContact = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).optional(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).optional(),
    phone: Joi.string().optional(),
    favorite: Joi.boolean()
}).or('name', 'email', 'phone').error(new Error("missing fields"))

const schemaUpdateFavorite = Joi.object({
    favorite: Joi.boolean().required()
}).error(new Error("missing fields favorite"))

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
    validationCreateContact: async (req, res, next) => {
        return await validate(schemaCreateContact, req.body, next)
    },
     validationUpdateContact: async (req, res, next) => {
        return await validate(schemaUpdateContact, req.body, next)
    },
    validationUpdateFavorite: async (req, res, next) => {
         return await validate(schemaUpdateFavorite, req.body, next)
     }
    // validationObjectId: async (req, res, next) => {
    //     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    //          return next({status: 400, message: 'Invalid Object ID'})
    //     }
    //     next()
    //  },
}