import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Input, message } from "antd";
import FormAuth from "./FormAuth";
import { loginUser } from "../../services/authApiService";

const Login = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const [loadings, setLoadings] = useState(false);

  // Handle
  const onFinish = (data) => {
    setLoadings(true);
    handleLoginUser(data);
  };

  const onClickLink = () => {
    navigate("/signup");
  };

  const handleLoginUser = async (data) => {
    const res = await loginUser(data);
    console.log("res", res);

    if (res.status !== 200) {
      setTimeout(() => {
        setLoadings(false);
        messageApi.open({
          type: "error",
          content: res.message,
        });
        return;
      }, 1500);
    }

    if (res.status === 200) {
      setTimeout(() => {
        setLoadings(false);
        messageApi.open({
          type: "success",
          content: "Đăng nhập thành công",
        });
      }, 1500);
    }
  };

  return (
    <>
      {contextHolder}
      <Row>
        <Col span={24} style={{ marginBottom: 16 }}>
          <div style={{ textAlign: "center" }}>
            <h1 style={{ color: "#222B45" }}>Đăng nhập vào hệ thống</h1>
          </div>
        </Col>
        <Col span={24}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <FormAuth
              name="login"
              lableBtn="Đăng nhập"
              formItems={[
                {
                  name: "username",
                  lable: "Tên đăng nhập",
                  type: <Input placeholder="Nhập tên đăng nhập" />,
                  rules: [
                    {
                      required: true,
                      message: "Vui lòng nhập tên đăng nhập!",
                    },
                  ],
                },
                {
                  name: "password",
                  lable: "Mật khẩu",
                  type: <Input.Password placeholder="Nhập mật khẩu" />,
                  rules: [
                    {
                      required: true,
                      message: "Vui lòng nhập mật khẩu!",
                    },
                  ],
                },
              ]}
              more={{ title: "Bạn chưa có tài khoản ?", link: "Đăng ký ngay" }}
              loadings={loadings}
              onFinish={onFinish}
              onClickLink={onClickLink}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Login;
