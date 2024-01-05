import instance from "../utils/axiosCustomize";

const getDataTheory = () => {
  return instance.get("/api/theories");
};

const createTheory = (data) => {
  return instance.post("/api/theories", {
    theory_name: data.theory_name,
    classId: data.classId,
    subject: data.subject,
    chapter: data.chapter,
    lessons: data.lessons,
  });
};

const updateTheory = (_id, data) => {
  return instance.put(`/api/theories/update/${_id}`, {
    theory_name: data.theory_name,
    classId: data.classId,
    subject: data.subject,
    chapter: data.chapter,
    lessons: data.lessons,
  });
};

const deleteTheory = (_id) => {
  return instance.delete(`/api/theories/delete/${_id}`);
};

const createLesson = (_id, data) => {
  return instance.put(`/api/theories/question/create/${_id}`, {
    lessonId: data.lessonId,
    lesson_title: data.lesson_title,
    lesson_img: data.lesson_img,
    lesson_content: data.lesson_content,
  });
};

const updateLesson = (_id, data) => {
  return instance.put(`/api/theories/question/update/${_id}`, {
    lessonId: data.lessonId,
    lesson_title: data.lesson_title,
    lesson_img: data.lesson_img,
    lesson_content: data.lesson_content,
  });
};

const deleteLesson = (_id, lessonId) => {
  return instance.patch(`/api/theories/question/delete/${_id}`, {
    lessonId: lessonId,
  });
};

export {
  getDataTheory,
  createTheory,
  updateTheory,
  deleteTheory,
  createLesson,
  updateLesson,
  deleteLesson,
};
