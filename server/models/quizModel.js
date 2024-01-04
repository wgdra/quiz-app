const Joi = require("joi");
const connect = require("../database/connect");
const { ObjectId } = require("mongodb");

// SCHEMA
const COLLECTION_NAME = "quizes";
const COLLECTION_SCHEMA = Joi.object({
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
        classId: validateReq.classId,
        subject: validateReq.subject,
        chapter: validateReq.chapter,
        quiz_name: validateReq.quiz_name,
        quiz_img: validateReq.quiz_img,
        questions: validateReq.questions,
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

// CREATE Question
const createQuestionFromQuiz = async (quizId, reqBody) => {
  try {
    const create = {
      questionId: reqBody.questionId,
      question_name: reqBody.question_name,
      question_img: reqBody.question_img,
      options: reqBody.options,
      suggest: reqBody.suggest,
      answer: reqBody.answer,
    };

    const createQuestion = await connect
      .GET_DB()
      .collection(COLLECTION_NAME)
      .updateOne(
        { _id: new ObjectId(quizId) },
        { $push: { questions: create } },
        { new: true }
      );

    return createQuestion;
  } catch (error) {
    throw new Error(error);
  }
};

// UPDATE Question
const updateQuestionFromQuiz = async (quizId, reqBody) => {
  try {
    const update = {
      questionId: reqBody.questionId,
      question_name: reqBody.question_name,
      question_img: reqBody.question_img,
      options: reqBody.options,
      suggest: reqBody.suggest,
      answer: reqBody.answer,
    };

    const updateQuestion = await connect
      .GET_DB()
      .collection(COLLECTION_NAME)
      .updateOne(
        {
          _id: new ObjectId(quizId),
          "questions.questionId": reqBody.questionId,
        },
        {
          $set: { "questions.$": update },
        },
        { new: true }
      );

    return updateQuestion;
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
      .findOneAndUpdate(
        { _id: new ObjectId(quizId) },
        { $pull: { questions: { questionId: questionId } } },
        { returnDocument: "after" }
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
  createQuestionFromQuiz,
  updateQuestionFromQuiz,
  deleteQuestionFromQuiz,
};
