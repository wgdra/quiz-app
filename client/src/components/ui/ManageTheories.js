import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Input, Card, Space } from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import UploadPicturesWall from "./UploadPicturesWall";
import ButtonBasic from "./Button";
import ButtonGroup from "./ButtonGroup";
import LessonContent from "./LessonContent";

const ManageTheories = ({ ...props }) => {
  const { dataContent } = props;

  const [form] = Form.useForm();

  const [dataItems, setDataItems] = useState([]);
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

  // console.log("dataItems", dataItems);

  // Handle Form
  const onFinish = (lessonId, data) => {
    console.log("lessonId", lessonId);
    console.log("Data form", data);

    // const newDataContent = [...dataItems];
    // newDataContent.splice(index, 1, {
    //   item: item,
    //   state: 0,
    //   disabled: true,
    // });
    // setDataItems(newDataContent);
  };

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

  const handleClick = (e) => {
    console.log("e", e);
  };

  const onChange = (e) => {
    console.log("change", e);
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
        {
          // dataContent &&
          //   dataContent.length > 0 &&
          dataItems.map((content, index) => {
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
                    <ButtonBasic
                      type="primary"
                      label="Chỉnh sửa"
                      style={{ background: "#eb9a25" }}
                      onClick={(e) => handleClickUpdate(e, content.item, index)}
                    />
                  )}
                </div>
                <Form
                  layout="vertical"
                  disabled={content.disabled}
                  onFinish={(data) => onFinish(content.item.lessonId, data)}
                  style={{
                    width: "100%",
                    position: "relative",
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
                    {(content) => (
                      <>
                        {content.map((lesson, idx) => (
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
                                onClick={handleClick}
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
                                name={[lesson.name, "content_img"]}
                                label="Hình ảnh đề mục"
                                initialValue={lesson.content_img}
                              >
                                <UploadPicturesWall
                                  thumbUrl={
                                    lesson.content_img
                                    // ? lesson.content_img
                                    // : null
                                  }
                                  // onChangeImage={(value) => onChangeImage(value, index)}
                                />
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
                                    margin: 0,
                                  }}
                                >
                                  - Nội dung đề mục
                                </p>
                                <Form.Item
                                  style={{
                                    width: "100%",
                                  }}
                                >
                                  <Form.List
                                    name={[lesson.name, "descriptions"]}
                                  >
                                    {(descriptions) =>
                                      descriptions.map((description, idx) => {
                                        return (
                                          <div
                                            key={idx}
                                            style={{
                                              display: "flex",
                                              flexDirection: "column",
                                              alignItems: "flex-start",
                                              marginBottom: 16,
                                            }}
                                          >
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
                                            >
                                              <UploadPicturesWall
                                                thumbUrl={
                                                  description.description_img
                                                    ? description.description_img
                                                    : null
                                                }
                                              />
                                            </Form.Item>
                                          </div>
                                        );
                                      })
                                    }
                                  </Form.List>
                                </Form.Item>
                                <Button onClick={handleClick}>
                                  Thêm nội dung
                                </Button>
                              </div>

                              <Form.Item>
                                <Form.List name={[lesson.name, "example"]}>
                                  {(example) => (
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
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                - Ví dụ:{" "}
                                              </span>
                                            </p>
                                            {ex.example_content !== "" ? (
                                              <>
                                                <Form.Item
                                                  name={[
                                                    ex.name,
                                                    "example_content",
                                                  ]}
                                                  style={{
                                                    width: "100%",
                                                  }}
                                                >
                                                  <Input
                                                    placeholder={
                                                      ex.example_content
                                                    }
                                                  />
                                                </Form.Item>
                                                <Form.Item
                                                  name={[
                                                    ex.name,
                                                    "example_img",
                                                  ]}
                                                >
                                                  <UploadPicturesWall
                                                    thumbUrl={
                                                      ex.example_img
                                                        ? ex.example_img
                                                        : null
                                                    }
                                                  />
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
                                                  <Input
                                                    placeholder={ex.solution}
                                                  />
                                                </Form.Item>
                                                <Form.Item
                                                  name={[
                                                    ex.name,
                                                    "example_img",
                                                  ]}
                                                >
                                                  <UploadPicturesWall
                                                    thumbUrl={
                                                      ex.solution_img
                                                        ? ex.solution_img
                                                        : null
                                                    }
                                                  />
                                                </Form.Item>
                                                <Button onClick={handleClick}>
                                                  Thêm ví dụ
                                                </Button>
                                              </>
                                            ) : (
                                              <Button onClick={handleClick}>
                                                Thêm ví dụ
                                              </Button>
                                            )}
                                          </>
                                        );
                                      })}
                                    </div>
                                  )}
                                </Form.List>
                              </Form.Item>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </Form.List>
                  <Button onClick={handleClick}>Thêm đề mục</Button>
                </Form>
              </Col>
            );
          })
        }
        <Button onClick={handleClick}>Thêm tieu đề</Button>
      </Row>
    </>
  );
};
export default ManageTheories;
