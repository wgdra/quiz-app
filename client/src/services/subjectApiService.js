import instance from "../utils/axiosCustomize";

const user = JSON.parse(localStorage.getItem("user"));
const token = user.token;

const getDataSubject = () => {
  return instance.get("/api/subjects", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const createSubject = (data) => {
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

const updateSubject = (_id, data) => {
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

const deleteSubject = (_id) => {
  return instance.delete(`/api/subjects/delete/${_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export { getDataSubject, createSubject, updateSubject, deleteSubject };
