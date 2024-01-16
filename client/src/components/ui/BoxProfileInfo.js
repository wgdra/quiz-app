import { useState } from "react";
import { Form, Input, Skeleton } from "antd";
import { EditOutlined } from "@ant-design/icons";
import ButtonGroup from "./ButtonGroup";
import ButtonBasic from "./Button";
import ModalCustomize from "./Modal";

const BoxProfileInfo = ({ ...props }) => {
  const { info, handleUpdate, handleChangePassword } = props;

  const [disabled, setDisabled] = useState(true);
  const [open, setOpen] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [loadingBtnChangePassword, setLoadingBtnChangePassword] =
    useState(false);
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);

  // UI
  const BoxContentChangePassword = () => {
    return (
      <Form onFinish={onFinishChangePassword} layout="vertical">
        <Form.Item
          name="oldPassword"
          label="Mật khẩu cũ"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="Mật khẩu mới"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu mới!",
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
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirmNewPassword"
          label="Xác nhận mật khẩu mới"
          dependencies={["newPassword"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Vui lòng xác nhận lại mật khẩu mới!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Xác nhận mật khẩu chưa chính xác!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <div style={{ textAlign: "end" }}>
          <ButtonGroup
            items={[
              {
                label: "Hủy",
                tokenCustomize: {
                  colorPrimaryHover: "#999999",
                  colorPrimaryActive: "#999999",
                },
                onClick: handleClickCancelModal,
              },
              {
                loading: loadingBtnChangePassword,
                htmlType: "submit",
                label: "Lưu",
                tokenCustomize: {
                  colorPrimaryHover: "#EC8E00",
                  colorPrimaryActive: "#EC8E00",
                },
                buttonDesign: {
                  defaultColor: "#8AC53E",
                  defaultBorderColor: "#8AC53E",
                },
              },
            ]}
          />
        </div>
      </Form>
    );
  };

  // Handle
  setTimeout(() => {
    setLoadingSkeleton(false);
  }, 1500);

  const date = new Date(info?.createdAt);
  const padNumber = (num) => (num < 10 ? `0${num}` : num);
  const formattedDate = `${padNumber(date.getDate())}/${padNumber(
    date.getMonth() + 1
  )}/${date.getFullYear()}`;

  const onClickChangePassword = () => {
    setOpen(true);
  };

  const handleClickCancelModal = () => {
    setOpen(false);
  };

  const onFinishChangePassword = (data) => {
    setLoadingBtnChangePassword(true);
    setTimeout(async () => {
      const result = await handleChangePassword(data);

      if (result.status !== 200) {
        setLoadingBtnChangePassword(false);
      }
      if (result.status === 200) {
        setLoadingBtnChangePassword(false);
        setOpen(false);
      }
    }, 1500);
  };

  const handleClickButton = (e) => {
    const innerText = e.target.innerText;
    switch (innerText) {
      case "Chỉnh sửa":
        setDisabled(false);
        break;

      case "Hủy bỏ":
        setDisabled(true);
        break;
      default:
        break;
    }
  };

  const onFinish = (data) => {
    setLoadingBtn(true);
    const dataUpdate = {
      full_name: data.full_name,
      email: data.email,
    };
    setTimeout(() => {
      setDisabled(true);
      setLoadingBtn(false);
      handleUpdate(dataUpdate);
    }, 1500);
  };

  return (
    <div style={{ minHeight: 740, padding: 32, background: "#ffffff" }}>
      <Skeleton loading={loadingSkeleton}>
        <Form disabled={disabled} onFinish={onFinish}>
          <Form.Item>
            <h2 style={{ margin: "0px 0px 8px 0px" }}>
              Thời gian tạo tài khoản: {info && formattedDate}
            </h2>
          </Form.Item>
          <h2 style={{ margin: "0px 0px 8px 0px" }}>Họ và tên</h2>
          <Form.Item name="full_name" initialValue={info.full_name}>
            <Input placeholder="Nhập họ và tên" />
          </Form.Item>
          <h2 style={{ margin: "0px 0px 8px 0px" }}>Tên đăng nhập</h2>
          <Form.Item name="username" initialValue={info.username}>
            <Input disabled placeholder={info.username} />
          </Form.Item>
          <h2 style={{ margin: "0px 0px 8px 0px" }}>
            Mật khẩu{" "}
            <EditOutlined
              style={{ cursor: "pointer", color: "#6DAE40" }}
              onClick={onClickChangePassword}
            />
          </h2>

          <Form.Item name="password">
            <Input disabled placeholder="******" />
          </Form.Item>
          <h2 style={{ margin: "0px 0px 8px 0px" }}>Email</h2>
          <Form.Item
            name="email"
            initialValue={info?.email}
            rules={[
              {
                type: "email",
                message: "Hãy nhập đúng Email!",
              },
            ]}
            style={{ marginBottom: 200 }}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>
          <Form.Item style={{ textAlign: "end" }}>
            {disabled ? (
              <ButtonBasic
                size="large"
                label="Chỉnh sửa"
                disabled={!disabled}
                defaultColor="#ffff"
                tokenDefaultColor="#EC8E00"
                tokenCustomize={{
                  colorPrimaryHover: "#ffff",
                  colorPrimaryActive: "#ffff",
                }}
                onClick={handleClickButton}
              />
            ) : null}
            {!disabled ? (
              <ButtonGroup
                size="large"
                type="primary"
                style={{ padding: "0px 18px" }}
                items={[
                  {
                    label: "Hủy bỏ",
                    tokenCustomize: {
                      colorPrimaryHover: "#EC8E00",
                      colorPrimaryActive: "#EC8E00",
                      colorPrimary: "#78909C",
                    },
                    onClick: handleClickButton,
                  },
                  {
                    loading: loadingBtn,
                    htmlType: "submit",
                    label: "Lưu chỉnh sửa",
                    tokenCustomize: {
                      colorPrimaryHover: "#EC8E00",
                      colorPrimaryActive: "#EC8E00",
                      colorPrimary: "#6DAE40",
                    },
                  },
                ]}
              />
            ) : null}
          </Form.Item>
        </Form>
      </Skeleton>
      <ModalCustomize
        open={open}
        title="Đổi mật khẩu"
        children={<BoxContentChangePassword />}
        modalDesign={{ titleFontSize: "22px", titleColor: "#44a500" }}
        tokenDesign={{}}
        footer={null}
      />
    </div>
  );
};

export default BoxProfileInfo;
