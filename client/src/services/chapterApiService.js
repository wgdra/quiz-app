import instance from "../utils/axiosCustomize";

const getDataChapter = (token) => {
  return instance.get("/api/chapters", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const createChapter = (data, token) => {
  return instance.post(
    "/api/chapters",
    {
      chapter_name: data.chapter_name,
      classId: data.classId,
      subject: data.subject,
      method: data.method,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

const updateChapter = (_id, data, token) => {
  return instance.put(
    `/api/chapters/update/${_id}`,
    {
      chapter_name: data.chapter_name,
      classId: data.classId,
      subject: data.subject,
      method: data.method,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

const deleteChapter = (_id, token) => {
  return instance.delete(`/api/chapters/delete/${_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export { getDataChapter, createChapter, updateChapter, deleteChapter };
