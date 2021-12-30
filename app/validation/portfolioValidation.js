const Joi = require('@hapi/joi');
function formValid(req){
    const schema = Joi.object({
        pcategory: Joi.string().min(3).max(30).empty().required().messages({
            "string.base": `Project Category should be a type of text`,
            "string.min": `Project Category should be a 3 Character '`,
            "string.max": `Project Category should be a 30 Character '`,
            "string.empty":'Project Category is not allowed to be empty',
            "any.required": `Project Category is Required`,
        }),
        
        pname: Joi.string().empty().required().messages({
            "string.base": `Project Name should be a type of text`,
            "string.empty":'Project Name  is not allowed to be empty',
            "string.required": `Project Name is Required`,
          }),
          ptitle: Joi.string().empty().required().messages({
            "string.base": `Project Title should be a type of text`,
            "string.empty":'Project Title  is not allowed to be empty',
            "string.required": `Project Title is Required`,
          }),
          url: Joi.string().empty().required().messages({
            "string.base": `URL should be a type of text`,
            "string.empty":'URL  is not allowed to be empty',
            "string.required": `URL is Required`,
          }),
          pdate:Joi.date().required().messages({
            "string.base": `Project Date should be a type of text`,
            "string.empty":'Project Date  is not allowed to be empty',
            "string.required": `Project Date is Required`,
          }),
          old_image:Joi.optional()
    })
    return schema.validate(req, { abortEarly: false });
}

function editValid(req){
    const schema = Joi.object({
        pcategory: Joi.string().min(3).max(30).empty().required().messages({
            "string.base": `Project Category should be a type of text`,
            "string.min": `Project Category should be a 3 Character '`,
            "string.max": `Project Category should be a 30 Character '`,
            "string.empty":'Project Category is not allowed to be empty',
            "any.required": `Project Category is Required`,
        }),
        
        pname: Joi.string().empty().required().messages({
            "string.base": `Project Name should be a type of text`,
            "string.empty":'Project Name  is not allowed to be empty',
            "string.required": `Project Name is Required`,
          }),
          ptitle: Joi.string().empty().required().messages({
            "string.base": `Project Title should be a type of text`,
            "string.empty":'Project Title  is not allowed to be empty',
            "string.required": `Project Title is Required`,
          }),
          url:Joi.string().empty().uri().required().messages({
            "string.base": `URL should be a type of text`,
            "string.empty":'URL  is not allowed to be empty',
            "string.required": `URL is Required`,
          }),
          pdate:Joi.date().required().messages({
            "string.base": `Project Date should be a type of text`,
            "string.empty":'Project Date  is not allowed to be empty',
            "any.required": `date is a required field`,
          }),
          old_image:Joi.optional()
    })
    return schema.validate(req, { abortEarly: false });
}

module.exports = {
    formValid, 
    editValid  
}