const subjectModel = require("../models/subjectModel");

// GET All
const getAllSubject = async () => {
  try {
    const result = await subjectModel.getAllSubject();

    return result;
  } catch (error) {
    throw error;
  }
};

// GET One
const getOneSubject = async (id) => {
  try {
    const result = await subjectModel.getOneSubject(id);

    return result;
  } catch (error) {
    throw error;
  }
};

// Create
const createSubject = async (reqBody) => {
  try {
    const newClass = { ...reqBody };

    const createdSubject = await subjectModel.createSubject(newClass);
    const result = await subjectModel.getSubjectAfterCreate(
      createdSubject.insertedId
    );

    return result;
  } catch (error) {
    throw error;
  }
};

// Update
const updateSubject = async (id, reqBody) => {
  try {
    const result = await subjectModel.updateSubject(id, reqBody);

    return result;
  } catch (error) {
    throw error;
  }
};

// Delete
const deleteSubject = async (id) => {
  try {
    const result = await subjectModel.deleteSubject(id);

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllSubject,
  getOneSubject,
  createSubject,
  updateSubject,
  deleteSubject,
};
