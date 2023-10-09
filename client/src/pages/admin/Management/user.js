import React, { useState } from "react";
import { Col, Row, Space, Popconfirm } from "antd";
import ListTable from "../../../components/ui/Table";
import ButtonPrimary from "../../../components/ui/Button";
import ModalCustomize from "../../../components/ui/Modal";
import FormInput from "../../../components/form/FormInput";

const User = () => {
  const [open, setOpen] = useState(false);
  const [submittable, setSubmittable] = useState(false);

  const showModal = (record) => {
    console.log("record", record);
    setOpen(true);
  };

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
    // console.log("ewewy");
  };

  const handleDelete = (key) => {
    // console.log("key", key);
    // DELETE API
  };

  // Button List Table
  const buttonTableUser = (_, record) => {
    if (data.length >= 1) {
      return (
        <Space wrap>
          <ButtonPrimary label="Chỉnh sửa" onClick={() => showModal(record)} />
          <Popconfirm
            title="Bạn muốn xóa người dùng này?"
            onConfirm={() => handleDelete(record.key)}
          >
            <ButtonPrimary label="Xóa" danger />
          </Popconfirm>
        </Space>
      );
    } else {
      return null;
    }
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
      width: "20%",
    },
    {
      title: "Xử Lý",
      dataIndex: "",
      render: buttonTableUser,
    },
  ];

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
            <ModalCustomize
              title="Chỉnh Sửa Thông Tin"
              open={open}
              setOpen={setOpen}
              handleUpdate={handleUpdate}
            >
              <FormInput
                items={[
                  {
                    name: "username",
                    label: "Tên người dùng",
                  },
                  {
                    name: "full_name",
                    label: "Họ và Tên",
                  },
                  {
                    name: "password",
                    label: "Mật khẩu",
                  },
                  {
                    name: "email",
                    label: "Email",
                  },
                ]}
              />
            </ModalCustomize>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default User;
