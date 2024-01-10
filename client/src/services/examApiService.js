import instance from "../utils/axiosCustomize";

const getDataExam = () => {
  return instance.get("/api/test");
};

const createExam = (data) => {
  return instance.post("/api/test", {
    classId: data.classId,
    subject: data.subject,
    test_name: data.test_name,
    description: data.description,
    time: data.time,
    content: data.content,
  });
};

const updateExam = (_id, data) => {
  return instance.put(`/api/test/update/${_id}`, {
    classId: data.classId,
    subject: data.subject,
    test_name: data.test_name,
    description: data.description,
    time: data.time,
    content: data.content,
  });
};

const deleteExam = (_id) => {
  return instance.delete(`/api/test/delete/${_id}`);
};

export { getDataExam, createExam, updateExam, deleteExam };
