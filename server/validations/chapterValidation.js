const Joi = require("joi");
const { StatusCodes } = require("http-status-codes");

// Validate Create
const createChapter = async (req, res, next) => {
  const correctCondition = Joi.object({
    chapter_name: Joi.string().required().min(3).trim().strict(),
    classId: Joi.number().required(),
    subject: Joi.string().required().min(3).trim().strict(),
    method: Joi.string().required(),
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

const updateChapter = async (req, res, next) => {
  const correctCondition = Joi.object({
    chapter_name: Joi.string().required().min(3).trim().strict(),
    classId: Joi.number().required(),
    subject: Joi.string().required().min(3).trim().strict(),
    method: Joi.string().required(),
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

module.exports = { createChapter, updateChapter };
