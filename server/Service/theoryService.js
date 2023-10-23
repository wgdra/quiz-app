const theoryModel = require("../models/theoryModel");

// GET All
const getAllTheory = async () => {
  try {
    const result = await theoryModel.getAllTheory();

    return result;
  } catch (error) {
    throw error;
  }
};

// GET One
const getOneTheory = async (id) => {
  try {
    const result = await theoryModel.getOneTheory(id);

    return result;
  } catch (error) {
    throw error;
  }
};

// Create
const createTheory = async (reqBody) => {
  try {
    const newTheory = { ...reqBody };

    const createdTheory = await theoryModel.createTheory(newTheory);
    const result = await theoryModel.getTheoryAfterCreate(
      createdTheory.insertedId
    );

    return result;
  } catch (error) {
    throw error;
  }
};

const updateTheory = async (id, reqBody) => {
  try {
    const result = await theoryModel.updateTheory(id, reqBody);

    return result;
  } catch (error) {
    throw error;
  }
};

// Delete Theory
const deleteTheory = async (id) => {
  try {
    const result = await theoryModel.deleteTheory(id);

    return result;
  } catch (error) {
    throw error;
  }
};

// Delete Question
const deleteLessonFromTheory = async (theoryId, questionId) => {
  try {
    const result = await theoryModel.deleteLessonFromTheory(theoryId, lessonId);

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllTheory,
  getOneTheory,
  createTheory,
  updateTheory,
  deleteTheory,
  deleteLessonFromTheory,
};
