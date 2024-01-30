import { useEffect, useState, useRef } from "react";
import { Row, Col, Avatar, message } from "antd";
import { Scrollbars } from "react-custom-scrollbars-2";
import { SendOutlined } from "@ant-design/icons";
import InputCustomize from "../form/InputCustomize";
import ButtonBasic from "./Button";
import {
  getMessagesConversation,
  createMessages,
} from "../../services/chatAppApi";

const BoxContactAdmin = ({ ...props }) => {
  const { dataMessage } = props;

  const [messageApi, contextHolder] = message.useMessage();
  const inputRef = useRef(null);

  const [dataUser, setDataUser] = useState("");
  const [messages, setMessages] = useState([]);
  const [dataInput, setDataInput] = useState("");

  // API

  useEffect(() => {
    const isUser = JSON.parse(localStorage.getItem("user"));
    setDataUser(isUser);
    fetchMessages(isUser.token);
  }, [dataMessage]);

  const fetchMessages = async (token) => {
    const res = await getMessagesConversation(
      dataMessage.conversationId,
      token
    );
    if (res.status !== 200) {
      setMessages([]);
    }
    if (res.status === 200) {
      setMessages(res.data);
    }
  };

  const handleSend = async () => {
    const res = await createMessages(
      {
        conversationId: dataMessage.conversationId || null,
        senderId: dataUser._id,
        receiverId: dataMessage.user.receiverId,
        message: dataInput,
      },
      dataUser.token
    );

    if (res.status === 201) {
      fetchMessages(dataUser.token);
    }

    if (res.status !== 201) {
      messageApi.open({
        type: "error",
        content: res.message,
      });
      return;
    }
  };

  // Handle
  const onChange = (value) => {
    setDataInput(value);
  };

  const onClickSend = (e) => {
    e.preventDefault();
    handleSend();
    setDataInput("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onClickSend(e);
    }
  };

  return (
    <div>
      {contextHolder}
      <Scrollbars
        autoHide
        style={{
          width: "100%",
          height: 660,
          marginBottom: 16,
          background: "#e1ebe4",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            height: 660,
          }}
        >
          {messages &&
            messages.length > 0 &&
            messages.map((message, _) => {
              const sender = message.user.id;
              return (
                <>
                  {sender !== dataUser._id ? (
                    <Row key={message.user.id} style={{ marginBottom: 16 }}>
                      <Col span={16}>
                        <div style={{}}>
                          <div
                            style={{
                              maxWidth: 700,
                              minHeight: 46,
                              background: "#ffffff",
                              borderRadius: 5,
                              boxShadow:
                                "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                              wordWrap: "break-word",
                              padding: "12px 20px",
                              marginLeft: 30,
                              marginBottom: 8,
                            }}
                          >
                            <span
                              style={{
                                fontSize: "1.1em",
                                color: "#495057",
                                fontWeight: 500,
                              }}
                            >
                              {message.message}
                            </span>
                          </div>
                          <div>
                            <Avatar
                              src="https://upload.wikimedia.org/wikipedia/commons/0/03/Logo_HAU.png"
                              style={{ width: 28, height: 28 }}
                            />
                            <span
                              style={{
                                fontSize: "1em",
                                color: "#495057",
                                fontWeight: 500,
                                marginLeft: 8,
                              }}
                            >
                              12:00AM
                            </span>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  ) : (
                    <Row key={message.user.id} style={{ marginBottom: 16 }}>
                      <Col span={16} offset={8}>
                        <div style={{ marginRight: 8 }}>
                          <div
                            style={{
                              maxWidth: 700,
                              minHeight: 46,
                              background: "#bfddc8",
                              borderRadius: 5,
                              boxShadow:
                                "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                              wordWrap: "break-word",
                              padding: "12px 20px",
                              marginBottom: 8,
                            }}
                          >
                            <span
                              style={{
                                fontSize: "1.1em",
                                color: "#495057",
                                fontWeight: 500,
                              }}
                            >
                              {message.message}
                            </span>
                          </div>
                          <div style={{ textAlign: "end" }}>
                            <span
                              style={{
                                fontSize: "1em",
                                color: "#495057",
                                fontWeight: 500,
                                marginLeft: 8,
                              }}
                            >
                              12:00AM
                            </span>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  )}
                </>
              );
            })}
        </div>
      </Scrollbars>
      <Row>
        <Col span={24}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <InputCustomize
              disabled={!dataMessage ? true : false}
              inputRef={inputRef}
              placeholder="Nhập tin nhắn..."
              style={{ width: "90%", height: 40 }}
              inputDesign={{
                activeBorderColor: "#5cb279",
                hoverBorderColor: "#5cb279",
                inputFontSize: 18,
              }}
              value={dataInput}
              onKeyPress={handleKeyPress}
              onChange={(e) => onChange(e.target.value)}
            />

            <ButtonBasic
              disabled={!dataMessage ? true : false}
              size="large"
              label={<SendOutlined />}
              defaultColor="#ffff"
              tokenDefaultColor="#5cb279"
              tokenCustomize={{
                colorPrimaryHover: "#ffff",
                borderRadius: 5,
                colorPrimaryActive: "#ffff",
              }}
              style={{
                fontSize: "1.6em",
                padding: "0px 14px",
              }}
              onClick={onClickSend}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default BoxContactAdmin;
