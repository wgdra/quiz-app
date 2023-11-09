const Joi = require("joi");
const connect = require("../database/connect");
const { ObjectId } = require("mongodb");

// SCHEMA
const COLLECTION_NAME = "users";
const COLLECTION_SCHEMA = Joi.object({
  username: Joi.string().required().min(3).max(20).trim().strict(),
  password: Joi.string().required().min(6).max(20),
  full_name: Joi.string().required().min(3).max(20).trim().strict(),
  role: Joi.number().default(1),
  email: Joi.string().email().strict().default(""),
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
const getAllUser = async () => {
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
const getOneUser = async (id) => {
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
const createUser = async (reqBody) => {
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
const getUserAfterCreate = async (id) => {
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
const updateUser = async (id, reqBody) => {
  try {
    const validateReq = await validate(reqBody);

    const _id = { _id: new ObjectId(id) };
    const update = {
      $set: {
        username: validateReq.username,
        password: validateReq.password,
        full_name: validateReq.full_name,
        email: validateReq.email,
        updatedAt: Date.now,
      },
    };

    const updateUser = await connect
      .GET_DB()
      .collection(COLLECTION_NAME)
      .updateOne(_id, update);

    return updateUser;
  } catch (error) {
    throw new Error(error);
  }
};

// DELETE
const deleteUser = async (id) => {
  try {
    const deleteUser = await connect
      .GET_DB()
      .collection(COLLECTION_NAME)
      .deleteOne({ _id: new ObjectId(id) });

    return deleteUser;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  COLLECTION_NAME,
  COLLECTION_SCHEMA,
  getAllUser,
  getOneUser,
  createUser,
  getUserAfterCreate,
  updateUser,
  deleteUser,
};
