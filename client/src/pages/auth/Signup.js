import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Input } from "antd";
import FormAuth from "./FormAuth";
import { useSignup } from "../../hooks/useSignup";

const Signup = () => {
  const navigate = useNavigate();
  const { signup, loadings, contextHolder } = useSignup();

  // Handle
  const onFinish = async (data) => {
    await signup(data);
  };

  const onClickLink = () => {
    navigate("/login");
  };

  return (
    <>
      {contextHolder}
      <Row>
        <Col span={24} style={{ marginBottom: 16 }}>
          <div style={{ textAlign: "center" }}>
            <h1 style={{ color: "#222B45" }}>Đăng ký tài khoản</h1>
          </div>
        </Col>
        <Col span={24}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <FormAuth
              name="signup"
              lableBtn="Đăng ký"
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
                {
                  name: "confirm",
                  lable: "Mật lại khẩu",
                  type: <Input.Password placeholder="Xác nhận mật khẩu" />,
                  dependencies: ["password"],
                  hasFeedback: true,
                  rules: [
                    {
                      required: true,
                      message: "Vui lòng xác nhận lại mật khẩu!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Xác nhận mật khẩu chưa khớp!")
                        );
                      },
                    }),
                  ],
                },
              ]}
              more={{ title: "Bạn đã có tài khoản ?", link: "Đăng nhập ngay" }}
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

export default Signup;
