const Joi = require("joi");
const connect = require("../database/connect");
const { ObjectId } = require("mongodb");

// SCHEMA
const COLLECTION_NAME = "classes";
const COLLECTION_SCHEMA = Joi.object({
  // classId: Joi.number().required(),
  class_name: Joi.string().required().min(3).max(10).trim().strict(),
  subjects: Joi.array().items(Joi.string().trim()).default([]),
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
      .find({})
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
      .findOne({ _id: new ObjectId(id) });

    return getOne;
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
