const { StatusCodes } = require("http-status-codes");
const testService = require("../Service/testService");

// GET ALL
async function getTest(req, res, next) {
  try {
    const result = await testService.getAllTest();

    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
}

// GET One
async function getOneTest(req, res, next) {
  try {
    const result = await testService.getOneTest(req.params.id);

    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
}

// CREATE
async function createTest(req, res, next) {
  try {
    const createdTest = await testService.createTest(req.body);
    res
      .status(StatusCodes.CREATED)
      .json({ status: StatusCodes.CREATED, data: createdTest });
  } catch (error) {
    next(error);
  }
}

// UPDATE ONE
async function updateTest(req, res, next) {
  try {
    const updatedTest = await testService.updateTest(req.params.id, req.body);
    res
      .status(StatusCodes.OK)
      .json({ status: StatusCodes.OK, data: updatedTest });
  } catch (error) {
    next(error);
  }
}

// DELETE ONE
async function deleteTest(req, res, next) {
  try {
    const deletedTest = await testService.deleteTest(req.params.id);

    res
      .status(StatusCodes.OK)
      .json({ status: StatusCodes.OK, data: deletedTest });
  } catch (error) {
    next();
  }
}

module.exports = {
  getTest,
  getOneTest,
  createTest,
  updateTest,
  deleteTest,
};
