import instance from "../utils/axiosCustomize";

const getData = (token) => {
  return instance.get(`api/v1/data`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export { getData };
