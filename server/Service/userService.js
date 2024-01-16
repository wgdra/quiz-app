const userModel = require("../models/userModel");

// GET All
const getAllUser = async () => {
  try {
    const result = await userModel.getAllUser();

    return result;
  } catch (error) {
    throw error;
  }
};

// GET One
const getOneUser = async (id) => {
  try {
    const result = await userModel.getOneUser(id);

    return result;
  } catch (error) {
    throw error;
  }
};

// Create
const createUser = async (reqBody) => {
  try {
    const newUser = { ...reqBody };

    const createdUser = await userModel.createUser(newUser);
    const result = await userModel.getUserAfterCreate(createdUser.insertedId);

    return result;
  } catch (error) {
    throw error;
  }
};

// Update
const updateUser = async (id, reqBody) => {
  try {
    const result = await userModel.updateUser(id, reqBody);

    return result;
  } catch (error) {
    throw error;
  }
};
// Change Password
const changePassword = async (id, reqBody) => {
  try {
    const result = await userModel.changePassword(
      id,
      reqBody.oldPassword,
      reqBody.newPassword
    );

    console.log("result", result);
    return result;
  } catch (error) {
    throw error;
  }
};
// Delete
const deleteUser = async (id) => {
  try {
    const result = await userModel.deleteUser(id);

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllUser,
  getOneUser,
  createUser,
  updateUser,
  changePassword,
  deleteUser,
};
