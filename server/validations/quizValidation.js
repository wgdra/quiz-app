const Joi = require("joi");
const { StatusCodes } = require("http-status-codes");

// Validate Create
const createQuiz = async (req, res, next) => {
  const correctCondition = Joi.object({
    quizId: Joi.number().required(),
    quiz_name: Joi.string().required().trim().strict(),
    quiz_img: Joi.string().default(""),
    // chapterId: Joi.number().default(),
    quiz: Joi.array()
      .items(
        Joi.object({
          questionId: Joi.number().required(),
          question_name: Joi.string().required().trim(),
          question_img: Joi.string().default(""),
          options: Joi.array().items(Joi.string().trim()).default([]),
          suggest: Joi.string().default(""),
          answer: Joi.number().required(),
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

const updateQuiz = async (req, res, next) => {
  const correctCondition = Joi.object({
    quizId: Joi.number().required(),
    quiz_name: Joi.string().required().trim().strict(),
    quiz_img: Joi.string().default(""),
    // chapterId: Joi.number().default(),
    quiz: Joi.array()
      .items(
        Joi.object({
          questionId: Joi.number().required(),
          question_name: Joi.string().required().trim(),
          question_img: Joi.string().default(""),
          options: Joi.array().items(Joi.string().trim()).default([]),
          suggest: Joi.string().default(""),
          answer: Joi.number().required(),
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

module.exports = { createQuiz, updateQuiz };
