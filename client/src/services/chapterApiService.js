import instance from "../utils/axiosCustomize";

const getDataChapter = () => {
  return instance.get("/api/chapters");
};

const createChapter = (data) => {
  return instance.post("/api/chapters", {
    chapter_name: data.chapter_name,
    classId: data.classId,
    subject: data.subject,
    method: data.method,
  });
};

const updateChapter = (_id, data) => {
  return instance.put(`/api/chapters/update/${_id}`, {
    chapter_name: data.chapter_name,
    classId: data.classId,
    subject: data.subject,
    method: data.method,
  });
};

const deleteChapter = (_id) => {
  return instance.delete(`/api/chapters/delete/${_id}`);
};

export { getDataChapter, createChapter, updateChapter, deleteChapter };
