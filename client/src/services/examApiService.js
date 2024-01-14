import instance from "../utils/axiosCustomize";

const user = JSON.parse(localStorage.getItem("user"));
const token = user.token;

const getDataExam = () => {
  return instance.get("/api/test", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const createExam = (data) => {
  return instance.post(
    "/api/test",
    {
      classId: data.classId,
      subject: data.subject,
      test_name: data.test_name,
      description: data.description,
      time: data.time,
      content: data.content,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

const updateExam = (_id, data) => {
  return instance.put(
    `/api/test/update/${_id}`,
    {
      classId: data.classId,
      subject: data.subject,
      test_name: data.test_name,
      description: data.description,
      time: data.time,
      content: data.content,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

const deleteExam = (_id) => {
  return instance.delete(`/api/test/delete/${_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export { getDataExam, createExam, updateExam, deleteExam };
