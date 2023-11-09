const classModel = require("../models/classesModel");
const { cloneDeep } = require("lodash");

// GET All
const getAllClass = async () => {
  try {
    const getAll = await classModel.getAllClass();

    const result = cloneDeep(getAll);

    result.forEach((classes) => {
      classes.subjects.forEach((subject) => {
        subject.chapter = classes.chapter.filter(
          (chap) => chap.subjects === subject.subject_name
        );
        subject.chapter.forEach(
          (chapter) =>
            (chapter.quiz = classes.quizIds.filter(
              (quiz) =>
                quiz.subject === subject.subject_name &&
                quiz.chapter === chapter.chapter_name
            ))
        );
      });

      delete classes.chapter;
      delete classes.quizIds;
    });

    return result;
  } catch (error) {
    throw error;
  }
};

// GET One
const getOneClass = async (id) => {
  try {
    const getOne = await classModel.getOneClass(id);

    const result = cloneDeep(getOne);

    result.subjects.forEach((subject) => {
      subject.chapter = result.chapter.filter(
        (chap) => chap.subjects === subject.subject_name
      );
      subject.chapter.forEach(
        (chapter) =>
          (chapter.quizes = result.quizIds.filter(
            (quiz) =>
              quiz.subject === subject.subject_name &&
              quiz.chapter === chapter.chapter_name
          ))
      );
    });

    delete result.chapter;
    delete result.quizIds;

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
