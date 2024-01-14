const { StatusCodes } = require("http-status-codes");
const authService = require("../Service/authService");
const jwt = require("jsonwebtoken");
const { ENV } = require("../config/environment");

const createToken = (_id) => {
  return jwt.sign({ _id }, ENV.SECRET, { expiresIn: "1d" });
};

// Login
async function loginUser(req, res, next) {
  try {
    const dataUser = await authService.loginUser(req.body);

    const token = createToken(dataUser._id);

    const user = {
      _id: dataUser._id,
      username: dataUser.username,
      full_name: dataUser.full_name,
      role: dataUser.role,
      email: dataUser.email,
      token: token,
    };

    res.status(StatusCodes.OK).json({ status: StatusCodes.OK, data: user });
  } catch (error) {
    next(error);
  }
}

// Signup
async function signupUser(req, res, next) {
  try {
    const createdUser = await authService.signupUser(req.body);
    const token = createToken(createdUser.insertedId);

    res
      .status(StatusCodes.CREATED)
      .json({ status: StatusCodes.CREATED, token: token });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  loginUser,
  signupUser,
};
