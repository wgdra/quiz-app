import instance from "../utils/axiosCustomize";

const getData = () => {
  return instance.get(`api/v1/data`);
};

export { getData };
