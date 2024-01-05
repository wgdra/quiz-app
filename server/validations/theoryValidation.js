const Joi = require("joi");
const { StatusCodes } = require("http-status-codes");

// Validate Create
const createTheory = async (req, res, next) => {
  const correctCondition = Joi.object({
    classId: Joi.number().required(),
    subject: Joi.string().required(),
    chapter: Joi.string().required(),
    theory_name: Joi.string().required().min(3).max(50).trim().strict(),
    lessons: Joi.array()
      .items(
        Joi.object({
          lessonId: Joi.number().required().default(""),
          lesson_title: Joi.string().required().trim().default(""),
          lesson_img: Joi.string().trim().default(""),
          lesson_content: Joi.array()
            .items(
              Joi.object({
                content: Joi.string().trim(),
                content_img: Joi.string().trim(),
                descriptions: Joi.array().default([]),
                example: Joi.array().default([]),
              })
            )
            .default([]),
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
    classId: Joi.number().required(),
    subject: Joi.string().required(),
    chapter: Joi.string().required(),
    theory_name: Joi.string().required().min(3).max(50).trim().strict(),
    lessons: Joi.array()
      .items(
        Joi.object({
          lessonId: Joi.number().required().default(""),
          lesson_title: Joi.string().required().trim().default(""),
          lesson_img: Joi.string().trim().default(""),
          lesson_content: Joi.array()
            .items(
              Joi.object({
                content: Joi.string().trim(),
                content_img: Joi.string().trim(),
                descriptions: Joi.array().default([]),
                example: Joi.array().default([]),
              })
            )
            .default([]),
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
