import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useAuthContext } from "./useAuthContext";
import { loginUser } from "../services/authApiService";

export const useLogin = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const [loadings, setLoadings] = useState(null);

  const { dispatch } = useAuthContext();

  const login = async (data) => {
    setLoadings(true);

    const res = await loginUser(data);

    if (res.status !== 200) {
      setTimeout(() => {
        setLoadings(false);
        messageApi.open({
          type: "error",
          content: res.message,
        });
      }, 1500);
    }
    if (res.status === 200) {
      localStorage.setItem("user", JSON.stringify(res.data));
      dispatch({ type: "LOGIN", payload: res.data });
      setTimeout(() => {
        setLoadings(false);
        messageApi.open({
          type: "success",
          content: "Đăng nhập thành công",
        });
        if (res.data.role === 0) {
          navigate("/manage");
        } else {
          navigate("/project/overview");
        }
      }, 1500);
    }
  };

  return { login, loadings, contextHolder };
};
