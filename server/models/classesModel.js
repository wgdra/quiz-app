const Joi = require("joi");
const connect = require("../database/connect");
const { ObjectId } = require("mongodb");
const subjectModel = require("./subjectModel");
const chapterModel = require("./chapterModel");
const quizModel = require("./quizModel");

// SCHEMA
const COLLECTION_NAME = "classes";
const COLLECTION_SCHEMA = Joi.object({
  classId: Joi.number().required(),
  class_name: Joi.string().required().min(3).max(10).trim().strict(),
  subjects: Joi.array().items(Joi.string().trim()).default([]),
  chapter: Joi.array().items(Joi.string().trim()).default([]),
  quizIds: Joi.array().items(Joi.number()).default([]),
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
const getAllClass = async () => {
  try {
    const getAll = await connect
      .GET_DB()
      .collection(COLLECTION_NAME)
      // .find({})
      // .toArray();
      .aggregate([
        {
          $lookup: {
            from: subjectModel.COLLECTION_NAME,
            localField: "classId",
            foreignField: "classIds",
            as: "subjects",
          },
        },
        {
          $lookup: {
            from: chapterModel.COLLECTION_NAME,
            localField: "chapter",
            foreignField: "chapter_name",
            as: "chapter",
          },
        },
        {
          $lookup: {
            from: quizModel.COLLECTION_NAME,
            localField: "classId",
            foreignField: "classId",
            as: "quizIds",
          },
        },
      ])
      .toArray();

    return getAll;
  } catch (error) {
    throw new Error(error);
  }
};

// GET ONE
const getOneClass = async (id) => {
  try {
    const getOne = await connect
      .GET_DB()
      .collection(COLLECTION_NAME)
      // .findOne({ _id: new ObjectId(id) });
      .aggregate([
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
        {
          $lookup: {
            from: subjectModel.COLLECTION_NAME,
            localField: "classId",
            foreignField: "classIds",
            as: "subjects",
          },
        },
        {
          $lookup: {
            from: chapterModel.COLLECTION_NAME,
            localField: "chapter",
            foreignField: "chapter_name",
            as: "chapter",
          },
        },
        {
          $lookup: {
            from: quizModel.COLLECTION_NAME,
            localField: "classId",
            foreignField: "classId",
            as: "quizIds",
          },
        },
      ])
      .toArray();

    return getOne[0];
  } catch (error) {
    throw new Error(error);
  }
};

// CREATE
const createClass = async (reqBody) => {
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
const getClassAfterCreate = async (id) => {
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

// UPDATE
const updateClass = async (id, reqBody) => {
  try {
    const validateReq = await validate(reqBody);

    const _id = { _id: new ObjectId(id) };
    const update = {
      $set: {
        classId: validateReq.classId,
        class_name: validateReq.class_name,
        subjects: validateReq.subjects,
        chapter: validateReq.chapter,
        quizIds: validateReq.quizIds,
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

// DELETE
const deleteClass = async (id) => {
  try {
    const deleteClass = await connect
      .GET_DB()
      .collection(COLLECTION_NAME)
      .deleteOne({ _id: new ObjectId(id) });

    return deleteClass;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  COLLECTION_NAME,
  COLLECTION_SCHEMA,
  getAllClass,
  getOneClass,
  createClass,
  getClassAfterCreate,
  updateClass,
  deleteClass,
};
