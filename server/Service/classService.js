const classModel = require("../models/classesModel");

// GET All
const getAllClass = async () => {
  try {
    const result = await classModel.getAllClass();

    return result;
  } catch (error) {
    throw error;
  }
};

// GET One
const getOneClass = async (id) => {
  try {
    const result = await classModel.getOneClass(id);

    return result;
  } catch (error) {
    throw error;
  }
};

// Create
const createClass = async (reqBody) => {
  try {
    const newClass = { ...reqBody };

    const createdClass = await classModel.createClass(newClass);
    const result = await classModel.getClassAfterCreate(
      createdClass.insertedId
    );

    return result;
  } catch (error) {
    throw error;
  }
};

const updateClass = async (id, reqBody) => {
  try {
    const result = await classModel.updateClass(id, reqBody);

    return result;
  } catch (error) {
    throw error;
  }
};

const deleteClass = async (id) => {
  try {
    const result = await classModel.deleteClass(id);

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllClass,
  getOneClass,
  createClass,
  updateClass,
  deleteClass,
};
