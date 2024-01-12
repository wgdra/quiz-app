const Joi = require("joi");
const { StatusCodes } = require("http-status-codes");

// Validate Create
const createUser = async (req, res, next) => {
  const correctCondition = Joi.object({
    username: Joi.string().required().min(3).max(20).trim().strict(),
    password: Joi.string().required().min(6).max(20),
    full_name: Joi.string().min(3).max(20).trim().strict().default(""),
    role: Joi.number().default(1),
    email: Joi.string().email().strict().default(""),
  });

  try {
    await correctCondition.validateAsync(req.body, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(error.message);
  }
};

const updateUser = async (req, res, next) => {
  const correctCondition = Joi.object({
    username: Joi.string().required().min(3).max(20).trim().strict(),
    password: Joi.string().required().min(6).max(20),
    full_name: Joi.string().min(3).max(20).trim().strict().default(""),
    role: Joi.number().default(1),
    email: Joi.string().email().strict().default(""),
  });

  try {
    await correctCondition.validateAsync(req.body, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(error.message);
  }
};

module.exports = { createUser, updateUser };
