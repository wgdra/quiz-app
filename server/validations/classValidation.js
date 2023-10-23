const Joi = require("joi");
const { StatusCodes } = require("http-status-codes");

// Validate Create
const createClass = async (req, res, next) => {
  const correctCondition = Joi.object({
    classId: Joi.number().required(),
    class_name: Joi.string().required().min(3).max(20).trim().strict(),
    subjectIds: Joi.array().items(Joi.number()).default([]),
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

const updateClass = async (req, res, next) => {
  const correctCondition = Joi.object({
    classId: Joi.number().required(),
    class_name: Joi.string().required().min(3).max(20).trim().strict(),
    subjectIds: Joi.array().items(Joi.number()).default([]),
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

module.exports = { createClass, updateClass };
