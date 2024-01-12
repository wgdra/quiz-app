const connect = require("../database/connect");
const { COLLECTION_NAME, COLLECTION_SCHEMA } = require("./userModel");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

// Validation
const validate = async (data) => {
  return await COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false,
  });
};

// Login
const loginUser = async (reqBody) => {
  try {
    const validateReq = await validate(reqBody);

    const user = await connect
      .GET_DB()
      .collection(COLLECTION_NAME)
      .findOne({ username: validateReq.username });

    if (!user) {
      throw Error("Tên đăng nhập không tồn tại");
    }
    const match = await bcrypt.compare(validateReq.password, user.password);

    if (!match) {
      throw Error("Mật khẩu chưa chính xác");
    }

    return user;
  } catch (error) {
    throw new Error(error);
  }
};

// Sign up
const signupUser = async (reqBody) => {
  try {
    const validateReq = await validate(reqBody);

    const exists = await connect
      .GET_DB()
      .collection(COLLECTION_NAME)
      .findOne({ username: validateReq.username });

    if (exists) {
      throw Error("Tên đăng nhập đã tồn tại");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(validateReq.password, salt);

    const createNew = {
      username: validateReq.username,
      password: hash,
      full_name: validateReq.full_name,
      role: validateReq.role,
      email: validateReq.email,
      createdAt: validateReq.createdAt,
      updatedAt: validateReq.updatedAt,
    };

    const user = await connect
      .GET_DB()
      .collection(COLLECTION_NAME)
      .insertOne(createNew);

    return user;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  loginUser,
  signupUser,
};
