const Joi = require("joi");
const connect = require("../database/connect");
const { ObjectId } = require("mongodb");

// SCHEMA
const COLLECTION_NAME = "quizes";
const COLLECTION_SCHEMA = Joi.object({
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
  createdAt: Joi.date().default(Date.now),
  updatedAt: Joi.date().default(null),
});

// Validation
const validate = async (data) => {
  return await COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false,
  });
};

// GET ALL
const getAllQuiz = async () => {
  try {
    const getAll = await connect
      .GET_DB()
      .collection(COLLECTION_NAME)
      .find({})
      .toArray();
    return getAll;
  } catch (error) {
    throw new Error(error);
  }
};

// GET ONE
const getOneQuiz = async (id) => {
  try {
    const getOne = await connect
      .GET_DB()
      .collection(COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) });

    return getOne;
  } catch (error) {
    throw new Error(error);
  }
};

// CREATE
const createQuiz = async (reqBody) => {
  try {
    const validateReq = await validate(reqBody);
    const createNew = await connect
      .GET_DB()
      .collection(COLLECTION_NAME)
      .insertOne(validateReq);
    return createNew;
  } catch (error) {
    throw new Error(error);
  }
};

// Find One After Create
const getQuizAfterCreate = async (id) => {
  try {
    const result = await connect
      .GET_DB()
      .collection(COLLECTION_NAME)
      .findOne({ _id: id });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

// UPDATE Quiz
const updateQuiz = async (id, reqBody) => {
  try {
    const validateReq = await validate(reqBody);

    const _id = { _id: new ObjectId(id) };
    const update = {
      $set: {
        quizId: validateReq.quizId,
        quiz_name: validateReq.quiz_name,
        quiz_img: validateReq.quiz_img,
        // subjectIds: validateReq.subjectIds,
        quiz: validateReq.quiz,
      },
    };

    const result = await connect
      .GET_DB()
      .collection(COLLECTION_NAME)
      .updateOne(_id, update);

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

// UPDATE Question

// DELETE Quiz
const deleteQuiz = async (id) => {
  try {
    const deleteQuiz = await connect
      .GET_DB()
      .collection(COLLECTION_NAME)
      .deleteOne({ _id: new ObjectId(id) });

    return deleteQuiz;
  } catch (error) {
    throw new Error(error);
  }
};

// DELETE Question
const deleteQuestionFromQuiz = async (quizId, questionId) => {
  try {
    const deletedQuestion = await connect
      .GET_DB()
      .collection(COLLECTION_NAME)
      .updateOne(
        { quizId: new ObjectId(quizId) },
        { $pull: { quiz: { questionId: questionId } } },
        { new: true }
      );

    return deletedQuestion;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  COLLECTION_NAME,
  COLLECTION_SCHEMA,
  getAllQuiz,
  getOneQuiz,
  createQuiz,
  getQuizAfterCreate,
  updateQuiz,
  deleteQuiz,
  deleteQuestionFromQuiz,
};
