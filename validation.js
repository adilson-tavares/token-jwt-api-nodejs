//Validation 
const Joi = require('@hapi/joi');


//Registration Validation
const registerValidation = (data) => {

    const schema = Joi.object({

        name : Joi.string().min(6).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','br'] } }),
        password: Joi.string().min(6).required()

    });

   return schema.validate(data);

};


//Registration Validation
const loginValidation =  (data) => {

    const schema = Joi.object({

        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','br'] } }),
        password: Joi.string().min(6).required()

    });

   return schema.validate(data);

};


module.exports.registerValidator = {

    registerValidation,
    loginValidation

}



