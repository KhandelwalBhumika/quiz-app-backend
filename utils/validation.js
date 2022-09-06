const joi = require('joi')
const Regexp = require('./regexString.json')
joi.objectID = require('joi-objectid')(joi)

let emailregex= new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

module.exports = {
    //SignUp
	signupValidation: joi.object({
        firstName: joi.string().trim().pattern(new RegExp(Regexp.name)).required().messages({
            "string.empty": `name must contain value`,
            "any.required": `name is a required field`
        }),
		lastName: joi.string().trim().pattern(new RegExp(Regexp.name)).required(),
		email: joi.string().email({ tlds: { allow: false } }).pattern(emailregex).messages({
            "string.empty": `email must contain value`,
            "string.base": `email should be a type of string`,
            "string.pattern.base": `Please check the format!`
        }),
        registrationId: joi.number(),
		password: joi.string().trim()
	}),

    //LogIn
    loginValidation: joi.object({
        email: joi.string().email({ tlds: { allow: false } }).required().messages({
            "string.empty": `email must contain value`,
            "string.base": `email should be a type of string`,
            "string.pattern.base": `Please check the format!`,
            "any.required": `email is a required field`
        }),
        registrationId: joi.number(),
        password: joi.string().regex(/[a-zA-Z0-9]{3,30}/).required()
    }),
}