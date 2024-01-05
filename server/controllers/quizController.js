const { StatusCodes } = require("http-status-codes");
const quizService = require("../Service/quizService");

// GET ALL
async function getQuiz(req, res, next) {
  try {
    const result = await quizService.getAllQuiz();

    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
}

// GET One
async function getOneQuiz(req, res, next) {
  try {
    const result = await quizService.getOneQuiz(req.params.id);

    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
}

// CREATE
async function createQuiz(req, res, next) {
  try {
    const createdQuiz = await quizService.createQuiz(req.body);
    res
      .status(StatusCodes.CREATED)
      .json({ status: StatusCodes.CREATED, data: createdQuiz });
  } catch (error) {
    next(error);
  }
}

// UPDATE ONE
async function updateQuiz(req, res, next) {
  try {
    const updatedQuiz = await quizService.updateQuiz(req.params.id, req.body);
    res
      .status(StatusCodes.OK)
      .json({ status: StatusCodes.OK, data: updatedQuiz });
  } catch (error) {
    next(error);
  }
}

// DELETE ONE
async function deleteQuiz(req, res, next) {
  try {
    const deletedQuiz = await quizService.deleteQuiz(req.params.id);

    res
      .status(StatusCodes.OK)
      .json({ status: StatusCodes.OK, data: deletedQuiz });
  } catch (error) {
    next();
  }
}
// Create Question
const createQuestionFromQuiz = async (req, res, next) => {
  try {
    const createdQuestion = await quizService.createQuestionFromQuiz(
      req.params.id,
      req.body
    );

    res
      .status(StatusCodes.CREATED)
      .json({ status: StatusCodes.CREATED, data: createdQuestion });
  } catch (error) {
    next();
  }
};

// Update Question
const updateQuestionFromQuiz = async (req, res, next) => {
  try {
    const updatedQuestion = await quizService.updateQuestionFromQuiz(
      req.params.id,
      req.body
    );

    res
      .status(StatusCodes.OK)
      .json({ status: StatusCodes.OK, data: updatedQuestion });
  } catch (error) {
    next();
  }
};

// Delete Question
const deleteQuestionFromQuiz = async (req, res, next) => {
  try {
    const deletedQuestion = await quizService.deleteQuestionFromQuiz(
      req.params.id,
      req.body.questionId
    );

    res
      .status(StatusCodes.OK)
      .json({ status: StatusCodes.OK, data: deletedQuestion });
  } catch (error) {
    next();
  }
};

module.exports = {
  getQuiz,
  getOneQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  createQuestionFromQuiz,
  updateQuestionFromQuiz,
  deleteQuestionFromQuiz,
};
