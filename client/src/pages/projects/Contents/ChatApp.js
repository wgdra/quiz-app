import { useEffect, useState } from "react";
import { Row, Col, List, Avatar, Space, message, Dropdown } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import VirtualList from "rc-virtual-list";
import { io } from "socket.io-client";
import {
  getConversationUser,
  createConversation,
  deleteConversation,
} from "../../../services/chatAppApi";
import { getDataUser } from "../../../services/userApiService";
import BoxChat from "../../../components/ui/BoxChat";
import BoxListUser from "../../../components/ui/BoxListUser";

const ChatApp = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [list, setList] = useState([]);
  const [listUser, setListUser] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [dataMessage, setDataMessage] = useState("");
  const [socket, setSocket] = useState(null);

  const isUser = JSON.parse(localStorage.getItem("user"));

  // UI
  const items = [
    {
      label: "Xóa cuộc trò chuyện",
      key: "0",
    },
    {
      label: "Thêm",
      key: "1",
    },
  ];

  // Websocket
  useEffect(() => {
    setSocket(io("http://localhost:3028"));
  }, []);

  useEffect(() => {
    socket?.emit("addUser", isUser?._id);
    socket?.on("getUsers", (users) => {
      console.log("activeUsers", users);
    });
  }, [socket]);

  // Api
  useEffect(() => {
    fetchConversation();
  }, []);

  const fetchConversation = async () => {
    const res = await getConversationUser(isUser._id, isUser.token);

    if (res.status !== 200) {
      messageApi.open({
        type: "error",
        content: res.message,
      });
      return;
    }
    if (res.status === 200) {
      setConversation(res.data);
    }
  };

  const createNewConversation = async (receiverId) => {
    const res = await createConversation(
      {
        senderId: isUser._id,
        receiverId: receiverId,
      },
      isUser.token
    );

    if (res.status !== 201) {
      messageApi.open({
        type: "error",
        content: res.message,
      });
      return;
    }
    if (res.status === 201) {
      fetchConversation();
    }
  };

  const handleDeleteConversation = async () => {
    const conversationId = dataMessage.conversationId;
    const res = await deleteConversation(conversationId, isUser.token);

    if (res.status !== 200) {
      messageApi.open({
        type: "error",
        content: res.message,
      });
      return;
    }
    if (res.status === 200) {
      fetchConversation();
      messageApi.open({
        type: "success",
        content: "Đã xóa",
      });
    }
  };

  useEffect(() => {
    fetchListUser();
  }, []);

  const fetchListUser = async () => {
    const res = await getDataUser(isUser.token);
    if (res.status !== 200) {
      messageApi.open({
        type: "error",
        content: res.message,
      });
      return;
    }
    if (res.status === 200) {
      setList(res.data);
    }
  };

  // Handle
  const onClickItemChat = (item) => {
    setDataMessage(item);
  };

  useEffect(() => {
    handleListUser();
  }, [conversation]);

  const handleListUser = () => {
    const removeUser = list.filter((item) => item._id !== isUser._id);
    const listReciver = conversation.map((item) => item.user.receiverId);

    const newList = removeUser.filter(
      (item) => !listReciver.includes(item._id)
    );

    setListUser(newList);
  };

  const handleMenuClick = (key) => {
    switch (key) {
      case "0":
        handleDeleteConversation();
        break;
      case "1":
        console.log("Them");
        break;
      default:
        break;
    }
  };
  return (
    <Row
      gutter={{
        xs: 8,
        sm: 16,
        md: 24,
        lg: 32,
      }}
      style={{
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
    >
      <Col
        span={4}
        style={{
          padding: 16,
          height: 800,
          maxHeight: 800,
        }}
      >
        <div
          style={{
            borderBottom: "1px solid #999999",
            height: 53,
            paddingBottom: 16,
          }}
        >
          <span style={{ margin: 0, fontSize: "1.3em", fontWeight: "bolder" }}>
            Trò chuyện
          </span>
        </div>
        <List>
          <VirtualList
            data={conversation}
            height={700}
            itemHeight={50}
            itemKey="conversationId"
          >
            {(item) => (
              <List.Item key={item.conversationId}>
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://upload.wikimedia.org/wikipedia/commons/0/03/Logo_HAU.png" />
                  }
                  title={
                    <span
                      style={{ fontSize: "1.2em", cursor: "pointer" }}
                      onClick={() => onClickItemChat(item)}
                    >
                      {item.user.full_name}
                    </span>
                  }
                  description={item.user.email}
                />
              </List.Item>
            )}
          </VirtualList>
        </List>
      </Col>
      <Col
        span={16}
        style={{
          padding: 16,
          height: 800,
          maxHeight: 800,
          background: "#e1ebe4",
        }}
      >
        <div
          style={{
            borderBottom: "1px solid #999999",
            paddingBottom: 16,
          }}
        >
          <Space align="baseline">
            <Avatar
              src={
                dataMessage
                  ? "https://upload.wikimedia.org/wikipedia/commons/0/03/Logo_HAU.png"
                  : ""
              }
              style={{ width: 36, height: 36 }}
            />
            <span
              style={{ margin: 0, fontSize: "1.3em", fontWeight: "bolder" }}
            >
              {dataMessage && dataMessage.user
                ? dataMessage.user.full_name
                : dataMessage.full_name || "Hãy chọn cuộc trò chuyện"}
            </span>
          </Space>
          <Dropdown
            menu={{ items, onClick: (e) => handleMenuClick(e.key) }}
            trigger={["click"]}
            placement="bottomRight"
            disabled={dataMessage && dataMessage.user ? false : true}
          >
            <a
              onClick={(e) => e.preventDefault()}
              style={{
                fontSize: "1.5em",
                color: "black",
                float: "right",
              }}
            >
              <MoreOutlined />
            </a>
          </Dropdown>
        </div>

        <BoxChat dataMessage={dataMessage} socket={socket} />
      </Col>
      <Col
        span={4}
        style={{
          padding: 16,
          height: 800,
          maxHeight: 800,
        }}
      >
        <div
          style={{
            borderBottom: "1px solid #999999",
            height: 53,
            paddingBottom: 16,
          }}
        >
          <span style={{ margin: 0, fontSize: "1.3em", fontWeight: "bolder" }}>
            Tìm kiếm
          </span>
        </div>
        <BoxListUser
          listUser={listUser}
          createNewConversation={createNewConversation}
        />
      </Col>
      {contextHolder}
    </Row>
  );
};

export default ChatApp;
