'use strict';

const Joi = require('joi');


const authScema=Joi.object().keys({
    email: Joi.string().email().required,
    password: Joi.string().required();
})
module.exports={
};