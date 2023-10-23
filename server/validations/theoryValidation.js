const Joi = require("joi");
const { StatusCodes } = require("http-status-codes");

// Validate Create
const createTheory = async (req, res, next) => {
  const correctCondition = Joi.object({
    theoryId: Joi.number().required(),
    theory_name: Joi.string().required().min(3).max(50).trim().strict(),
    // chapterId: Joi.number().default(),
    lessons: Joi.array()
      .items(
        Joi.object({
          lessonId: Joi.number().required(),
          lesson_title: Joi.string().required().trim(),
          lesson_content: Joi.string(),
          lesson_img: Joi.string().default(""),
        })
      )
      .default([]),
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

const updateTheory = async (req, res, next) => {
  const correctCondition = Joi.object({
    theoryId: Joi.number().required(),
    theory_name: Joi.string().required().min(3).max(50).trim().strict(),
    // chapterId: Joi.number().default(),
    lessons: Joi.array()
      .items(
        Joi.object({
          lessonId: Joi.number().required(),
          lesson_title: Joi.string().required().trim(),
          lesson_content: Joi.string(),
          lesson_img: Joi.string().default(""),
        })
      )
      .default([]),
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

module.exports = { createTheory, updateTheory };
