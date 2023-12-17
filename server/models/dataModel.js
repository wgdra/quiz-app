const { ObjectId } = require("mongodb");
const connect = require("../database/connect");
const classesModel = require("./classesModel");
const subjectModel = require("./subjectModel");
const chapterModel = require("./chapterModel");
const quizModel = require("./quizModel");
const theoryModel = require("./theoryModel");
const testModel = require("./testModel");

// Get data

const getAllData = async () => {
  try {
    const getAllData = await connect
      .GET_DB()
      .collection(classesModel.COLLECTION_NAME)
      .aggregate([
        {
          $lookup: {
            from: subjectModel.COLLECTION_NAME,
            localField: "classId",
            foreignField: "classIds",
            as: "subjects",
          },
        },
        {
          $lookup: {
            from: chapterModel.COLLECTION_NAME,
            localField: "classId",
            foreignField: "classId",
            as: "chapters",
          },
        },
        {
          $lookup: {
            from: quizModel.COLLECTION_NAME,
            localField: "classId",
            foreignField: "classId",
            as: "quizes",
          },
        },
        {
          $lookup: {
            from: theoryModel.COLLECTION_NAME,
            localField: "classId",
            foreignField: "classId",
            as: "theories",
          },
        },
        {
          $lookup: {
            from: testModel.COLLECTION_NAME,
            localField: "classId",
            foreignField: "classId",
            as: "test",
          },
        },
      ])
      .toArray();

    return getAllData;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { getAllData };
