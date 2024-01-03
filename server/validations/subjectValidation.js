const Joi = require("joi");
const { StatusCodes } = require("http-status-codes");

// Validate Create
const createSubject = async (req, res, next) => {
  const correctCondition = Joi.object({
    classIds: Joi.array().items(Joi.number()).default([]),
    subject_name: Joi.string().required().min(3).max(20).trim().strict(),
    methods: Joi.array().items(Joi.object().default({})).default([]),
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

const updateSubject = async (req, res, next) => {
  const correctCondition = Joi.object({
    classIds: Joi.array().items(Joi.number()).default([]),
    subject_name: Joi.string().required().min(3).max(20).trim().strict(),
    methods: Joi.array().items(Joi.object().default({})).default([]),
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

module.exports = { createSubject, updateSubject };
