const dataModel = require("../models/dataModel");
const { cloneDeep } = require("lodash");

// Get data

const getAllData = async () => {
  try {
    const getAll = await dataModel.getAllData();

    const result = cloneDeep(getAll);

    result.forEach((classes) => {
      classes.subjects.forEach((subject) => {
        subject.methods.forEach((method) => {
          if (method.method !== "Làm bài thi") {
            method.chapters = classes.chapters.filter(
              (chap) =>
                chap.method === method.method &&
                chap.subject === subject.subject_name
            );

            method?.chapters.forEach((chap) => {
              if (chap.method === "Làm trắc nghiệm") {
                chap.quizes = classes.quizes.filter(
                  (quiz) =>
                    quiz.chapter === chap.chapter_name &&
                    quiz.subject === chap.subject
                );
              }

              if (chap.method === "Ôn tập lý thuyết") {
                chap.theories = classes.theories.filter(
                  (theory) =>
                    theory.chapter === chap.chapter_name &&
                    theory.subject === chap.subject
                );
              }
            });
          } else {
            method.set = classes.test.filter(
              (test) => test.subject === subject.subject_name
            );
          }
        });
      });

      delete classes.chapters;
      delete classes.quizes;
      delete classes.theories;
      delete classes.test;
    });

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = { getAllData };
