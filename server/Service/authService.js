const authModel = require("../models/authModel");

// Login
const loginUser = async (reqBody) => {
  try {
    const login = await authModel.loginUser(reqBody);

    return login;
  } catch (error) {
    throw error;
  }
};

// Signup
const signupUser = async (reqBody) => {
  try {
    const newUser = { ...reqBody };
    const createdUser = await authModel.signupUser(newUser);

    return createdUser;
  } catch (error) {
    throw error;
  }
};

module.exports = { loginUser, signupUser };
