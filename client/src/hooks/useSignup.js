import { useState } from "react";
import { message } from "antd";
import { useAuthContext } from "./useAuthContext";
import { signupUser } from "../services/authApiService";

export const useSignup = () => {
  const [loadings, setLoadings] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  const { dispatch } = useAuthContext();

  const signup = async (data) => {
    setLoadings(true);

    const res = await signupUser(data);

    if (res.status !== 201) {
      setTimeout(() => {
        setLoadings(false);
        messageApi.open({
          type: "error",
          content: res.message,
        });
      }, 1500);
    }
    if (res.status === 201) {
      localStorage.setItem("user", JSON.stringify(res.token));
      dispatch({ type: "LOGIN", payload: res.token });
      setTimeout(() => {
        setLoadings(false);
        messageApi.open({
          type: "success",
          content: "Đăng ký thành công",
        });
      }, 1500);
    }
  };

  return { signup, loadings, contextHolder };
};
