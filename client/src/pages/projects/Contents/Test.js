import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Row, Col, notification } from "antd";
import InfoTest from "../../../components/ui/InfoTest";
import BoxContentTest from "../../../components/ui/BoxContentTest";

const Test = () => {
  const location = useLocation();
  const data = location.state.dataTest;
  console.log("data test ", data);

  const [dataAnswer, setDataAnswer] = useState([]);

  console.log("dataAnswer", dataAnswer);

  const totalQuestion = [];
  data.content.forEach((item) => {
    item.questions.forEach((question) => {
      totalQuestion.push(question);
    });
  });

  // Handle
  const handleClickQuestion = (question) => {
    console.log("handleClickQuestion", question);
  };
  const handleClickButton = (e) => {
    console.log("handleClickButton", e.target.innerText);
  };

  // Handle Answer User

  return (
    <>
      <h1 style={{ color: "#44A500" }}>
        {data.test_name} - {data.description}
      </h1>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={18}>
          <div
            style={{
              fontSize: "1.3em",
              minHeight: 730,
              background: "#FFFFFF",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              padding: "16px 32px",
            }}
          >
            <BoxContentTest
              contents={data.content}
              setDataAnswer={setDataAnswer}
            />
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <InfoTest
            totalQuestion={totalQuestion}
            handleClickButton={handleClickButton}
            handleClickQuestion={handleClickQuestion}
          />
        </Col>
      </Row>
    </>
  );
};

export default Test;
