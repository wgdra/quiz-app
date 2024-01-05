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
    res
      .status(StatusCodes.CREATED)
      .json({ status: StatusCodes.CREATED, data: createdTheory });
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
    res
      .status(StatusCodes.OK)
      .json({ status: StatusCodes.OK, data: updatedTheory });
  } catch (error) {
    next(error);
  }
}

// DELETE ONE
async function deleteTheory(req, res, next) {
  try {
    const deletedTheory = await theoryService.deleteTheory(req.params.id);

    res
      .status(StatusCodes.OK)
      .json({ status: StatusCodes.OK, data: deletedTheory });
  } catch (error) {
    next();
  }
}

// Create Lesson
const createLessonFromTheory = async (req, res, next) => {
  try {
    const createdLesson = await theoryService.createLessonFromTheory(
      req.params.id,
      req.body
    );

    res
      .status(StatusCodes.CREATED)
      .json({ status: StatusCodes.CREATED, data: createdLesson });
  } catch (error) {
    next();
  }
};

// Update Lesson
const updateLessonFromTheory = async (req, res, next) => {
  try {
    const updatedLesson = await theoryService.updateLessonFromTheory(
      req.params.id,
      req.body
    );

    res
      .status(StatusCodes.OK)
      .json({ status: StatusCodes.OK, data: updatedLesson });
  } catch (error) {
    next();
  }
};

// Delete Lesson
const deleteLessonFromTheory = async (req, res, next) => {
  try {
    const deletedLesson = await theoryService.deleteLessonFromTheory(
      req.params.id,
      req.body.lessonId
    );

    res
      .status(StatusCodes.OK)
      .json({ status: StatusCodes.OK, data: deletedLesson });
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
  createLessonFromTheory,
  updateLessonFromTheory,
  deleteLessonFromTheory,
};
