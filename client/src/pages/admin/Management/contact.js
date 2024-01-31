import { useEffect, useState } from "react";
import { Row, Col, List, Avatar, Space, message, Dropdown } from "antd";
import VirtualList from "rc-virtual-list";
import {
  getConversationUser,
  createConversation,
} from "../../../services/chatAppApi";
import BoxContactAdmin from "../../../components/ui/BoxContactAdmin";

const Contact = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [conversation, setConversation] = useState([]);
  const [dataMessage, setDataMessage] = useState("");

  const isUser = JSON.parse(localStorage.getItem("user"));

  // Api
  console.log("conversation", conversation);
  console.log("isUser._id", isUser._id);

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

  // Handle
  const onClickItemChat = (item) => {
    setDataMessage(item);
  };

  return (
    <>
      {contextHolder}
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        <Col span={6}>
          <div
            style={{
              borderBottom: "1px solid #999999",
              height: 50,
              //   paddingBottom: 16,
            }}
          >
            <span
              style={{ margin: 0, fontSize: "1.3em", fontWeight: "bolder" }}
            >
              Danh sách
            </span>
          </div>
          <List>
            <VirtualList
              data={conversation}
              height={746}
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
        <Col span={18}>
          <div
            style={{
              borderBottom: "1px solid #999999",
              height: 50,
              //   paddingBottom: 16,
            }}
          >
            <span
              style={{ margin: 0, fontSize: "1.3em", fontWeight: "bolder" }}
            >
              Thông tin liên hệ
            </span>
          </div>
          <BoxContactAdmin dataMessage={dataMessage} />
        </Col>
      </Row>
    </>
  );
};

export default Contact;
