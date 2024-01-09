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
} from "antd";
import {
  MinusCircleOutlined,
  PlusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import ButtonBasic from "./Button";

const ManageExam = ({ ...props }) => {
  const { dataContent } = props;

  const [form] = Form.useForm();

  const [dataItems, setDataItems] = useState(dataContent);
  const [imageUrl, setImageUrl] = useState("");
  const [initMinute, setInitMinute] = useState("");

  useEffect(() => {
    const newData = dataContent;
    setDataItems(newData);
    handleTime();
  }, [dataContent]);

  //   console.log("dataItems", dataItems);

  // Handle
  const handleTime = () => {
    const convertTime = dataItems.time / 60;
    console.log("convertTime", convertTime);
    setInitMinute(convertTime);
  };

  const onChangeRadio = (value, questionIdx) => {
    console.log("value", value);
    console.log("questionIdx", questionIdx);
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
    console.log("data form", data);
  };

  return (
    <Form
      style={{
        padding: 8,
      }}
      onFinish={onFinish}
    >
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
            initialValue={dataItems.description}
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
                                    onClick={() => subOpt.remove(question.name)}
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
                                  <Form.List name={[question.name, "options"]}>
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
                                                    style={{ marginRight: 32 }}
                                                  >
                                                    <Radio value={optionIdx} />
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
      <Button htmlType="submit">Submit</Button>
    </Form>
  );
};

export default ManageExam;
