import instance from "../utils/axiosCustomize";

const getDataQuiz = (token) => {
  return instance.get("/api/quizes", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const createQuiz = (data, token) => {
  return instance.post(
    "/api/quizes",
    {
      quiz_name: data.quiz_name,
      classId: data.classId,
      subject: data.subject,
      chapter: data.chapter,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

const updateQuiz = (_id, data, token) => {
  return instance.put(
    `/api/quizes/update/${_id}`,
    {
      quiz_name: data.quiz_name,
      classId: data.classId,
      subject: data.subject,
      chapter: data.chapter,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

const deleteQuiz = (_id, token) => {
  return instance.delete(`/api/quizes/delete/${_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const createQuestion = (_id, data, token) => {
  return instance.put(
    `/api/quizes/question/create/${_id}`,
    {
      questionId: data.questionId,
      question_name: data.question_name,
      question_img: data.question_img,
      options: data.options,
      suggest: data.suggest,
      answer: data.answer,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

const updateQuestion = (_id, data, token) => {
  return instance.put(
    `/api/quizes/question/update/${_id}`,
    {
      questionId: data.questionId,
      question_name: data.question_name,
      question_img: data.question_img,
      options: data.options,
      suggest: data.suggest,
      answer: data.answer,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

const deleteQuestion = (_id, questionId, token) => {
  return instance.patch(
    `/api/quizes/question/delete/${_id}`,
    {
      questionId: questionId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
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
