import { useEffect, useState } from "react";
import { Row, Col, List, Avatar, Space, message } from "antd";
import VirtualList from "rc-virtual-list";
import BoxChat from "../../../components/ui/BoxChat";
import { getConversationUser } from "../../../services/chatAppApi";

const ChatApp = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [conversation, setConversation] = useState([]);
  const [dataMessage, setDataMessage] = useState("");

  const isUser = JSON.parse(localStorage.getItem("user"));

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

  // Handle
  const onClickItemChat = (item) => {
    console.log("item lick", item);
    setDataMessage(item);
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
              src="https://upload.wikimedia.org/wikipedia/commons/0/03/Logo_HAU.png"
              style={{ width: 36, height: 36 }}
            />
            <span
              style={{ margin: 0, fontSize: "1.3em", fontWeight: "bolder" }}
            >
              {dataMessage && dataMessage.user
                ? dataMessage.user.full_name
                : "Messenger"}
            </span>
          </Space>
        </div>

        <BoxChat dataMessage={dataMessage} />
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
            Tim kiem
          </span>
        </div>
        <div>content</div>
      </Col>
      {contextHolder}
    </Row>
  );
};

export default ChatApp;
