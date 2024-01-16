import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Input, message } from "antd";
import FormAuth from "./FormAuth";
import { useLogin } from "../../hooks/useLogin";

const Login = () => {
  const navigate = useNavigate();

  const { login, loadings, contextHolder } = useLogin();

  // Handle
  const onFinish = async (data) => {
    await login(data);
  };

  const onClickLink = () => {
    navigate("/signup");
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
                    {
                      validator: async (_, value) => {
                        if (value.length < 6) {
                          return Promise.reject(
                            new Error("Mật khẩu phải có ít nhất 6 ký tự!")
                          );
                        }
                        return Promise.resolve();
                      },
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
