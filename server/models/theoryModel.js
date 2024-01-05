const Joi = require("joi");
const connect = require("../database/connect");
const { ObjectId } = require("mongodb");

// SCHEMA
const COLLECTION_NAME = "theories";
const COLLECTION_SCHEMA = Joi.object({
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
            }).default({})
          )
          .default([]),
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
const getAllTheory = async () => {
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
const getOneTheory = async (id) => {
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
const createTheory = async (reqBody) => {
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
const getTheoryAfterCreate = async (id) => {
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

// UPDATE Theory
const updateTheory = async (id, reqBody) => {
  try {
    const validateReq = await validate(reqBody);

    const _id = { _id: new ObjectId(id) };
    const update = {
      $set: {
        classId: validateReq.classId,
        subject: validateReq.subject,
        chapter: validateReq.chapter,
        theory_name: validateReq.theory_name,
        lessons: validateReq.lessons,
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

// DELETE Theory
const deleteTheory = async (id) => {
  try {
    const deleteTheory = await connect
      .GET_DB()
      .collection(COLLECTION_NAME)
      .deleteOne({ _id: new ObjectId(id) });

    return deleteTheory;
  } catch (error) {
    throw new Error(error);
  }
};

// CREATE Lesson
const createLessonFromTheory = async (theoryId, reqBody) => {
  try {
    const create = {
      lessonId: reqBody.lessonId,
      lesson_title: reqBody.lesson_title,
      lesson_img: reqBody.lesson_img,
      lesson_content: reqBody.lesson_content,
    };

    const createdLesson = await connect
      .GET_DB()
      .collection(COLLECTION_NAME)
      .updateOne(
        { _id: new ObjectId(theoryId) },
        { $push: { lessons: create } },
        { new: true }
      );

    return createdLesson;
  } catch (error) {
    throw new Error(error);
  }
};

// UPDATE Lesson
const updateLessonFromTheory = async (theoryId, reqBody) => {
  try {
    const update = {
      lessonId: reqBody.lessonId,
      lesson_title: reqBody.lesson_title,
      lesson_img: reqBody.lesson_img,
      lesson_content: reqBody.lesson_content,
    };

    const updatedLesson = await connect
      .GET_DB()
      .collection(COLLECTION_NAME)
      .updateOne(
        {
          _id: new ObjectId(theoryId),
          "lessons.lessonId": reqBody.lessonId,
        },
        {
          $set: { "lessons.$": update },
        },
        { new: true }
      );

    return updatedLesson;
  } catch (error) {
    throw new Error(error);
  }
};

// DELETE Question
const deleteLessonFromTheory = async (theoryId, lessonId) => {
  try {
    const deletedLesson = await connect
      .GET_DB()
      .collection(COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(theoryId) },
        { $pull: { lessons: { lessonId: lessonId } } },
        { returnDocument: "after" }
      );
    return deletedLesson;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  COLLECTION_NAME,
  COLLECTION_SCHEMA,
  getAllTheory,
  getOneTheory,
  createTheory,
  getTheoryAfterCreate,
  updateTheory,
  deleteTheory,
  createLessonFromTheory,
  updateLessonFromTheory,
  deleteLessonFromTheory,
};
