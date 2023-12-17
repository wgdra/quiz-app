const Joi = require("joi");
const connect = require("../database/connect");
const { ObjectId } = require("mongodb");

// SCHEMA
const COLLECTION_NAME = "test";
const COLLECTION_SCHEMA = Joi.object({
  classId: Joi.number().required(),
  subject: Joi.string().required(),
  test_name: Joi.string().required().trim().strict(),
  test_img: Joi.string().default(""),
  questions: Joi.array()
    .items(
      Joi.object({
        questionId: Joi.number().required(),
        question_name: Joi.string().required().trim(),
        question_img: Joi.string().default(""),
        options: Joi.array().items(Joi.string().trim()).default([]),
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
const getAllTest = async () => {
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
const getOneTest = async (id) => {
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
const createTest = async (reqBody) => {
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
const getTestAfterCreate = async (id) => {
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

// UPDATE Test
const updateTest = async (id, reqBody) => {
  try {
    const validateReq = await validate(reqBody);

    const _id = { _id: new ObjectId(id) };
    const update = {
      $set: {
        classId: validateReq.classId,
        subject: validateReq.subject,
        test_name: validateReq.quiz_name,
        test_img: validateReq.quiz_img,
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

// DELETE Test
const deleteTest = async (id) => {
  try {
    const deleteTest = await connect
      .GET_DB()
      .collection(COLLECTION_NAME)
      .deleteOne({ _id: new ObjectId(id) });

    return deleteTest;
  } catch (error) {
    throw new Error(error);
  }
};

// DELETE Question
const deleteQuestionFromTest = async (quizId, questionId) => {
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
  getAllTest,
  getOneTest,
  createTest,
  getTestAfterCreate,
  updateTest,
  deleteTest,
  deleteQuestionFromTest,
};
