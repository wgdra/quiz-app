import React, { useEffect, useState } from "react";
import { Col, Row, Space, Popconfirm } from "antd";
import ListTable from "../../../components/ui/Table";
import ButtonBasic from "../../../components/ui/Button";
import FormInModal from "../../../components/ui/FormInModal";
import FormTitle from "../../../components/form/FormTitle";

const User = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [okText, setOkText] = useState("");
  const [isRecord, setIsRecord] = useState("");
  const [isNameModal, setIsNameModal] = useState("");

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
  useEffect(() => {
    fetchDataUser();
  }, []);

  const fetchDataUser = async () => {
    // GET API
  };

  // Handle API
  const handleCreate = async (dataForm) => {
    // POST data
    setConfirmLoading(false);
    setOpen(false);
    console.log("create", dataForm);
  };

  const handleUpdate = async (dataForm) => {
    // PUT data
    setConfirmLoading(false);
    setOpen(false);
    console.log("key update", isRecord.key);
    console.log("update", dataForm);
  };

  const handleDelete = async (key) => {
    // console.log("key", key);
    // DELETE data
  };

  // Handle Modal
  const showModal = (outerText, record) => {
    switch (outerText) {
      case "Chỉnh sửa":
        setOpen(true);
        setTitleModal("Chỉnh sửa thông tin");
        setOkText("Chỉnh sửa");
        setIsNameModal("modal-update");
        setIsRecord(record);

        break;
      case "Thêm mới":
        setOpen(true);
        setTitleModal("Thêm mới người dùng");
        setOkText("Thêm mới");
        setIsNameModal("modal-create");
        break;
      default:
        break;
    }
  };

  const onHandleForm = (values, isHandle) => {
    setConfirmLoading(true);
    setTimeout(() => {
      switch (isHandle) {
        case "modal-create":
          handleCreate(values);
          break;
        case "modal-update":
          handleUpdate(values);
          break;
        default:
          break;
      }
    }, 2000);
  };

  // Button List Table
  const buttonTableUser = (_, record) => {
    if (data.length >= 1) {
      return (
        <Space wrap>
          <ButtonBasic
            type="primary"
            label="Chỉnh sửa"
            style={{ background: "#eb9a25" }}
            onClick={(e) => showModal(e.target.outerText, record)}
          />
          <Popconfirm
            title="Bạn muốn xóa người dùng này?"
            onConfirm={() => handleDelete(record.key)}
          >
            <ButtonBasic type="primary" label="Xóa" danger />
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
        type="primary"
        label="Thêm mới"
        style={{ background: "#04aa6d" }}
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
            <FormTitle
              title="Bảng Thông Tin Người Dùng"
              fontSize="1.4em"
              background="#1677ff"
            />
            <ListTable columns={columns} data={data} />

            <FormInModal
              nameModal={isNameModal}
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
