import React, { useEffect, useState } from "react";
import { Col, Row, Space, Popconfirm } from "antd";
import ListTable from "../../../components/ui/Table";
import ButtonBasic from "../../../components/ui/Button";
import FormInModal from "../../../components/ui/FormInModal";

const User = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [okText, setOkText] = useState("");
  const [isRecord, setIsRecord] = useState("");

  console.log("isRecord", isRecord);
  // Fetch API
  const data = [
    {
      key: "1",
      username: "John Brown",
      password: "123456",
      full_name: "John Brown",
      email: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      username: "Jn",
      password: "123456",
      full_name: "Nguyen",
      email: "New York No. 1 Lake Park",
    },
    {
      key: "3",
      username: "John",
      password: "123456",
      full_name: "Tien",
      email: "New York No. 1 Lake Park",
    },
    {
      key: "4",
      username: "Jrown",
      password: "123456",
      full_name: "Trung",
      email: "New York No. 1 Lake Park",
    },
  ];

  // Handle API

  const handleUpdate = () => {
    // PUT API
    console.log("ewewy");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleDelete = (key) => {
    // console.log("key", key);
    // DELETE API
  };

  // Handle Modal
  const showModal = (outerText, record) => {
    console.log("record", record);

    setIsRecord(record);

    switch (outerText) {
      case "Chỉnh sửa":
        setTitleModal("Chỉnh sửa thông tin");
        setOkText("Chỉnh sửa");
        setOpen(true);
        break;
      case "Thêm mới":
        setTitleModal("Thêm mới người dùng");
        setOkText("Thêm mới");
        setOpen(true);
        break;
      default:
        break;
    }
  };

  // Button List Table
  const buttonTableUser = (_, record) => {
    if (data.length >= 1) {
      return (
        <Space wrap>
          <ButtonBasic
            label="Chỉnh sửa"
            onClick={(e) => showModal(e.target.outerText, record)}
          />
          <Popconfirm
            title="Bạn muốn xóa người dùng này?"
            onConfirm={() => handleDelete(record.key)}
          >
            <ButtonBasic label="Xóa" danger />
          </Popconfirm>
        </Space>
      );
    } else {
      return null;
    }
  };

  const buttonTitle = () => {
    return (
      <ButtonBasic
        label="Thêm mới"
        onClick={(e) => showModal(e.target.outerText)}
      />
    );
  };

  // Data Columns Table
  const columns = [
    {
      title: "Tên Người Dùng",
      dataIndex: "username",
      width: "20%",
    },
    {
      key: "full_name",
      title: "Họ và Tên",
      dataIndex: "full_name",
      width: "30%",
      // ...getColumnSearchProps("full_name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "30%",
    },
    {
      title: buttonTitle,
      dataIndex: "",
      render: buttonTableUser,
    },
  ];

  const onHandleForm = (values, key) => {
    console.log("Received values of form: ", values);
    // console.log("key", key);

    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  return (
    <>
      <Row>
        <Col
          span={24}
          style={{
            height: "80vh",
            maxHeight: "80vh",
          }}
        >
          <div
            style={{
              height: "100%",
              maxHeight: "100%",
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              margin: 16,
            }}
          >
            <div
              style={{
                color: "#fff",
                background: "#1677ff",
                padding: "8px 0px",
              }}
            >
              <span
                style={{
                  fontSize: "1.4em",
                  fontWeight: "bold",
                }}
              >
                Bảng Thông Tin Người Dùng
              </span>
            </div>
            <ListTable columns={columns} data={data} />
            {/* <ButtonBasic
              label="Thêm mới"
              onClick={(e) => showModal(e.target.outerText)}
            /> */}
            <FormInModal
              title={titleModal}
              okText={okText}
              cancelText="Hủy"
              open={open}
              onHandleForm={onHandleForm}
              confirmLoading={confirmLoading}
              onCancel={() => {
                setOpen(false);
              }}
              items={[
                {
                  name: "username",
                  label: "Tên người dùng",
                  initialValue: `${isRecord ? isRecord?.username : ""}`,
                  rule: [
                    {
                      min: 3,
                      required: true,
                      message: "Tối thiểu 3 ký tự",
                    },
                  ],
                },
                {
                  name: "full_name",
                  label: "Họ và Tên",
                  initialValue: `${isRecord ? isRecord?.full_name : ""}`,
                  rule: [
                    {
                      min: 3,
                      required: true,
                      message: "Điền đầy đủ cả họ tên",
                    },
                  ],
                },
                {
                  name: "password",
                  label: "Mật khẩu",
                  initialValue: `${isRecord ? isRecord?.password : ""}`,
                  rule: [
                    {
                      min: 6,
                      required: true,
                      message: "Mật khẩu phải trên 6 ký tự",
                    },
                  ],
                },
                {
                  name: "email",
                  label: "Email",
                  initialValue: `${isRecord ? isRecord?.email : ""}`,
                },
              ]}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default User;
