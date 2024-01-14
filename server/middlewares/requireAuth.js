const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { ENV } = require("../config/environment");
const userModel = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "Authorization token require" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, ENV.SECRET);
    req.user = await userModel.getOneUser(_id);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = requireAuth;
