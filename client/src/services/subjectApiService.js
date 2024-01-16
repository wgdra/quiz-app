import instance from "../utils/axiosCustomize";

const getDataSubject = (token) => {
  return instance.get("/api/subjects", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const createSubject = (data, token) => {
  return instance.post(
    "/api/subjects",
    {
      classIds: data.classIds,
      subject_name: data.subject_name,
      methods: data.methods,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

const updateSubject = (_id, data, token) => {
  return instance.put(
    `/api/subjects/update/${_id}`,
    {
      classIds: data.classIds,
      subject_name: data.subject_name,
      methods: data.methods,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

const deleteSubject = (_id, token) => {
  return instance.delete(`/api/subjects/delete/${_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export { getDataSubject, createSubject, updateSubject, deleteSubject };
