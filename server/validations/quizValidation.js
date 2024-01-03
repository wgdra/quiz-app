const Joi = require("joi");
const { StatusCodes } = require("http-status-codes");

// Validate Create
const createQuiz = async (req, res, next) => {
  const correctCondition = Joi.object({
    classId: Joi.number().required().default(""),
    subject: Joi.string().required().default(""),
    chapter: Joi.string().required().default(""),
    quiz_name: Joi.string().required().trim().strict().default(""),
    quiz_img: Joi.string().default(""),
    questions: Joi.array()
      .items(
        Joi.object({
          questionId: Joi.number().required().default(""),
          question_name: Joi.string().required().trim().default(""),
          question_img: Joi.string().default(""),
          options: Joi.array().items(Joi.string().trim()).default([]),
          suggest: Joi.string().default(""),
          answer: Joi.number().required().default(""),
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
    classId: Joi.number().required().default(""),
    subject: Joi.string().required().default(""),
    chapter: Joi.string().required().default(""),
    quiz_name: Joi.string().required().trim().strict().default(""),
    quiz_img: Joi.string().default(""),
    questions: Joi.array()
      .items(
        Joi.object({
          questionId: Joi.number().required().default(""),
          question_name: Joi.string().required().trim().default(""),
          question_img: Joi.string().default(""),
          options: Joi.array().items(Joi.string().trim()).default([]),
          suggest: Joi.string().default(""),
          answer: Joi.number().required().default(""),
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
