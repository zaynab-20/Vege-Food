const joi = require('@hapi/joi');

exports.registerValidation =  (req, res, next) =>{
    const schema = joi.object({
        fullName: joi.String().trim().min(5).pattern(/^[A-Za-z ]+$/).required().messages({
            "any.required": "Fullname is required",
             "string.empty":"Fullname cannot be empty",
             "string.min": "Fullname must be at least 5 characters long",
             "string.pattern.base": "Fullname cannot contain number or special character"
        }),
        email: joi.String().email().required(),
        password: joi.string().required()
    }) 
    const { error }  = schema.validate(req.body, {abortEarly: false});
    if (error) {
        return res.status(400).json({
            message: error.message
        })
    }  
    next()
};