const Joi = require("joi");
const connect = require("../database/connect");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

// SCHEMA
const COLLECTION_NAME = "users";
const COLLECTION_SCHEMA = Joi.object({
  username: Joi.string().min(3).max(20).trim().strict(),
  password: Joi.string().min(6).max(20),
  full_name: Joi.string().min(3).max(20).trim().strict().default(""),
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
        full_name: validateReq.full_name,
        email: validateReq.email,
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

// Change Password
const changePassword = async (id, oldPassword, newPassword) => {
  try {
    const user = await connect
      .GET_DB()
      .collection(COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) });

    const match = await bcrypt.compare(oldPassword, user.password);

    if (!match) {
      throw Error("Mật khẩu chưa chính xác");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

    const updatePassword = await connect
      .GET_DB()
      .collection(COLLECTION_NAME)
      .updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            password: hash,
          },
        }
      );

    return updatePassword;
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
  changePassword,
  deleteUser,
};
