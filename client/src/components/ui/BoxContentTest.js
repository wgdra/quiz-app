import { useState } from "react";
import { Row, Col } from "antd";
import RadioChecked from "../form/RadioChecked";
import InputCustomize from "../form/InputCustomize";

const BoxContentTest = ({ ...props }) => {
  const { contents } = props;

  const [textDragOver, setTextDragOver] = useState(null);
  const [isDragOver, setIsDragOver] = useState();

  // Handle
  const handleDragStart = (e, item, index) => {
    console.log("handleDragStart", item);
    setTextDragOver(item);
  };

  const handleDrop = (e) => {
    setTextDragOver(null);
  };

  const handleDragOver = (e, index) => {
    console.log("handleDragOver", index);
    setIsDragOver(index);
  };

  return (
    contents.length > 0 &&
    contents.map((content, index) => {
      return (
        <div key={index} style={{}}>
          <p style={{ fontWeight: "bold" }}>{content.title}</p>
          {index === 0 && (
            <p style={{ fontStyle: "italic" }}>
              Em hãy tích vào ô tròn trước kết quả đúng
            </p>
          )}
          {content.questions.map((question, index) => {
            return (
              <div key={index} style={{ paddingLeft: 16, marginBottom: 32 }}>
                <p>{`Câu ${index + 1}: ${question.question}`}</p>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {question.question_img && (
                    <img
                      src={question.question_img}
                      style={{
                        width: "20%",
                        //   marginLeft: 128,
                      }}
                    />
                  )}
                </div>
                <Row
                  gutter={{
                    xs: 8,
                    sm: 16,
                    md: 24,
                    lg: 32,
                  }}
                >
                  {question.options &&
                    question.options.map((option, _) => {
                      return (
                        <Col span={6}>
                          <RadioChecked
                            option={option}
                            style={{ fontSize: "1.3em" }}
                          />
                        </Col>
                      );
                    })}

                  {question.topic && question.drag === false && (
                    <Col span={12} style={{ fontSize: "1.3em" }}>
                      {question.topic.map((item, _) => {
                        return (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              width: "100%",
                              marginBottom: 16,
                            }}
                          >
                            <span style={{ marginRight: 8 }}>{item}</span>

                            <InputCustomize
                              style={{ width: "50%", fontSize: "1em" }}
                              placeholder="nhập kết quả"
                              inputDesign={{
                                hoverBorderColor: "black",
                                activeBorderColor: "black",
                                activeShadow: "black",
                              }}
                            />
                          </div>
                        );
                      })}
                    </Col>
                  )}

                  {question.topic && question.drag === true && (
                    <>
                      <Col span={16} style={{ fontSize: "1.3em" }}>
                        {question.topic.map((item, index) => {
                          return (
                            <div
                              key={index}
                              style={{
                                display: "flex",
                                marginBottom: 16,
                              }}
                            >
                              <div
                                style={{
                                  height: 80,
                                  width: "40%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  border: "2px solid black",
                                  borderRight: "none",
                                }}
                              >
                                {item}
                              </div>

                              <div
                                style={{
                                  color: "#999999",
                                  height: 80,
                                  width: "50%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  border: "2px dashed #999999",
                                }}
                                onDrop={handleDrop}
                                onDragOver={(e) => handleDragOver(e, index)}
                              >
                                {isDragOver === index
                                  ? textDragOver
                                  : "ô tương ứng"}
                              </div>
                            </div>
                          );
                        })}
                      </Col>
                      <Col span={8} style={{ fontSize: "1.3em" }}>
                        {question.topic_answer.map((item, index) => {
                          return (
                            <div
                              key={index}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginBottom: 16,
                                height: 80,
                                width: "100%",
                                border: "2px solid black",
                                cursor: "pointer",
                              }}
                              draggable={true}
                              onDragStart={(e) =>
                                handleDragStart(e, item, index)
                              }
                            >
                              <span>{item}</span>
                            </div>
                          );
                        })}
                      </Col>
                    </>
                  )}
                </Row>
              </div>
            );
          })}
        </div>
      );
    })
  );
};

export default BoxContentTest;
