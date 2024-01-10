const Joi = require("joi");
const { StatusCodes } = require("http-status-codes");

// Validate Create
const createTest = async (req, res, next) => {
  const correctCondition = Joi.object({
    classId: Joi.number().required(),
    subject: Joi.string().required(),
    test_name: Joi.string().required().trim().strict(),
    description: Joi.string().default(""),
    content: Joi.array()
      .items(
        Joi.object({
          title: Joi.string().required().trim(),
          questions: Joi.array().items(Joi.object()).default([]),
          answer: Joi.array().items(Joi.number()).default([]),
        })
      )
      .default([]),
    time: Joi.number().default(""),
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

const updateTest = async (req, res, next) => {
  const correctCondition = Joi.object({
    classId: Joi.number().required(),
    subject: Joi.string().required(),
    test_name: Joi.string().required().trim(),
    description: Joi.string().default(""),
    content: Joi.array()
      .items(
        Joi.object({
          title: Joi.string().required().trim(),
          questions: Joi.array().items(Joi.object()).default([]),
          answer: Joi.array().items(Joi.number()).default([]),
        })
      )
      .default([]),
    time: Joi.number().required(),
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

module.exports = { createTest, updateTest };
