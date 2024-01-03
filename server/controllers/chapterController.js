const { StatusCodes } = require("http-status-codes");
const chapterService = require("../Service/chapterService");

// GET ALL
async function getChapter(req, res, next) {
  try {
    const result = await chapterService.getAllChapter();

    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
}

// GET One
async function getOneChapter(req, res, next) {
  try {
    const result = await chapterService.getOneChapter(req.params.id);

    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
}

// CREATE
async function createChapter(req, res, next) {
  try {
    const createdChapter = await chapterService.createChapter(req.body);
    res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      data: createdChapter,
    });
  } catch (error) {
    next(error);
  }
}

// UPDATE ONE
async function updateChapter(req, res, next) {
  try {
    const updatedChapter = await chapterService.updateChapter(
      req.params.id,
      req.body
    );
    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: updatedChapter,
    });
  } catch (error) {
    next(error);
  }
}

// DELETE ONE
async function deleteChapter(req, res, next) {
  try {
    const deletedChapter = await chapterService.deleteChapter(req.params.id);

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: deletedChapter,
    });
  } catch (error) {
    next();
  }
}

module.exports = {
  getChapter,
  getOneChapter,
  createChapter,
  updateChapter,
  deleteChapter,
};
