import instance from "../utils/axiosCustomize";

const getDataSubject = () => {
  return instance.get("/api/subjects");
};

const createSubject = (data) => {
  return instance.post("/api/subjects", {
    classIds: data.classIds,
    subject_name: data.subject_name,
    methods: data.methods,
  });
};

const updateSubject = (_id, data) => {
  return instance.put(`/api/subjects/update/${_id}`, {
    classIds: data.classIds,
    subject_name: data.subject_name,
    methods: data.methods,
  });
};

const deleteSubject = (_id) => {
  return instance.delete(`/api/subjects/delete/${_id}`);
};

export { getDataSubject, createSubject, updateSubject, deleteSubject };
