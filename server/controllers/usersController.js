const { StatusCodes } = require("http-status-codes");
const userService = require("../Service/userService");

// GET ALL
async function getUser(req, res, next) {
  try {
    const result = await userService.getAllUser();

    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
}

// GET One
async function getOneUser(req, res, next) {
  try {
    const result = await userService.getOneUser(req.params.id);

    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
}

// CREATE
async function createUser(req, res, next) {
  try {
    const createdUser = await userService.createUser(req.body);
    res.status(StatusCodes.CREATED).json(createdUser);
  } catch (error) {
    next(error);
  }
}

// UPDATE ONE
async function updateUser(req, res, next) {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    res.status(StatusCodes.OK).json(updatedUser);
  } catch (error) {
    next(error);
  }
}

// DELETE ONE
async function deleteUser(req, res, next) {
  try {
    const deletedUser = await userService.deleteUser(req.params.id);

    res.status(StatusCodes.OK).json(deletedUser);
  } catch (error) {
    next();
  }
}

module.exports = {
  getUser,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};
