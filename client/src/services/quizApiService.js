import instance from "../utils/axiosCustomize";

const getDataQuiz = () => {
  return instance.get("/api/quizes");
};

const createQuiz = (data) => {
  return instance.post("/api/quizes", {
    quiz_name: data.quiz_name,
    classId: data.classId,
    subject: data.subject,
    chapter: data.chapter,
  });
};

const updateQuiz = (_id, data) => {
  return instance.put(`/api/quizes/update/${_id}`, {
    quiz_name: data.quiz_name,
    classId: data.classId,
    subject: data.subject,
    chapter: data.chapter,
  });
};

const deleteQuiz = (_id) => {
  return instance.delete(`/api/quizes/delete/${_id}`);
};

const createQuestion = (_id, data) => {
  return instance.put(`/api/quizes/question/create/${_id}`, {
    questionId: data.questionId,
    question_name: data.question_name,
    question_img: data.question_img,
    options: data.options,
    suggest: data.suggest,
    answer: data.answer,
  });
};

const updateQuestion = (_id, data) => {
  return instance.put(`/api/quizes/question/update/${_id}`, {
    questionId: data.questionId,
    question_name: data.question_name,
    question_img: data.question_img,
    options: data.options,
    suggest: data.suggest,
    answer: data.answer,
  });
};

const deleteQuestion = (_id, questionId) => {
  return instance.patch(`/api/quizes/question/delete/${_id}`, {
    questionId: questionId,
  });
};

export {
  getDataQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};
