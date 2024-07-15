// this is for ssv, means server side validation 

// npm install joi           install this to use 

const Joi = require('joi');

const productschema = Joi.object({
    name: Joi.string().required(),
    img:Joi.string().required(),
    desc:Joi.string(),
    price:Joi.string().min(0).required(),

})
const reviewschema = Joi.object({
    rating: Joi.string().min(0).max(5).required(),
    comment: Joi.string().required(),
})

module.exports={productschema, reviewschema};