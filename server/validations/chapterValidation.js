const Joi = require("joi");
const { StatusCodes } = require("http-status-codes");

// Validate Create
const createChapter = async (req, res, next) => {
  const correctCondition = Joi.object({
    chapterId: Joi.number().required(),
    chapter_name: Joi.string().required().min(3).trim().strict(),
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

const updateChapter = async (req, res, next) => {
  const correctCondition = Joi.object({
    chapterId: Joi.number().required(),
    chapter_name: Joi.string().required().min(3).trim().strict(),
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

module.exports = { createChapter, updateChapter };
