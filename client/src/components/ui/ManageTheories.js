import { Button, Col, Row } from "antd";
import InputCustomize from "../form/InputCustomize";
import UploadPicturesWall from "./UploadPicturesWall";

const ManageTheories = ({ ...props }) => {
  const { dataContent } = props;
  console.log("dataContent", dataContent);
  return (
    <Row
      style={{ padding: "0px 8px" }}
      gutter={{
        xs: 8,
        sm: 16,
        md: 24,
        lg: 32,
      }}
    >
      {dataContent &&
        dataContent.length > 0 &&
        dataContent.map((content, index) => {
          return (
            <Col
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginBottom: 30,
              }}
              span={12}
            >
              <h2
                style={{
                  margin: "0px 0px 16px 0px",
                  color: "#EC8E00",
                  textDecoration: "underline",
                }}
              >
                Tiêu đề {index + 1}
              </h2>
              <InputCustomize
                style={{ width: "60%" }}
                placeholder={content.lesson_title}
              />
              <h2
                style={{
                  margin: "16px 0px",
                  color: "#EC8E00",
                  textDecoration: "underline",
                }}
              >
                Nội dung
              </h2>
              {content.lesson_content.length > 0 &&
                content.lesson_content.map((lesson, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        fontSize: "1.2em",
                        marginBottom: 16,
                        width: "100%",
                        borderBottom: "1px solid black",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "1.1em",
                          fontWeight: "bold",
                          margin: "8px 0px",
                        }}
                      >
                        Đề mục {index + 1}
                      </p>
                      <InputCustomize placeholder={lesson.content} />

                      <UploadPicturesWall
                        thumbUrl={
                          lesson.content_img ? lesson.content_img : null
                        }
                        // onChangeImage={(value) => onChangeImage(value, index)}
                      />

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          marginBottom: 16,
                          width: "100%",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "1em",
                            margin: "8px 0px",
                          }}
                        >
                          - Nội dung đề mục
                        </p>
                        {lesson.descriptions.length > 0 &&
                          lesson.descriptions.map((description, index) => {
                            return (
                              <div
                                key={index}
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  marginBottom: 16,
                                  width: "100%",
                                }}
                              >
                                {description.description_content !== "" ? (
                                  <>
                                    <InputCustomize
                                      style={{ margin: "10px 8px" }}
                                      placeholder={
                                        description.description_content
                                      }
                                    />
                                    <UploadPicturesWall
                                      thumbUrl={
                                        description.description_img
                                          ? description.description_img
                                          : null
                                      }
                                      // onChangeImage={(value) => onChangeImage(value, index)}
                                    />
                                  </>
                                ) : null}
                              </div>
                            );
                          })}
                        <Button>Thêm nội dung</Button>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          marginBottom: 16,
                          width: "100%",
                        }}
                      >
                        {lesson.example.length > 0 &&
                          lesson.example.map((ex) => {
                            return (
                              <>
                                <p style={{ margin: "10px 0px" }}>
                                  <span style={{ fontWeight: "bold" }}>
                                    Ví dụ:{" "}
                                  </span>
                                </p>
                                {ex.example_content !== "" ? (
                                  <>
                                    <InputCustomize
                                      placeholder={ex.example_content}
                                    />
                                    <UploadPicturesWall
                                      thumbUrl={
                                        ex.example_img ? ex.example_img : null
                                      }
                                      // onChangeImage={(value) => onChangeImage(value, index)}
                                    />
                                  </>
                                ) : (
                                  <Button>Thêm</Button>
                                )}
                              </>
                            );
                          })}
                        {lesson.solution &&
                          lesson.solution.length > 0 &&
                          lesson.solution.map((solution) => {
                            return (
                              <>
                                <p style={{ margin: "10px 0px" }}>
                                  <span style={{ fontWeight: "bold" }}>
                                    Đáp án:{" "}
                                  </span>
                                </p>
                                <InputCustomize
                                  placeholder={solution.solution_content}
                                />
                                {solution.solution_img !== "" && (
                                  <img
                                    src={solution.solution_img}
                                    style={{ marginLeft: 58 }}
                                  />
                                )}
                              </>
                            );
                          })}
                      </div>
                    </div>
                  );
                })}
              <Button>Thêm đề mục</Button>
            </Col>
          );
        })}
    </Row>
  );
};
export default ManageTheories;
