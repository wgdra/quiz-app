const chapterModel = require("../models/chapterModel");

// GET All
const getAllChapter = async () => {
  try {
    const result = await chapterModel.getAllChapter();

    return result;
  } catch (error) {
    throw error;
  }
};

// GET One
const getOneChapter = async (id) => {
  try {
    const result = await chapterModel.getOneChapter(id);

    return result;
  } catch (error) {
    throw error;
  }
};

// Create
const createChapter = async (reqBody) => {
  try {
    const newChapter = { ...reqBody };

    const createdChapter = await chapterModel.createChapter(newChapter);
    const result = await chapterModel.getChapterAfterCreate(
      createdChapter.insertedId
    );

    return result;
  } catch (error) {
    throw error;
  }
};

const updateChapter = async (id, reqBody) => {
  try {
    const result = await chapterModel.updateChapter(id, reqBody);

    return result;
  } catch (error) {
    throw error;
  }
};

const deleteChapter = async (id) => {
  try {
    const result = await chapterModel.deleteChapter(id);

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllChapter,
  getOneChapter,
  createChapter,
  updateChapter,
  deleteChapter,
};
