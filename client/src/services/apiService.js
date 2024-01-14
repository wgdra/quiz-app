import instance from "../utils/axiosCustomize";

const user = JSON.parse(localStorage.getItem("user"));
const token = user.token;

const getData = () => {
  return instance.get(`api/v1/data`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export { getData };
