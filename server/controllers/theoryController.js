const { StatusCodes } = require("http-status-codes");
const theoryService = require("../Service/theoryService");

// GET ALL
async function getTheory(req, res, next) {
  try {
    const result = await theoryService.getAllTheory();

    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
}

// GET One
async function getOneTheory(req, res, next) {
  try {
    const result = await theoryService.getOneTheory(req.params.id);

    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
}

// CREATE
async function createTheory(req, res, next) {
  try {
    const createdTheory = await theoryService.createTheory(req.body);
    res.status(StatusCodes.CREATED).json(createdTheory);
  } catch (error) {
    next(error);
  }
}

// UPDATE ONE
async function updateTheory(req, res, next) {
  try {
    const updatedTheory = await theoryService.updateTheory(
      req.params.id,
      req.body
    );
    res.status(StatusCodes.OK).json(updatedTheory);
  } catch (error) {
    next(error);
  }
}

// DELETE ONE
async function deleteTheory(req, res, next) {
  try {
    const deletedTheory = await theoryService.deleteTheory(req.params.id);

    res.status(StatusCodes.OK).json(deletedTheory);
  } catch (error) {
    next();
  }
}

// Delete Lesson
const deleteLessonFromTheory = async (req, res, next) => {
  try {
    const deletedLesson = await theoryService.deleteLessonFromTheory(
      req.params.id,
      req.body.lessonId
    );

    res.status(StatusCodes.OK).json(deletedLesson);
  } catch (error) {
    next();
  }
};

module.exports = {
  getTheory,
  getOneTheory,
  createTheory,
  updateTheory,
  deleteTheory,
  deleteLessonFromTheory,
};
