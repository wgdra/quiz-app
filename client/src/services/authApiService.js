import instance from "../utils/axiosCustomize";

const loginUser = (data) => {
  return instance.post("/api/auth/login", {
    username: data.username,
    password: data.password,
  });
};

const signupUser = (data) => {
  return instance.post("/api/auth/signup", {
    username: data.username,
    password: data.password,
    full_name: data.full_name,
    role: data.role,
    email: data.email,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  });
};

export { loginUser, signupUser };
