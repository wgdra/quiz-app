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

// Create Lesson
const createLessonFromTheory = async (theoryId, reqBody) => {
  try {
    const result = await theoryModel.createLessonFromTheory(theoryId, reqBody);

    return result;
  } catch (error) {
    throw error;
  }
};

// Update Lesson
const updateLessonFromTheory = async (theoryId, reqBody) => {
  try {
    const result = await theoryModel.updateLessonFromTheory(theoryId, reqBody);

    return result;
  } catch (error) {
    throw error;
  }
};

// Delete Lesson
const deleteLessonFromTheory = async (theoryId, lessonId) => {
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
  createLessonFromTheory,
  updateLessonFromTheory,
  deleteLessonFromTheory,
};
