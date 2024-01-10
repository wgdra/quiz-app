const testModel = require("../models/testModel");

// GET All
const getAllTest = async () => {
  try {
    const result = await testModel.getAllTest();

    return result;
  } catch (error) {
    throw error;
  }
};

// GET One
const getOneTest = async (id) => {
  try {
    const result = await testModel.getOneTest(id);

    return result;
  } catch (error) {
    throw error;
  }
};

// Create
const createTest = async (reqBody) => {
  try {
    const newTest = { ...reqBody };

    const createdTest = await testModel.createTest(newTest);
    const result = await testModel.getTestAfterCreate(createdTest.insertedId);

    return result;
  } catch (error) {
    throw error;
  }
};

const updateTest = async (id, reqBody) => {
  try {
    const result = await testModel.updateTest(id, reqBody);

    return result;
  } catch (error) {
    throw error;
  }
};

// Delete Test
const deleteTest = async (id) => {
  try {
    const result = await testModel.deleteTest(id);

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllTest,
  getOneTest,
  createTest,
  updateTest,
  deleteTest,
};
