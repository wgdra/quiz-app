import instance from "../utils/axiosCustomize";

const getDataUser = (token) => {
  return instance.get("/api/users", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const getOneUser = (_id, token) => {
  return instance.get(`/api/users/${_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const createUser = (data, token) => {
  return instance.post(
    "/api/users",
    {
      username: data.username,
      full_name: data.full_name,
      password: data.password,
      email: data.email,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

const updateUser = (_id, data, token) => {
  return instance.put(
    `/api/users/update/${_id}`,
    {
      full_name: data.full_name,
      email: data.email,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

const updatePassword = (_id, data, token) => {
  return instance.put(
    `/api/users/changepassword/${_id}`,
    {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

const deleteUser = (_id, token) => {
  return instance.delete(`/api/users/delete/${_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export {
  getDataUser,
  getOneUser,
  createUser,
  updateUser,
  updatePassword,
  deleteUser,
};
