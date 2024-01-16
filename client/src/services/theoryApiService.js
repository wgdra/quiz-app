import instance from "../utils/axiosCustomize";

const getDataTheory = (token) => {
  return instance.get("/api/theories", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const createTheory = (data, token) => {
  return instance.post(
    "/api/theories",
    {
      theory_name: data.theory_name,
      classId: data.classId,
      subject: data.subject,
      chapter: data.chapter,
      lessons: data.lessons,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

const updateTheory = (_id, data, token) => {
  return instance.put(
    `/api/theories/update/${_id}`,
    {
      theory_name: data.theory_name,
      classId: data.classId,
      subject: data.subject,
      chapter: data.chapter,
      lessons: data.lessons,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

const deleteTheory = (_id, token) => {
  return instance.delete(`/api/theories/delete/${_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const createLesson = (_id, data, token) => {
  return instance.put(
    `/api/theories/lesson/create/${_id}`,
    {
      lessonId: data.lessonId,
      lesson_title: data.lesson_title,
      lesson_img: data.lesson_img,
      lesson_content: data.lesson_content,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

const updateLesson = (_id, data, token) => {
  return instance.put(
    `/api/theories/lesson/update/${_id}`,
    {
      lessonId: data.lessonId,
      lesson_title: data.lesson_title,
      lesson_img: data.lesson_img,
      lesson_content: data.lesson_content,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

const deleteLesson = (_id, lessonId, token) => {
  return instance.patch(
    `/api/theories/lesson/delete/${_id}`,
    {
      lessonId: lessonId,
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
  getDataTheory,
  createTheory,
  updateTheory,
  deleteTheory,
  createLesson,
  updateLesson,
  deleteLesson,
};
