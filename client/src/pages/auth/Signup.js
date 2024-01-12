import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Input, message } from "antd";
import FormAuth from "./FormAuth";
import { signupUser } from "../../services/authApiService";

const Signup = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const [loadings, setLoadings] = useState(false);

  // Handle
  const onFinish = (data) => {
    setLoadings(true);
    handleSignupUser(data);
  };

  const onClickLink = () => {
    navigate("/login");
  };

  const handleSignupUser = async (data) => {
    const res = await signupUser(data);
    console.log("res", res);

    if (res.status !== 201) {
      setTimeout(() => {
        setLoadings(false);
        messageApi.open({
          type: "error",
          content: res.message,
        });
        return;
      }, 1500);
    }

    if (res.status === 201) {
      setTimeout(() => {
        setLoadings(false);
        messageApi.open({
          type: "success",
          content: "Đăng ký thành công",
        });
        navigate("/login");
      }, 1500);
    }
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
