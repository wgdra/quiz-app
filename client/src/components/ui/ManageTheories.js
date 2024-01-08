import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Input, Upload, message } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import ButtonBasic from "./Button";
import ButtonGroup from "./ButtonGroup";

const ManageTheories = ({ ...props }) => {
  const {
    dataContent,
    handleCreateLesson,
    handleUpdateLesson,
    handleDeleteLesson,
  } = props;

  const [form] = Form.useForm();

  const [dataItems, setDataItems] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  const newData = dataContent.map((item) => {
    return {
      item: item,
      state: 0,
      disabled: true,
    };
  });

  useEffect(() => {
    setDataItems(newData);
  }, [dataContent]);

  // Handle Form
  const handleClickUpdate = (e, item, index) => {
    const nameButton = e.target.innerText;
    switch (nameButton) {
      case "Chỉnh sửa":
        const newDataContent = [...dataItems];
        newDataContent.splice(index, 1, {
          item: item,
          state: 1,
          disabled: false,
        });
        setDataItems(newDataContent);
        break;

      case "Xóa":
        handleDeleteLesson(item.lessonId);

        const cloneDataContent = [...dataItems];
        const newDataContentDelete = cloneDataContent.filter(
          (data) => data.item.lessonId !== item.lessonId
        );
        setDataItems(newDataContentDelete);
        break;

      case "Hủy bỏ":
        const newDataContentCancel = [...dataItems];
        newDataContentCancel.splice(index, 1, {
          item: item,
          state: 0,
          disabled: true,
        });
        setDataItems(newDataContentCancel);
        break;
      default:
        break;
    }
  };

  const onFinish = (lessonId, data, index) => {
    handleUpdateLesson(lessonId, data);

    const newDataContent = [...dataItems];
    newDataContent.splice(index, 1, {
      item: {
        lessonId: lessonId,
        lesson_title: data.lesson_title,
        lesson_content: data.lesson_content,
      },
      state: 0,
      disabled: true,
    });
    setDataItems(newDataContent);
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

  const handleClickAddLesson = (lessonId) => {
    handleCreateLesson({
      lessonId: lessonId + 1,
      lesson_title: "",
      lesson_img: "",
      lesson_content: [],
    });

    const newDataContent = [...dataItems];
    newDataContent.push({
      item: {
        lessonId: lessonId + 1,
        lesson_title: "",
        lesson_img: "",
        lesson_content: [],
      },
      state: 0,
      disabled: true,
    });
    setDataItems(newDataContent);
  };

  return (
    <>
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
        style={{
          padding: "16px 32px",
        }}
      >
        {dataItems.map((content, index) => {
          return (
            <Col
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginBottom: 30,
              }}
              span={24}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <h2
                  style={{
                    margin: "0px 16px 0px 0px",
                    color: "#EC8E00",
                    textDecoration: "underline",
                  }}
                >
                  Tiêu đề {index + 1}
                </h2>

                {content.state === 0 && (
                  <>
                    <ButtonBasic
                      type="primary"
                      label="Chỉnh sửa"
                      style={{ background: "#eb9a25", marginRight: 8 }}
                      onClick={(e) => handleClickUpdate(e, content.item, index)}
                    />
                    <ButtonBasic
                      type="primary"
                      label="Xóa"
                      style={{ background: "red" }}
                      onClick={(e) => handleClickUpdate(e, content.item, index)}
                    />
                  </>
                )}
              </div>
              <Form
                layout="vertical"
                disabled={content.disabled}
                onFinish={(data) =>
                  onFinish(content.item.lessonId, data, index)
                }
                style={{
                  width: "100%",
                  position: "relative",
                  marginBottom: 16,
                }}
              >
                {content.state === 1 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-46px",
                      left: "110px",
                    }}
                  >
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
                          onClick: (e) =>
                            handleClickUpdate(e, content.item, index),
                        },
                      ]}
                    />
                  </div>
                )}
                <Form.Item
                  name="lesson_title"
                  style={{ width: "50%" }}
                  initialValue={content.item.lesson_title}
                >
                  <Input placeholder="Nhập để thêm" />
                </Form.Item>
                <h2
                  style={{
                    margin: 0,
                    textDecoration: "underline",
                  }}
                >
                  Nội dung
                </h2>

                <Form.List
                  name="lesson_content"
                  initialValue={content.item.lesson_content}
                >
                  {(dataContents, { add, remove }) => (
                    <>
                      {dataContents.map((lesson, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            fontSize: "1.2em",
                            marginBottom: 16,
                            width: "100%",
                          }}
                        >
                          <p
                            style={{
                              fontSize: "1.1em",
                              fontWeight: "bold",
                              margin: "8px 0px",
                            }}
                          >
                            Đề mục {idx + 1}
                            <Button
                              danger
                              style={{ marginLeft: 8 }}
                              onClick={() => {
                                remove(lesson.name);
                              }}
                            >
                              Xóa
                            </Button>
                          </p>
                          <div
                            style={{
                              width: "100%",
                              padding: "16px 32px",
                              border: "1px solid #78909C",
                              borderRadius: 5,
                            }}
                          >
                            <Form.Item
                              name={[lesson.name, "content"]}
                              label="Tên đề mục"
                              initialValue={lesson.content}
                            >
                              <Input placeholder="Nhập để thêm" />
                            </Form.Item>

                            <Form.Item
                              label="Hình ảnh đề mục"
                              name={[lesson.name, "content_img"]}
                              valuePropName="content_img"
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
                                  lesson.key,
                                  "content_img",
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

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                width: "100%",
                              }}
                            >
                              <p
                                style={{
                                  fontSize: "1em",
                                  fontWeight: "bold",
                                  margin: "0px 0px 8px 0px",
                                }}
                              >
                                - Nội dung đề mục
                              </p>
                              <Form.Item
                                style={{
                                  width: "100%",
                                }}
                              >
                                <Form.List name={[lesson.name, "descriptions"]}>
                                  {(descriptions, subOpt) => (
                                    <>
                                      {descriptions.map(
                                        (description, descriptionIdx) => (
                                          <>
                                            <div
                                              key={descriptionIdx}
                                              style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "flex-start",
                                                marginBottom: 16,
                                              }}
                                            >
                                              <Button
                                                type="link"
                                                danger
                                                onClick={() => {
                                                  subOpt.remove(
                                                    description.name
                                                  );
                                                }}
                                              >
                                                <MinusCircleOutlined />
                                                Xóa
                                              </Button>
                                              <Form.Item
                                                name={[
                                                  description.name,
                                                  "description_content",
                                                ]}
                                                style={{
                                                  width: "100%",
                                                }}
                                              >
                                                <Input placeholder="Nhập để thêm" />
                                              </Form.Item>
                                              <Form.Item
                                                name={[
                                                  description.name,
                                                  "description_img",
                                                ]}
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
                                                    lesson.key,
                                                    "description_img",
                                                  ])}
                                                  listType="picture-card"
                                                >
                                                  <div>
                                                    <PlusOutlined />
                                                    <div
                                                      style={{ marginTop: 8 }}
                                                    >
                                                      Thêm hình ảnh
                                                    </div>
                                                  </div>
                                                </Upload>
                                              </Form.Item>
                                            </div>
                                          </>
                                        )
                                      )}
                                      <Button onClick={() => subOpt.add()}>
                                        <PlusOutlined />
                                        Thêm nội dung
                                      </Button>
                                    </>
                                  )}
                                </Form.List>
                              </Form.Item>
                            </div>

                            <Form.Item>
                              <Form.List name={[lesson.name, "example"]}>
                                {(example, subOpt) => (
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "flex-start",
                                      marginBottom: 16,
                                      width: "100%",
                                    }}
                                  >
                                    {example.map((ex) => {
                                      return (
                                        <>
                                          <p
                                            style={{
                                              margin: "10px 0px",
                                            }}
                                          >
                                            <span
                                              style={{
                                                fontSize: "1.3em",
                                                fontWeight: "bold",
                                              }}
                                            >
                                              - Ví dụ:{" "}
                                            </span>
                                            <Button
                                              type="link"
                                              danger
                                              onClick={() => {
                                                subOpt.remove(ex.name);
                                              }}
                                            >
                                              <MinusCircleOutlined />
                                              Xóa
                                            </Button>
                                          </p>

                                          <Form.Item
                                            name={[ex.name, "example_content"]}
                                            style={{
                                              width: "100%",
                                            }}
                                          >
                                            <Input placeholder="Nhập để thêm" />
                                          </Form.Item>
                                          <Form.Item
                                            name={[ex.name, "example_img"]}
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
                                                lesson.key,
                                                "example_img",
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
                                          <span
                                            style={{
                                              fontWeight: "bold",
                                            }}
                                          >
                                            - Bài giải:{" "}
                                          </span>
                                          <Form.Item
                                            name={[ex.name, "solution"]}
                                            style={{
                                              width: "100%",
                                            }}
                                          >
                                            <Input placeholder="Nhập để thêm" />
                                          </Form.Item>
                                          <Form.Item
                                            name={[ex.name, "solution_img"]}
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
                                                lesson.key,
                                                "solution_img",
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
                                        </>
                                      );
                                    })}
                                    <Button onClick={() => subOpt.add()}>
                                      <PlusOutlined />
                                      Thêm ví dụ
                                    </Button>
                                  </div>
                                )}
                              </Form.List>
                            </Form.Item>
                          </div>
                        </div>
                      ))}
                      <Button type="dashed" onClick={() => add()} block>
                        + Thêm đề mục
                      </Button>
                    </>
                  )}
                </Form.List>
              </Form>
              {index === dataItems.length - 1 && (
                <ButtonBasic
                  type="primary"
                  label="Thêm tiêu đề"
                  style={{ background: "#6DAE40" }}
                  onClick={() => handleClickAddLesson(content.item.lessonId)}
                />
              )}
            </Col>
          );
        })}
      </Row>
    </>
  );
};
export default ManageTheories;
