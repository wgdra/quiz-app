import { useEffect, useState } from "react";
import { Row, Col } from "antd";
import RadioChecked from "../form/RadioChecked";
import InputCustomize from "../form/InputCustomize";
import DragAndDropTest from "./DragAndDropTest";

const BoxContentTest = ({ ...props }) => {
  const { contents } = props;

  // Handle

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
                    <DragAndDropTest
                      topic={question.topic}
                      topic_answer={question.topic_answer}
                    />
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
