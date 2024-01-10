import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Radio,
  Input,
  Form,
  Button,
  Space,
  Upload,
  message,
  Checkbox,
} from "antd";
import {
  MinusCircleOutlined,
  PlusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import ButtonBasic from "./Button";
import ButtonGroup from "./ButtonGroup";

const ManageExam = ({ ...props }) => {
  const { dataContent, handleUpdateExam, handleDeleteExam } = props;

  const [form] = Form.useForm();

  const [dataItems, setDataItems] = useState(dataContent);
  const [imageUrl, setImageUrl] = useState("");
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const newData = dataContent;
    setDataItems(newData);
  }, [dataContent]);

  console.log("dataItems", dataItems);

  // Handle
  const onChangeRadio = (value, questionIdx) => {
    console.log("value", value);
    console.log("questionIdx", questionIdx);
  };

  const handleClickUpdate = (e) => {
    const nameBtn = e.target.innerText;
    switch (nameBtn) {
      case "Chỉnh sửa":
        setDisabled(false);
        break;

      case "Xóa":
        handleDeleteExam(dataItems._id);
        setDisabled(true);
        break;

      case "Hủy bỏ":
        setDisabled(true);
        break;

      default:
        break;
    }
  };

  const customRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess({
        url: imageUrl,
      });
    }, 1000);
  };

  const normFile = (e) => {
    const getBase64 = (img, callback) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => callback(reader.result));
      reader.readAsDataURL(img);
    };

    getBase64(e.file.originFileObj, (url) => {
      setImageUrl(url);
    });
    return imageUrl;
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Chỉ tải lên tệp hình ảnh !");
    }
    return isImage;
  };

  const onFinish = (data) => {
    setDisabled(true);
    handleUpdateExam(dataItems._id, data);
  };

  return (
    <>
      {disabled && (
        <div
          style={{
            padding: 8,
          }}
        >
          <ButtonBasic
            type="primary"
            label="Chỉnh sửa"
            style={{ background: "#eb9a25", marginRight: 8 }}
            onClick={handleClickUpdate}
          />
          <ButtonBasic
            type="primary"
            label="Xóa"
            style={{ background: "red" }}
            onClick={handleClickUpdate}
          />
        </div>
      )}
      <Form
        style={{
          padding: 8,
        }}
        onFinish={onFinish}
        disabled={disabled}
      >
        {!disabled && (
          <ButtonGroup
            items={[
              {
                name: "update",
                type: "primary",
                label: "Lưu chỉnh sửa",
                style: { background: "#04aa6d" },
                htmlType: "submit",
              },
              {
                type: "primary",
                label: "Hủy bỏ",
                danger: true,
                submit: "button",
                onClick: handleClickUpdate,
              },
            ]}
          />
        )}
        <Row
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
          style={{ padding: "16px 32px" }}
        >
          <Col span={24}>
            <h2
              style={{
                margin: "0px 0px 16px 0px",
                color: "#EC8E00",
                textDecoration: "underline",
              }}
            >
              Thông tin
            </h2>
            <Form.Item
              label="Tên đề"
              name="test_name"
              initialValue={dataItems.test_name}
              style={{
                width: "32%",
              }}
            >
              <Input placeholder="Nhập để thêm" />
            </Form.Item>
            <Form.Item
              label="Mô tả"
              name="description"
              initialValue={dataItems.description}
              style={{
                width: "32%",
              }}
            >
              <Input placeholder="Nhập để thêm" />
            </Form.Item>
            <Form.Item
              label="Thời gian làm bài (giây)"
              name="time"
              initialValue={dataItems.time}
              style={{
                width: "16%",
              }}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <h2
              style={{
                margin: "0px 0px 16px 0px",
                color: "#EC8E00",
                textDecoration: "underline",
              }}
            >
              Câu hỏi
            </h2>

            <Form.List name="content" initialValue={dataItems.content}>
              {(contents, { add, remove }) => (
                <>
                  {contents.map((content, index) => (
                    <div key={index}>
                      <div style={{ marginBottom: 12 }}>
                        <span
                          style={{
                            fontSize: "1.3em",
                            fontWeight: "bold",
                            textDecoration: "underline",
                          }}
                        >
                          Phần {index + 1}
                        </span>
                        <Button
                          type="primary"
                          style={{
                            background: "#DC4446",
                            marginLeft: 8,
                          }}
                          onClick={() => {
                            remove(content.name);
                          }}
                        >
                          Xóa
                        </Button>
                      </div>
                      <Form.Item
                        initialValue={content.title}
                        name={[content.name, "title"]}
                        style={{
                          width: "32%",
                        }}
                      >
                        <Input placeholder="Nhập để thêm" />
                      </Form.Item>
                      <Form.Item>
                        <Form.List name={[content.name, "questions"]}>
                          {(questions, subOpt) => (
                            <>
                              {questions.map((question, questionIdx) => (
                                <div key={questionIdx}>
                                  <div style={{ display: "flex" }}>
                                    <span
                                      style={{
                                        fontSize: "1.2em",
                                        fontWeight: "bold",
                                        marginRight: 16,
                                      }}
                                    >
                                      {`Câu ${questionIdx + 1}:`}
                                    </span>
                                    <Form.Item
                                      name={[question.name, "question"]}
                                      initialValue={question.question}
                                      style={{
                                        width: "80%",
                                      }}
                                    >
                                      <Input placeholder="Nhập để thêm" />
                                    </Form.Item>
                                    <ButtonBasic
                                      type="primary"
                                      label="Xóa"
                                      style={{
                                        background: "#DC4446",
                                        marginLeft: 8,
                                      }}
                                      onClick={() =>
                                        subOpt.remove(question.name)
                                      }
                                    />
                                  </div>
                                  <Form.Item
                                    label="Hình ảnh câu hỏi"
                                    name={[question.name, "question_img"]}
                                    initialValue={question.question_img}
                                    getValueFromEvent={normFile}
                                  >
                                    <Upload
                                      customRequest={customRequest}
                                      showUploadList={false}
                                      beforeUpload={beforeUpload}
                                      multiple={false}
                                      maxCount={1}
                                      fileList={form.getFieldValue([
                                        "images",
                                        question.key,
                                        "question_img",
                                      ])}
                                      listType="picture-card"
                                    >
                                      <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>
                                          Thêm hình ảnh
                                        </div>
                                      </div>
                                    </Upload>
                                  </Form.Item>

                                  <Form.Item>
                                    {index === 0 ? (
                                      <Form.List
                                        name={[question.name, "options"]}
                                      >
                                        {(options, subOpt) => (
                                          <>
                                            <div
                                              style={{
                                                marginBottom: 16,
                                              }}
                                            >
                                              <span
                                                style={{
                                                  fontSize: "1.1em",
                                                  fontWeight: "bold",
                                                  marginRight: 16,
                                                }}
                                              >
                                                Đáp án:
                                              </span>
                                              <ButtonBasic
                                                type="primary"
                                                label="Thêm"
                                                icon={<PlusCircleOutlined />}
                                                style={{
                                                  background: "#6DAE40",
                                                }}
                                                onClick={() => subOpt.add()}
                                              />
                                            </div>
                                            <Radio.Group
                                              onChange={(e) =>
                                                onChangeRadio(
                                                  e.target.value,
                                                  questionIdx
                                                )
                                              }
                                            >
                                              <Row>
                                                {options.map(
                                                  (option, optionIdx) => (
                                                    <Col span={6}>
                                                      <Space
                                                        align="baseline"
                                                        style={{
                                                          marginRight: 32,
                                                        }}
                                                      >
                                                        <Radio
                                                          value={optionIdx}
                                                        />
                                                        <Form.Item
                                                          name={option.name}
                                                          initialValue={option}
                                                        >
                                                          <Input placeholder="Nhập để thêm" />
                                                        </Form.Item>
                                                        <MinusCircleOutlined
                                                          style={{
                                                            color: "#DC4446",
                                                            cursor: "pointer",
                                                          }}
                                                          onClick={() =>
                                                            subOpt.remove(
                                                              option.name
                                                            )
                                                          }
                                                        />
                                                      </Space>
                                                    </Col>
                                                  )
                                                )}
                                              </Row>
                                            </Radio.Group>
                                          </>
                                        )}
                                      </Form.List>
                                    ) : (
                                      <>
                                        <Row>
                                          <Col
                                            span={24}
                                            style={{
                                              display: "flex",
                                            }}
                                          >
                                            <span
                                              style={{
                                                fontSize: "1.1em",
                                                fontWeight: "bold",
                                                marginRight: 8,
                                              }}
                                            >
                                              Tích chọn nếu là câu lựa chọn/ghép
                                              nối
                                            </span>
                                            <Form.Item
                                              name={[question.name, "drag"]}
                                              valuePropName="checked"
                                              initialValues={question.drag}
                                            >
                                              <Checkbox />
                                            </Form.Item>
                                          </Col>
                                        </Row>
                                        <Row>
                                          <Col span={8}>
                                            <Form.List
                                              name={[question.name, "topic"]}
                                              style={{ width: "100%" }}
                                            >
                                              {(topics, subOpt) => (
                                                <>
                                                  <div
                                                    style={{
                                                      marginBottom: 16,
                                                    }}
                                                  >
                                                    <span
                                                      style={{
                                                        fontSize: "1.1em",
                                                        fontWeight: "bold",
                                                        marginRight: 16,
                                                      }}
                                                    >
                                                      Đề mục
                                                    </span>
                                                    <ButtonBasic
                                                      type="primary"
                                                      label="Thêm"
                                                      icon={
                                                        <PlusCircleOutlined />
                                                      }
                                                      style={{
                                                        background: "#6DAE40",
                                                      }}
                                                      onClick={() =>
                                                        subOpt.add()
                                                      }
                                                    />
                                                  </div>

                                                  {topics.map(
                                                    (topic, topicIdx) => (
                                                      <div
                                                        style={{
                                                          display: "flex",
                                                          alignItems: "center",
                                                          marginBottom: 32,
                                                        }}
                                                      >
                                                        <Form.Item
                                                          name={topic.name}
                                                          initialValue={topic}
                                                          style={{
                                                            width: "70%",
                                                            marginBottom: 0,
                                                            marginRight: 32,
                                                          }}
                                                        >
                                                          <Input placeholder="Nhập để thêm" />
                                                        </Form.Item>
                                                        <MinusCircleOutlined
                                                          style={{
                                                            color: "#DC4446",
                                                            cursor: "pointer",
                                                          }}
                                                          onClick={() =>
                                                            subOpt.remove(
                                                              topic.name
                                                            )
                                                          }
                                                        />
                                                      </div>
                                                    )
                                                  )}
                                                </>
                                              )}
                                            </Form.List>
                                          </Col>
                                          <Col span={8}>
                                            <Form.List
                                              name={[question.name, "answer"]}
                                              style={{ width: "100%" }}
                                            >
                                              {(answers, subOpt) => (
                                                <>
                                                  <div
                                                    style={{
                                                      marginBottom: 16,
                                                    }}
                                                  >
                                                    <span
                                                      style={{
                                                        fontSize: "1.1em",
                                                        fontWeight: "bold",
                                                        marginRight: 16,
                                                      }}
                                                    >
                                                      Đáp án đề mục
                                                    </span>
                                                    <ButtonBasic
                                                      type="primary"
                                                      label="Thêm"
                                                      icon={
                                                        <PlusCircleOutlined />
                                                      }
                                                      style={{
                                                        background: "#6DAE40",
                                                      }}
                                                      onClick={() =>
                                                        subOpt.add()
                                                      }
                                                    />
                                                  </div>

                                                  {answers.map(
                                                    (answer, answerIdx) => (
                                                      <div
                                                        style={{
                                                          display: "flex",
                                                          alignItems: "center",
                                                          marginBottom: 32,
                                                        }}
                                                      >
                                                        <Form.Item
                                                          name={answer.name}
                                                          initialValue={answer}
                                                          style={{
                                                            width: "70%",
                                                            marginBottom: 0,
                                                            marginRight: 32,
                                                          }}
                                                        >
                                                          <Input placeholder="Nhập để thêm" />
                                                        </Form.Item>
                                                        <MinusCircleOutlined
                                                          style={{
                                                            color: "#DC4446",
                                                            cursor: "pointer",
                                                          }}
                                                          onClick={() =>
                                                            subOpt.remove(
                                                              answer.name
                                                            )
                                                          }
                                                        />
                                                      </div>
                                                    )
                                                  )}
                                                </>
                                              )}
                                            </Form.List>
                                          </Col>
                                          <Col span={8}>
                                            <Form.List
                                              name={[
                                                question.name,
                                                "topic_answer",
                                              ]}
                                              style={{ width: "100%" }}
                                            >
                                              {(topic_answer, subOpt) => (
                                                <>
                                                  <div
                                                    style={{
                                                      marginBottom: 16,
                                                    }}
                                                  >
                                                    <span
                                                      style={{
                                                        fontSize: "1.1em",
                                                        fontWeight: "bold",
                                                        marginRight: 16,
                                                      }}
                                                    >
                                                      Đáp án lựa chọn
                                                    </span>
                                                    <ButtonBasic
                                                      type="primary"
                                                      label="Thêm"
                                                      icon={
                                                        <PlusCircleOutlined />
                                                      }
                                                      style={{
                                                        background: "#6DAE40",
                                                      }}
                                                      onClick={() =>
                                                        subOpt.add()
                                                      }
                                                    />
                                                  </div>

                                                  {topic_answer.map(
                                                    (answer, answerIdx) => (
                                                      <div
                                                        style={{
                                                          display: "flex",
                                                          alignItems: "center",
                                                          marginBottom: 32,
                                                        }}
                                                      >
                                                        <Form.Item
                                                          name={answer.name}
                                                          initialValue={answer}
                                                          style={{
                                                            width: "70%",
                                                            marginBottom: 0,
                                                            marginRight: 32,
                                                          }}
                                                        >
                                                          <Input placeholder="Nhập để thêm" />
                                                        </Form.Item>
                                                        <MinusCircleOutlined
                                                          style={{
                                                            color: "#DC4446",
                                                            cursor: "pointer",
                                                          }}
                                                          onClick={() =>
                                                            subOpt.remove(
                                                              answer.name
                                                            )
                                                          }
                                                        />
                                                      </div>
                                                    )
                                                  )}
                                                </>
                                              )}
                                            </Form.List>
                                          </Col>
                                        </Row>
                                      </>
                                    )}
                                  </Form.Item>
                                </div>
                              ))}
                              <ButtonBasic
                                type="primary"
                                label="Thêm câu hỏi"
                                style={{ background: "#6DAE40" }}
                                onClick={() => subOpt.add()}
                              />
                            </>
                          )}
                        </Form.List>
                      </Form.Item>
                    </div>
                  ))}
                </>
              )}
            </Form.List>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default ManageExam;
