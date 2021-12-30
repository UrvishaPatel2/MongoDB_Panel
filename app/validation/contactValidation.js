const Joi = require('@hapi/joi');

function validateForm(req){
    // console.log("form",req);
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).empty().required().messages({
            "string.base": `Name should be a type of text`,
            "string.min": `Name should be a 3 Character '`,
            "string.max": `Name should be a 30 Character '`,
            "string.empty":'Name is not allowed to be empty',
            "any.required": `Name is Required`,
        }),
        email: Joi.string().email().empty().required().messages({
            "string.base": `Email should be a type of text`,
            "string.email": `Email format not valid`,
            "string.empty":'Email is not allowed to be empty',
            "string.required": `Email is Required`,
                      
          }),
        contactnumber:Joi.string().length(10).pattern(/^[0-9]+$/).required().messages({
            "string.base": `Contact Number should be a type of text`,
            "string.pattern.base": `Enter only Numbers`,
            "string.empty":'Contact Number is not allowed to be empty',
            "string.required": `Contact Number is Required`,
          }),
        message: Joi.string().required().messages({
            "string.base": `Message should be a type of text`,
            "string.empty":'Message  is not allowed to be empty',
            "string.required": `Message is Required`,
          }),
        date: Joi.date().required().messages({
            "string.base": `Date should be a type of text`,
            "string.empty":'Date  is not allowed to be empty',
            "string.required": `Date is Required`,
          }),
    })

    return schema.validate(req, { abortEarly: false });
    
}

function editForm(req){
    // console.log("form",req);
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).empty().required().messages({
            "string.base": `Name should be a type of text`,
            "string.min": `Name should be a 3 Character '`,
            "string.max": `Name should be a 30 Character '`,
            "string.empty":'Name is not allowed to be empty',
            "any.required": `Name is Required`,
        }),
        email: Joi.string().email().empty().required().messages({
            "string.base": `Email should be a type of text`,
            "string.email": `Email format not valid`,
            "string.empty":'Email is not allowed to be empty',
            "string.required": `Email is Required`,
                      
          }),
        contactnumber:Joi.string().length(10).pattern(/^[0-9]+$/).required().messages({
            "string.base": `Contact Number should be a type of text`,
            "string.pattern.base": `Enter only Numbers`,
            "string.empty":'Contact Number is not allowed to be empty',
            "string.required": `Contact Number is Required`,
          }),
        message: Joi.string().required().messages({
            "string.base": `Message should be a type of text`,
            "string.empty":'Message  is not allowed to be empty',
            "string.required": `Message is Required`,
          }),
        date: Joi.date().required().messages({
            "string.base": `Date should be a type of text`,
            "string.empty":'Date  is not allowed to be empty',
            "string.required": `Date is Required`,
          }),
    })

    return schema.validate(req, { abortEarly: false });
    
}

module.exports = {
    validateForm,
    editForm
}