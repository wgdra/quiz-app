import React, { useEffect, useState } from "react";
import { Col, Row, Space, Popconfirm, notification } from "antd";
import ListTable from "../../../components/ui/Table";
import ButtonBasic from "../../../components/ui/Button";
import FormInModal from "../../../components/ui/FormInModal";
import FormTitle from "../../../components/form/FormTitle";
import {
  getDataUser,
  createUser,
  updateUser,
  deleteUser,
} from "../../../services/userApiService";
import { useAuthContext } from "../../../hooks/useAuthContext";

const User = () => {
  const { user } = useAuthContext();

  const [open, setOpen] = useState(false);

  const [data, setData] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [okText, setOkText] = useState("");
  const [isRecord, setIsRecord] = useState("");
  const [isNameModal, setIsNameModal] = useState("");

  const [api, contextHolder] = notification.useNotification();

  // Notidication
  const openNotification = (info) => {
    api[info.type]({
      message: info.message,
      description: info.description,
    });
  };

  // Fetch API
  useEffect(() => {
    fetchDataUser();
  }, []);

  const fetchDataUser = async () => {
    // GET API
    let result = await getDataUser(user?.token);

    if (result.status === 200) {
      setTimeout(() => {
        setData(result.data);
      }, 600);
    } else {
      return openNotification({
        type: "error",
        message: "Lỗi lấy dữ liệu người dùng",
        description: `Server: ${result}`,
      });
    }
  };

  // Handle API
  const handleCreate = async (dataForm) => {
    // POST data
    let result = await createUser(dataForm, user?.token);

    if (result.status === 201) {
      setConfirmLoading(false);
      setOpen(false);
      fetchDataUser();

      return openNotification({
        type: "success",
        message: "Thêm mới thành công",
      });
    } else {
      setConfirmLoading(false);
      setOpen(false);

      return openNotification({
        type: "error",
        message: "Lỗi thêm mới người dùng",
        description: `Server: ${result}`,
      });
    }
  };

  const handleUpdate = async (dataForm) => {
    // PUT data
    if (dataForm.outOfDate === false) {
      setConfirmLoading(false);

      return openNotification({
        type: "error",
        message: "Vui lòng điền đầy đủ thông tin",
      });
    } else {
      let result = await updateUser(isRecord._id, dataForm, user?.token);

      if (result.res === true) {
        if (result.status === 200) {
          setConfirmLoading(false);
          setOpen(false);
          fetchDataUser();
          return openNotification({
            type: "success",
            message: "Cập nhật thông tin thành công",
          });
        } else {
          setConfirmLoading(false);
          setOpen(false);
          return openNotification({
            type: "error",
            message: "Lỗi cập nhật thông tin",
            description: `Server: ${result}`,
          });
        }
      } else {
        setConfirmLoading(false);
        setOpen(false);
        return openNotification({
          type: "error",
          message: "Vui lòng điền đầy đủ thông tin",
          description: `Server: ${result}`,
        });
      }
    }
  };

  const handleDelete = async (_id) => {
    // DELETE data
    let result = await deleteUser(_id, user?.token);

    if (result.status === 200) {
      fetchDataUser();
      return openNotification({
        type: "success",
        message: "Xóa thành công",
      });
    } else {
      return openNotification({
        type: "error",
        message: "Lỗi xóa thông tin",
      });
    }
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
        setIsRecord("");

        break;
      default:
        break;
    }
  };

  const onHandleForm = (dataForm, isHandle) => {
    setConfirmLoading(true);
    setTimeout(() => {
      switch (isHandle) {
        case "modal-create":
          handleCreate(dataForm);
          break;
        case "modal-update":
          handleUpdate(dataForm);
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
            onConfirm={() => handleDelete(record._id)}
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
                  placeholder: `${isRecord ? isRecord?.username : ""}`,
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
                  placeholder: `${isRecord ? isRecord?.full_name : ""}`,
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
                  placeholder: `${isRecord ? isRecord?.password : ""}`,
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
                  placeholder: `${isRecord ? isRecord?.email : ""}`,
                  rule: [
                    {
                      type: "email",
                      message: "Hãy nhập đúng Email!",
                    },
                    {
                      required: true,
                      message: "Vui lòng điền Email",
                    },
                  ],
                },
              ]}
            />
          </div>
        </Col>
        {contextHolder}
      </Row>
    </>
  );
};

export default User;
