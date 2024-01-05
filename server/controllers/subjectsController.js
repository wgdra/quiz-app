const { StatusCodes } = require("http-status-codes");
const subjectService = require("../Service/subjectService");

// GET ALL
async function getSubject(req, res, next) {
  try {
    const result = await subjectService.getAllSubject();

    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
}

// GET One
async function getOneSubject(req, res, next) {
  try {
    const result = await subjectService.getOneSubject(req.params.id);

    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
}

// CREATE
async function createSubject(req, res, next) {
  try {
    const createdSubject = await subjectService.createSubject(req.body);
    res
      .status(StatusCodes.CREATED)
      .json({ status: StatusCodes.CREATED, data: createdSubject });
  } catch (error) {
    next(error);
  }
}

// UPDATE ONE
async function updateSubject(req, res, next) {
  try {
    const updatedSubject = await subjectService.updateSubject(
      req.params.id,
      req.body
    );
    res
      .status(StatusCodes.OK)
      .json({ status: StatusCodes.OK, data: updatedSubject });
  } catch (error) {
    next(error);
  }
}

// DELETE ONE
async function deleteSubject(req, res, next) {
  try {
    const deletedSubject = await subjectService.deleteSubject(req.params.id);

    res
      .status(StatusCodes.OK)
      .json({ status: StatusCodes.OK, data: deletedSubject });
  } catch (error) {
    next();
  }
}

module.exports = {
  getSubject,
  getOneSubject,
  createSubject,
  updateSubject,
  deleteSubject,
};
