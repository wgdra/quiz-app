const Joi = require("joi");

const correctCondition = Joi.object({
  user_name: Joi.string().required().min(3).max(20).trim().strict(),
  password: Joi.string().required().min(6).max(20),
  full_name: Joi.string().required().min(3).max(20).trim().strict(),
  email: Joi.string().required().email(),
});

module.exports = correctCondition;
