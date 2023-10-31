import instance from "../utils/axiosCustomize";

const getDataClass = () => {
  return instance.get(`api/classes`);
};

export { getDataClass };
