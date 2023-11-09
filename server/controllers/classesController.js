const { StatusCodes } = require("http-status-codes");
const classService = require("../Service/classService");

// GET ALL
async function getClass(req, res, next) {
  try {
    const result = await classService.getAllClass();

    res.status(StatusCodes.OK).json({ status: StatusCodes.OK, data: result });
  } catch (error) {
    next(error);
  }
}

// GET One
async function getOneClass(req, res, next) {
  try {
    const result = await classService.getOneClass(req.params.id);

    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
}

// CREATE
async function createClass(req, res, next) {
  try {
    const createdClass = await classService.createClass(req.body);
    res.status(StatusCodes.CREATED).json(createdClass);
  } catch (error) {
    next(error);
  }
}

// UPDATE ONE
async function updateClass(req, res, next) {
  try {
    const updatedClass = await classService.updateClass(
      req.params.id,
      req.body
    );
    res.status(StatusCodes.OK).json(updatedClass);
  } catch (error) {
    next(error);
  }
}

// DELETE ONE
async function deleteClass(req, res, next) {
  try {
    const deletedClass = await classService.deleteClass(req.params.id);

    res.status(StatusCodes.OK).json(deletedClass);
  } catch (error) {
    next();
  }
}

module.exports = {
  getClass,
  getOneClass,
  createClass,
  updateClass,
  deleteClass,
};
