import instance from "../utils/axiosCustomize";

const getDataUser = () => {
  return instance.get("/api/users");
};

const createUser = (data) => {
  return instance.post("/api/users", {
    username: data.username,
    full_name: data.full_name,
    password: data.password,
    email: data.email,
  });
};

const updateUser = (_id, data) => {
  return instance.put(`/api/users/update/${_id}`, {
    username: data.username,
    full_name: data.full_name,
    password: data.password,
    email: data.email,
  });
};

const deleteUser = (_id) => {
  return instance.delete(`/api/users/delete/${_id}`);
};

export { getDataUser, createUser, updateUser, deleteUser };
