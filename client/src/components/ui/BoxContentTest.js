import { useEffect, useState } from "react";
import { Row, Col, Radio } from "antd";
import RadioChecked from "../form/RadioChecked";
import InputCustomize from "../form/InputCustomize";
import CheckboxCustomize from "../form/CheckBoxCustomize";
import DragAndDropTest from "./DragAndDropTest";

const BoxContentTest = ({ ...props }) => {
  const {
    contents,
    setDataAnswer,
    handleAnswerChoise,
    handleChangeCheckBoxWonder,
  } = props;

  const [dataAnswerInput, setDataAnswerInput] = useState([]);
  const [dataAnswerDragAndDrop, setDataAnswerDragAndDrop] = useState([]);

  const [dataChecked, setDataChecked] = useState(
    contents[0].questions.map(() => {
      return {
        value: "answer",
        checked: false,
      };
    })
  );
  const [dataInput, setDataInput] = useState(
    contents[1].questions.map((question) => question.topic.map(() => "answer"))
  );

  // Handle

  useEffect(() => {
    handleDataEssay();
  }, [dataInput, dataAnswerDragAndDrop]);

  const handleDataEssay = () => {
    dataAnswerInput.length > 0 &&
      dataAnswerInput.map((data, _) => {
        data.map((item, idx) => {
          if (item.length === dataAnswerDragAndDrop.length) {
            const newDataEssay = [...data];
            newDataEssay.splice(idx, 1, dataAnswerDragAndDrop);
            setDataAnswer(newDataEssay);
          }
        });
      });
  };

  // Event
  const handleChecked = (value, indexQuestion) => {
    const newDataChecked = [...dataChecked];

    if (!newDataChecked[indexQuestion].checked) {
      newDataChecked.splice(indexQuestion, 1, {
        value: value,
        checked: true,
      });
      setDataChecked(newDataChecked);
      handleAnswerChoise(newDataChecked, indexQuestion);
    }
  };

  const handleChangeInput = (value, indexInput, indexQuestion) => {
    const newDataInput = [...dataInput];
    newDataInput[indexQuestion].splice(indexInput, 1, value);
    setDataInput(newDataInput);
  };

  const handleBlur = () => {
    setDataAnswerInput([dataInput]);
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
          {content.questions.map((question, indexQuestion) => {
            return (
              <div
                key={indexQuestion}
                style={{ paddingLeft: 16, marginBottom: 32 }}
              >
                <p>
                  {`Câu ${
                    index === 0 ? indexQuestion + 1 : indexQuestion + 6
                  }: ${question.question}`}
                  <CheckboxCustomize
                    style={{ fontSize: "1em", marginLeft: 32 }}
                    label={"Đánh dấu câu em chưa chắc chắn"}
                    checkBoxDesign={{
                      colorPrimary: "#EC8E00",
                    }}
                    onChange={() =>
                      handleChangeCheckBoxWonder(
                        index === 0 ? indexQuestion : indexQuestion + 5,
                        indexQuestion
                      )
                    }
                  />
                </p>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {question.question_img && (
                    <img
                      src={question.question_img}
                      style={{
                        width: "20%",
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
                  <Radio.Group
                    onChange={(e) =>
                      handleChecked(e.target.value, indexQuestion)
                    }
                    style={{
                      width: "100%",
                      paddingLeft: 32,
                    }}
                  >
                    <Row>
                      {question.options &&
                        question.options.map((option, indexChecked) => {
                          return (
                            <Col key={indexChecked} span={6}>
                              <RadioChecked
                                option={option}
                                value={indexChecked}
                                style={{ fontSize: "1.3em" }}
                              />
                            </Col>
                          );
                        })}
                    </Row>
                  </Radio.Group>

                  {question.topic && question.drag === false && (
                    <Col span={12} style={{ fontSize: "1.3em" }}>
                      {question.topic.map((item, indexInput) => {
                        return (
                          <div
                            key={indexInput}
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
                              onChange={(e) =>
                                handleChangeInput(
                                  e.target.value,
                                  indexInput,
                                  indexQuestion
                                )
                              }
                              onBlur={handleBlur}
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
                      setDataAnswerDragAndDrop={setDataAnswerDragAndDrop}
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
