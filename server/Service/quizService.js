const quizModel = require("../models/quizModel");

// GET All
const getAllQuiz = async () => {
  try {
    const result = await quizModel.getAllQuiz();

    return result;
  } catch (error) {
    throw error;
  }
};

// GET One
const getOneQuiz = async (id) => {
  try {
    const result = await quizModel.getOneQuiz(id);

    return result;
  } catch (error) {
    throw error;
  }
};

// Create
const createQuiz = async (reqBody) => {
  try {
    const newQuiz = { ...reqBody };

    const createdQuiz = await quizModel.createQuiz(newQuiz);
    const result = await quizModel.getQuizAfterCreate(createdQuiz.insertedId);

    return result;
  } catch (error) {
    throw error;
  }
};

const updateQuiz = async (id, reqBody) => {
  try {
    const result = await quizModel.updateQuiz(id, reqBody);

    return result;
  } catch (error) {
    throw error;
  }
};

// Delete Quiz
const deleteQuiz = async (id) => {
  try {
    const result = await quizModel.deleteQuiz(id);

    return result;
  } catch (error) {
    throw error;
  }
};

// Delete Question
const deleteQuestionFromQuiz = async (quizId, questionId) => {
  try {
    const result = await quizModel.deleteQuestionFromQuiz(quizId, questionId);

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllQuiz,
  getOneQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  deleteQuestionFromQuiz,
};
